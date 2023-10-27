const express = require('express');
const router = express.Router();
const { User } = require('../db.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const SECRET_KEY = 'secretkey23456'; // A remplacer par une clé secrète

// SIGN UP
router.post('/signup', async (req, res) => {
    // if req.body.password is empty, add "Password field is empty"
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const { role, firstName, lastName, email, phoneNumber } = req.body;
    const newUser = await User.create({
        role,
        firstName,
        lastName,
        email,
        phoneNumber,
        password: hashedPassword
    });
    
    await User.create(newUser);
    res.json({ message: 'User created', newUser })
});

// SIGN IN
router.post('/signin', async (req, res) => {
  const user = await User.findOne({
    where: {
      email: req.body.email,
    },
  });
    if (!user) return res.status(400).json({message: `Incorrect mail or password`, status: 400});
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).json({message: `Incorrect mail or password`});
    const payload = {
    email: user.email,
    password: req.body.password
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
  res.status(201).json({ jwt: token});
  res.json({message: token});
});

module.exports = router;

