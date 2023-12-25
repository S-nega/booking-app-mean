const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true
  },
  bookedHouses: {
    type: [mongoose.Schema.Types.ObjectId] ,
    ref: 'HouseBooking', // Предполагается, что у вас есть модель House
  },
  isAdmin: {
    type: Boolean,
    default: false // По умолчанию пользователь не является администратором
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
