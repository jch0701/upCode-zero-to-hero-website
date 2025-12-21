import { supabaseAuth } from "../../config.js";

export const userLogout = async (req, res) => {
  const token = req.headers.authorization?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  // Invalidate Supabase session
  const { error } = await supabaseAuth.auth.signOut();

  if (error) {
    console.error("Supabase logout error:", error.message);
    return res.status(500).json({ message: "Logout failed" });
  }

  return res.status(200).json({ message: "Logout successful" });
};