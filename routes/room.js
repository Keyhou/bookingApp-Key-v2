const express = require("express");
const router = express.Router();

const { Room } = require("../db.js");
const { isAdmin } = require("./isAdmin.js");

/* GET all */
router.get("/", async (req, res, next) => {
  try {
    const rooms = await Room.findAll();
    res.json({ rooms });
  } catch (error) {
    next(error);
  }
});

/* GET Room */
router.get("/", async (req, res, next) => {
  const rooms = await Room.findAll();
  res.json({ rooms });
});

// /* POST */
// router.post('/', async (req, res, next) => {
//   const room = await Room.create({
//     name: 'magnifica'
//   });
//   res.json({room });
// });

/* Post Room */
router.post("/", async (req, res, next) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: "Room name is required." });
  }

  const room = await Room.create({ name });
  res.json({ room });
});

// /* PUT */
// router.put('/:id', async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const { name } = req.body;
// console.log(name);
//     let room = await Room.findByPk(id);

//     if (!room) {
//       return res.status(404).json({ error: `Room with id:${id} not found` });
//     }

//     // Update the room attribute
//     room.name = name;
//     console.log(room);

//     await room.save();

//     res.json({ room });
//   } catch (error) {
//     next(error);
//   }
// });

/* Put Room. */
router.put("/:roomId", async (req, res, next) => {
  const { roomId } = req.params;
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: "Room name is required." });
  }

  const room = await Room.findByPk(roomId);

  if (!room) {
    return res.status(404).json({ error: "Room not found." });
  }

  room.name = name;
  await room.save();
  res.json({ room });
});

// /* DELETE */
// router.delete('/', async function(req, res, next) {
//     const id = 2;
//     const room = await Room.findByPk(is);
//     await room.destoy();
//     res.json({ room });
// });

/* Delete Room */
router.delete("/:roomId", async (req, res, next) => {
  const { roomId } = req.params;
  const room = await Room.findByPk(roomId);

  if (!room) {
    return res.status(404).json({ error: "Room not found." });
  }

  await room.destroy();
  res.json({ message: "Room deleted." });
});

module.exports = router;
