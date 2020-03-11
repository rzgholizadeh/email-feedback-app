// common js modules
const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const bodyParser = require("body-parser");
const keys = require("./config/keys");
// the order is important! The model should be created first
require("./models/User");
require("./models/Survey");
require("./services/passport");

// connect to mongoDB database
mongoose.connect(keys.mongoURI);
// generating a new application that represents running an express app
const app = express();
app.use(bodyParser.json());
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
require("./routes/billingRoutes")(app);

// for production environment behaviour
if (process.env.NODE_ENV === "production") {
  // express will serve up production assests like main.js or main.css
  app.use(express.static("client/build"));

  // express will serve up index.html if it does not know the route
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// Setting the port deynamically (for Herouko), or 5000 for local machine
const PORT = process.env.PORT || 5000;
app.listen(PORT);
