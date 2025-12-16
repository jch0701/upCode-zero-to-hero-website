import { supabase } from "../../config.js";
import { generateSlug } from "../../util/generateSlug.js";

export const createRoadmap = async(req: any, res: any) => {
    if (req.method !== 'POST') {
        return res.status(405).end(`Method ${req.method} Not Allowed. Use POST only.`);
    }

    const newRoadmap = req.body;
    if (!newRoadmap.title || !newRoadmap.creatorID) {
         return res.status(400).json({ message: 'Title and Creator ID are required.' });
    }

    const payload = {
        creatorID: newRoadmap.creatorID,
        imageSrc: newRoadmap.imageSrc,
        title: newRoadmap.title,
        description: newRoadmap.description,
        createdDate: new Date().toISOString().slice(0, 10), 
        modifiedDate: new Date().toISOString().slice(0, 10),
    };

    try {
        const { data: roadmap, error } = await supabase
            .from("Roadmaps")
            .insert(payload)
            .select()
            .single();
        
        if (error){
            console.error('POST Error:', error);
            return res.status(500).json({ message: 'Failed to insert roadmap.' });
        }

        const finalRoadmap = { 
            ...roadmap, 
            roadmapSlug: generateSlug(payload.title), 
            isFavourite: false,
        };

        return res.status(201).json(finalRoadmap);
    }
    catch (error) {
        return res.status(500).json({ message: 'Internal Server Error.' });
    }
}



export const editRoadmap = async(req: any, res: any) => {
    if (req.method !== 'PUT') {
        return res.status(405).end(`Method ${req.method} Not Allowed. Use PUT only.`);
    }

    const updatedRoadmap = req.body;
    const putRoadmapID = updatedRoadmap.roadmapID
    
    if (!putRoadmapID) {
        return res.status(400).json({ message: 'Roadmap ID is required for update.' });
    }

    const payload = {
        title: updatedRoadmap.title,
        description: updatedRoadmap.description,
        imageSrc: updatedRoadmap.imageSrc,
        modifiedDate: new Date().toISOString().slice(0, 10),
    };

    try {
        const { data: roadmap, error } = await supabase
            .from('Roadmaps')
            .update(payload)
            .eq('roadmapID', putRoadmapID)
            .select()
            .single();

        if (error) {
            console.error('PUT Error:', error);
            return res.status(500).json({ message: 'Failed to update roadmap.' });
        }

        const finalRoadmap = { 
            ...roadmap, 
            roadmapSlug: generateSlug(updatedRoadmap.title), 
        };

        return res.status(200).json(finalRoadmap);
    }
    catch (error) {
         return res.status(500).json({ message: 'Internal Server Error.' });
    }

}


export const deleteRoadmap = async(req: any, res: any) => {
    if (req.method !== 'DELETE') {
        return res.status(405).end(`Method ${req.method} Not Allowed. Use DELETE only.`);
    }

    const deleteRoadmapID = req.body.roadmapID;
    if (!deleteRoadmapID) {
        return res.status(400).json({ message: 'Roadmap ID is required for deletion.' });
    }

    try {
        const { error } = await supabase
            .from('Roadmaps') 
            .delete()
            .eq('roadmapID', deleteRoadmapID); 

        if (error) {
            console.error('DELETE Error:', error);
            return res.status(500).json({ message: 'Failed to delete roadmap.' });
        }
        return res.status(200).json({ deletedId: deleteRoadmapID, message: 'Roadmap successfully deleted.' });
    }
    catch (error) {
        return res.status(500).json({ message: 'Internal Server Error.' });
    }
}