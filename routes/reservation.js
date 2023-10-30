const express = require('express');
const router = express.Router();

const { Reservation } = require('../db.js');

/* GET all */
router.get('/', async (req, res, next) => {
  try {
    const reservations = await Reservation.findAll();
    res.json({ reservations });
  } catch (error) {
    next(error);
  }
});

/* POST */
router.post("/", async (req, res, next) => {
  try {
    const {
      date,
      name,
      note,
      status,
      userId,
      spotId,
      roomId } = req.params.body;

    const existingReservation = await Reservation.findOne({
      where: {
        spotId,
        date,
      },
    });

    if (existingReservation) {
      return res
        .status(400)
        .json({ error: "Spot is already reserved for this date and time." });
    }

    const reservation = await Reservation.create({
      date,
      name,
      note,
      status,
      userId,
      spotId,
      roomId,
    });

    res.json({ reservation });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the reservation." });
    next(error);
  }
});

// router.post('/', async (req, res, next) => {
//   const reservation = await Reservation.create({
//     date: Date.now(),
//     name: 'Key',
//     note: 'Terrace',
//     status: 1,
//     userId: 1,
//     spotId: 1,
//     roomId: 1
//   });
//   res.json({ reservation });
// });

// PUT: update a reservation
router.put('/:id', async (req, res, next) => {
  try {
    const {id}= req.params;
    const {
      date,
      name,
      note,
      status,
      userId,
      spotId,
      roomId
    } = req.body;

    let reservation = await Reservation.findByPk(id);

    if (!reservation) {
      return res.status(404).json({ error: `Reservation with id:${id} not found` });
    }

    // Update the reservation attributes
    reservation.date = date;
    reservation.name = name;
    reservation.note = note;
    reservation.status = status;
    reservation.userId = userId;
    reservation.spotId = spotId;
    reservation.roomId = roomId;

    await reservation.save();

    res.json({ message: 'Reservation updated successfully' });
  } catch (error) {
    next(error);
  }
});

/* DELETE */
router.delete("/:reservationId", (req, res, next) => {
  const reservationId = req.params.reservationId;

  Reservation.destroy({
    where: { id: reservationId },
  })
    .then((rowsDeleted) => {
      if (rowsDeleted === 0) {
        return res.status(404).json({ message: "Reservation not found." });
      }
      res.status(200).json({ message: "Reservation deleted." });
    })
    .catch((error) => {
      console.error(error);
      res
        .status(500)
        .json({ error: "An error occurred while deleting the reservation." });
    });
});



module.exports = router;