// src/components/MonthDropdown.tsx
import React from 'react';
import './MonthDropdown.css';

interface MonthDropdownProps {
  selectedMonth: number;
  onMonthChange: (month: number) => void;
  style?: React.CSSProperties;
}

const MonthDropdown: React.FC<MonthDropdownProps> = ({ selectedMonth, onMonthChange, style }) => {
  const months = [
    'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN',
    'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'
  ];

  const handleMonthChange = (month: number) => {
    onMonthChange(month);
  };

  return (
    <div className="month-dropdown" style={style}>
      <div className="months-container">
        {months.map((month, index) => (
          <div
            key={month}
            className={`month ${index === selectedMonth ? 'selected' : ''}`}
            onClick={() => handleMonthChange(index)}
          >
            {month}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MonthDropdown;
