import { supabase } from "../../config.js";

export const userSignup = async(req, res) => {
  if (req.method !== "POST"){
    return res.status(405).end(`Method ${req.method} Not Allowed. Use POST only`);
  }

  const {username, email, password, role} = req.body;

  if(!username ||!email ||!password ||!role){
      return res.status(400).json({message: "All fields are required!"});
  }
  try{
    //auth user
    const {data, error} = await supabase.auth.signUp({
      email,
      password
    });
    if(error){
      return res.status(400).json({ message: error.message });
    }
    
    const userId = data.user.id;
    //profile row
    const {error: profileError} = await supabase
      .from("userProfiles")
      .insert({
        id: userId,
        username,
        email,
        role,
        avatar: "https://ozxrxlaufstrwtsgzixa.supabase.co/storage/v1/object/sign/avatar/profile/bear_avatar.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV84ZGJmMWZiNy1hNzU3LTQ2M2YtYjI3Ni1jYWY4NzM4Yjg5NDciLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJhdmF0YXIvcHJvZmlsZS9iZWFyX2F2YXRhci5wbmciLCJpYXQiOjE3NjYxNDAyNTAsImV4cCI6MTc2ODczMjI1MH0.zvqtq8Qqn6PrRbl1keG0SSmETcFGwnlYcV-u_d9Hj6I",
        bio: "",
        skills:[],
      });
      if (profileError) {
        return res.status(500).json({ message: "Failed to create profile" });
      }

      return res.status(201).json({ message: "Signup successful" });
  } catch (err){
      return res.status(500).json({ message: "Server error" });
  }
};