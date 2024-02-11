import React, { useState } from "react";

import "../styles/eyeButton.css";

interface IProps {
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  name: string;
  onFocus?: () => void;
  onBlur?: () => void;
}

const EyeButton: React.FC<IProps> = ({
  placeholder,
  name,
  value,
  onChange,
  onFocus,
  onBlur,
}) => {
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  return (
    <div className="relative">
      <input
        type={isPasswordHidden ? "password" : "text"}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        className="text-[#fafaf9]"
        onFocus={onFocus}
        onBlur={onBlur}
      />
      <button
        className="eyeball"
        type="button"
        onClick={() => setIsPasswordHidden(!isPasswordHidden)}
      >
        <i
          className={
            isPasswordHidden ? "fa-solid fa-eye-slash" : "fa-solid fa-eye "
          }
          style={{ color: "#fff" }}
        ></i>
      </button>
      {/* <div className={isPasswordHidden ? "" : "beam"}></div> */}
    </div>
  );
};

export default EyeButton;
