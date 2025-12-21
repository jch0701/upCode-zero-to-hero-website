import { supabase } from "../../config.js";

export const getAllLink = async(req, res) => {
    if (req.method !== 'GET') {
        return res.status(405).end(`Method ${req.method} Not Allowed. Use GET only.`);
    }

    // Get User ID from query parameter
    const userID = req.headers['x-user-id']
    const isLoggedIn = !!userID;

    try {
        const { data: links, error: linkError } = await supabase
            .from("Nodes")
            .select('*')
            .order('modifiedDate', { ascending: false });

        if (linkError) {
            console.error('Links Fetch Error:', linkError);
            return res.status(500).json({ message: 'Failed to fetch links.' });
        }

        let viewIds = [];
        if (isLoggedIn) {
            const { data: views } = await supabase
                .from('ReadNode')
                .select('nodeID')
                .eq('userID', userID);
            viewIds = views ? views.map(view => view.nodeID) : [];
        }

        const linkWithViewStatus = links.map(link => ({
            ...link,
            isViewed: viewIds.includes(link.nodeID),
        }));

        return res.status(200).json(linkWithViewStatus);
    }
    catch (error){
        console.error('Internal Server Error in GET Controller:', error);
        return res.status(500).json({ message: 'Internal Server Error.' });
    }
}


export const getChapterLink = async(req, res) =>  {
    if (req.method !== 'GET') {
        return res.status(405).end(`Method ${req.method} Not Allowed. Use GET only.`);
    }

    const { chapterID } = req.params;
    if (!chapterID) {
        return res.status(400).json({ message: 'Missing chapter ID query parameter.' });
    }
    
    // Get User ID from query parameter
    const userID = req.headers['x-user-id']
    const isLoggedIn = !!userID;

    try {
        const { data: links, error: linkError } = await supabase
            .from("Nodes")
            .select('*')
            .eq('chapterID', chapterID)
            .order('modifiedDate', { ascending: false });

        if (linkError) {
            console.error('Links Fetch Error:', linkError);
            return res.status(500).json({ message: 'Failed to fetch links.' });
        }

        let viewIds = [];
        if (isLoggedIn) {
            const { data: views } = await supabase
                .from('ReadNode')
                .select('nodeID')
                .eq('userID', userID);
            viewIds = views ? views.map(view => view.nodeID) : [];
        }

        const linkWithViewStatus = links.map(link => ({
            ...link,
            isViewed: viewIds.includes(link.nodeID),
        }));

        return res.status(200).json(linkWithViewStatus);
    }
    catch (error){
        console.error('Internal Server Error in GET Controller:', error);
        return res.status(500).json({ message: 'Internal Server Error.' });
    }
}

export const getLink = async(req, res) => {
    if (req.method !== 'GET') {
        return res.status(405).end(`Method ${req.method} Not Allowed. Use GET only.`);
    }

    const { linkID } = req.params;
    if (!linkID) {
        return res.status(400).json({ message: 'Missing Link ID query parameter.' });
    }

    // Get User ID from query parameter
    const userID = req.headers['x-user-id']
    const isLoggedIn = !!userID;

    try {
        const { data: links, error: linkError } = await supabase
            .from("Nodes")
            .select('*')
            .eq('nodeID', linkID)
            .order('modifiedDate', { ascending: false });

        if (linkError) {
            console.error('Links Fetch Error:', linkError);
            return res.status(500).json({ message: 'Failed to fetch links.' });
        }

        let viewIds = [];
        if (isLoggedIn) {
            const { data: views } = await supabase
                .from('ReadNode')
                .select('nodeID')
                .eq('userID', userID);
            viewIds = views ? views.map(view => view.nodeID) : [];
        }

        const linkWithViewStatus = links.map(link => ({
            ...link,
            isViewed: viewIds.includes(link.nodeID),
        }));

        return res.status(200).json(linkWithViewStatus[0]);
    }
    catch (error){
        console.error('Internal Server Error in GET Controller:', error);
        return res.status(500).json({ message: 'Internal Server Error.' });
    }

}