const passport = require("passport");

module.exports = app => {
  // routhandler for login path to involve passport
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"]
    })
  );
  // routhandler for the callbackURL - tell passport to handle the callback
  app.get("/auth/google/callback", passport.authenticate("google"));

  app.get("/api/current_user", (req, res) => {
    res.send(req.user);
  });
};
