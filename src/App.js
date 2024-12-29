import React from 'react';
import './styles/App.css';
import TimeCalculator from './components/TimeCalculator';

function App() {
  const days = ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  return (
    <div className="App">
      <h1>Weekly Time Tracker</h1>
      <TimeCalculator days={days} />
    </div>
    
  );
}

export default App;
