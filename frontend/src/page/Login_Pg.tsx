import React from "react";
import type { FC } from "react";
import { Link, useNavigate } from "react-router-dom";

import "@/component/Signup_Login/Login_Signup_Pg.css";
import { Validate_Email, Validate_Password } from "@/component/Signup_Login/Validate_Signup_Login";
import TextInput from "@/component/Signup_Login/TextInput";
import PasswordInput from "@/component/Signup_Login/PasswordInput";

import email_icon from "../assets/signuplogin/email.png";
import hero_img from "../assets/signuplogin/Hero.png";

const Login_Pg: FC = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [errors, setErrors] = React.useState<string[]>([]);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
  // validate email & password separately
    const emailErrors = Validate_Email(email);
    const passwordErrors = Validate_Password(password);
    // combine
    const errormsg = [...emailErrors, ...passwordErrors];
    
    setErrors(errormsg);

    if (errormsg.length > 0) {
      return;
    } else {
      alert(
        "Login Successfully.\n" + `Email: ${email}\n`
      );
      navigate("/");
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
          <form onSubmit={handleSubmit}>
            {/*email input field*/}
            <TextInput
            label="Email"
            icon={email_icon}
            value={email}
            onChange={(v) => setEmail(v)}
            placeholder="Enter your email"
          />
          <p className="error-box" >
            {errors.find((e) => e.startsWith("- Email"))}
          </p>

          {/*password input field*/}
            <PasswordInput
            label="Password"
            value={password}
            onChange={setPassword}
            placeholder="Enter your password"
          />
          <p className="error-box" >
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
