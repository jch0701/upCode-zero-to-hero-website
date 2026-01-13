import { supabaseAdmin } from "../../config.js";

export const deleteCareer = async(req, res) => {
    if (req.method !== 'DELETE') {
        return res.status(405).end(`Method ${req.method} Not Allowed. Use DELETE only.`);
    }

    const { careerID } = req.params;

    if (!careerID) {
        return res.status(400).json({ message: 'Missing career ID.' });
    }

    try {
        // 1. Delete related applications first (manual cascade)
        // Using supabaseAdmin to bypass RLS
        const { error: appError } = await supabaseAdmin
            .from('Applications')
            .delete()
            .eq('career_id', careerID);

        if (appError) {

            console.error('Error deleting related applications:', appError);
            return res.status(500).json({ message: 'Failed to delete related applications.', details: appError });
        }

        // 2. Delete related Recommendations (manual cascade)
        // Recommendations can link to career via sourceId/sourceType or targetId/targetType
        const { error: recError } = await supabaseAdmin
             .from('Recommendations')
             .delete()
             .or(`and(sourceId.eq.${careerID},sourceType.eq.career),and(targetId.eq.${careerID},targetType.eq.career)`);
        
        if (recError) {

             console.warn('Warning: Failed to delete related recommendations:', recError);
             // Proceeding because this might not be a hard constraint for everyone, but good to clean up
        }

        // 3. Delete the Career
        const { error } = await supabaseAdmin
            .from('Careers')
            .delete()
            .eq('career_id', careerID);

        if (error) {

            console.error('Error deleting career:', error);
            return res.status(500).json({ message: 'Failed to delete career.', details: error });
        }

        return res.status(200).json({ message: 'Career deleted successfully.' });
    } catch (error) {

        console.error('Internal Server Error in deleteCareer:', error);
        return res.status(500).json({ message: 'Internal Server Error.' });
    }
}
