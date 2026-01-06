import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Validate_Email } from "@/component/Signup_Login/Validate_Signup_Login";
import TextInput from "@/component/Signup_Login/TextInput";
import email_icon from "@/assets/signuplogin/email.png";
import "@/component/Signup_Login/Fotgot_Reset.css";
import { checkEmail } from "@/api/account/accountAPI";
import { FaEnvelope, FaLink } from "react-icons/fa";

const ForgotPassword_Pg = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  const [demoLinkVisible, setDemoLinkVisible] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    const emailErrors = Validate_Email(email);

    if (emailErrors.length > 0) {
      setError(emailErrors[0]);
      return;
    }
    setError("");
    setLoading(true);

    try{
      await checkEmail(email);
      
      // Instead of navigating immediately, simulate an email delay
      setTimeout(() => {
        setLoading(false);
        setDemoLinkVisible(true); // Show the fake email link
      }, 1500); 

    } catch (err: any){
      setLoading(false);
      setError(err.response?.data?.message || "Email not found");
    }
  };

  return (
    <div className="page-root">
      <div className="forgot-container">
        <div className="forgot-title-box">Forgot Password</div>
        <div className="forgot-card">

            {/* If Demo Link is visible, show "Check Email" state */}
            {demoLinkVisible ? (
                 <div className="text-center p-4">
                    <div className="flex justify-center text-white text-5xl mb-4"><FaEnvelope/></div>
                    <h3 className="text-white text-xl font-bold mb-2">Check your "Email"</h3>
                    <p className="text-white mb-6 text-sm">
                        We have sent a reset link to <strong>{email}</strong>.
                    </p>
                  
                    <div className="bg-gray-500/20 border border-white/30 p-4 rounded-lg">
                        <p className="text-white text-xs uppercase font-bold mb-2">
                            (Demo Only: Click below to simulate clicking the email link)
                        </p>
                        <button 
                            onClick={() => navigate("/reset-password", {state: {email}})}
                            className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded text-sm font-semibold w-full
                            flex items-center justify-center gap-2"
                        >
                            <FaLink/> 
                            <span>Reset Password Link</span>
                        </button>
                    </div>
                 </div>
            ) : (
                // Normal Form
                <form id={"forgot-password-form"} onSubmit={handleSubmit}>
                    <div className="forgot-input-wrapper">
                    <TextInput
                        label="Email"
                        icon={email_icon}
                        value={email}
                        onChange={(v) => setEmail(v)}
                        placeholder="Enter your email"
                    />
                    </div>

                    {error && <p style={{ color:"red"}} className="forgot-error">{error}</p>}

                    <button
                    className="forgot-btn flex justify-center items-center gap-2"
                    type="submit"
                    disabled={!email || loading}
                    style={{ opacity: !email || loading ? 0.5 : 1, cursor: !email || loading ? "not-allowed" : "pointer"}}
                    >
                    {loading ? "Sending..." : "Send Reset Link"}
                    </button>
                </form>
            )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword_Pg;