const { OAuth2Client } = require("google-auth-library");
const User = require("../models/User");
const crypto = require("crypto");

// Create OAuth client

/**
 * Verify a Google ID token and create or get a user
 * @param {string} tokenId - The Google ID token
 * @returns {Promise<Object>} The user object
 */
async function verifyGoogleToken(email) {
  try {
    let user = await User.findOne({ email }).lean();
    console.log({ email });

    if (!user) {
      // Create new user if not exists
      user = await User.create({
        email,
        name: name || email.split("@")[0],
        password: crypto.randomBytes(20).toString("hex"), // Random password for OAuth users
        googleId,
        isVerified: true, // Google already verified the email
      });
      return { ...user, new: true };
    } else {
      return { ...user, new: false };
    }
  } catch (error) {
    console.error("Error verifying Google token:", error);
    throw new Error("Failed to verify Google token");
  }
}

module.exports = verifyGoogleToken;
