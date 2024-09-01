// src/components/YearDropdown.tsx
import React, { useState } from 'react';
import './YearDropdown.css';

interface YearDropdownProps {
  selectedYear: number;
  onYearChange: (year: number) => void;
  startYear: number;
  endYear: number;
  style?: React.CSSProperties;
}

const YearDropdown: React.FC<YearDropdownProps> = ({ selectedYear, onYearChange, startYear, endYear, style }) => {
  const [currentStartYear, setCurrentStartYear] = useState(Math.floor(selectedYear / 10) * 10);
  const yearsPerPage = 10;


  const handleYearChange = (year: number) => {
    onYearChange(year);
  };

  const years = Array.from({ length: yearsPerPage }, (_, i) => currentStartYear + i);

  return (
    <div className="year-dropdown" style={style}>
      <div className="years-container">
        {years.map(year => (
          <div
            key={year}
            className={`year ${year === selectedYear ? 'selected' : ''}`}
            onClick={() => handleYearChange(year)}
          >
            {year}
          </div>
        ))}
      </div>
    </div>
  );
};

export default YearDropdown;
