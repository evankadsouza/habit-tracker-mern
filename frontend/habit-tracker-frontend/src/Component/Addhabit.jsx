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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/addhabits', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(habitData),
      });

      if (!response.ok) {
        throw new Error('Failed to add habit');
      }

      const data = await response.json();
      console.log(data.message);  // Handle success response
      alert(data.message)

      // Reset form after submission
      setHabitData({
        name: '',
        category: '',
        frequency: 'Daily',
      });
    } catch (error) {
      console.error('Error adding habit:', error.message);  // Handle error response
    }
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
