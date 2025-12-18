import { supabase } from "../../config.js";

export const createLink = async(req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).end(`Method ${req.method} Not Allowed. Use POST only.`);
    }

    const newLink = req.body;
    if (!newLink.title) {
        return res.status(400).json({ message: 'Title are required.' });
    }

    const payload = {
        chapterID: newLink.chapterID,
        title: newLink.title,
        order: newLink.order,
        link: newLink.link,
        modifiedDate: new Date().toISOString().slice(0, 10),
    }

    try {
        const { data: link, error } = await supabase
            .from("Nodes")
            .insert(payload)
            .select()
            .single();

        if (error){
            console.error('POST Error:', error);
            return res.status(500).json({ message: 'Failed to insert link.' });
        }

        const finalLink = { 
            ...link, 
            isViewed: false,
        };

        return res.status(201).json(finalLink);
    }
    catch{
        return res.status(500).json({ message: 'Internal Server Error.' });
    }
}


export const editLink = async(req, res) => {
    if (req.method !== 'PATCH') {
        return res.status(405).end(`Method ${req.method} Not Allowed. Use PATCH only.`);
    }

    const updatedLink = req.body;
    const nodeID = updatedLink.nodeID;

    if (!nodeID) {
        return res.status(400).json({ message: 'Link ID is required for update.' });
    }

    const payload = {
        title: updatedLink.title,
        order: updatedLink.order,
        link: updatedLink.link,
        modifiedDate: new Date().toISOString().slice(0, 10),
    }

    try {
        const { data: link, error } = await supabase
            .from('Nodes')
            .update(payload)
            .eq('nodeID', nodeID)
            .select()
            .single();

        if (error) {
            console.error('PUT Error:', error);
            return res.status(500).json({ message: 'Failed to update link.' });
        }
        return res.status(200).json(link);
    }
    catch (error) {
         return res.status(500).json({ message: 'Internal Server Error.' });
    }
}


export const deleteLink = async(req, res) => {
    if (req.method !== 'DELETE') {
        return res.status(405).end(`Method ${req.method} Not Allowed. Use DELETE only.`);
    }

    const deleteLinkID = req.body.nodeID;
    if (!deleteLinkID) {
        return res.status(400).json({ message: 'Link ID is required for deletion.' });
    }

    try {
        const { error } = await supabase
            .from('Nodes') 
            .delete()
            .eq('nodeID', deleteLinkID); 

        if (error) {
            console.error('DELETE Error:', error);
            return res.status(500).json({ message: 'Failed to delete link.' });
        }
        return res.status(200).json({ deletedId: deleteLinkID, message: 'Link successfully deleted.' });

    }
    catch {
        return res.status(500).json({ message: 'Internal Server Error.' });
    }

}