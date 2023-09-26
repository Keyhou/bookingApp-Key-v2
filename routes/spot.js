const express = require('express');
const router = express.Router();

const { Spot } = require('../db.js');

/* GET */
router.get('/', async (req, res, next) => {
  try {
      const spots = await Spot.findAll();
      res.json({ spots });
  } catch (error) {
      next(error);
  }
});

/* POST */
router.post('/', async (req, res, next) => {
  const spot = await Spot.create({
    name: 'hatsarany'
  });
  res.json({ spot });
});

/* PUT */
router.put('/:id', async (req, res, next) => {
  try {
    const {id}  = req.params;
    const {name} = req.body;

    let spot = await Spot.findByPk(id);

    if (!spot) {
      return res.status(404).json({ error: `Spot with id:${id} not found` });
    }

    // Update the spot attribute
    spot.name = name;
    
    await spot.save();

    res.json({ message: "Spot updated successfully" });
  } catch (error) {
    next(error);
  }
});

/* DELETE */
router.delete('/', async function(req, res, next) {
    const id = 2;
    const spot = await Spot.findByPk(is);
    await spot.destoy();
    res.json({ spot });
});

module.exports = router;