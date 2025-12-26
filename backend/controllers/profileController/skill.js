import { supabase } from "../../config.js";

// Get all default skills 
export const getAllSkills = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("skills")
      .select("skill_id, skill")
      .order("skill");

    if (error) throw error;

    if (!data || data.length === 0) {
      return res.json([]); // Return empty array safely
    }

    // Extract plain string array
    const skillsList = data.map(row => ({
      id: row.skill_id,
      name: row.skill,
    }));

    return res.json(skillsList);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const getMySkills = async (req, res) => {
  const userId = req.user.id;

  // Get skill IDs from profile
  const { data: profile, error: profileError } = await supabase
    .from("userProfiles")
    .select("skills")
    .eq("user_id", userId)
    .maybeSingle();

  if (profileError) {
    return res.status(500).json({ message: profileError.message });
  }

  if (!profile || !Array.isArray(profile.skills) || profile.skills.length === 0) {
    return res.json([]);
  }

  // Fetch full skill objects
  const { data: skills, error: skillsError } = await supabase
    .from("skills")
    .select("skill_id, skill")
    .in("skill_id", profile.skills);

  if (skillsError) {
    return res.status(500).json({ message: skillsError.message });
  }

  // Normalize response
  const result = skills.map(s => ({
    id: s.skill_id,
    name: s.skill,
  }));

  return res.json(result);
};

export const getUserSkills = async (req, res) => {
  try {
    const { userId } = req.params; // Get ID from URL parameters

    // Get skill IDs from profile
    const { data: profile, error: profileError } = await supabase
      .from("userProfiles")
      .select("skills")
      .eq("user_id", userId)
      .maybeSingle();

    if (profileError) throw profileError;

    // Handle no profile or no skills
    if (!profile || !Array.isArray(profile.skills) || profile.skills.length === 0) {
      return res.json([]);
    }

    // Fetch full skill objects
    const { data: skills, error: skillsError } = await supabase
      .from("skills")
      .select("skill_id, skill")
      .in("skill_id", profile.skills);

    if (skillsError) throw skillsError;

    // Normalize response
    const result = skills.map(s => ({
      id: s.skill_id,
      name: s.skill,
    }));

    return res.json(result);

  } catch (err) {
    console.error("Get Skills Error:", err);
    return res.status(500).json({ message: err.message });
  }
};

// Update user skills 
export const updateMySkills = async (req, res) => {
  const userId = req.user.id;
  const { skills } = req.body;

  if (!Array.isArray(skills)) {
    return res.status(400).json({ message: "Invalid skills data" });
  }

  const { data, error } = await supabase
    .from("userProfiles")
    .update({ skills })
    .eq("user_id", userId)
    .select("skills")
    .single();

  if (error) {
    return res.status(400).json({ message: error.message });
  }

  return res.json({
    message: "Skills updated successfully",
    skills: data.skills,
  });
};