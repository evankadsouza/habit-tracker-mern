import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AddHabit } from './Component/Addhabit';
import { Navbar } from './Component/Navbar';
import { Checkhabit } from './Component/Checkhabit';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
      <Route path="/" element={<AddHabit />} />
        <Route path="/addhabit" element={<AddHabit />} />
        <Route path="/checkhabit" element={<Checkhabit />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
