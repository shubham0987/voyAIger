const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const { User } = require("../models");

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const CALLBACK_URL = process.env.GOOGLE_CALLBACK_URL || "/auth/google/callback";

if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET) {
  console.warn(
    "Google client ID/secret not set. Google OAuth will not work until they are provided."
  );
}

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email =
          profile.emails && profile.emails[0] && profile.emails[0].value;
        let user = await User.findOne({ where: { google_id: profile.id } });
        if (!user && email) {
          user = await User.findOne({ where: { email } });
        }

        if (user) {
          user.googleId = profile.id;
          user.name = user.name || profile.displayName;
          await user.save();
          return done(null, user);
        }

        // Create new user
        const newUser = await User.create({
          email,
          google_id: profile.id,
          name: profile.displayName,
        });

        done(null, newUser);
      } catch (err) {
        done(err, null);
      }
    }
  )
);

// Minimal serialize/deserialize (not used for JWT flow but required by passport)
passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findByPk(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});
