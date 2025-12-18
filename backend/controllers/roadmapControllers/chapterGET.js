import { supabase } from "../../config.js";
import { generateSlug } from "../../util/generateSlug.js";

export const getAllChapter = async(req, res) => {
    if (req.method !== 'GET') {
        return res.status(405).end(`Method ${req.method} Not Allowed. Use GET only.`);
    }

    // Get User ID from query parameter
    const userID = req.headers['x-user-id']
    const isLoggedIn = !!userID;

    try {
        const { data: chapters, error: chapterError } = await supabase
            .from("Chapters")
            .select('*')
            .order('modifiedDate', { ascending: false });
        
        if (chapterError) {
            console.error('Chapters Fetch Error:', chapterError);
            return res.status(500).json({ message: 'Failed to fetch chapters.' });
        }

        let viewIds = [];
        if (isLoggedIn) {
            const { data: views } = await supabase
                .from('ReadChapter')
                .select('chapterID')
                .eq('userID', userID);
            viewIds = views ? views.map(view => view.chapterID) : [];
        }

        const chapterWithViewStatus = chapters.map(chapter => ({
            ...chapter,
            chapterSlug: generateSlug(chapter.title),
            isViewed: viewIds.includes(chapter.chapterID),
        }));

        return res.status(200).json(chapterWithViewStatus);
    }
    catch (error){
        console.error('Internal Server Error in GET Controller:', error);
        return res.status(500).json({ message: 'Internal Server Error.' });
    }
}


export const getRoadmapChapter = async(req, res) => {
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
        const { data: chapters, error: chapterError } = await supabase
            .from("Chapters")
            .select('*')
            .eq('roadmapID', roadmapID)
            .order('modifiedDate', { ascending: false });
        
        if (chapterError) {
            console.error('Chapters Fetch Error:', chapterError);
            return res.status(500).json({ message: 'Failed to fetch chapters.' });
        }

        let viewIds = [];
        if (isLoggedIn) {
            const { data: views } = await supabase
                .from('ReadChapter')
                .select('chapterID')
                .eq('userID', userID);
            viewIds = views ? views.map(view => view.chapterID) : [];
        }

        const chapterWithViewStatus = chapters.map(chapter => ({
            ...chapter,
            chapterSlug: generateSlug(chapter.title),
            isViewed: viewIds.includes(chapter.chapterID),
        }));

        return res.status(200).json(chapterWithViewStatus);
    }
    catch (error){
        console.error('Internal Server Error in GET Controller:', error);
        return res.status(500).json({ message: 'Internal Server Error.' });
    }
}

export const getChapter = async(req, res) => {
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
        const { data: chapters, error: chapterError } = await supabase
            .from("Chapters")
            .select('*')
            .eq('chapterID', chapterID)
            .order('modifiedDate', { ascending: false });
        
        if (chapterError) {
            console.error('Chapters Fetch Error:', chapterError);
            return res.status(500).json({ message: 'Failed to fetch chapters.' });
        }

        let viewIds = [];
        if (isLoggedIn) {
            const { data: views } = await supabase
                .from('ReadChapter')
                .select('chapterID')
                .eq('userID', userID);
            viewIds = views ? views.map(view => view.chapterID) : [];
        }

        const chapterWithViewStatus = chapters.map(chapter => ({
            ...chapter,
            chapterSlug: generateSlug(chapter.title),
            isViewed: viewIds.includes(chapter.chapterID),
        }));

        return res.status(200).json(chapterWithViewStatus[0]);
    }
    catch (error){
        console.error('Internal Server Error in GET Controller:', error);
        return res.status(500).json({ message: 'Internal Server Error.' });
    }
}