import React from "react";
import '../styles/Home.css';

function Home() {
  return (
    <div className="home-container">
      <h1>Hello!</h1>
      <p>This site is a WIP. I will be adding more "modules" as I progress. Here are the current modules and what they do: </p>
      <li>TIME TRACKER: Used to keep a weekly track of user's time.
        It will round the input to the nearest quarter following the 7 minute rule.
        !!NEW UPDATE!!: There are 2 buttons added to the time tracker. One to clear the input field and the other to
        add the "standard time" for Monday-Friday. The standard time is 8 hours per day.
      </li>
    </div>
  );
}

export default Home;
