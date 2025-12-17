import { supabase } from "../../config.js";

export const getUserDetail = async(req, res) => {
    if (req.method !== 'GET') {
        return res.status(405).end(`Method ${req.method} Not Allowed. Use GET only.`);
    }

    const { userID } = req.params;
    if (!userID) {
        return res.status(400).json({ message: 'Missing user ID query parameter.' });
    }

    try {
        const { data: users, error: userError } = await supabase
            .from('Users')
            .select('*')
            .eq('userId', userID)

        if (userError) {
            console.error('Users Fetch Error:', userError);
            return res.status(500).json({ message: 'Failed to fetch user.' });
        }
        return res.status(200).json(users);
    }
    catch (error) {
        console.error('Internal Server Error in GET Controller:', error);
        return res.status(500).json({ message: 'Internal Server Error.' });
    }
}