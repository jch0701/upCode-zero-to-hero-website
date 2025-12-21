import { supabase } from "../../config.js";

// 1. Get Single Career Data
export const getCareerDetail = async(req, res) => {
    if (req.method !== 'GET') {
        return res.status(405).end(`Method ${req.method} Not Allowed. Use GET only.`);
    }

    const { careerID } = req.params;
    if (!careerID) {
        return res.status(400).json({ message: 'Missing career ID query parameter.' });
    }

    try {
        const { data: career, error: careerError } = await supabase
            .from('Careers')
            .select('*')
            .eq('id', careerID)

        if (careerError) {
            console.error('Users Fetch Error:', careerError);
            return res.status(500).json({ message: 'Failed to fetch career.' });
        }
        return res.status(200).json(career[0]);
    }
    catch (error) {
        console.error('Internal Server Error in GET Controller:', error);
        return res.status(500).json({ message: 'Internal Server Error.' });
    }
}

// 2. Get All Career Data
export const getAllCareerDetail = async(req, res) => {
    if (req.method !== 'GET') {
        return res.status(405).end(`Method ${req.method} Not Allowed. Use GET only.`);
    }

    try {
        const { data: career, error: careerError } = await supabase
            .from('Careers')
            .select('*')

        if (careerError) {
            console.error('Users Fetch Error:', careerError);
            return res.status(500).json({ message: 'Failed to fetch career.' });
        }
        return res.status(200).json(career);
    }
    catch (error) {
        console.error('Internal Server Error in GET Controller:', error);
        return res.status(500).json({ message: 'Internal Server Error.' });
    }
}