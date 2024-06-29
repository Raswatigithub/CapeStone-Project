require("./Connection.js");

let mongoose = require("mongoose");

let bcrypt = require("bcrypt");

let AdminUser = new mongoose.Schema({
  Name: { type: String },
  Email: { type: String },
  Phone: { type: Number },
  Password: { type: String },
  SecurityQuestion: { type: String },
});

AdminUser.pre("save", async function (next) {
  this.Password = await bcrypt.hash(this.Password, 12);
  this.SecurityQuestion = await bcrypt.hash(this.SecurityQuestion, 12);
  next();
});
let adminUser = mongoose.model("Admin", AdminUser);

module.exports = adminUser;
