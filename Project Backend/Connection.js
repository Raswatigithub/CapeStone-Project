const mongoose = require("mongoose");

require("dotenv").config();
let db = process.env.db;
mongoose
  .connect(db)
  .then(() => console.log("Connection done"))
  .catch((e) => console.log(e));
