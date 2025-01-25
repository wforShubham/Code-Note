
const mongoose = require('mongoose');
require("dotenv").config();



const connectToMongo = async () => {
  try {
    await mongoose.connect(process.env.CONNECTION_STRING); // Use IPv4 explicitly
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err.message);
  }
};

module.exports = connectToMongo;
