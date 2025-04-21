const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const axios = require("axios");

const {
  register,
  login,
  logout,
  verifyEmail,
  forgotPassword,
  resetPassword,
  updateDetails,
  updatePassword,
  googleAuth,
} = require("../controllers/authController");

const router = express.Router();

// Middleware
const { protect } = require("../middleware/auth");
const User = require("../models/User");
const crypto = require("crypto");

// Routes
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/verify/:token", verifyEmail);
router.post("/forgot", forgotPassword);
router.put("/reset/:token", resetPassword);
router.put("/updatedetails", protect, updateDetails);
router.put("/updatepassword", protect, updatePassword);
router.post("/google", googleAuth);

// Google OAuth routes
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    console.log("Google OAuth callback received");

    // Generate JWT token
    const token = jwt.sign({ id: req.user.id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
    });

    // Set cookie if needed
    const options = {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
    };

    if (process.env.NODE_ENV === "production") {
      options.secure = true;
    }

    const redirectUrl = `${
      process.env.CLIENT_URL || "http://localhost:3000"
    }?token=${token}`;
    res.redirect(redirectUrl);
  }
);

// Handle direct access token and user info from frontend (@react-oauth/google)
router.post("/google/callback", async (req, res) => {
  try {
    const { access_token } = req.body;

    if (!access_token) {
      return res.status(400).json({
        success: false,
        error: "Access token is required",
      });
    }

    // Fetch user profile from Google
    const response = await axios.get(
      "https://www.googleapis.com/oauth2/v3/userinfo",
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    const profile = response.data;
    const { email, name, sub: googleId, picture } = profile;

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        email,
        name: name || email.split("@")[0],
        password: crypto.randomBytes(20).toString("hex"),
        googleId,
        isVerified: true,
      });
      user = { ...user.toObject(), new: true };
    } else {
      user = { ...user.toObject(), new: false };
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
    });

    res.status(200).json({
      success: true,
      token,
      user,
    });
  } catch (error) {
    console.error(
      "Google callback error:",
      error.response?.data || error.message
    );
    res.status(500).json({
      success: false,
      error: "Server error during Google authentication",
    });
  }
});

module.exports = router;
