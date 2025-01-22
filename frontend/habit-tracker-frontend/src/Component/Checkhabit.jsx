import React, { useEffect, useState } from 'react';

export const Checkhabit = () => {
  const [habits, setHabits] = useState([]);
  const [checkedHabits, setCheckedHabits] = useState({});
  const currentDate = new Date().toLocaleDateString();

  useEffect(() => {
    // Fetch habits from the backend for today's date
    const fetchHabits = async () => {
      try {
        const response = await fetch('http://localhost:5000/gethabits');
        if (!response.ok) {
          throw new Error('Failed to fetch habits');
        }
        const data = await response.json();
        setHabits(data);

        // Initialize checked habits state
        const initialCheckedState = {};
        data.forEach((habit, index) => {
          initialCheckedState[index] = habit.checked || false;
        });
        setCheckedHabits(initialCheckedState);
      } catch (error) {
        console.error('Error fetching habits:', error.message);
      }
    };

    fetchHabits();
  }, [currentDate]);

  const handleCheckboxChange = (index) => {
    const updatedCheckedHabits = { ...checkedHabits, [index]: !checkedHabits[index] };
    setCheckedHabits(updatedCheckedHabits);

    // Update the checked status in the backend
    const updatedHabits = habits.map((habit, i) => ({
      ...habit,
      checked: i === index ? updatedCheckedHabits[index] : habit.checked,
    }));

    // Send updated habit status to the backend
    const updateHabitStatus = async () => {
      try {
        const response = await fetch('http://localhost:5000/gethabits', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedHabits),
        });

        if (!response.ok) {
          throw new Error('Failed to update habit status');
        }
      } catch (error) {
        console.error('Error updating habit status:', error.message);
      }
    };

    updateHabitStatus();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const completedTasks = Object.values(checkedHabits).filter(Boolean).length;
    alert(`You have completed ${completedTasks} task(s) today!`);
  };

  return (
    <div>
      <h2>Check Your Habits for {currentDate}</h2>
      <form onSubmit={handleSubmit}>
        {habits.map((habit, index) => (
          <div key={index}>
            <label>
              <input
                type="checkbox"
                checked={checkedHabits[index] || false}
                onChange={() => handleCheckboxChange(index)}
              />
              {habit.name} - {habit.category}
            </label>
          </div>
        ))}
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
