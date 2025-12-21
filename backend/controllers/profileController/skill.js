import { supabase } from "../../config.js";

/* Get all default skills */
export const getAllSkills = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("skills")
      .select("skill")
      .order("skill");

    if (error) throw error;

    if (!data || data.length === 0) {
      console.warn("⚠️ No skills found in table");
      return res.json([]); // Return empty array safely
    }

    // ✅ Extract plain string array
    const skillsList = data.map((row) => row.skill);

    console.log("✅ Skills fetched from Supabase:", skillsList);
    return res.json(skillsList);
  } catch (err) {
    console.error("❌ getAllSkills error:", err.message);
    return res.status(500).json({ message: err.message });
  }
};


/* Get user skills */
export const getUserSkills = async (req, res) => {
  const { userId } = req.params;

  const { data, error } = await supabase
    .from("userProfiles")
    .select("skills")
    .eq("id", userId)
    .maybeSingle();

  if (error) {
    console.error("Supabase error:", error.message);
    return res.status(500).json({ message: error.message });
  }

  if (!data) {
    console.warn("User not found:", userId);
    return res.status(404).json({ message: "User not found" });
  }

  let skills = [];

  if (Array.isArray(data.skills)) {
    skills = data.skills;
  } else if (typeof data.skills === "string") {
    try {
      skills = JSON.parse(data.skills);
    } catch {
      skills = [];
    }
  }

  console.log("Final skills sent to frontend:", skills);
  return res.json(skills);
};


/* Update user skills */
export const updateUserSkills = async (req, res) => {
  const { userId, skills } = req.body;

  if (!userId || !Array.isArray(skills)) {
    return res.status(400).json({ message: "Invalid data" });
  }

  const { data, error } = await supabase
    .from("userProfiles")
    .update({ skills })
    .eq("id", userId)
    .select("skills")
    .single();

  if (error) {
    console.error("Failed to update user skills:", error.message);
    return res.status(400).json({ message: error.message });
  }

  console.log("Updated skills for user:", userId, data.skills);
  return res.json({ message: "Skills updated successfully", skills: data.skills });
};