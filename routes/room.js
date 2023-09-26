const express = require('express');
const router = express.Router();

const { Room } = require('../db.js');

/* GET */
router.get('/', async (req, res, next) => {
  try {
      const rooms = await Room.findAll();
      res.json({ rooms });
  } catch (error) {
      next(error);
  }
});

/* POST */
router.post('/', async (req, res, next) => {
  const room = await Room.create({
    name: 'magnifica'
  });
  res.json({room });
});

/* PUT */
router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
console.log(name);
    let room = await Room.findByPk(id);

    if (!room) {
      return res.status(404).json({ error: `Room with id:${id} not found` });
    }

    // Update the room attribute
    room.name = name;
    console.log(room);
    
    await room.save();

    res.json({ room });
  } catch (error) {
    next(error);
  }
});

/* DELETE */
router.delete('/', async function(req, res, next) {
    const id = 2;
    const room = await Room.findByPk(is);
    await room.destoy();
    res.json({ room });
});

module.exports = router;