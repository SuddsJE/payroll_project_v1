import React from "react";
import TrsCalculator from "../components/TrsCalculator";

function TrsCalculatorPage() {
  return (
    <div>
      <h1>Date Calculator</h1>
      <p>Enter a date to calculate the last day of the month 90 days later.</p>
      <TrsCalculator />
    </div>
  );
}

export default TrsCalculatorPage;
