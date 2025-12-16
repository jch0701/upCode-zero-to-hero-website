import { supabase } from "../../config.js";
import { generateSlug } from "../../util/generateSlug.js";

export const getRoadmap = async (req: any, res: any) => {
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
    catch (error){
        console.error('Internal Server Error in GET Controller:', error);
        return res.status(500).json({ message: 'Internal Server Error.' });
    }

    
}