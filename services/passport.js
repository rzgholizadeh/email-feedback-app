const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const keys = require("../config/keys");
// fetching the model from mongoose
const User = mongoose.model("users");
// user is the opbject passport (done function) is returning (the one we created or got our of the database)
passport.serializeUser((user, done) => {
  // done is the callback for passport
  // user.id is the id of the user object in the database (assigned by mongo itself), not the googleId property
  // we use user id for the cookie because we may want to have other oauth (like facebook) and google profile id won't work
  // for that
  done(null, user.id);
});
// deserialize user
passport.deserializeUser((id, done) => {
  // query the DB to find the user for the id
  // Async action
  User.findById(id).then(user => {
    done(null, user);
  });
});
// tell passport to ues google strategy with configuration: client ID and client secret
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true
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
