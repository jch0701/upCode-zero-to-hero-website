import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Validate_Email } from "@/component/Signup_Login/Validate_Signup_Login";
import TextInput from "@/component/Signup_Login/TextInput";
import email_icon from "@/assets/signuplogin/email.png";
import "@/component/Signup_Login/Fotgot_Reset.css";
import { checkEmail } from "@/api/account/accountAPI";

const ForgotPassword_Pg = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();

    const emailErrors = Validate_Email(email);

    if (emailErrors.length > 0) {
      setError(emailErrors[0]);   // show first error inline
      return;
    }

    // Clear error
    setError("");

    // Proceed to next step
    try{
      await checkEmail(email);
      navigate("/reset-password", {state: {email}});
    }catch (err: any){
      setError(err.response?.data?.message || "Email not found");
    }
  };

  return (
    <div className="page-root">

      {/* Container */}
      <div className="forgot-container">

        {/* Title */}
        <div className="forgot-title-box">
          Forgot Password
        </div>

        {/* Card */}
        <div className="forgot-card">

          <form id={"forgot-password-form"} onSubmit={handleSubmit}>

            {/* Input */}
            <div className="forgot-input-wrapper">
              <TextInput
                label="Email"
                icon={email_icon}
                value={email}
                onChange={(v) => setEmail(v)}
                placeholder="Enter your email"
              />
            </div>

            {/* Inline Error */}
            {error && (
              <p style = {{ color:"red"}} className="forgot-error" >
                {error}
              </p>
            )}

            {/* Button */}
            <button
              className="forgot-btn"
              type="submit"
              disabled={!email}
              style={{
                opacity: !email ? 0.5 : 1,
                cursor: !email ? "not-allowed" : "pointer",
              }}
            >
              Next
            </button>

          </form>
          
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword_Pg;
