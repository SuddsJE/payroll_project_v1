import React from "react";
import '../styles/Home.css';

function Home() {
  return (
    <div className="home-container">
      <h1>Hello!</h1>
      <p>This site is a WIP. I will be adding more "modules" as I progress. Here are the current modules and what they do: </p>
      <li>TIME TRACKER: Used to keep a weekly track of user's time.
        It will round the input to the nearest quarter following the 7 minute rule.
      </li>
      <li>
        !!UPDATED!! 2/3/2025: Added a new feature to the time tracker. 2 buttons with new functions, one will clear the table and the other
        will add a standard 40 hour week for ease of use.
      </li>
    </div>
  );
}

export default Home;
