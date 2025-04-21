import axios from "axios";

// Create an axios instance with defaults
const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to attach auth token to all requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle common errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const { response } = error;

    // Handle token expiration
    if (response && response.status === 401) {
      localStorage.removeItem("authToken");
      window.location.href = "/";
    }

    return Promise.reject(error);
  }
);

// Authentication API calls
export const authAPI = {
  // Register a new user
  register: (userData) => {
    return api.post("/auth/register", userData);
  },

  // Login a user
  login: (credentials) => {
    return api.post("/auth/login", credentials);
  },

  // Logout the current user
  logout: () => {
    return api.post("/auth/logout");
  },

  // Get current user profile
  getCurrentUser: () => {
    return api.get("/auth/me");
  },

  // Request password reset
  requestPasswordReset: (email) => {
    return api.post("/auth/forgot", { email });
  },

  // Reset password with token
  resetPassword: (token, newPassword) => {
    return api.post(`/auth/reset/${token}`, { password: newPassword });
  },

  // Verify email with token
  verifyEmail: (token) => {
    return api.get(`/auth/verify/${token}`);
  },

  // Google OAuth authentication
  googleAuth: (googleData) => {
    return api.post("/auth/google", googleData);
  },

  // Update user details
  updateUserDetails: (userData) => {
    return api.put("/auth/updatedetails", userData);
  },

  // Update password
  updatePassword: (passwordData) => {
    return api.put("/auth/updatepassword", passwordData);
  },
};

export default api;
