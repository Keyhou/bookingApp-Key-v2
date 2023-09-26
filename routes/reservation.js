const express = require('express');
const router = express.Router();
const { Reservation } = require('../db.js');

/* GET */
router.get('/', async (req, res, next) => {
  try {
    const reservations = await Reservation.findAll();
    res.json({ reservations });
  } catch (error) {
    next(error);
  }
});

/* POST */
router.post('/', async (req, res, next) => {
  const reservation = await Reservation.create({
    date: Date.now(),
    name: 'Key',
    note: 'Terrace',
    status: 1,
    userId: 1,
    spotId: 1,
    roomId: 1
  });
  res.json({ reservation });
});

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
router.delete('/', async (req, res, next) => {
  try {
    const { id } = req.body;

    if (!id || typeof id !== 'number' || !Number.isInteger(id)) {
      return res.status(422).json({ error: "Invalid reservation_id. It should be a whole number" });
    }

    const deletedReservation = await Reservation.destroy({
      where: {
        id: id
      }
    });

    if (deletedReservation === 0) {
      return res.status(404).json({ error: `Reservation with id:${id} not found` });
    }

    res.json({ message: `Reservation with id:${id} was deleted` });
  } catch (error) {
    next(error);
  }
});



module.exports = router;