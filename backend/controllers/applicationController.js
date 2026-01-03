
import { supabase } from "../config.js";

// 1. Submit Application
export const submitApplication = async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).end(`Method ${req.method} Not Allowed. Use POST only.`);
    }

    const { careerId, userId, resumeLink, portfolioLink } = req.body;

    if (!careerId || !userId) {
        return res.status(400).json({ message: 'Missing required fields: careerId, userId.' });
    }

    try {
        // Check if already applied
        const { data: existing } = await supabase
            .from('Applications')
            .select('*')
            .eq('career_id', careerId)
            .eq('user_id', userId)
            .maybeSingle();

        if (existing) {
            return res.status(409).json({ message: 'You have already applied for this position.' });
        }

        const { data, error } = await supabase
            .from('Applications')
            .insert([{
                career_id: careerId,
                user_id: userId,
                resume_link: resumeLink || "",
                portfolio_link: portfolioLink || "",
                status: "Pending",
                applied_date: new Date().toISOString()
            }])
            .select();

        if (error) {
            console.error('SERVER ERROR - APPLICATION FAILED', error);
            return res.status(500).json({ message: 'Failed to submit application.', details: error });
        }

        return res.status(201).json(data[0]);
    } catch (error) {
        console.error('Internal Server Error in submitApplication:', error);
        return res.status(500).json({ message: 'Internal Server Error.' });
    }
}

// 2. Get User's Applications (For "Your Applications" Sidebar)
export const getUserApplications = async (req, res) => {
    const { userId } = req.params;
    
    try {
        const { data, error } = await supabase
            .from('Applications')
            .select(`
                *,
                career:Careers(*)
            `)
            .eq('user_id', userId);

        if (error) throw error;
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({ message: 'Failed to fetch user applications.' });
    }
}

// 3. Get Applications for a Career (For Company View)
export const getCareerApplications = async (req, res) => {
    const { careerId } = req.params;

    try {
        const { data, error } = await supabase
            .from('Applications')
            .select(`
                *,
                user:userProfiles(*)
            `)
            .eq('career_id', careerId);

        if (error) throw error;
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({ message: 'Failed to fetch career applications.' });
    }
}

// 4. Update Application Status (Accept/Decline)
export const updateApplicationStatus = async (req, res) => {
    const { applicationId } = req.params;
    const { status } = req.body;

    if (!['Pending', 'Accepted', 'Rejected'].includes(status)) {
        return res.status(400).json({ message: 'Invalid status update.' });
    }

    try {
        const { data, error } = await supabase
            .from('Applications')
            .update({ status })
            .eq('id', applicationId)
            .select();

        if (error) throw error;
        return res.status(200).json(data[0]);
    } catch (error) {
        console.error("Update Application Error:", error);
        return res.status(500).json({ message: 'Failed to update application status.' });
    }
}

// 5. Delete Application (Rescind) - Only if Pending
export const deleteApplication = async (req, res) => {
    const { applicationId } = req.params;
    const userId = req.user.id; // From requireAuth middleware

    try {
        console.log(`ATTEMPTING DELETE: AppId=${applicationId}, UserId=${userId}`);

        // First check strict ownership and status
        const { data: app, error: fetchError } = await supabase
            .from('Applications')
            .select('*')
            .eq('id', applicationId)
            .single();

        if (fetchError || !app) {
            console.error("DELETE FETCH ERROR:", fetchError);
            return res.status(404).json({ message: 'Application not found.' });
        }

        if (app.user_id !== userId) {
            console.error("DELETE UNAUTHORIZED:", { requestUser: userId, appUser: app.user_id });
            return res.status(403).json({ message: 'Unauthorized.' });
        }

        if (app.status !== 'Pending') {
            return res.status(400).json({ message: 'Cannot rescind an application that has already been processed.' });
        }

        // Proceed to delete
        const { error: deleteError } = await supabase
            .from('Applications')
            .delete()
            .eq('id', applicationId);

        if (deleteError) {
             console.error("DELETE ERROR:", deleteError);
             throw deleteError;
        }

        console.log("DELETE SUCCESS");
        return res.status(200).json({ message: 'Application rescinded successfully.', applicationId });
    } catch (error) {
        console.error("Delete Application Error Exception:", error);
        return res.status(500).json({ message: 'Failed to rescind application.' });
    }
}

// 6. Update Application Details (Resume/Portfolio) - Only if Pending
export const updateApplicationDetails = async (req, res) => {
    const { applicationId } = req.params;
    const { resumeLink, portfolioLink } = req.body;
    const userId = req.user.id;

    try {
        // Check ownership and status
        const { data: app, error: fetchError } = await supabase
            .from('Applications')
            .select('*')
            .eq('id', applicationId)
            .single();

        if (fetchError || !app) return res.status(404).json({ message: 'Application not found.' });
        if (app.user_id !== userId) return res.status(403).json({ message: 'Unauthorized.' });
        if (app.status !== 'Pending') return res.status(400).json({ message: 'Cannot edit an application that has already been processed.' });

        const { data, error } = await supabase
            .from('Applications')
            .update({ 
                resume_link: resumeLink,
                portfolio_link: portfolioLink
            })
            .eq('id', applicationId)
            .select();

        if (error) throw error;
        return res.status(200).json(data[0]);

    } catch (error) {
        console.error("Update Details Error:", error);
        return res.status(500).json({ message: 'Failed to update application details.' });
    }
}
