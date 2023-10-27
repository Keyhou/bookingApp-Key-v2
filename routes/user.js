const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { User } = require('../db.js');
const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
const SECRET_KEY = 'secretkey23456';

// Middleware to authenticate the user using JWT
function authenticateUser(req, res, next) {
  const token = req.header('x-auth-token');

  if (!token) {
    return res.status(401).json({ message: 'No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).json({ message: 'Invalid token' });
  }
}

/* GET */
router.get('/', async (req, res, next) => {
  try {
      const users = await User.findAll();
      res.json({ users });
  } catch (error) {
      next(error);
  }
});

/* GET the connected user */
router.get('/me', authenticateUser, async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        email: req.user.email,
      },
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ user });
  } catch (error) {
    next(error);
  }
});


/* POST */
router.post('/', async (req, res, next) => {
  const { role, firstName, lastName, email, phoneNumber, password } = req.body;

  // Check if the provided email is valid
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Invalid email address' });
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
router.put('/', async function(req, res, next) {
    const id = 1;
    const user = await User.findByPk(is);
    user.note = 'sunset view please';
    await user.save();
    res.json({ user });
});

/* DELETE */
router.delete('/', async function(req, res, next) {
    const id = 2;
    const user = await User.findByPk(is);
    await user.destoy();
    res.json({ user });
});

module.exports = router;