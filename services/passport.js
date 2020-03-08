const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const keys = require("../config/keys");
// fetching the model from mongoose
const User = mongoose.model("users");
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
      // query the DB to see if the user already exists
      // this is an async action and we use promise to get the result
      User.findOne({ googleId: profile.id }).then(existingUser => {
        if (existingUser) {
          // the user has been found in the DB
          // first arg: error message
          // second arg: the user we found in DB
          done(null, existingUser);
        } else {
          // the user is new
          // create a model instance of User and set its googleId, and save it to the database
          // Async action, needs promise
          new User({ googleId: profile.id })
            .save()
            .then(user => done(null, user));
        }
      });
    }
  )
);
