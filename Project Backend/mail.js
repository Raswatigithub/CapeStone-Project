const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3002;

app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "swatiraskonda@gmail.com",
    pass: "123",
  },
});

app.post("/send-email", (req, res) => {
  const { recipient, message } = req.body;

  const mailOptions = {
    from: "swatiraskonda@gmail.com",
    to: recipient,
    subject: "Reply from Chat",
    text: message,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send("Failed to send email");
    } else {
      console.log("Email sent: " + info.response);
      res.status(200).send("Email sent successfully");
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
