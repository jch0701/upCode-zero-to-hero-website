import { supabase } from "../../config.js";


export const getAllRoadmapRecommendation = async(req, res) => {
    if (req.method !== 'GET') {
        return res.status(405).end(`Method ${req.method} Not Allowed. Use GET only.`);
    }

    try {
        const { data: recommendations, error: recommendationError } = await supabase
            .from("Recommendations")
            .select('*')
            .in("sourceType", ["roadmap", "chapter"]);
            
        if (recommendationError) {
            console.error('Recommendations Fetch Error:', recommendationError);
            return res.status(500).json({ message: 'Failed to fetch recommendations.' });
        }

        return res.status(200).json(recommendations);
    }
    catch (error){
        console.error('Internal Server Error in GET Controller:', error);
        return res.status(500).json({ message: 'Internal Server Error.' });
    }
}


export const createRoadmapRecommendation = async(req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).end(`Method ${req.method} Not Allowed. Use POST only.`);
    }

    const newRecommendation = req.body;
    if (!newRecommendation.sourceId || !newRecommendation.targetId) {
         return res.status(400).json({ message: 'Roadmap ID and User ID are required.' });
    }

    const payload = {
        sourceId: newRecommendation.sourceId,
        sourceType: newRecommendation.sourceType,
        targetId: newRecommendation.targetId,
        targetType: newRecommendation.targetType,
        createdAt: new Date().toISOString().slice(0, 10),
    }

    try {
        const { data: recommendation, error } = await supabase
            .from("Recommendations")
            .insert(payload)
            .select()
            .single()

        if (error) {
            console.error('POST Error:', error);
            return res.status(500).json({ message: 'Failed to save recommendation.' });
        }
        return res.status(201).json(recommendation);
    }
    catch {
        return res.status(500).json({ message: 'Internal Server Error.' });
    }
}


export const deleteRoadmapRecommendation = async(req, res) => {
    if (req.method !== 'DELETE') {
        return res.status(405).end(`Method ${req.method} Not Allowed. Use DELETE only.`);
    }

    const deleteRecommendedID = req.body.recommendationId;
    if (!deleteRecommendedID) {
         return res.status(400).json({ message: 'Recommendation ID are required.' });
    }
    
    try {
        const { error } = await supabase
            .from('FavouriteRoadmap') 
            .delete()
            .eq('recommendationId', deleteRecommendedID)

        if (error) {
            console.error('DELETE Error:', error);
            return res.status(500).json({ message: 'Failed to remove recommendation.' });
        }
        return res.status(200).json({ deletedId: [deleteRecommendedID] });
    }
    catch (error) {
        return res.status(500).json({ message: 'Internal Server Error.' });
    }
}