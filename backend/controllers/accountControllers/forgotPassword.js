import { supabase, supabaseAuth } from "../../config.js";

export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  const { data, error } = await supabase
    .from("userProfiles")
    .select("id")
    .eq("email", email)
    .single();

  if (error || !data) {
    return res.status(404).json({ message: "Email not found" });
  }

  return res.status(200).json({ message: "Email exists" });
};

export const resetPassword = async (req, res) => {
    console.log("RESET BODY:", req.body);

  const {email, newPassword} = req.body;

  if (!email || !newPassword) {
    return res.status(400).json({ message: "Missing data" });
  }

  const {data, error} = await supabase
    .from("userProfiles")
    .select("id")
    .eq("email",email)
    .single();
    console.log("FOUND USER ID:", data.id);
    if(error || !data){
      return res.status(404).json({ message: "User not found" });
    }
    const {error: updateError}= await supabase.auth.admin.updateUserById(data.id, {password: newPassword});

    if (updateError) {
      return res.status(400).json({ message: updateError.message });
    }

    return res.json({ message: "Password updated" });
}
