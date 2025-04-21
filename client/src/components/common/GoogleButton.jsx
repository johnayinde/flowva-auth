import React from "react";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import "./GoogleButton.css";
import googleLogo from "../../assets/images/glogo.png";

const GoogleButton = ({ onSuccess, onError, text = "Sign in with Google" }) => {
  const Glogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const { data } = await axios.post(
          `${process.env.REACT_APP_API_BASE_URL}/auth/google/callback`,
          { access_token: tokenResponse.access_token }
        );

        if (onSuccess && data.user) {
          onSuccess(data.user);
        }
      } catch (error) {
        if (onError) onError(error);
      }
    },
    onError: (error) => {
      console.error("Google login failed:", error);
      if (onError) onError(error);
    },
  });

  return (
    <button
      className="btn-google"
      onClick={(e) => {
        e.preventDefault();
        Glogin();
      }}
    >
      <img src={googleLogo} alt="Google Logo" className="google-logo" />
      Google
    </button>
  );
};

export default GoogleButton;
