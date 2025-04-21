import React, { createContext, useState, useEffect } from "react";
import { authAPI } from "../services/api";

// Create the authentication context
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check if user is already authenticated (JWT in local storage)
    const checkAuthStatus = async () => {
      try {
        const token = localStorage.getItem("authToken");

        if (!token) {
          setLoading(false);
          return;
        }

        try {
          // Make API call to verify the token and get user data
          const response = await authAPI.getCurrentUser();
          setCurrentUser(response.data.data);
        } catch (err) {
          // If token is invalid, clear it
          localStorage.removeItem("authToken");
          setError("Session expired. Please sign in again.");
        }

        setLoading(false);
      } catch (err) {
        console.error("Authentication error:", err);
        localStorage.removeItem("authToken");
        setError("Session expired. Please sign in again.");
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  // Sign up function
  const signup = async (email, password) => {
    try {
      setLoading(true);

      // Make API call to register
      const response = await authAPI.register({ email, password });

      // Save token to local storage
      const { token } = response.data;
      localStorage.setItem("authToken", token);

      // Set the user
      setCurrentUser(response.data.data);

      return { success: true };
    } catch (err) {
      setError(err.response?.data?.error || "Failed to create account");
      return {
        success: false,
        error: err.response?.data?.error || "Failed to create account",
      };
    } finally {
      setLoading(false);
    }
  };

  // Sign in function
  const signin = async (email, password) => {
    try {
      setLoading(true);

      // Make API call to login
      const response = await authAPI.login({ email, password });

      // Save token to local storage
      const { token } = response.data;
      localStorage.setItem("authToken", token);

      // Set the user
      setCurrentUser(response.data.data);

      return { success: true };
    } catch (err) {
      setError(err.response?.data?.error || "Invalid email or password");
      return {
        success: false,
        error: err.response?.data?.error || "Invalid email or password",
      };
    } finally {
      setLoading(false);
    }
  };

  // Sign out function
  const signout = async () => {
    try {
      // Call logout API
      await authAPI.logout();

      // Remove token and clear user
      localStorage.removeItem("authToken");
      setCurrentUser(null);
      return { success: true };
    } catch (err) {
      setError(err.response?.data?.error || "Failed to sign out");
      return {
        success: false,
        error: err.response?.data?.error || "Failed to sign out",
      };
    }
  };

  // Password reset request
  const requestPasswordReset = async (email) => {
    try {
      setLoading(true);

      // Call forgot password API
      await authAPI.requestPasswordReset(email);

      return { success: true };
    } catch (err) {
      setError(
        err.response?.data?.error || "Failed to send password reset email"
      );
      return {
        success: false,
        error:
          err.response?.data?.error || "Failed to send password reset email",
      };
    } finally {
      setLoading(false);
    }
  };

  // Google OAuth sign in
  const googleSignIn = async (googleData) => {
    try {
      setLoading(true);

      // Make API call for Google authentication
      const response = await authAPI.googleAuth(googleData);

      // Save token to local storage
      const { token } = response.data;
      localStorage.setItem("authToken", token);

      // Set the user
      setCurrentUser(response.data.data);

      return { success: true };
    } catch (err) {
      setError(err.response?.data?.error || "Failed to sign in with Google");
      return {
        success: false,
        error: err.response?.data?.error || "Failed to sign in with Google",
      };
    } finally {
      setLoading(false);
    }
  };

  // Clear any authentication errors
  const clearError = () => {
    setError(null);
  };

  // Create value object to be provided by the context
  const value = {
    currentUser,
    loading,
    error,
    signup,
    signin,
    signout,
    requestPasswordReset,
    googleSignIn,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
