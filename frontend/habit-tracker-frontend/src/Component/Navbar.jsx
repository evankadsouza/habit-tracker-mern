import React from 'react';
import { Link } from "react-router-dom";

import '../Styles/navbar.css';

export const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">Habit Tracker</div>
      <ul className="navbar-links">
        <li>
        <Link to="addhabit">
            Add Habit
        </Link>
        </li>
        <li>
            <Link to="checkhabit">
            Check Habit
            </Link>
        </li>
      </ul>
    </nav>
  );
};

