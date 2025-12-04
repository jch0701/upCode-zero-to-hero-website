import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PasswordInput from "@/component/Signup_Login/PasswordInput";
import { Validate_Password } from "@/component/Signup_Login/Validate_Signup_Login";

const ResetPassword_Pg = () => {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmError, setConfirmError] = useState("");

  const navigate = useNavigate();

   const handleNewPassword = (value: string) => {
    setPassword(value);

    const errors = Validate_Password(value);

    if (errors.length > 0) {
      setPasswordError(errors[0]); // show first error
    } else {
      setPasswordError("");
    }
      // reset confirm when first password changes
      setConfirm("");
      setConfirmError("");
    };

    // validate confirm password
    const handleConfirmPassword = (value: string) => {
      setConfirm(value);

      if (value !== password) {
        setConfirmError("Passwords do not match");
      } else {
        setConfirmError("");
      }
    };

    const isDisabled =
      passwordError !== "" ||
      confirmError !== "" ||
      password.length < 6 ||
      confirm.length === 0;

    const handleReset = () => {
      if (isDisabled) return;

      alert("Password reset successfully!");

      navigate("/login");
    };
    
    const isPasswordValid = password.trim() !== "" && password.length >= 6;

    const isValid =
    password.trim() !== "" &&
    confirm.trim() !== "" &&
    confirm === password;
    
  return (
    <div className="page-root">

      {/* Main wrapper to center card */}
      <div className="forgot-container">

        {/* Purple Header */}
        <div className="forgot-title-box">
          Reset Password
        </div>

        {/* Blurred Card */}
        <div className="forgot-card">

          <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-2">

            {/*new password*/}
            <PasswordInput
            label="New Password"
            value={password}
            onChange={handleNewPassword}
            placeholder="Enter your new password"
          />
            {/* Display password error if any */}
            {passwordError && (
              <p style={{ color: "red", fontSize: "13px", marginTop: "-36px", marginBottom: "5px" }}>
                {passwordError}
              </p>
            )}

            {/* re-enter new password */}
            
                <PasswordInput
                  label="Confirm Password"
                  value={confirm}
                  onChange={handleConfirmPassword}
                  placeholder="Re-enter your new password"
                  disabled={!isPasswordValid}
                  style={{
                    opacity: isPasswordValid ? 1 : 0.5,
                    cursor: isPasswordValid  ? "pointer" : "not-allowed",
                  }}
                />
                {/* Display confirm password error if any */}
                {confirmError && (
                  <p style={{ color: "#ff6b6b", fontSize: "13px", marginTop: "-30px" }}>
                    {confirmError}
                  </p>            
            )}

            {/* Button */}
            <button
              className="forgot-btn"
              type="button"
              onClick={handleReset}
              disabled={!isValid}
              style={{
                opacity: isValid ? 1 : 0.5,
                cursor: isValid ? "pointer" : "not-allowed",
              }}
            >
              Reset Password
            </button>

          </form>

          {/* Footer Link */}
          <div className="forgot-footer">
            Back to{" "}
            <span onClick={() => navigate("/login")}>
              Login
            </span>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ResetPassword_Pg;
