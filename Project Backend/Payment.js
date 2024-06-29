require("./Connection.js");

const mongoose = require("mongoose");

const payment = new mongoose.Schema({
  Payment_Id: { type: Number },
  Payer_Name: { type: String },
  Payment_Amount: { type: Number },
  Payment_Description: { type: String },
});

const Payments = mongoose.model("Payments", payment);
module.exports = Payments;
