const { Reservation } = require("../db.js");


/* GET all reservations */
async function getAllReservations(req, res, next) {
    try {
        const reservations = await Reservation.findAll();
        res.json({ reservations });
    } catch (error) {
        next(error);
    }
}

/* POST: Create a reservation */
async function createReservation(req, res, next) {
    try {
      const { date, name, note, status, userId, spotId, roomId } = req.body; // Use req.body to access request data, not req.params.body

      // Check if the spot is already reserved for the given date and time
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

      // Create the reservation
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
};

  /* PUT: Update a reservation */
  async function updateReservation(req, res, next) {
    try {
      const { id } = req.params;
      const { date, name, note, status, userId, spotId, roomId } = req.body;
  
      // Find the reservation by ID
      let reservation = await Reservation.findByPk(id);
  
      if (!reservation) {
        return res
          .status(404)
          .json({ error: `Reservation with id:${id} not found` });
      }
  
      // Update the reservation attributes
      reservation.date = date;
      reservation.name = name;
      reservation.note = note;
      reservation.status = status;
      reservation.userId = userId;
      reservation.spotId = spotId;
      reservation.roomId = roomId;
  
      // Save the updated reservation
      await reservation.save();
  
      res.json({ message: "Reservation updated successfully" });
    } catch (error) {
      next(error);
    }
  };
  
  /* DELETE: Delete a reservation */
  async function deleteReservation(req, res, next) {
    const reservationId = req.params.reservationId;
  
    // Delete the reservation by ID
    try {
      const rowsDeleted = await Reservation.destroy({
        where: { id: reservationId },
      });
  
      if (rowsDeleted === 0) {
        return res.status(404).json({ message: "Reservation not found." });
      }
  
      res.status(200).json({ message: "Reservation deleted." });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "An error occurred while deleting the reservation." });
      next(error);
    }
  };

module.exports = {
    getAllReservations,
    createReservation,
    updateReservation,
    deleteReservation
};