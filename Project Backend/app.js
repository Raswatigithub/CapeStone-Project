require("./Connection.js");

const express = require("express");
const cors = require("cors");
const route = require("./routes.js");
const cookieSession = require("express-session");
const cookieParser = require("cookie-parser");

const app = express();
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(route);
app.use(express.json());
app.listen(2000, () => {
  console.log("Server running on 2000");
});
