import { supabase } from "../../config.js";
import { generateSlug } from "../../util/generateSlug.js";

export default async function chapterCUD(req: any, res: any){
    switch (req.method){
        case 'POST':
            const newChapter = req.body;
            
            if (!newChapter.title) {
                return res.status(400).json({ message: 'Title are required.' });
            }

            const payload = {
                roadmapID: newChapter.roadmapID,
                title: newChapter.title,
                description: newChapter.description || '',
                difficulty: newChapter.difficulty,
                category: newChapter.category,
                prerequisite: newChapter.prerequisite,
                order: newChapter.order,
                modifiedDate: new Date().toISOString().slice(0, 10),
            };

            try {
                const { data: chapter, error } = await supabase
                    .from("Chapters")
                    .insert(payload)
                    .select()
                    .single();

                if (error){
                    console.error('POST Error:', error);
                    return res.status(500).json({ message: 'Failed to insert chapter.' });
                }

                const finalChapter = { 
                    ...chapter, 
                    chapterSlug: generateSlug(payload.title), 
                    isViewed: false,
                };

                return res.status(201).json(finalChapter);
            }
            catch (error) {
                return res.status(500).json({ message: 'Internal Server Error.' });
            }

        case 'PUT':
            const updatedChapter = req.body;
            const putChapterID = updatedChapter.chapterID;

            if (!putChapterID) {
                return res.status(400).json({ message: 'Chapter ID is required for update.' });
            }

            const putPayload = {
                title: updatedChapter.title,
                description: updatedChapter.description,
                difficulty: updatedChapter.difficulty,
                category: updatedChapter.category,
                prerequisite: updatedChapter.prerequisite,
                order: updatedChapter.order,
                modifiedDate: new Date().toISOString().slice(0, 10),
            }

            try {
                const { data: chapter, error } = await supabase
                    .from('Chapters')
                    .update(putPayload)
                    .eq('chapterID', putChapterID)
                    .select()
                    .single();

                if (error) {
                    console.error('PUT Error:', error);
                    return res.status(500).json({ message: 'Failed to update chapter.' });
                }

                const finalChapter = { 
                    ...chapter, 
                    chapterSlug: generateSlug(updatedChapter.title), 
                };

                return res.status(200).json(finalChapter);
            }
            catch (error) {
                 return res.status(500).json({ message: 'Internal Server Error.' });
            }

        case 'DELETE':
            const deleteChapterID = req.body.chapterID;
            if (!deleteChapterID) {
                return res.status(400).json({ message: 'Chapter ID is required for deletion.' });
            }

            try {
                const { error } = await supabase
                    .from('Chapters') 
                    .delete()
                    .eq('chapterID', deleteChapterID); 

                if (error) {
                    console.error('DELETE Error:', error);
                    return res.status(500).json({ message: 'Failed to delete chapter.' });
                }
                return res.status(200).json({ deletedId: deleteChapterID, message: 'Chapter successfully deleted.' });
            }
            catch (error) {
                return res.status(500).json({ message: 'Internal Server Error.' });
            }
        default: 
            res.setHeader('Allow', ['POST', 'PUT', 'DELETE']);
            return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}