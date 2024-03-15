const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController.js');

// POST Signup
router.post('/signup', authController.signup);

// POST Signin
router.post('/signin', authController.signin);

// POST Reset password
router.post('/reset-password', authController.resetPassword);

module.exports = router;


// const express = require("express");
// const router = express.Router();
// const { User } = require("../db.js");
// const { isAdmin } = require("./isAdmin.js");
// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcrypt");
// const SECRET_KEY = "secretkey23456"; // A remplacer par une clé secrète

// // SIGN UP
// router.post("/signup", async (req, res) => {
//   // if req.body.password is empty, add "Password field is empty"
//   const salt = await bcrypt.genSalt(10);
//   const hashedPassword = await bcrypt.hash(req.body.password, salt);
//   const { role, firstName, lastName, email, phoneNumber } = req.body;
//   const newUser = await User.create({
//     role: "client",
//     firstName,
//     lastName,
//     email,
//     phoneNumber,
//     password: hashedPassword,
//   });

//   await User.create(newUser);
//   res.json({ message: "User created", newUser });
// });

// // SIGN IN
// router.post("/signin", async (req, res) => {
//   const user = await User.findOne({
//     where: {
//       email: req.body.email,
//     },
//   });
//   if (!user)
//     return res
//       .status(400)
//       .json({ message: "Incorrect mail or password", status: 400 });
//   const validPassword = await bcrypt.compare(req.body.password, user.password);
//   if (!validPassword)
//     return res.status(400).json({ message: "Incorrect mail or password" });
//   const payload = {
//     email: user.email,
//     id: user.id,
//     role: user.role,
//   };
//   const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
//   res.status(201).json({ jwt: token });
//   // res.json({message: token});
// });

// // RESET PASSWORD
// router.post("/reset-password", async (req, res) => {
//   try {
//     const { email, newPassword } = req.body;

//     // Inital Validation
//     if (!email || !newPassword) {
//       return res.status(400).json({ error: "Email and password required" });
//     }

//     // Search for user with mail
//     const user = await User.findOne({ where: { email: email } });

//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     // Password hash
//     const salt = await bcrypt.genSalt(10);
//     console.log("Salt generated successfully");
//     const hashedPassword = await bcrypt.hash(newPassword, salt);
//     console.log("Password hashed successfully");

//     // Password update in databse
//     console.log("Before save:", user.password);
//     user.password = hashedPassword;
//     await user.save();
//     console.log("After save:", user.password);

//     // Success message
//     res.json({ message: "Password reset successfully" });
//   } catch (error) {
//     // Manage errors during reset
//     console.error(error);
//     res.status(500).json({ error: "Error during password reset" });
//   }
// });

// module.exports = router;