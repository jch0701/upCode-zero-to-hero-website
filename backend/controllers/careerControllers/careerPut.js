import { supabase } from "../../config.js";

export const updateCareer = async(req, res) => {
    if (req.method !== 'PUT') {
        return res.status(405).end(`Method ${req.method} Not Allowed. Use PUT only.`);
    }

    const { careerID } = req.params;
    const updates = req.body;

    if (!careerID) {
        return res.status(400).json({ message: 'Missing career ID.' });
    }

    try {
        const { data, error } = await supabase
            .from('Careers')
            .update(updates)
            .eq('id', careerID)
            .select();

        if (error) {
            console.error('Error updating career:', error);
            return res.status(500).json({ message: 'Failed to update career.' });
        }

        if (data.length === 0) {
            return res.status(404).json({ message: 'Career not found.' });
        }

        return res.status(200).json(data[0]);
    } catch (error) {
        console.error('Internal Server Error in updateCareer:', error);
        return res.status(500).json({ message: 'Internal Server Error.' });
    }
}
