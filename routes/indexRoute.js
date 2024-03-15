const express = require("express");
const router = express.Router();
const indexController = require('../controllers/indexController.js');

// GET home page
router.get('/', indexController.getHomePage);

// POST
router.post('/', indexController.createResource);

// PUT
router.put('/', indexController.updateResource);

// DELETE
router.delete('/', indexController.deleteResource);

const reservationRouter = require('./reservationRoute');
const roomRouter = require("./roomRoute");
const spotRouter = require("./spotRoute");
const userRouter = require("./userRoute");
const authRouter = require("./authRoute");

router.use("/reservation", reservationRouter);
router.use("/room", roomRouter);
router.use("/spot", spotRouter);
router.use("/user", userRouter);
router.use("/auth", authRouter);

module.exports = router;
