import { supabase } from "../../config.js";

export default async function linkCUD(req: any, res: any){
    switch (req.method){
        case 'POST':
            const newLink = req.body;

            if (!newLink.title) {
                return res.status(400).json({ message: 'Title are required.' });
            }

            const payload = {
                chapterID: newLink.roadmapID,
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

        case 'PUT':
            const updatedLink = req.body;
            const putLinkID = updatedLink.nodeID;

            if (!putLinkID) {
                return res.status(400).json({ message: 'Link ID is required for update.' });
            }

            const putPayload = {
                title: updatedLink.title,
                order: updatedLink.order,
                link: updatedLink.link,
                modifiedDate: new Date().toISOString().slice(0, 10),
            }

            try {
                const { data: link, error } = await supabase
                    .from('Nodes')
                    .update(putPayload)
                    .eq('nodeID', putLinkID)
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

        case 'DELETE':
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
        default:
            res.setHeader('Allow', ['POST', 'PUT', 'DELETE']);
            return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}