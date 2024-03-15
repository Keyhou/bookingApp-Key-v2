const { Spot } = require("../db.js");

const isAdmin = require("../middlewares/isAdmin.middleware.js");

/* GET */
async function getAllSpots(req, res, next) {
	try {
		const spots = await Spot.findAll();
		res.json({ spots });
	} catch (error) {
		next(error);
	}
};

// /* POST */
// router.post('/', async (req, res, next) => {
//   const spot = await Spot.create({
//     name: 'hatsarany'
//   });
//   res.json({ spot });
// });

/* POST Spot */
async function createSpot(req, res, next) {
	try {
		const { name } = req.body;

		if (!name) {
			return res.status(400).json({ error: "Spot name is required." });
		}

		const spot = await Spot.create({
			name: name,
		});

		res.json({ spot });
	} catch (error) {
		res
			.status(500)
			.json({ error: "An error occurred while creating the spot." });
	}
};

// /* PUT */
// router.put('/:id', async (req, res, next) => {
//   try {
//     const {id}  = req.params;
//     const {name} = req.body;

//     let spot = await Spot.findByPk(id);

//     if (!spot) {
//       return res.status(404).json({ error: `Spot with id:${id} not found` });
//     }

//     // Update the spot attribute
//     spot.name = name;

//     await spot.save();

//     res.json({ message: "Spot updated successfully" });
//   } catch (error) {
//     next(error);
//   }
// });

/* PUT */
async function updateSpot(req, res, next) {
	try {
		const { spotId } = req.params;
		const { name } = req.body;

		if (!name) {
			return res.status(400).json({ error: "Spot name is required." });
		}

		const spot = await Spot.findByPk(spotId);

		if (!spot) {
			return res.status(404).json({ error: "Spot not found." });
		}

		spot.name = name;
		await spot.save();

		res.json({ message: "Spot updated." });
	} catch (error) {
		res
			.status(500)
			.json({ error: "An error occurred while updating the spot." });
	}
};

// /* DELETE */
// router.delete('/delete', async function(req, res, next) {
//     const id = 2;
//     const spot = await Spot.findByPk(is);
//     await spot.destoy();
//     res.json({ spot });
// });

/* DELETE Spot */
async function deleteSpot(req, res, next) {
	try {
		const { spotId } = req.params;
		const spot = await Spot.findByPk(spotId);

		if (!spot) {
			return res.status(404).json({ error: "Spot not found." });
		}

		await spot.destroy();

		res.json({ message: "Spot deleted." });
	} catch (error) {
		res
			.status(500)
			.json({ error: "An error occurred while deleting the spot." });
	}
};

module.exports = {
    getAllSpots,
    createSpot,
    updateSpot,
    deleteSpot
};
