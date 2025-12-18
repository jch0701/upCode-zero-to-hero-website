import { supabase } from "../../config.js";

export const createFavouriteRecord = async(req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).end(`Method ${req.method} Not Allowed. Use POST only.`);
    }

    const newRecord = req.body;
    if (!newRecord.roadmapID || !newRecord.userID) {
         return res.status(400).json({ message: 'Roadmap ID and User ID are required.' });
    }

    const payload = {
        userID: newRecord.userID,
        roadmapID: newRecord.roadmapID
    }

    try {
        const { data: favourite, error } = await supabase
            .from("FavouriteRoadmap")
            .insert(payload)
            .select()
            .single()

        if (error) {
            console.error('POST Error:', error);
            return res.status(500).json({ message: 'Failed to save favourite roadmap.' });
        }
        return res.status(201).json(favourite);
    }
    catch {
        return res.status(500).json({ message: 'Internal Server Error.' });
    }
}

export const deleteFavouriteRecord = async(req, res) => {
    if (req.method !== 'DELETE') {
        return res.status(405).end(`Method ${req.method} Not Allowed. Use DELETE only.`);
    }

    const deleteRoadmapID = req.body.roadmapID;
    const deleteUserID = req.body.userID;
    if (!deleteRoadmapID || !deleteUserID) {
         return res.status(400).json({ message: 'Roadmap ID and User ID are required.' });
    }
    
    try {
        const { error } = await supabase
            .from('FavouriteRoadmap') 
            .delete()
            .eq('roadmapID', deleteRoadmapID)
            .eq('userID', deleteUserID) 

        if (error) {
            console.error('DELETE Error:', error);
            return res.status(500).json({ message: 'Failed to unfavourite roadmap.' });
        }
        return res.status(200).json({ deletedId: [deleteRoadmapID, deleteUserID] });
    }
    catch (error) {
        return res.status(500).json({ message: 'Internal Server Error.' });
    }
}

export const createChapterRecord = async(req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).end(`Method ${req.method} Not Allowed. Use POST only.`);
    }

    const newRecord = req.body;
    if (!newRecord.chapterID || !newRecord.userID) {
         return res.status(400).json({ message: 'Chapter ID and User ID are required.' });
    }

    const payload = {
        userID: newRecord.userID,
        chapterID: newRecord.chapterID
    }
    try {
        const { data: views, error } = await supabase
            .from("ReadChapter")
            .insert(payload)
            .select()
            .single()

        if (error) {
            console.error('POST Error:', error);
            return res.status(500).json({ message: 'Failed to save view.' });
        }
        return res.status(201).json(views);
    }
    catch {
        return res.status(500).json({ message: 'Internal Server Error.' });
    }

}

export const deleteChapterRecord = async(req, res) => {
    if (req.method !== 'DELETE') {
        return res.status(405).end(`Method ${req.method} Not Allowed. Use DELETE only.`);
    }

    const deleteChapterID = req.body.chapterID;
    const deleteUserID = req.body.userID;
    if (!deleteChapterID || !deleteUserID) {
         return res.status(400).json({ message: 'Chapter ID and User ID are required.' });
    }

    try {
        const { error } = await supabase
            .from('ReadChapter') 
            .delete()
            .eq('chapterID', deleteChapterID)
            .eq('userID', deleteUserID) 

        if (error) {
            console.error('DELETE Error:', error);
            return res.status(500).json({ message: 'Failed to unsave view.' });
        }
        return res.status(200).json({ deletedId: [deleteChapterID, deleteUserID] });
    }
    catch (error) {
        return res.status(500).json({ message: 'Internal Server Error.' });
    }
}

export const createLinkRecord = async(req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).end(`Method ${req.method} Not Allowed. Use POST only.`);
    }

    const newRecord = req.body;
    if (!newRecord.nodeID || !newRecord.userID) {
         return res.status(400).json({ message: 'Link ID and User ID are required.' });
    }

    const payload = {
        nodeID: newRecord.nodeID,
        userID: newRecord.userID
    }
    try {
        const { data: views, error } = await supabase
            .from("ReadNode")
            .insert(payload)
            .select()
            .single()

        if (error) {
            console.error('POST Error:', error);
            return res.status(500).json({ message: 'Failed to save view.' });
        }
        return res.status(201).json(views);
    }
    catch {
        return res.status(500).json({ message: 'Internal Server Error.' });
    }

}

export const deleteLinkRecord = async(req, res) => {
    if (req.method !== 'DELETE') {
        return res.status(405).end(`Method ${req.method} Not Allowed. Use DELETE only.`);
    }

    const deleteNodeID = req.body.nodeID;
    const deleteUserID = req.body.userID;
    if (!deleteNodeID || !deleteUserID) {
         return res.status(400).json({ message: 'Link ID and User ID are required.' });
    }

    try {
        const { error } = await supabase
            .from('ReadNode') 
            .delete()
            .eq('nodeID', deleteNodeID)
            .eq('userID', deleteUserID) 

        if (error) {
            console.error('DELETE Error:', error);
            return res.status(500).json({ message: 'Failed to unsave view.' });
        }
        return res.status(200).json({ deletedId: [deleteNodeID, deleteUserID] });
    }
    catch (error) {
        return res.status(500).json({ message: 'Internal Server Error.' });
    }
}