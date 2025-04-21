import React, { useEffect, useState } from "react";
import "./FormMessage.css";

const FormMessage = ({ message, type }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setVisible(true);

      // Auto-hide after 5 seconds
      const timer = setTimeout(() => {
        setVisible(false);
      }, 5000);

      return () => clearTimeout(timer);
    } else {
      setVisible(false);
    }
  }, [message]);

  if (!message) return null;

  return (
    <div className={`form-message ${type}-message ${visible ? "visible" : ""}`}>
      {message}
    </div>
  );
};

export default FormMessage;
