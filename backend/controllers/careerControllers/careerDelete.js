import { supabase } from "../../config.js";

export const deleteCareer = async(req, res) => {
    if (req.method !== 'DELETE') {
        return res.status(405).end(`Method ${req.method} Not Allowed. Use DELETE only.`);
    }

    const { careerID } = req.params;

    if (!careerID) {
        return res.status(400).json({ message: 'Missing career ID.' });
    }

    try {
        const { error } = await supabase
            .from('Careers')
            .delete()
            .eq('id', careerID);

        if (error) {
            console.error('Error deleting career:', error);
            return res.status(500).json({ message: 'Failed to delete career.' });
        }

        return res.status(200).json({ message: 'Career deleted successfully.' });
    } catch (error) {
        console.error('Internal Server Error in deleteCareer:', error);
        return res.status(500).json({ message: 'Internal Server Error.' });
    }
}
