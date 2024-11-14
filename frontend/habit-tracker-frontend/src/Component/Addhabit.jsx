import React, { useState } from 'react';
import '../Styles/habit.css';

export const AddHabit = () => {
  const [habitData, setHabitData] = useState({
    name: '',
    category: '',
    frequency: 'Daily',
  });

  const categories = ['Health', 'Productivity', 'Hobbies', 'Wellness', 'Learning'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHabitData({
      ...habitData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const currentDate = new Date().toLocaleDateString();

    // Get existing habits from local storage
    const existingHabits = JSON.parse(localStorage.getItem(currentDate)) || [];

    // Add new habit to the list
    existingHabits.push({ ...habitData, checked: false });

    // Save updated habits to local storage
    localStorage.setItem(currentDate, JSON.stringify(existingHabits));

    // Reset form after submission
    setHabitData({
      name: '',
      category: '',
      frequency: 'Daily',
    });
  };

  return (
    <div>
      <h2>Add New Habit</h2>
      <form onSubmit={handleSubmit}>
        <h2>Enter Your New Habit</h2>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={habitData.name}
            onChange={handleChange}
            placeholder="Enter your habit name"
            required
          />
        </div>

        <div>
          <label>Category:</label>
          <select name="category" value={habitData.category} onChange={handleChange} required>
            <option value="" disabled>Select Category</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>{category}</option>
            ))}
          </select>
        </div>

        <div>
          <label>Frequency:</label>
          <select name="frequency" value={habitData.frequency} onChange={handleChange}>
            <option value="Daily">Daily</option>
            <option value="Today Only">Today Only</option>
          </select>
        </div>

        <button type="submit">Add Habit</button>
      </form>
    </div>
  );
};
