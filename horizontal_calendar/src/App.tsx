import React, { useState } from 'react';
import Calendar from './components/Calendar/Calendar';

const App: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
  };

  const customDayDisplay = (date: Date) => (
    <div>
      <strong>{date.toLocaleDateString('en-US', { weekday: 'short' })}</strong>
      <br />
      {date.getDate()}
    </div>
  );

  return (
    <div className="App">
      <div className="calendar-card">
        <div className="calendar-title">
          <h1>Horizontal Calendar</h1>
        </div>
        <Calendar selectedDate={selectedDate} onDateChange={handleDateChange} customDayDisplay={customDayDisplay} />
      </div>
    </div>
    
  );
};

export default App;
