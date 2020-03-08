// common js modules
const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const keys = require("./config/keys");
// the order is important! The model should be created first
require("./models/User");
require("./services/passport");

// connect to mongoDB database
mongoose.connect(keys.mongoURI);
// generating a new application that represents running an express app
const app = express();
app.use(
  cookieSession({
    // in milliseconds
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);
// tell passport to use cookie authentication
app.use(passport.initialize());
app.use(passport.session());
require("./routes/authRoutes")(app);
// Setting the port deynamically (for Herouko), or 5000 for local machine
const PORT = process.env.PORT || 5000;
app.listen(PORT);
