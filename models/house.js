// models/house.js
const mongoose = require('mongoose');

const houseSchema = new mongoose.Schema({
  location: {
    type: String,
    required: true,
  },
  houseType: {
    type: String,
    required: true,
  },
  numberOfRooms: {
    type: Number,
    required: true,
  },
  monthlyCost: {
    type: Number,
    required: true,
  },
  contactInfo: {
    type: String,
    required: true,
  },
});

const House = mongoose.model('House', houseSchema);

module.exports = House;