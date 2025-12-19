import Api from "../index";

//user login
export const userLogin = async (email: string, password: string) => {
  const response = await Api.post("/login", {email, password});
  return response.data;
}

//user sign up account
export const userSignup = async (
  username: string,
  email: string,
  password: string,
  role: string
) =>{
  const response = await Api.post("/signup", {username, email, password, role});
  return response.data;
}

//check email in forgot pasword page
export const checkEmail = async (email: string) => {
  const res = await Api.post("/forgot-password", { email });
  return res.data;
};

export const resetPassword = async (email:string, newPassword:string) => {
  const res = await Api.post("/reset-password", {email, newPassword,});
  return res.data;
};
