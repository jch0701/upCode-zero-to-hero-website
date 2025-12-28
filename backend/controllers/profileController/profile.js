import { supabase } from "../../config.js";
// get own profile
export const getMyProfile = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const { data, error } = await supabase
    .from("userProfiles")
    .select("*")
    .eq("user_id", req.user.id)
    .maybeSingle();

  if(data){
    return res.json(data);
  }
  if (!data) {
      const { data: newProfile, error: insertError } = await supabase
        .from("userProfiles")
        .insert({
          user_id: req.user.id,
          email: req.user.email,
          username: req.user.email.split("@")[0],
          role: "learner",
          avatar: "/default-avatar.png",
          bio: "",
          skills: [],
        })
        .select()
        .single();
  
      if (insertError) {
        return res.status(500).json({ message: insertError.message });
      }
  
      return res.json(newProfile);
};
}
// Update own profile if edit 
export const updateMyProfile = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const { username, bio, avatar } = req.body;

  const { error } = await supabase
    .from("userProfiles")
    .update({ username, bio, avatar })
    .eq("user_id", req.user.id);

  if (error) {
    return res.status(500).json({ message: error.message });
  }

  res.json({ message: "Profile updated" });
};

// Get user detail
export const getSingleProfile = async (req, res) => {
  if (req.method !== 'GET') {
    return res.status(405).end(`Method ${req.method} Not Allowed. Use GET only.`);
  }

  const { userID } = req.params;
  if (!userID) {
    return res.status(400).json({ message: 'Missing user ID query parameter.' });
  }

  try {
    const { data: profiles, error: profileError } = await supabase
      .from("userProfiles")
      .select("*")
      .eq('user_id', userID)
      .maybeSingle()
    
    if(profileError){
      console.error('Profiles Fetch Error:', profileError);
      return res.status(500).json({ message: 'Failed to fetch profiles.' });
    }

    return res.status(200).json(profiles);
  }
  catch (error) {
    console.error('Internal Server Error in GET Controller:', error);
    return res.status(500).json({ message: 'Internal Server Error.' });
  }
}

export const submitRoleApplication = async (req, res) => {
  const { userId, roleRequested, extraData } = req.body; // or req.body depending on your parser

  try {
    // Insert into applications table
    const { error: appError } = await supabase
      .from("roleApplications")
      .insert([
        { 
          user_id: userId, 
          role_Request: roleRequested, 
          application_data: extraData,
          status: 'pending'
        }
      ]);
    
    if (appError) throw appError;

    // Set user profile status 
    const { error: profileError } = await supabase
      .from("userProfiles")
      .update({ verification_status: 'pending' })
      .eq("user_id", userId);

    if (profileError) throw profileError;
    await supabase.from("userProfiles").update({ verification_status: 'pending' }).eq("user_id", userId);
    return res.status(200).json({ message: "Application submitted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};