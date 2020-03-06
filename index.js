// common js modules
const express = require("express");
require("./services/passport");
// generating a new application that represents running an express app
const app = express();
require("./routes/authRoutes")(app);
// Setting the port deynamically (for Herouko), or 5000 for local machine
const PORT = process.env.PORT || 5000;
app.listen(PORT);
