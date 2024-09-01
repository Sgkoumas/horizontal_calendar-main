import React, { useState } from 'react';
import './Calendar.css';
import MonthDropdown from '../Dropdowns/MonthDropdown/MonthDropdown';
import YearDropdown from '../Dropdowns/YearDropdown/YearDropdown';
import { IoMdArrowDropdown } from "react-icons/io";



interface CalendarProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
  customDayDisplay?: (date: Date) => React.ReactNode;
}

const Calendar: React.FC<CalendarProps> = ({ selectedDate, onDateChange, customDayDisplay }) => {
  const [showMonthDropdown, setShowMonthDropdown] = useState(false);
  const [showYearDropdown, setShowYearDropdown] = useState(false);
  const today = new Date();
  const startOfWeek = new Date(selectedDate);
  startOfWeek.setDate(selectedDate.getDate() - selectedDate.getDay());

  const generateWeekDays = () => {
    const weekDays = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      weekDays.push(day);
    }
    return weekDays;
  };

  const handleMonthChange = (month: number) => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(month);
    onDateChange(newDate);
    setShowMonthDropdown(false);
  };

  const handleYearChange = (year: number) => {
    const newDate = new Date(selectedDate);
    newDate.setFullYear(year);
    onDateChange(newDate);
    setShowYearDropdown(false);
  };

  const weekDays = generateWeekDays();

  const handlePrevWeek = () => {
    const prevWeek = new Date(selectedDate);
    prevWeek.setDate(selectedDate.getDate() - 7);
    onDateChange(prevWeek);
  };

  const handleNextWeek = () => {
    const nextWeek = new Date(selectedDate);
    nextWeek.setDate(selectedDate.getDate() + 7);
    onDateChange(nextWeek);
  };

  const formatDate = (date: Date) => {
    const month = getMonthAbbreviation(date);
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    return `${month} ${day} ${year}`;
  };

  const getMonthAbbreviation = (date: Date) => {
    const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    return monthNames[date.getMonth()];
  };

  return (
    <div className="calendar">
      <div className="month-year-display">
      <button className="month-year-part" onClick={() => setShowMonthDropdown(!showMonthDropdown)}>
          {getMonthAbbreviation(selectedDate)} 
          <IoMdArrowDropdown />
          </button>
        {showMonthDropdown && (
          <MonthDropdown
            selectedMonth={selectedDate.getMonth()}
            onMonthChange={handleMonthChange}
            style={{ top: 50, left:50 }}
          />
        )}
        <button className="month-year-part" onClick={() => setShowYearDropdown(!showYearDropdown)}>
          {selectedDate.getFullYear()}
          <IoMdArrowDropdown />
        </button>
        {showYearDropdown && (
          <YearDropdown
            selectedYear={selectedDate.getFullYear()}
            onYearChange={handleYearChange}
            startYear={1900}
            endYear={2100}
            style={{ top: 50, right:50 }}
          />
        )}
      </div>
      <div className="separator-line"></div>
      <div className="calendar-controls">
        <button className="nav-button" onClick={handlePrevWeek}>
          &lt;
        </button>
        <div className="days-container">
          {weekDays.map((day) => (
            <div
              key={day.toDateString()}
              className={`day ${day.toDateString() === selectedDate.toDateString() ? 'selected' : ''} ${
                day.toDateString() === today.toDateString() ? 'today' : ''
              }`}
              onClick={() => onDateChange(day)}
            >
              {customDayDisplay ? customDayDisplay(day) : day.getDate()}
            </div>
          ))}
        </div>
        <button className="nav-button" onClick={handleNextWeek}>
          &gt;
        </button>
      </div>
      <div className="separator-line"></div>
      <div className="date-display">
        <span className="date-label">Selected Date: </span>
        <span className="formatted-date">{formatDate(selectedDate)}</span>
      </div>

      
    </div>
  );
};

export default Calendar;
