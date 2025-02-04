import React, { useState } from 'react';
import '../styles/TimeCalculator.css';

function TimeCalculator({ days }) {
    const [times, setTimes] = useState(
      days.map(() => ({ in1: "", out1: "", in2: "", out2: "", in3: "", out3: "" }))
    );
  
    const roundToNearestQuarter = (time) => {
      if (!time) return ""; //takes care of empty or invalid inputs
      const [hours, minutes] = time.split(":").map(Number); //grabs the hours and minutes splitting by :
  
      const roundedMinutes = Math.round(minutes / 15) * 15; //rounds minutes to nearest 15 minutes

      // adjusting for edge cases, 60 min becomes 0 min plus 1 hour
      const adjustedHours = roundedMinutes === 60 ? hours + 1 : hours;
      const finalMinutes = roundedMinutes === 60 ? 0 : roundedMinutes;

      // ensure 2 digit format
      const formattedHours = String(adjustedHours).padStart(2, "0");
      const formattedMinutes = String(finalMinutes).padStart(2, "0");
  
      return `${formattedHours}:${formattedMinutes}`;
    };
  
    const handleInputChange = (dayIndex, field, value) => {
      const updatedTimes = [...times];
      updatedTimes[dayIndex][field] = value;
      setTimes(updatedTimes);
    };
  
    const calculateTotalHours = (day) => {
      const parseTime = (time) => {
        if (!time) return 0;
        const [hours, minutes] = time.split(":").map(Number);
        return hours + minutes / 60;
      };
  
      const workPeriods = [
        [day.in1, day.out1],
        [day.in2, day.out2],
        [day.in3, day.out3],
      ];
  
      let totalHours = 0;
      workPeriods.forEach(([start, end]) => {
        const startTime = parseTime(start);
        const endTime = parseTime(end);
        if (startTime && endTime && endTime > startTime) {
          totalHours += endTime - startTime;
        }
      });
  
      return totalHours.toFixed(2);
    };

    const calculateWeeklyTotal = () => {
        return times.reduce((total, day, index) => {
          const roundedRow = {
            in1: roundToNearestQuarter(day.in1),
            out1: roundToNearestQuarter(day.out1),
            in2: roundToNearestQuarter(day.in2),
            out2: roundToNearestQuarter(day.out2),
            in3: roundToNearestQuarter(day.in3),
            out3: roundToNearestQuarter(day.out3),
          };
      
          return total + parseFloat(calculateTotalHours(roundedRow));
        }, 0);
      };

    const clearTable = () => {
        setTimes(
          days.map(() => ({ in1: "", out1: "", in2: "", out2: "", in3: "", out3: "" }))
        );
      };
    
      const standardTime = () => {
        const updatedTimes = times.map((time, index) => {
          if (days[index] !== "Saturday" && days[index] !== "Sunday") {
            return { ...time, in1: "07:00",out1: "11:00",in2: "12:00",out2: "16:00",in3: "",out3: "" };
          }
          return time;
        });
        setTimes(updatedTimes);
      };
  
    return (
      <div className="table-container">
        <div className="timetracker-buttons">
          <p>Clears the table of all times.</p>
          <button onClick={clearTable}>Clear the Table</button>
          <p>Standard Time for all weekdays except Saturday and Sunday.</p>
          <button onClick={standardTime}>Standard Time</button>
        </div>
        <table>
          <thead>
            <tr>
              <th>Weekday</th>
              <th>In</th>
              <th>Out</th>
              <th>In</th>
              <th>Out</th>
              <th>In</th>
              <th>Out</th>
              <th>Totals</th>
            </tr>
          </thead>
          <tbody>
            {days.map((day, index) => {
              const roundedRow = {
                in1: roundToNearestQuarter(times[index].in1),
                out1: roundToNearestQuarter(times[index].out1),
                in2: roundToNearestQuarter(times[index].in2),
                out2: roundToNearestQuarter(times[index].out2),
                in3: roundToNearestQuarter(times[index].in3),
                out3: roundToNearestQuarter(times[index].out3),
              };
              return (
                <React.Fragment key={index}>
                  {/* Original Row */}
                  <tr>
                    <td>{day}</td>
                    <td>
                      <input
                        type="time"
                        value={times[index].in1}
                        onChange={(e) => handleInputChange(index, "in1", e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="time"
                        value={times[index].out1}
                        onChange={(e) => handleInputChange(index, "out1", e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="time"
                        value={times[index].in2}
                        onChange={(e) => handleInputChange(index, "in2", e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="time"
                        value={times[index].out2}
                        onChange={(e) => handleInputChange(index, "out2", e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="time"
                        value={times[index].in3}
                        onChange={(e) => handleInputChange(index, "in3", e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="time"
                        value={times[index].out3}
                        onChange={(e) => handleInputChange(index, "out3", e.target.value)}
                      />
                    </td>
                    <td>
                      {calculateTotalHours(times[index])} hrs
                    </td>
                  </tr>
  
                  {/* Rounded Row */}
                  <tr className="rounded-row">
                    <td>Rounded</td>
                    <td>{roundedRow.in1 || "-"}</td>
                    <td>{roundedRow.out1 || "-"}</td>
                    <td>{roundedRow.in2 || "-"}</td>
                    <td>{roundedRow.out2 || "-"}</td>
                    <td>{roundedRow.in3 || "-"}</td>
                    <td>{roundedRow.out3 || "-"}</td>
                    <td>{calculateTotalHours(roundedRow)} hrs</td>
                  </tr>
                </React.Fragment>
              );
            })}
          </tbody>
          <tfoot>
            <tr className='weekly-total'>
                <td>Weekly Total:</td>
                <td>{calculateWeeklyTotal().toFixed(2)} hrs </td>
            </tr>
          </tfoot>
        </table>
      </div>
    );
  }
  
  export default TimeCalculator;