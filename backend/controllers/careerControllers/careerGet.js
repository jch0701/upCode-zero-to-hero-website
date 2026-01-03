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
            .select(`
                *,
                applications:Applications(*)
            `)
            .eq('id', careerID)
            .maybeSingle(); // Use maybeSingle to get one object or null

        if (careerError) {
            console.error('Users Fetch Error:', careerError);
            return res.status(500).json({ message: 'Failed to fetch career.' });
        }

        if (!career) {
             return res.status(404).json({ message: 'Career not found.' });
        }

        // Manually fetch user profiles for applications
        if (career.applications && career.applications.length > 0) {
            const userIds = career.applications.map(app => app.user_id);
            const { data: users, error: userError } = await supabase
                .from('userProfiles')
                .select('user_id, username')
                .in('user_id', userIds);

            if (!userError && users) {
                // Map users to a dictionary for fast lookup
                const userMap = {};
                users.forEach(u => userMap[u.user_id] = u);

                // Attach user info to applications
                career.applications = career.applications.map(app => ({
                    ...app,
                    user: userMap[app.user_id] || null
                }));
            }
        }

        return res.status(200).json(career);
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
            .select(`
                *,
                applications:Applications(*)
            `)

        if (careerError) {
            console.error('Users Fetch Error:', careerError);
            return res.status(500).json({ message: 'Failed to fetch career.' });
        }

        // Manually fetch user profiles for applications across ALL careers
        let allUserIds = [];
        career.forEach(c => {
            if (c.applications && c.applications.length > 0) {
                c.applications.forEach(app => allUserIds.push(app.user_id));
            }
        });

        if (allUserIds.length > 0) {
            // Deduplicate
            allUserIds = [...new Set(allUserIds)];
            
            const { data: users, error: userError } = await supabase
                .from('userProfiles')
                .select('user_id, username')
                .in('user_id', allUserIds);

            if (!userError && users) {
                const userMap = {};
                users.forEach(u => userMap[u.user_id] = u);

                // Attach to all
                career.forEach(c => {
                    if (c.applications) {
                        c.applications = c.applications.map(app => ({
                            ...app,
                            user: userMap[app.user_id] || null
                        }));
                    }
                });
            }
        }

        return res.status(200).json(career);
    }
    catch (error) {
        console.error('Internal Server Error in GET Controller:', error);
        return res.status(500).json({ message: 'Internal Server Error.' });
    }
}