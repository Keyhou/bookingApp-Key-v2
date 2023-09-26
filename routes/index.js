const express = require('express');
const router = express.Router();

const reservationRouter = require('./reservation');
const roomRouter = require('./room');
const spotRouter = require('./spot');
const userRouter = require('./user');

router.use('/reservation', reservationRouter);
router.use('/room', roomRouter);
router.use('/spot', spotRouter);
router.use('/user', userRouter);

module.exports = router;