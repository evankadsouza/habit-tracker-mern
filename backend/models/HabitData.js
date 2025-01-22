const mongoose = require('mongoose');

const habitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  frequency: {
    type: String,
    required: true,
  },
  checked: {
    type: Boolean,
    default: false,
  },
  date: {
    type: String,
    required: true,
  },
});

const HabitData = mongoose.model('HabitData', habitSchema);

module.exports = HabitData;
