const express = require('express');
const router = express.Router();
const CityTax = require('../models/CityTax');

// Get all cities
router.get('/', async (req, res) => {
  try {
    const cities = await CityTax.find({}).select('city state');
    res.json(cities);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Get city tax details by city name
router.get('/:cityName', async (req, res) => {
  try {
    const cityTax = await CityTax.findOne({ 
      city: { $regex: new RegExp(`^${req.params.cityName}$`, 'i') } 
    });
    
    if (cityTax) {
      res.json(cityTax);
    } else {
      res.status(404).json({ message: 'City tax details not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;