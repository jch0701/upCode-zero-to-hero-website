import { supabase } from '../config.js';
export const getUserNameFromId = async (user_id) => {
  const { data: userData, error } = await supabase
    .from("userProfiles")
    .select("username")
    .eq("user_id", user_id)
    .single();
  if (error) {
    throw new Error(`Error fetching user data: ${error.message}`);
  }
  return userData ? `${userData.username}` : null;
}