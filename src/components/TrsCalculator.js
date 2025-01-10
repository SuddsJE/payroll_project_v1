import React, { useState } from "react";

function TrsCalculator() {
  const [inputDate, setInputDate] = useState("");
  const [resultDate, setResultDate] = useState("");

  const calculateDate = () => {
    if (!inputDate) {
      setResultDate("Please enter a valid date.");
      return;
    }

    const startDate = new Date(inputDate); // Convert the input date
    const dateAfter90Days = new Date(startDate);
    dateAfter90Days.setDate(dateAfter90Days.getDate() + 90); // Add 90 days

    const lastDayOfMonth = new Date(
      dateAfter90Days.getFullYear(),
      dateAfter90Days.getMonth() + 1,
      0
    ); // Get the last day of the month

    setResultDate(lastDayOfMonth.toDateString()); // Format the result
  };

  return (
    <div>
      <input
        type="date"
        value={inputDate}
        onChange={(e) => setInputDate(e.target.value)}
      />
      <button onClick={calculateDate}>Calculate</button>
      {resultDate && (
        <div>
          <h2>Result:</h2>
          <p>{resultDate}</p>
        </div>
      )}
    </div>
  );
}

export default TrsCalculator;
