import React from "react";

interface Props {
  label: string;
  icon: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
}

const TextInput: React.FC<Props> = ({
  label,
  icon,
  value,
  onChange,
  type = "text",
  placeholder,
}) => {
  return (
    <>
      <label className="signup-login-text">{label}</label>
      <div className="input-wrapper">
        <input
          className="input-container"
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
        />
        <img src={icon} alt={`${label} icon`} className="icon" />
      </div>
    </>
  );
};

export default TextInput;
