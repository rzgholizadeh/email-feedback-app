const passport = require("passport");

module.exports = app => {
  // routhandler for login path to involve passport
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"]
    })
  );
  //routhandler

  // routhandler for the callbackURL - tell passport to handle the callback
  app.get("/auth/google/callback", passport.authenticate("google"));
  // routhandler for logout
  app.get("/api/logout", (req, res) => {
    req.logout();
    // tell user  a sign of logout (we show that user is empty)
    res.send(req.user);
  });
  // routhandler to show the correctness of login result
  app.get("/api/current_user", (req, res) => {
    res.send(req.user);
  });
};
