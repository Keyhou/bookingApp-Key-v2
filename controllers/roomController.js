const { Room } = require("../db.js");
const isAdmin = require("../middlewares/isAdmin.middleware.js");

/* GET all */
async function getAllRooms(req, res, next) {
	try {
		const rooms = await Room.findAll();
		res.json({ rooms });
	} catch (error) {
		next(error);
	}
}

// /* GET Room */
// router.get("/", async (req, res, next) => {
// 	const rooms = await Room.findAll();
// 	res.json({ rooms });
// });

// /* POST */
// router.post('/', async (req, res, next) => {
//   const room = await Room.create({
//     name: 'magnifica'
//   });
//   res.json({room });
// });

/* Post Room */
async function createRoom(req, res, next) {
	const { name } = req.body;

	if (!name) {
		return res.status(400).json({ error: "Room name is required." });
	}

	const room = await Room.create({ name });
	res.json({ room });
}

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
async function updateRoom(req, res, next) {
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
}

// /* DELETE */
// router.delete('/', async function(req, res, next) {
//     const id = 2;
//     const room = await Room.findByPk(is);
//     await room.destoy();
//     res.json({ room });
// });

/* Delete Room */
async function deleteRoom(req, res, next) {
	const { roomId } = req.params;
	const room = await Room.findByPk(roomId);

	try {
		if (!room) {
			return res.status(404).json({ error: "Room not found." });
		}

		await room.destroy();
		res.json({ message: "Room deleted." });
	} catch (error) {
		console.error(error);
		res
			.status(500)
			.json({ error: "An error occurred while deleting the room." });
		next(error);
	}
}

module.exports = {
    getAllRooms,
    createRoom,
    updateRoom,
    deleteRoom
};