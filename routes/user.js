const express = require('express');
const router = express.Router();

const { User } = require('../db.js');

/* GET */
router.get('/', async (req, res, next) => {
  try {
      const users = await User.findAll();
      res.json({ users });
  } catch (error) {
      next(error);
  }
});

/* POST */
router.post('/', async (req, res, next) => {
  const user = await User.create({
    role: "client",
    firstName: "Key",
    lastName: "Mtz",
    email: "key@key.key",
    phoneNumber: "0612345678",
    password: "iphone15"
  });
  res.json({ user });
  
})

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