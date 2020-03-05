// common js modules
const express = require("express");
// generating a new application that represents running an express app
const app = express();
//  a heelo world rout handler
app.get("/", (req, res) => {
  res.send({ bye: "guys" });
});

// Setting the port deynamically (for Herouko), or 5000 for local machine
const PORT = process.env.PORT || 5000;
app.listen(PORT);
