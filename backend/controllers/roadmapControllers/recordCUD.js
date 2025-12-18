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