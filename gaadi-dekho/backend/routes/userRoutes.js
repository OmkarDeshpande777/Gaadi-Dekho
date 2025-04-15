const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { protect } = require('../middleware/authMiddleware');
const jwt = require('jsonwebtoken');

// Register a new user
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, city } = req.body;
    
    // Check if user already exists
    const userExists = await User.findOne({ email });
    
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }
    
    // Create new user
    const user = await User.create({
      name,
      email,
      password,
      city: city || 'Delhi'
    });
    
    if (user) {
      // Generate JWT token
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
      });
      
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        city: user.city,
        token
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Login user
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find user by email
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    
    // Check password
    const isMatch = await user.comparePassword(password);
    
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    
    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE
    });
    
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      city: user.city,
      token
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Get user profile (protected route)
router.get('/profile', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Update user profile (protected route)
router.put('/profile', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.city = req.body.city || user.city;
      
      if (req.body.password) {
        user.password = req.body.password;
      }
      
      const updatedUser = await user.save();
      
      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        city: updatedUser.city
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Get user's favorite vehicles (protected route)
router.get('/favorites', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('favoriteVehicles');
    
    if (user) {
      res.json(user.favoriteVehicles);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Save search (protected route)
router.post('/save-search', protect, async (req, res) => {
  try {
    const { name, filters } = req.body;
    
    if (!name || !filters) {
      return res.status(400).json({ message: 'Name and filters are required' });
    }
    
    const user = await User.findById(req.user._id);
    
    if (user) {
      // Check if name already exists
      const searchExists = user.savedSearches.find(s => s.name === name);
      
      if (searchExists) {
        return res.status(400).json({ message: 'Search name already exists' });
      }
      
      user.savedSearches.push({ name, filters });
      await user.save();
      
      res.status(201).json({ message: 'Search saved successfully' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Get saved searches (protected route)
router.get('/saved-searches', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    
    if (user) {
      res.json(user.savedSearches);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Delete saved search (protected route)
router.delete('/saved-searches/:id', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    
    if (user) {
      // Find and remove the saved search
      user.savedSearches = user.savedSearches.filter(
        search => search._id.toString() !== req.params.id
      );
      
      await user.save();
      
      res.json({ message: 'Saved search removed' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;