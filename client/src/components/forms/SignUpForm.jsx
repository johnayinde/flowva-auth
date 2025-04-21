import React, { useState } from "react";
import Logo from "../common/Logo";
import FormInput from "../common/FormInput";
import Button from "../common/Button";
import Divider from "../common/Divider";
import FormMessage from "../common/FormMessage";
import GoogleButton from "../common/GoogleButton";
import PasswordStrength from "../common/PasswordStrength";
import "./Form.css";
import useAuth from "../../hooks/useAuth";
import { validateSignUpForm } from "../../utils/validators";
import { CreateAccountIcon } from "../../utils/icons";

const SignUpForm = ({ onSwitchToSignIn, animating }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState({
    text: "",
    type: "",
  });

  const { signup, googleSignIn, loading } = useAuth();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });

    // Clear any error for this field
    if (errors[id]) {
      setErrors({
        ...errors,
        [id]: "",
      });
    }
  };

  const validateForm = () => {
    const validationErrors = validateSignUpForm(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setMessage({
        text: "Creating your account...",
        type: "success",
      });

      // Call the signup function from auth context
      const result = await signup(formData.email, formData.password);

      if (result.success) {
        setMessage({
          text: "Account created successfully! Welcome to Flowva.",
          type: "success",
        });
      } else {
        setMessage({
          text: result.error || "An error occurred during sign up",
          type: "error",
        });
      }
    } catch (error) {
      setMessage({
        text: error.message || "An error occurred during sign up",
        type: "error",
      });
    }
  };

  const handleGoogleSuccess = async (googleUserData) => {
    try {
      if (googleUserData.new) {
        setMessage({
          text: "Creating account with Google...",
          type: "success",
        });

        setTimeout(() => {
          setMessage({
            text: "Account created with Google successfully!",
            type: "success",
          });
        }, 2000);
      } else {
        setMessage({
          text: "Welcome back! Redirecting...",
          type: "success",
        });
      }
    } catch (error) {
      setMessage({
        text: error.message || "An error occurred during Google sign up",
        type: "error",
      });
    }
  };

  const handleGoogleError = (error) => {
    setMessage({
      text: error.message || "Failed to sign up with Google",
      type: "error",
    });
  };

  return (
    <form
      className={`auth-form ${
        animating ? "animate-form-exit" : "animate-form"
      }`}
      onSubmit={handleSubmit}
    >
      <Logo />

      <h2 className="form-title">Join Flowva today</h2>

      <FormMessage message={message.text} type={message.type} />

      <FormInput
        id="email"
        label="Email"
        type="email"
        placeholder="you@example.com"
        value={formData.email}
        onChange={handleChange}
        required
        error={errors.email}
      />

      <div className="password-input-container">
        <FormInput
          id="password"
          label="Password"
          type="password"
          placeholder="••••••••"
          value={formData.password}
          onChange={handleChange}
          required
          error={errors.password}
        />
        <PasswordStrength password={formData.password} />
      </div>

      <FormInput
        id="confirmPassword"
        label="Confirm Password"
        type="password"
        placeholder="••••••••"
        value={formData.confirmPassword}
        onChange={handleChange}
        required
        error={errors.confirmPassword}
      />

      <Button type="submit" disabled={loading}>
        <CreateAccountIcon />
        {loading ? "Creating account..." : "Create account"}
      </Button>

      <Divider text="or continue with" />

      <GoogleButton
        onSuccess={handleGoogleSuccess}
        onError={handleGoogleError}
        text="Google"
      />

      <div className="form-footer">
        Already have an account?{" "}
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

export default SignUpForm;
