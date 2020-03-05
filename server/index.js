// common js modules
const express = require("express");
// generating a new application that represents running an express app
const app = express();
//  a heelo world rout handler
app.get("/", (req, res) => {
  res.send({ hi: "there" });
});

app.listen(5000);
