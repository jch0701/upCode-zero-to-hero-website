import React from "react";
import type { FC } from "react";
import { login } from "@/store/profileSlice";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import type { UserListType } from "@/store/userListSlice";
import "@/component/Signup_Login/Login_Signup_Pg.css";
import {
  Validate_Email,
  Validate_Password,
} from "@/component/Signup_Login/Validate_Signup_Login";
import TextInput from "@/component/Signup_Login/TextInput";
import PasswordInput from "@/component/Signup_Login/PasswordInput";
import { syncUserToUsers } from "@/component/friend/userSync";

import email_icon from "@/assets/signuplogin/email.png";
import hero_img from "@/assets/signuplogin/Hero.png";

const Login_Pg: FC = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [errors, setErrors] = React.useState<string[]>([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const fromPath = location.state?.from || "/";

  const userData = useSelector(
    (state: any) => state.userList.userList
  ) as UserListType[];
  const DEFAULT_AVATAR = "/src/assets/profile/bear_avatar.png";

  const handleLogin = (email: string, password: string) => {
    const userDetail = userData.find((user) => user.email === email);

    if (!userDetail) {
      alert("User not found");
      return false;
    }

    if (userDetail.password !== password) {
      alert("Wrong password");
      return false;
    }
    const key = `userProfile_${userDetail.userId}`;
    // 1. Load existing saved profile if available
    const savedProfile = localStorage.getItem(key);
    let profileToUse;

    if (savedProfile) {
      profileToUse = JSON.parse(savedProfile);
      if (!profileToUse.avatar) {
        profileToUse.avatar = DEFAULT_AVATAR;
      }
    } else {
      profileToUse = {
        userId: userDetail.userId,
        username: userDetail.username,
        email: userDetail.email,
        role: userDetail.role ?? "",
        avatar: DEFAULT_AVATAR,
        bio: "",
        skills: [],
      };
      localStorage.setItem(key, JSON.stringify(profileToUse));
    }

    localStorage.setItem("activeUser", JSON.stringify(profileToUse));
    localStorage.setItem("userID", profileToUse.userId.toString());
    syncUserToUsers({
      userId: profileToUse.userId,
      username: profileToUse.username,
      email: profileToUse.email,
    });
    dispatch(login(profileToUse));
    if (userDetail.role === "Admin") {
      return "admin";
    } else {
      return "user";
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    // validate email & password separately
    e.preventDefault();

    // Validation
    const emailErrors = Validate_Email(email);
    const passwordErrors = Validate_Password(password);
    const errormsg = [...emailErrors, ...passwordErrors];

    setErrors(errormsg);

    if (errormsg.length > 0) return;

    // Login logic
    const login_acc = handleLogin(email, password);
    if (login_acc === "admin") {
      alert(`Admin Login Successful.\nEmail: ${email}`);
      navigate("/admin", {replace: true});
    }else if(login_acc === "user"){
      alert(` Login Successful.\nEmail: ${email}`);
      navigate(fromPath, { replace: true });
    } else {
      console.error("Unexpected login role:", login_acc);
    }
  };

  return (
    <div className="page-root">
      <div className="container-wrapper">
        <div className="tab-wrapper">
          <button className="tab-button-active">Login</button>
          <button onClick={() => navigate("/signup")} className="tab-button">
            Signup
          </button>
        </div>

        <div className="signup-login-container">
          <form id={"login-form"} onSubmit={handleSubmit}>
            {/*email input field*/}
            <TextInput
              label="Email"
              icon={email_icon}
              value={email}
              onChange={(v) => setEmail(v)}
              placeholder="Enter your email"
            />
            <p className="error-box">
              {errors.find((e) => e.startsWith("- Email"))}
            </p>

            {/*password input field*/}
            <PasswordInput
              label="Password"
              value={password}
              onChange={setPassword}
              placeholder="Enter your password"
            />
            <p className="error-box">
              {errors.find((e) => e.startsWith("- Password"))}
            </p>

            {/*forgot password link*/}
            <div className="forgotpass-text">
              <Link to="/forgot-password" className="forgot-link">
                Forgot Password?
              </Link>
            </div>

            <button className="button-container" type="submit">
              Sign In
            </button>

            <div className="login-text">
              Don't have an account?{" "}
              <Link to="/signup" className="signup-login-link">
                Register
              </Link>
            </div>
          </form>
        </div>
        <div className="signup-login-container">
          <p className="header-text"> Welcome Back, Hero!</p>
          <p className="subheader-text">Continue Your Journey Right Now!</p>
          <img src={hero_img} alt="hero image" className="hero-image" />
        </div>
      </div>
    </div>
  );
};
export default Login_Pg;
