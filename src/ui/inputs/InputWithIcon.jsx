// InputWithIcon.jsx
import React, { useState } from "react";
import { Eye, EyeClosed, EyeOff } from "lucide-react";

const InputWithIcon = ({ type, placeholder, icon }) => {
    
    const isPassword = type === "password";
    const [show, setShow] = useState(false);

    return (
        <div className="input-with-icon">
            {icon}
            <input
                type={isPassword ? (show ? "text" : "password") : type}
                placeholder={placeholder || ""}
                autoComplete={isPassword ? "current-password" : undefined}
            />
            {isPassword && (
                <button type="button" className="toggle-visibility" onClick={() => setShow((s) => !s)} aria-label={show ? "Şifreyi gizle" : "Şifreyi göster"} aria-pressed={show} >
                    {show ? <Eye /> : <EyeClosed />}
                </button>
            )}
        </div>
    );
};

export default InputWithIcon;
