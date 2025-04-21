import React, { useState } from "react";
import "./FormInput.css";

const FormInput = ({
  id,
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  required = false,
  error = "",
}) => {
  const [inputType, setInputType] = useState(type);

  const togglePasswordVisibility = (e) => {
    e.preventDefault();
    setInputType(inputType === "password" ? "text" : "password");
  };

  const isPassword = type === "password";

  return (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>
      <div className="input-wrapper">
        <input
          id={id}
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          className={error ? "input-error" : ""}
        />
        {isPassword && (
          <span className="password-toggle" onClick={togglePasswordVisibility}>
            {inputType === "password" ? "Show" : "Hide"}
          </span>
        )}
      </div>
      {error && <div className="input-error-message">{error}</div>}
    </div>
  );
};

export default FormInput;
