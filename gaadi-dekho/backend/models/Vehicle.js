const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
  brand: {
    type: String,
    required: true,
    index: true
  },
  model: {
    type: String,
    required: true,
    index: true
  },
  year: {
    type: Number,
    required: true,
    index: true
  },
  vehicleType: {
    type: String,
    enum: ['sedan', 'suv', 'hatchback', 'muv', 'luxury', 'electric'],
    required: true,
    index: true
  },
  fuelType: {
    type: String,
    enum: ['petrol', 'diesel', 'electric', 'hybrid', 'cng'],
    required: true,
    index: true
  },
  transmission: {
    type: String,
    enum: ['manual', 'automatic', 'amt', 'cvt', 'dct'],
    required: true,
    index: true
  },
  engineCapacity: {
    type: Number, // in cc
    required: true
  },
  mileage: {
    type: Number, // in km/l
    required: true,
    index: true
  },
  exShowroomPrice: {
    type: Number,
    required: true,
    index: true
  },
  colors: [String],
  images: [String], // URLs to vehicle images
  specifications: {
    dimensions: {
      length: Number, // in mm
      width: Number, // in mm
      height: Number, // in mm
      wheelbase: Number, // in mm
      groundClearance: Number // in mm
    },
    engine: {
      type: String,
      displacement: Number, // in cc
      maxPower: String, // e.g., "140 BHP @ 5000 RPM"
      maxTorque: String, // e.g., "200 NM @ 2000 RPM"
      cylinder: Number,
      valvesPerCylinder: Number
    },
    safety: [{
      type: String // e.g., "ABS", "Airbags", "ESP", etc.
    }],
    features: [{
      type: String // e.g., "Touchscreen Infotainment", "Sunroof", etc.
    }]
  },
  variants: [{
    name: String,
    exShowroomPrice: Number,
    features: [String]
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Create indexes for efficient querying
vehicleSchema.index({ brand: 1, model: 1 });


module.exports = mongoose.model('Vehicle', vehicleSchema);