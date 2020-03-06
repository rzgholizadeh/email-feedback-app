// common js modules
const express = require("express");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("./config/keys");
// generating a new application that represents running an express app
const app = express();
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
// routhandler for login path to involve passport
app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"]
  })
);
// routhandler for the callbackURL - tell passport to handle the callback
app.get("/auth/google/callback", passport.authenticate("google"));
// Setting the port deynamically (for Herouko), or 5000 for local machine
const PORT = process.env.PORT || 5000;
app.listen(PORT);
