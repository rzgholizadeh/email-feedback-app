const mongoose = require("mongoose");
// new syntax for JS (destructuring)
const { Schema } = mongoose;
// mongoose requries a schema... it negates the non-relational thing about mongoDB about schema
const userSchema = new Schema({
  googleId: String,
  credits: { type: Number, default: 0 }
});
// create the model class in mongoose
mongoose.model("users", userSchema);
