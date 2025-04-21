import React, { useState } from "react";
import Logo from "../common/Logo";
import FormInput from "../common/FormInput";
import Button from "../common/Button";
import Divider from "../common/Divider";
import FormMessage from "../common/FormMessage";
import GoogleButton from "../common/GoogleButton";
import "./Form.css";
import useAuth from "../../hooks/useAuth";

import { SignInIcon } from "../../utils/icons";

const SignInForm = ({
  onSwitchToSignUp,
  onSwitchToForgotPassword,
  animating,
}) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState({
    text: "",
    type: "",
  });

  const { signin, googleSignIn, loading } = useAuth();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple validation
    if (!formData.email || !formData.password) {
      setMessage({
        text: "Please fill in all fields",
        type: "error",
      });
      return;
    }

    try {
      setMessage({
        text: "Signing in...",
        type: "success",
      });

      // Call the signin function from auth context
      const result = await signin(formData.email, formData.password);

      if (result.success) {
        setMessage({
          text: "Welcome back! Redirecting...",
          type: "success",
        });
      } else {
        setMessage({
          text: result.error || "An error occurred during sign in",
          type: "error",
        });
      }
    } catch (error) {
      setMessage({
        text: error.message || "An error occurred during sign in",
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
      text: error.message || "Failed to sign in with Google",
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

      <h2 className="form-title">Welcome back</h2>

      <FormMessage message={message.text} type={message.type} />

      <FormInput
        id="email"
        label="Email"
        type="email"
        placeholder="you@example.com"
        value={formData.email}
        onChange={handleChange}
        required
      />

      <FormInput
        id="password"
        label="Password"
        type="password"
        placeholder="••••••••"
        value={formData.password}
        onChange={handleChange}
        required
      />

      <div className="forgot-password">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onSwitchToForgotPassword();
          }}
        >
          Forgot password?
        </a>
      </div>

      <Button type="submit" disabled={loading}>
        <SignInIcon />
        {loading ? "Signing in..." : "Sign in"}
      </Button>

      <Divider text="or continue with" />

      <GoogleButton
        onSuccess={handleGoogleSuccess}
        onError={handleGoogleError}
        text="Google"
      />

      <div className="form-footer">
        Don't have an account?{" "}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onSwitchToSignUp();
          }}
        >
          Sign up
        </a>
      </div>
    </form>
  );
};

export default SignInForm;
