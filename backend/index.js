const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const HabitData = require('./models/HabitData.js');  // Import the HabitData model

require('dotenv').config();  // Load environment variables

const app = express();

app.use(cors());
app.use(bodyParser.json());

// MongoDB connection using MONGO_URL from environment variables
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.log('MongoDB connection error:', err));

// Route to add a new habit
app.post('/addhabits', async (req, res) => {
  const { name, category, frequency } = req.body;
  const currentDate = new Date().toLocaleDateString();

  const newHabit = new HabitData({
    name,
    category,
    frequency,
    date: currentDate,
  });

  try {
    await newHabit.save();
    res.status(201).json({ message: 'Habit added successfully!' });
  } catch (error) {
    res.status(400).json({ message: 'Error adding habit', error });
  }
});

// Route to get habits for today
app.get('/gethabits', async (req, res) => {
  const currentDate = new Date().toLocaleDateString();

  try {
    const habits = await HabitData.find({ date: currentDate });
    res.status(200).json(habits);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching habits', error });
  }
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
