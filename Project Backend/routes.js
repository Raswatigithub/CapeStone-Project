const express = require("express");
require("./Connection.js");
const router = express.Router();
router.use(express.json());
let Course = require("./Courses.js");
let User = require("./UserSignUp.js");
let bcrypt = require("bcrypt");
let jwt = require("jsonwebtoken");
let Payment = require("./Payment.js");

let AdminUser = require("./AdminSignUp.js");

router.post("/addCourse", async (req, res) => {
  const {
    Course_Id,
    Course_Name,
    Course_ImageUrl,
    Course_Price,
    Course_Offer,
    Course_Description,
  } = req.body;

  let course = new Course({
    Course_Id,
    Course_Name,
    Course_ImageUrl,
    Course_Price,
    Course_Offer,
    Course_Description,
    Cart: [],
  });

  await course.save();

  res.json("Course Added  Successfully");
});

router.get("/getCourses", async (req, res) => {
  let courses = await Course.find();

  res.json(courses);
});

router.put("/updateCourse/:courseId", async (req, res) => {
  let course_id = req.params.courseId;
  let {
    Course_Id,
    Course_Name,
    Course_ImageUrl,
    Course_Price,
    Course_Offer,
    Course_Description,
  } = req.body;
  console.log(Course_Id);
  let data = await Course.findOne({ Course_Id: course_id });

  if (data == null) {
    res.json("Course  is not available");
  } else {
    await Course.findByIdAndUpdate(data._id, {
      Course_Id,
      Course_Name,
      Course_ImageUrl,
      Course_Price,
      Course_Offer,
      Course_Description,
    });
    res.json("Course Updated Successfully");
  }
});

router.delete("/deleteCourse/:courseId", async (req, res) => {
  let course_id = req.params.courseId;
  let data = await Course.findOne({ Course_Id: course_id });
  if (data == null) {
    res.json("Course  is not available");
  } else {
    await Course.findByIdAndDelete({ _id: data._id });
    res.json("Course Deleted Successfully");
  }
});

router.post("/addUser", async (req, res) => {
  const { Name, Email, Phone, Password } = req.body;

  const user = new User({
    Name,
    Email,
    Phone,
    Password,
    Cart: [],
    SubscribeCourses: [],
  });

  await user.save();

  res.json("Sign Up successfully");
});

const verifyUser = (req, res, next) => {
  const token = req.cookies.User_Token;
  if (!token) {
    return res.json("Token is not available");
  } else {
    jwt.verify(token, "User Token", (err, decoded) => {
      if (err) {
        return res.json("Token is wrong");
      } else {
        next();
      }
    });
  }
};
router.get("/userLogin", verifyUser, (req, res) => {
  return res.json("Success");
});
router.post("/getUser", async (req, res) => {
  const { Name, Password } = req.body;

  let data = await User.findOne({ Name: Name });

  if (data) {
    if (await bcrypt.compare(Password, data.Password)) {
      const userToken = jwt.sign({ email: data.Email }, "User Token", {
        expiresIn: "1d",
      });

      res.cookie("User_Token", userToken);
      res.json({
        Cart: data.Cart,
        Name: data.Name,
        SubscribeCourses: data.SubscribeCourse,
      });
    } else {
      res.json("Incorrect Name or Password");
    }
  } else {
    res.json("Incorrect Name or Password");
  }
});

router.post("/addAdminUser", async (req, res) => {
  const { Name, Email, Phone, Password, SecurityQuestion } = req.body;

  let admin = new AdminUser({ Name, Email, Phone, Password, SecurityQuestion });

  await admin.save();

  res.json("Registered Successfully");
});

const verifyAdminUser = (req, res, next) => {
  const token = req.cookies.Admin_Token;
  if (!token) {
    return res.json("Token is not available");
  } else {
    jwt.verify(token, "Admin Token", (err, decoded) => {
      if (err) {
        return res.json("Token is wrong");
      } else {
        next();
      }
    });
  }
};
router.get("/adminLogin", verifyAdminUser, (req, res) => {
  return res.json("Success");
});
router.post("/getAdminUser", async (req, res) => {
  const { Name, Password, SecurityQuestion } = req.body;

  let data = await AdminUser.findOne({ Name: Name });

  console.log(data);
  if (data) {
    if (
      (await bcrypt.compare(Password, data.Password)) &&
      (await bcrypt.compare(SecurityQuestion, data.SecurityQuestion))
    ) {
      const adminToken = jwt.sign({ email: data.Email }, "Admin Token", {
        expiresIn: "1d",
      });

      res.cookie("Admin_Token", adminToken);
      res.json("Login Successful");
    } else {
      res.json("Invalid Name or Password");
    }
  } else {
    res.json("User is not exist");
  }
});

router.put("/userLogout/:Name", async (req, res) => {
  const { Cart, SubscribeCourse } = req.body;
  const { Name } = req.params;

  let data = await User.findOne({ Name: Name });
  console.log(data);
  console.log("SubscribeCourse", SubscribeCourse);
  if (data) {
    await User.findByIdAndUpdate(
      { _id: data._id },
      { Cart: Cart, SubscribeCourse: SubscribeCourse }
    );
  }
});

router.post("/addPayment", async (req, res) => {
  const { Payment_Id, Payer_Name, Payment_Amount, Payemnt_Description } =
    req.body;

  let payment = new Payment({
    Payment_Id,
    Payer_Name,
    Payment_Amount,
    Payemnt_Description,
  });

  await payment.save();

  res.json("Payment Done.Course is Subscribed Successfully");
});
module.exports = router;
