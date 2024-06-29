require("./Connection.js");
const bcrypt = require("bcrypt");

const mongoose = require("mongoose");

const userSignUp = new mongoose.Schema({
  Name: { type: String },
  Email: { type: String },
  Phone: { type: Number },
  Password: { type: String },
  Cart: { type: Array },
  SubscribeCourse: { type: Array },
});
userSignUp.pre("save", async function (next) {
  this.Password = await bcrypt.hash(this.Password, 12);

  next();
});
const User = mongoose.model("User", userSignUp);

module.exports = User;
