import React from "react";
import password_icon from "../../assets/signuplogin/password.png";
import show_icon from "../../assets/signuplogin/show.png";
import hide_icon from "../../assets/signuplogin/hide.png";

interface Props {
  value: string;
  onChange: (v: string) => void;
  label: string;
  placeholder?: string;
  disabled?: boolean;
  style?: React.CSSProperties;

}

const PasswordInput: React.FC<Props> = ({
  value,
  onChange,
  label,
  placeholder,
  disabled,
  style,
}) => {
  const [show, setShow] = React.useState(false);

  return (
    <>
      <label className="signup-login-text">{label}</label>
      <div className="input-wrapper">
        <input
          className="input-container"
          type={show ? "text" : "password"}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          style={style}
        />

        {/* LEFT ICON */}
        <img src={password_icon} alt="password icon" className="icon" />

        {/* RIGHT ICON */}
        <img
          src={show ? show_icon : hide_icon}
          className="eye-icon"
          alt="show/hide icon"
          onClick={() => setShow(!show)}
        />
      </div>
    </>
  );
};

export default PasswordInput;
