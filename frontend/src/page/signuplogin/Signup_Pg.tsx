import React from "react";
import type { FC } from "react";
import { Link, useNavigate } from "react-router-dom";

import { 
  Validate_Username, 
  Validate_Email, 
  Validate_Password, 
  Validate_Role 
} from "@/component/Signup_Login/Validate_Signup_Login";

import "@/component/Signup_Login/Login_Signup_Pg.css";
import TextInput from "@/component/Signup_Login/TextInput";
import PasswordInput from "@/component/Signup_Login/PasswordInput";

import user_icon from "@/assets/signuplogin/user.png";
import email_icon from "@/assets/signuplogin/email.png";

const Signup_Pg: FC = () => {
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [role, setRole] = React.useState("");

  const [errors, setErrors] = React.useState<string[]>([]);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const usernameErrors = Validate_Username(username);
    const emailErrors = Validate_Email(email);
    const passwordErrors = Validate_Password(password);
    const roleErrors = Validate_Role(role);
    const errormsg = [
      ...usernameErrors,
      ...emailErrors,
      ...passwordErrors,
      ...roleErrors,
    ];
    setErrors(errormsg);

    if (errormsg.length > 0) {
      return;
    } else {
      alert(
          "Account created successfully!\n" +
          `Username: ${username}\n` +
          `Email: ${email}\n` +
          `Role: ${role}\n`
      );
      navigate("/login");
    }
  };

  return (
      
      <div className="container-wrapper">
        {/*tab for login and signup*/}
        <div className="tab-wrapper">
          <button onClick={() => navigate("/login")} className="tab-button">
            Login
          </button>
          <button className="tab-button-active">Signup</button>
        </div>

        {/*image container for mentor*/}
        <div className="image-container" role="img" aria-label="mentor"></div>

        {/*signup form container*/}
        <div className="signup-login-container">
          <form onSubmit={handleSubmit}>
          {/*username field */}
          <TextInput
            label="Username"
            icon={user_icon}
            value={username}
            onChange={(v) => setUsername(v)}
            placeholder="Enter your username"
          />
          <p className="error-box" >
            {errors.find((e) => e.startsWith("- Username"))}
          </p>

          {/*email field */}
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

          {/*password field */}
          <PasswordInput
            label="Password"
            value={password}
            onChange={setPassword}
            placeholder="Enter your password"
          />
          <p className="error-box" >
            {errors.find((e) => e.startsWith("- Password"))}
          </p>

          {/*role selection*/}
          <div className="checkbox-container">
            <label>
              <input
                type="radio"
                name="role"
                value="student"
                checked={role === "student"}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setRole(e.target.value)
                }
              />
              Learner
            </label>
            <label>
              <input
                type="radio"
                name="role"
                value="mentor"
                checked={role === "mentor"}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setRole(e.target.value)
                }
              />
              Mentor
            </label>
            <label>
              <input
                type="radio"
                name="role"
                value="company"
                checked={role === "company"}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setRole(e.target.value)
                }
              />
              Company
            </label>           
          </div>
          <p className="error-box">
            {errors.find((e) => e.toLowerCase().includes("role")) || ""}
          </p>

          {/*create account button*/}
          <button className="button-container" type="submit">
            Create Account
          </button>
          <div className="login-text">
            Already have an account?
            <Link to="/login">
              <span className="signup-login-link">Login</span>
            </Link>
          </div>
          </form>
        </div>
      </div>
  );
};

export default Signup_Pg;
