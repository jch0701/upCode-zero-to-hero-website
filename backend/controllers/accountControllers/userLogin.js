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
    const { data, error} = await supabase.auth.signInWithPassword({email, password,});

    if(error) {
      return res
      .status(401)
      .json({message:error.message});
    } 

    const user = data.user;
    //get profile from DB
    const {data: profile, error:profileError}= await supabase
      .from("userProfiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if(profileError){
      return res.status(404).json({message: "Profile not found!"});
    }

    //send user and token 
    return res.status(200).json({
      message: "Login Successful", 
      user: profile, accessToken: 
      data.session.access_token
    });
  }catch (error){
    return res.status(500).json({ message: "Internal Server Error." });
  }
};