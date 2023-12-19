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
  },
  contactInfo: {
    type: String,
    required: true,
  },
  // Другие поля, если необходимо
});

// Виртуальное поле для расчета стоимости на основе сроков аренды
houseBookingSchema.virtual('durationInDays').get(function () {
  const start = this.startDate.getTime();
  const end = this.endDate.getTime();
  const durationInDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
  return durationInDays;
});

// Middleware для расчета конечной стоимости и обновления finalCost
houseBookingSchema.pre('save', function (next) {
  // Алгоритм расчета конечной стоимости
  this.finalCost = this.durationInDays * (this.house.monthlyCost / 30);
  next();
});

const HouseBooking = mongoose.model('HouseBooking', houseBookingSchema);

module.exports = HouseBooking;
