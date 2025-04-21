import React, { useState } from "react";
import Logo from "../common/Logo";
import FormInput from "../common/FormInput";
import Button from "../common/Button";
import FormMessage from "../common/FormMessage";
import useAuth from "../../hooks/useAuth";
import "./Form.css";

// Import SVG icons
import { EmailIcon } from "../../utils/icons";

const ForgotPasswordForm = ({ onSwitchToSignIn }) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const [message, setMessage] = useState({
    text: "",
    type: "",
  });

  const { requestPasswordReset, loading } = useAuth();

  const handleChange = (e) => {
    setEmail(e.target.value);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple validation
    if (!email) {
      setError("Please enter your email");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email");
      return;
    }

    try {
      setMessage({
        text: "Sending reset link...",
        type: "success",
      });

      // Call the password reset function from auth context
      const result = await requestPasswordReset(email);

      if (result.success) {
        setMessage({
          text: "Reset link sent to your email",
          type: "success",
        });
      } else {
        setMessage({
          text: result.error || "Failed to send reset link",
          type: "error",
        });
      }
    } catch (error) {
      setMessage({
        text: error.message || "An error occurred",
        type: "error",
      });
    }
  };

  return (
    <form className="auth-form animate-form" onSubmit={handleSubmit}>
      <Logo />

      <h2 className="form-title">Reset your password</h2>

      <FormMessage message={message.text} type={message.type} />

      <FormInput
        id="forgot-email"
        label="Email"
        type="email"
        placeholder="you@example.com"
        value={email}
        onChange={handleChange}
        required
        error={error}
      />

      <Button type="submit" disabled={loading}>
        <EmailIcon />
        {loading ? "Sending..." : "Send reset link"}
      </Button>

      <div className="form-footer">
        Remember your password?{" "}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onSwitchToSignIn();
          }}
        >
          Sign in
        </a>
      </div>
    </form>
  );
};

export default ForgotPasswordForm;
