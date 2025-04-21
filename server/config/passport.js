const passport = require("passport");
const { Strategy: GoogleStrategy } = require("passport-google-oauth20");
const User = require("../models/User");
const crypto = require("crypto");

// Configure Google Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.BASE_URL || ""}/api/auth/google/callback`,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Extract email from profile
        const email =
          profile.emails && profile.emails[0] ? profile.emails[0].value : "";

        if (!email) {
          return done(new Error("No email found in Google profile"), null);
        }

        // Find existing user by email
        let user = await User.findOne({ email });

        if (!user) {
          // Create new user if not exists
          user = await User.create({
            email,
            name: profile.displayName || email.split("@")[0],
            password: crypto.randomBytes(20).toString("hex"),
            googleId: profile.id,
            isVerified: true,
          });
        } else if (!user.googleId) {
          user.googleId = profile.id;
          await user.save({ validateBeforeSave: false });
        }

        done(null, user);
      } catch (error) {
        done(error, null);
      }
    }
  )
);

// Serialize and deserialize user
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

module.exports = passport;
