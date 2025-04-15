const mongoose = require('mongoose');
const dotenv = require('dotenv');
const vehicles = require('./data/vehicles');
const cityTaxes = require('./data/cityTaxes');
const Vehicle = require('./models/Vehicle');
const CityTax = require('./models/CityTax');
const User = require('./models/User');

// Load env vars
dotenv.config();

// Connect to DB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Import data into DB
const importData = async () => {
  try {
    // Clear existing data
    await Vehicle.deleteMany();
    await CityTax.deleteMany();
    
    // Import new data
    await Vehicle.insertMany(vehicles);
    await CityTax.insertMany(cityTaxes);
    
    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// Delete data from DB
const destroyData = async () => {
  try {
    await Vehicle.deleteMany();
    await CityTax.deleteMany();
    await User.deleteMany();
    
    console.log('Data Destroyed!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// Run script based on argument
if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}