import React, { useState } from "react";

interface ChangePasswordProps {
  passwordTouched: boolean;
  placeholder: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus: () => void;
  onBlur: () => void;
}

const ChangePasswordInput: React.FC<ChangePasswordProps> = ({
  passwordTouched,
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
        className={`option-input inputFocus w-full ${
          value === "" && passwordTouched && "input-error"
        }`}
        onBlur={onBlur}
        onFocus={onFocus}
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
          style={{ color: "#64748B" }}
        ></i>
      </button>
      {value === "" && passwordTouched && (
        <p className="error mt-1 h-12">Field must not be empty!</p>
      )}
    </div>
  );
};

export default ChangePasswordInput;
