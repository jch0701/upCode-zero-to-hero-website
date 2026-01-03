import { supabase } from "../../config.js";

export const createCareer = async(req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).end(`Method ${req.method} Not Allowed. Use POST only.`);
    }

    const careerData = req.body;

    // Basic validation
    if (!careerData.title || !careerData.category) {
        return res.status(400).json({ message: 'Missing required fields: title, category.' });
    }

    // Sanitize data
    // delete careerData.id; // Allow manual ID because DB sequence is broken (id=2 exists)
    if (!careerData.prerequisites) careerData.prerequisites = [];

    // Ensure we are not sending undefined or null for required fields if they are missing
    
    try {
        const { data, error } = await supabase
            .from('Careers')
            .insert([careerData])
            .select();

        if (error) {
            console.error('SERVER ERROR - INSERT FAILED');
            // Write to file for debugging
            import('fs').then(fs => {
                const log = `\n[${new Date().toISOString()}] ERROR:\nPayload: ${JSON.stringify(careerData)}\nError: ${JSON.stringify(error)}\n`;
                fs.appendFile('debug_error.log', log, () => {});
            });
            
            return res.status(500).json({ message: 'Failed to create career.', details: error });
        }

        return res.status(201).json(data[0]);
    } catch (error) {
        import('fs').then(fs => {
             fs.appendFile('debug_error.log', `\n[CRITICAL]: ${error}\n`, () => {});
        });
        console.error('Internal Server Error in createCareer:', error);
        return res.status(500).json({ message: 'Internal Server Error.' });
    }
}
