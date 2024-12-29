import React, { useState } from 'react';
import '../styles/TimeCalculator.css'; // Optional: Create a specific stylesheet for this component

function TimeCalculator({ days }) {
    const [times, setTimes] = useState(
      days.map(() => ({ in1: "", out1: "", in2: "", out2: "", in3: "", out3: "" }))
    );
  
    const roundToNearestQuarter = (time) => {
      if (!time) return "";
      const [hours, minutes] = time.split(":").map(Number);
  
      const roundedMinutes = Math.round(minutes / 15) * 15;
      const adjustedHours = roundedMinutes === 60 ? hours + 1 : hours;
      const finalMinutes = roundedMinutes === 60 ? 0 : roundedMinutes;
  
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
  
    return (
      <div className="table-container">
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
        </table>
      </div>
    );
  }
  
  export default TimeCalculator;