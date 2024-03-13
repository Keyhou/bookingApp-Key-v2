const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { User } = require("../db.js");
const { isAdmin } = require("./isAdmin.js");
const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
const SECRET_KEY = "secretkey23456";

// Middleware to authenticate the user using JWT
function authenticateUser(req, res, next) {
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).json({ message: "No token provided." });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).json({ message: "Invalid token" });
  }
}

// Route for updating user's role, accessible by the admin
router.put("/isAdmin/:id", isAdmin, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    let user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ error: "User with id:${id} not found" });
    }

    // Update the user's role
    user.role = role;

    await user.save();

    res.json({ message: "User's role updated successfully" });
  } catch (error) {
    next(error);
  }
});

/* GET */
router.get("/", isAdmin, async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.json({ users });
  } catch (error) {
    next(error);
  }
});

/* GET the user signed in rn */
router.get("/me", authenticateUser, async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        email: req.user.email,
      },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ user });
  } catch (error) {
    next(error);
  }
});

// /* GET One User */
// router.get("/me", async (req, res, next) => {
//   try {
//     // Get the user ID
//     const userId = req.user.id;

//     // Find the user by ID
//     const currentUser = await User.findByPk(userId);

//     // If the user is not found, send a 404 error
//     if (!currentUser) {
//       return res.status(404).json({ error: "user not found" });
//     }

//     // Return the user information
//     res.status(200).json({ currentUser });
//   } catch (error) {
//     // If there is an error, send the error message to the client
//     next(error);
//   }
// });

/* GET currentuser */
// router.get('/me', async (req, res, next) => {
//   try {
//     // Get the user ID
//     const userId = req.user.id;

//     // Find the user by ID
//     const currentUser = await User.findByPk(userId);

//     // If the user is not found, send a 404 error
//     if (!currentUser) {
//       return res.status(404).json({ error: 'user not found' });
//     }

//     // Return the user information
//     res.status(200).json({ currentUser });
//   } catch (error) {
//     // If there is an error, send the error message to the client
//     next(error);
//   }
// });

/* POST */
router.post("/", async (req, res, next) => {
  const { role, firstName, lastName, email, phoneNumber, password } = req.body;

  // Check if the provided email is valid
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Invalid email address" });
  }

  try {
    // Create the user if the email is valid
    const user = await User.create({
      role,
      firstName,
      lastName,
      email,
      phoneNumber,
      password,
    });

    res.json({ user });
  } catch (error) {
    next(error);
  }
});

/* PUT */
router.put("/:userId", async (req, res, next) => {
  try {
    // Get the user ID from the URL
    const userId = req.params.userId;
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Update user data with the information provided in the request body
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.email = req.body.email;
    user.phoneNumber = req.body.phoneNumber;

    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);

      user.password = hashedPassword;
    }

    await user.save();

    res.json({ message: "User updated", user });
  } catch (error) {
    // Handle any error that occurs using the update route
    next(error);
  }
});

/* DELETE */
router.delete("/:userId", async (req, res, next) => {
  try {
    // Get the user ID from the URL
    const userId = req.params.userId;
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    await user.destroy();

    res.json({ message: "User deleted" });
  } catch (error) {
    // Handle any error that occurs using the delete route
    next(error);
  }
});

/* DELETE */
router.delete("/", async function (req, res, next) {
  const id = 2;
  const user = await User.findByPk(is);
  await user.destoy();
  res.json({ user });
});

module.exports = router;
