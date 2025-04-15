const mongoose = require('mongoose');

const cityTaxSchema = new mongoose.Schema({
  city: {
    type: String,
    required: true,
    unique: true
  },
  state: {
    type: String,
    required: true
  },
  roadTax: {
    type: Number,  // Percentage
    required: true
  },
  registrationFee: {
    type: Number,  // Fixed amount
    required: true
  },
  insuranceFactor: {
    type: Number,
    required: true,
    default: 1.0
  },
  otherCharges: {
    type: Number,
    default: 0
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('CityTax', cityTaxSchema);