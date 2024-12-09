import React from 'react';
import TotalPriceCalculator from './TotalPriceCalculator';
import CategoryPieChart from './CategoryPieChart';
import './Statistics.css';

const Statistics = () => {
  return (
    <div className="statistics-container">
      <div className="statistics-left">
        <TotalPriceCalculator />
      </div>
      <div className="statistics-right">
        <CategoryPieChart />
      </div>
    </div>
  );
};

export default Statistics;
