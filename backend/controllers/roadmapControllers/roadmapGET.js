import { supabase } from "../../config.js";
import { generateSlug } from "../../util/generateSlug.js";

export const getAllRoadmap = async (req, res) => {
    if (req.method !== 'GET') {
        return res.status(405).end(`Method ${req.method} Not Allowed. Use GET only.`);
    }

    // Get User ID from query parameter
    const userID = req.headers['x-user-id']
    const isLoggedIn = !!userID;

    try {
        const { data: roadmaps, error: roadmapError } = await supabase
            .from("Roadmaps")
            .select('*')
            .order('modifiedDate', { ascending: false });

        if (roadmapError) {
            console.error('Roadmaps Fetch Error:', roadmapError);
            return res.status(500).json({ message: 'Failed to fetch roadmaps.' });
        }

        let favoriteIds = [];
        if (isLoggedIn) {
            const { data: favorites } = await supabase
                .from('FavouriteRoadmap')
                .select('roadmapID')
                .eq('userID', userID);
            favoriteIds = favorites ? favorites.map(fav => fav.roadmapID) : [];
        }

        const roadmapsWithFavouriteStatus = roadmaps.map(roadmap => ({
            ...roadmap,
            roadmapSlug: generateSlug(roadmap.title),
            isFavourite: favoriteIds.includes(roadmap.roadmapID),
        }));

        return res.status(200).json(roadmapsWithFavouriteStatus);
    }
    catch (error) {
        console.error('Internal Server Error in GET Controller:', error);
        return res.status(500).json({ message: 'Internal Server Error.' });
    }
}

export const getRoadmap = async (req, res) => {
    if (req.method !== 'GET') {
        return res.status(405).end(`Method ${req.method} Not Allowed. Use GET only.`);
    }

    const { roadmapID } = req.params;
    if (!roadmapID) {
        return res.status(400).json({ message: 'Missing roadmap ID query parameter.' });
    }

    // Get User ID from query parameter
    const userID = req.headers['x-user-id']
    const isLoggedIn = !!userID;

    try {
        const { data: roadmaps, error: roadmapError } = await supabase
            .from("Roadmaps")
            .select('*')
            .eq('roadmapID', roadmapID)
            .order('modifiedDate', { ascending: false });

        if (roadmapError) {
            console.error('Roadmaps Fetch Error:', roadmapError);
            return res.status(500).json({ message: 'Failed to fetch roadmaps.' });
        }

        let favoriteIds = [];
        if (isLoggedIn) {
            const { data: favorites } = await supabase
                .from('FavouriteRoadmap')
                .select('roadmapID')
                .eq('userID', userID);
            favoriteIds = favorites ? favorites.map(fav => fav.roadmapID) : [];
        }

        const roadmapsWithFavouriteStatus = roadmaps.map(roadmap => ({
            ...roadmap,
            roadmapSlug: generateSlug(roadmap.title),
            isFavourite: favoriteIds.includes(roadmap.roadmapID),
        }));

        return res.status(200).json(roadmapsWithFavouriteStatus[0]);
    }
    catch (error) {
        console.error('Internal Server Error in GET Controller:', error);
        return res.status(500).json({ message: 'Internal Server Error.' });
    }
}

export const getAllWithProgress = async (req, res) => {
    if (req.method !== 'GET') {
        return res.status(405).end(`Method ${req.method} Not Allowed. Use GET only.`);
    }
    const { userID: user_id_input } = req.params;
    if (!user_id_input) {
        return res.status(400).json({ message: 'Missing user ID query parameter.' });
    }

    const { data: roadmaps, error } = await supabase
        .rpc('get_roadmaps_with_progress', { user_id_input });

    if (error) {
        console.error('Roadmaps with Progress Fetch Error:', error);
        return res.status(500).json({ message: 'Failed to fetch roadmaps with progress.' });
    }

    // Get progress for each roadmap in percentage
    let enrichedRoadmaps = await Promise.all(roadmaps.map(async (roadmap) => {
        // 1. Get total nodes in the roadmap
        const { count: totalNodes, error: countError } = await supabase
            .from('Nodes')
            .select('nodeID, Chapters!inner(roadmapID)', { count: 'exact', head: true })
            .eq('Chapters.roadmapID', roadmap.roadmapID);

        // 2. Get nodes the user has read within THIS roadmap
        const { count: readNodes, error: readError } = await supabase
            .from('ReadNode')
            .select(`nodeID, Nodes!inner(
                nodeID,
                Chapters!inner(roadmapID)
            )
    `, { count: 'exact', head: true })
            .eq('userID', user_id_input)
            .eq('Nodes.Chapters.roadmapID', roadmap.roadmapID); // Note the nested path
        if (countError) {
            console.error('Error fetching counts for roadmap nodes:', countError);
            roadmap.progress = 0;
        }
        else if (readError) {
            console.error('Error fetching read nodes for roadmap progress:', readError);
            roadmap.progress = 0;
        }
        else {
            const progress = totalNodes > 0 ? Math.round((readNodes / totalNodes) * 100)/100 : 0;
            roadmap.progress = progress;
        }
    }));
    return res.status(200).json(roadmaps);
}
/*
select * from Roadmaps r
where r.roadmapID in (
    select roadmapID from ReadChapter rc 
    where rc.userID = input.userID
    union
    select n.roadmapID from ReadNode rn
    left join Nodes n on rn.nodeID = n.nodeID
    where rn.userID = input.userID
)
 */