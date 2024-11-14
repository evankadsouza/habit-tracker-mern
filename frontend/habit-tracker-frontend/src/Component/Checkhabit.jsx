import React, { useEffect, useState } from 'react';

export const Checkhabit = () => {
  const [habits, setHabits] = useState([]);
  const [checkedHabits, setCheckedHabits] = useState({});

  const currentDate = new Date().toLocaleDateString();

  useEffect(() => {
    // Retrieve habits from local storage for today's date
    const storedHabits = JSON.parse(localStorage.getItem(currentDate)) || [];
    setHabits(storedHabits);
    
    // Initialize checked habits state
    const initialCheckedState = {};
    storedHabits.forEach((habit, index) => {
      initialCheckedState[index] = habit.checked || false;
    });
    setCheckedHabits(initialCheckedState);
  }, [currentDate]);

  const handleCheckboxChange = (index) => {
    const updatedCheckedHabits = { ...checkedHabits, [index]: !checkedHabits[index] };
    setCheckedHabits(updatedCheckedHabits);

    // Update the checked status in local storage
    const updatedHabits = habits.map((habit, i) => ({
      ...habit,
      checked: i === index ? updatedCheckedHabits[index] : habit.checked,
    }));

    localStorage.setItem(currentDate, JSON.stringify(updatedHabits));
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
