import { supabase } from '../config.js';
export const getUserNameFromId = async (userId) => {
  const { data: userData, error } = await supabase
    .from("Users")
    .select("username")
    .eq("userId", userId)
    .single();
  if (error) {
    throw new Error(`Error fetching user data: ${error.message}`);
  }
  return userData ? `${userData.username}` : null;
}