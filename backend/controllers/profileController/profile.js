import { supabase } from "../../config.js";

export const getMyProfile = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const { data, error } = await supabase
    .from("userProfiles")
    .select("id, username, email, role, avatar, bio, skills")
    .eq("id", req.user.id)
    .maybeSingle();

  if (!data) {
    const { data: newProfile, error: insertError } = await supabase
      .from("userProfiles")
      .insert({
        id: req.user.id,
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
  }

  // 3️⃣ Profile exists
  return res.json(data);
};

export const updateMyProfile = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const { username, bio, avatar } = req.body;

  const { error } = await supabase
    .from("userProfiles")
    .update({ username, bio, avatar })
    .eq("id", req.user.id);

  if (error) {
    return res.status(500).json({ message: error.message });
  }

  res.json({ message: "Profile updated" });
};

