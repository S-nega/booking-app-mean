// models/houseBooking.js
const mongoose = require('mongoose');

const houseBookingSchema = new mongoose.Schema({
  house: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'House',
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  finalCost: {
    type: Number,
    required: true,
  },
  contactInfo: {
    type: String,
    required: true,
  },
  image: {
    type: String, 
  },
});


const HouseBooking = mongoose.model('HouseBooking', houseBookingSchema);

module.exports = HouseBooking;