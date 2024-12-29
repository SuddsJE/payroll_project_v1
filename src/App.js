import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import TimeTrackerPage from "./pages/TimeTrackerPage";

function App() {
  return (
    <div>
     <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/time-tracker" element={<TimeTrackerPage />} />
      </Routes>
    </div>
  );
}

export default App;
