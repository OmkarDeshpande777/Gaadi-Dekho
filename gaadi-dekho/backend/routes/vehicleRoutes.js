const express = require('express');
const router = express.Router();
const Vehicle = require('../models/Vehicle');
const CityTax = require('../models/CityTax');
const { protect } = require('../middleware/authMiddleware');

// Get all vehicles with pagination and filtering
router.get('/', async (req, res) => {
  try {
    const pageSize = Number(req.query.pageSize) || 10;
    const page = Number(req.query.pageNumber) || 1;
    
    const filter = {};
    
    // Apply filters if provided
    if (req.query.brand) filter.brand = req.query.brand;
    if (req.query.model) filter.model = { $regex: req.query.model, $options: 'i' };
    if (req.query.vehicleType) filter.vehicleType = req.query.vehicleType;
    if (req.query.fuelType) filter.fuelType = req.query.fuelType;
    if (req.query.transmission) filter.transmission = req.query.transmission;
    
    if (req.query.minPrice && req.query.maxPrice) {
      filter.exShowroomPrice = { 
        $gte: Number(req.query.minPrice), 
        $lte: Number(req.query.maxPrice) 
      };
    } else if (req.query.minPrice) {
      filter.exShowroomPrice = { $gte: Number(req.query.minPrice) };
    } else if (req.query.maxPrice) {
      filter.exShowroomPrice = { $lte: Number(req.query.maxPrice) };
    }
    
    if (req.query.minMileage) {
      filter.mileage = { $gte: Number(req.query.minMileage) };
    }
    
    if (req.query.year) {
      filter.year = Number(req.query.year);
    }
    
    const count = await Vehicle.countDocuments(filter);
    const vehicles = await Vehicle.find(filter)
      .limit(pageSize)
      .skip(pageSize * (page - 1))
      .sort({ createdAt: -1 });
    
    res.json({
      vehicles,
      page,
      pages: Math.ceil(count / pageSize),
      count
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Get all brands
router.get('/brands', async (req, res) => {
  try {
    const brands = await Vehicle.distinct('brand');
    res.json(brands);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Get all models by brand
router.get('/models/:brand', async (req, res) => {
  try {
    const models = await Vehicle.distinct('model', { brand: req.params.brand });
    res.json(models);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Get vehicle types
router.get('/types', async (req, res) => {
  try {
    const types = await Vehicle.distinct('vehicleType');
    res.json(types);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Get vehicle by ID
router.get('/:id', async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);
    
    if (vehicle) {
      res.json(vehicle);
    } else {
      res.status(404).json({ message: 'Vehicle not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Calculate on-road price
router.get('/:id/onroad-price/:city', async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);
    
    if (!vehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }
    
    const cityTax = await CityTax.findOne({ city: req.params.city });
    
    if (!cityTax) {
      return res.status(404).json({ message: 'City tax details not found' });
    }
    
    // Calculate on-road price
    const exShowroomPrice = vehicle.exShowroomPrice;
    const roadTaxAmount = (exShowroomPrice * cityTax.roadTax) / 100;
    const registrationFee = cityTax.registrationFee;
    
    // Insurance calculation (simplified)
    const insuranceAmount = (exShowroomPrice * 0.03) * cityTax.insuranceFactor;
    
    const onRoadPrice = exShowroomPrice + roadTaxAmount + registrationFee + insuranceAmount + cityTax.otherCharges;
    
    res.json({
      exShowroomPrice,
      roadTaxAmount,
      registrationFee,
      insuranceAmount,
      otherCharges: cityTax.otherCharges,
      onRoadPrice: Math.round(onRoadPrice),
      city: req.params.city,
      state: cityTax.state
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Add vehicle to favorites (protected route)
router.post('/:id/favorite', protect, async (req, res) => {
  try {
    const user = req.user;
    const vehicleId = req.params.id;
    
    // Check if vehicle exists
    const vehicle = await Vehicle.findById(vehicleId);
    if (!vehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }
    
    // Check if already in favorites
    if (user.favoriteVehicles.includes(vehicleId)) {
      return res.status(400).json({ message: 'Vehicle already in favorites' });
    }
    
    // Add to favorites
    user.favoriteVehicles.push(vehicleId);
    await user.save();
    
    res.json({ message: 'Vehicle added to favorites' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Remove vehicle from favorites (protected route)
router.delete('/:id/favorite', protect, async (req, res) => {
  try {
    const user = req.user;
    const vehicleId = req.params.id;
    
    // Remove from favorites
    user.favoriteVehicles = user.favoriteVehicles.filter(
      id => id.toString() !== vehicleId
    );
    
    await user.save();
    
    res.json({ message: 'Vehicle removed from favorites' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;