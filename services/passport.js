const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("../config/keys");

// tell passport to ues google strategy with configuration: client ID and client secret
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback"
    },
    (accessToken, refreshToken, profile, done) => {
      // this is  where we use the information google has provided about the user
      console.log("access token", accessToken);
      console.log("refresh token", refreshToken);
      console.log("profile", profile);
    }
  )
);
