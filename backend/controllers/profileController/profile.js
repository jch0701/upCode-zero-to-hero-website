import { supabase } from "../../config.js";

export const getMyProfile = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const { data, error } = await supabase
    .from("userProfiles")
    .select("user_id, username, email, role, avatar, bio, skills")
    .eq("user_id", req.user.id)
    .maybeSingle();

  // if (error) {
  //   return res.status(500).json({ message: error.message });
  // }

  // return res.json(data);

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
          role: "user",
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

// export const signUp = async (req, res) => {
//   const data = req.body;
//   const { data: isDuplicate } = await supabase
//     .from("userProfiles")
//     .select(1)
//     .eq("email", data.email)
//     .single();
  
//   if (isDuplicate) {
//     return res.status(400).json({ message: "Email already in use" });
//   }

//   const { data: newProfile, error: insertError } = await supabase
//     .from("userProfiles")
//     .insert({
//       email: req.body.email,
//       username: req.body.email.split("@")[0],
//       role: "user",
//       avatar: "/default-avatar.png",
//       bio: "",
//       skills: [],
//     });

//   if (insertError) {
//     return res.status(500).json({ message: insertError.message });
//   }

//   return res.json(newProfile);
// }


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
    
    if(profileError){
      console.error('Profiles Fetch Error:', profileError);
      return res.status(500).json({ message: 'Failed to fetch profiles.' });
    }

    return res.status(200).json(profiles[0]);
  }
  catch {
    console.error('Internal Server Error in GET Controller:', error);
    return res.status(500).json({ message: 'Internal Server Error.' });
  }
}