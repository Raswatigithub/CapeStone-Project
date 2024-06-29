require("./Connection.js");

const mongoose = require("mongoose");

const course = new mongoose.Schema({
  Course_Id: { type: Number },
  Course_Name: { type: String },
  Course_Price: { type: Number },
  Course_ImageUrl: { type: String },
  Course_Offer: { type: Number },
  Course_Description: { type: String },
});

const Course = mongoose.model("Course", course);
module.exports = Course;
