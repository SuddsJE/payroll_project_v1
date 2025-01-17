import React from "react";
import "../styles/TimeCalculator.css";
import TimeCalculator from "../components/TimeCalculator.js";

function TimeTrackerPage() {
  const days = ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  return (
    <div className="time-tracker-page">
      <TimeCalculator days={days} />
    </div>
  );
}

export default TimeTrackerPage;
