import Api from "../index";

//user login
export const userLogin = async (email: string, password: string) => {
  const response = await Api.post("/login", {email, password});
  const data = response.data;

  //  Save active user + token locally
  if (data?.user && data?.access_token) {
    const activeUser = {
      userId: data.user.user_id,          
      token: data.access_token,           
      role: data.user.role || "learner",  
    };

    localStorage.setItem("activeUser", JSON.stringify(activeUser));
  }

  return data;
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

// reset password
export const resetPassword = async (email:string, newPassword:string) => {
  const res = await Api.post("/reset-password", {email, newPassword,});
  return res.data;
};

// user logout
export const userLogout = async () => {
  const token = localStorage.getItem("access_token");

  const res = await Api.post(
    "/logout",
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};

// delete account
export const deleteUserAccount = async () => {
  const response = await Api.delete("/delete-account");
  return response.data;
};