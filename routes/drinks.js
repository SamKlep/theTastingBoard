const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');

const Drink = require('../models/Drink');
const User = require('../models/User');

// @route       POST api/drinks
// @desc        Get all users drinks
// @access      Private
router.get('/', auth, async (req, res) => {
  try {
    const drinks = await Drink.find({ user: req.user.id }).sort({
      date: -1
    });
    res.json(drinks);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route       POST api/drinks
// @desc        Add new drink
// @access      Private
router.post(
  '/',
  [
    auth,
    [
      check('name', 'Name is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, type, date, description } = req.body;

    try {
      const newDrink = new Drink({
        name,
        type,
        date,
        description,
        user: req.user.id
      });

      const drink = await newDrink.save();

      res.json(drink);
    } catch (err) {
      console.error(err.message);
      res.send(500).send('Server Error');
    }
  }
);

// @route       PUT api/drinks/:id
// @desc        Update drink
// @access      Private
router.put('/:id', auth, async (req, res) => {
  const { name, type, date, description } = req.body;

  // Build a contact object
  const contactFields = {};
  if (name) contactFields.name = name;
  if (type) contactFields.type = type;
  if (date) contactFields.date = date;
  if (description) contactFields.description = description;

  try {
    let drink = await Drink.findById(req.params.id);

    if (!drink) return res.status(404).json({ msg: 'Drink not found' });

    // Make sure user owns drink
    if (drink.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    drink = await Drink.findByIdAndUpdate(
      req.params.id,
      { $set: contactFields },
      { new: true }
    );

    res.json(drink);
  } catch (err) {
    console.error(err.message);
    res.send(500).send('Server Error');
  }
});

// @route       DELETE api/drinks/:id
// @desc        Delete a drink
// @access      Private
router.delete('/:id', auth, async (req, res) => {
  try {
    let drink = await Drink.findById(req.params.id);

    if (!drink) return res.status(404).json({ msg: 'Drink not found' });

    // Make sure user owns drink
    if (drink.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    await Drink.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Drink removed' });
  } catch (err) {
    console.error(err.message);
    res.send(500).send('Server Error');
  }
});

module.exports = router;
