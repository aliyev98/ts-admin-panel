import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const InputWithIcon = ({ type = "text", placeholder, icon, value, onChange }) => {
  const isPassword = type === "password";
  const [show, setShow] = useState(false);

  return (
    <div className="input-with-icon">
      {icon}
      <input
        type={isPassword ? (show ? "text" : "password") : type}
        placeholder={placeholder || ""}
        value={value}
        onChange={onChange}
        autoComplete={isPassword ? "current-password" : "on"}
      />
      {isPassword && (
        <button
          type="button"
          className="toggle-visibility"
          onClick={() => setShow((s) => !s)}
          aria-label={show ? "Şifrəni gizlət" : "Şifrəni göstər"}
        >
          {show ? <EyeOff /> : <Eye />}
        </button>
      )}
    </div>
  );
};

export default InputWithIcon;
