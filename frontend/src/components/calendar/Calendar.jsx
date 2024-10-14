import React, { useState } from 'react';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const today = new Date();

  // Function to get the first day of the month
  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1);
  };

  // Function to get the last day of the month
  const getLastDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0);
  };

  // Function to change the month
  const changeMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  const firstDay = getFirstDayOfMonth(currentDate);
  const lastDay = getLastDayOfMonth(currentDate);
  const daysArray = [];

  // Get days of the month
  for (let i = firstDay.getDate(); i <= lastDay.getDate(); i++) {
    daysArray.push(new Date(currentDate.getFullYear(), currentDate.getMonth(), i));
  }

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="max-w-7xl mx-6 p-14 bg-white shadow-2xl">
      <div className="flex justify-between items-center mb-8 gap-5">
        <button onClick={() => changeMonth(-1)} className="btn bg-indigo-950 text-white hover:bg-indigo-50 hover:text-black">Back</button>
        <h2 className="text-2xl font-bold">{currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getFullYear()}</h2>
        <button onClick={() => changeMonth(1)} className="btn bg-indigo-950 text-white hover:bg-indigo-50 hover:text-black">Next</button>
      </div>

      <div className="grid grid-cols-7 text-center mb-2">
        {dayNames.map((day) => (
          <div key={day} className="font-semibold">{day}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-4">
        {Array.from({ length: firstDay.getDay() }).map((_, index) => (
          <div key={index} className="text-transparent">.</div> // Empty cells for alignment
        ))}
        {daysArray.map((date) => (
          <div
            key={date.toString()}
            className={`p-2 border rounded-md hover:bg-indigo-100 transition duration-200 ${
              date.getDate() === today.getDate() &&
              date.getMonth() === today.getMonth() &&
              date.getFullYear() === today.getFullYear()
                ? 'bg-indigo-300 text-black' // Highlight today's date
                : ''
            }`}
          >
            {date.getDate()}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
