module.exports = (req, res, next) => {
  if (!req.user) {
    return res.status(401).send({ error: "Must be logged in!" });
  }
  // call the next function (middleware) in express system
  next();
};
