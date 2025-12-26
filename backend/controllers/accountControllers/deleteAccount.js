import { supabase } from "../../config.js";

export const deleteUser = async (req, res) => {
  try {
    // Got from requireAuth middleware
    const userId = req.user.id; 
    // Delete the user from the auth.users
    const { error: authError } = await supabase.auth.admin.deleteUser(userId);
    if (authError) {
      console.error("Auth Delete Error:", authError);
      return res.status(500).json({ message: "Failed to delete login credentials" });
    }
    // Ensure clean-up and safe
    const { error } = await supabase
      .from("userProfiles")
      .delete()
      .eq("user_id", userId);

    if (error) {
      throw error;
    }

    return res.status(200).json({ message: "Account deleted successfully" });
  } catch (error) {
    console.error("Delete Error:", error);
    return res.status(500).json({ message: "Failed to delete account" });
  }
};