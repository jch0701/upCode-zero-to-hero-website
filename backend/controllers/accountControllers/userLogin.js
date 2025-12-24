import { supabase } from "../../config.js";

//login
export const userLogin = async (req, res) =>{
  if(req.method !== "POST"){
    return res.status(405).end(`Method ${req.method} Not Allowed. Use POST only`);
  }
  const {email, password} = req.body;

  if(!email || !password){
    return res.status(400).json({ message: "Email and password required." });
  }

  try{
    //authentication for login
    const { data, error:authError} = await supabase.auth.signInWithPassword({email, password,});

    if(authError) {
      return res
      .status(401)
      .json({message:authError.message});
    } 

    const user = data.user;
    //get profile from DB
    let { data: profile, error:profileError } = await supabase
    .from("userProfiles")
    .select("*")
    .eq("user_id", user.id)
    .maybeSingle();

  // 2 If profile does NOT exist, create it
  if (!profile) {
    const { data: newProfile, error: insertError } = await supabase
      .from("userProfiles")
      .insert({
        user_id: user.id,
        email: user.email,
        username: user.email.split("@")[0],
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

    profile = newProfile;
  }

    //send user and token 
    return res.status(200).json({
      message: "Login Successful", 
      user: profile, 
      access_token: data.session.access_token
    });
  }catch (error){
    return res.status(500).json({ message: "Internal Server Error." });
  }
};

