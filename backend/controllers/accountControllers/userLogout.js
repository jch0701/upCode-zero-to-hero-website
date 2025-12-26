import { supabaseAuth } from "../../config.js";

export const userLogout = async (req, res) => {
  try {
    const token = req.headers.authorization?.replace("Bearer ", "");

    // Logout should always succeed
    if (!token) {
      return res.status(200).json({ message: "Already logged out" });
    }

    const { data, error } =
      await supabaseAuth.auth.getUser(token);

    if (!data?.user) {
      return res.status(200).json({ message: "Already logged out" });
    }

    await supabaseAuth.auth.admin.signOut(data.user.id);

    return res.status(200).json({ message: "Logout successful" });
  } catch (err) {
    console.error("Logout error:", err);
    return res.status(500).json({ message: "Logout failed" });
  }
};
