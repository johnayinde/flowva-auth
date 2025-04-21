import React, { useEffect, useState } from "react";
import "./PasswordStrength.css";

const PasswordStrength = ({ password }) => {
  const [strength, setStrength] = useState(0);
  const [strengthClass, setStrengthClass] = useState("");

  useEffect(() => {
    // Calculate password strength
    if (!password) {
      setStrength(0);
      setStrengthClass("");
      return;
    }

    let calculatedStrength = 0;

    // Length check
    if (password.length > 7) calculatedStrength++;

    // Lowercase and uppercase
    if (password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) calculatedStrength++;

    // Numbers
    if (password.match(/([0-9])/)) calculatedStrength++;

    // Special characters
    if (password.match(/([!,%,&,@,#,$,^,*,?,_,~])/)) calculatedStrength++;

    setStrength(calculatedStrength);

    // Set the appropriate CSS class
    if (password.length < 6) {
      setStrengthClass("weak");
    } else if (calculatedStrength <= 2) {
      setStrengthClass("medium");
    } else {
      setStrengthClass("strong");
    }
  }, [password]);

  return (
    <div className="password-strength-container">
      <div className="password-strength">
        <div className={`strength-meter ${strengthClass}`}></div>
      </div>
      {password && (
        <div className="password-hint">
          Use at least 8 characters with a mix of letters, numbers & symbols
        </div>
      )}
    </div>
  );
};

export default PasswordStrength;
