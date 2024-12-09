import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'; // Import components
import './CategoryPieChart.css';

// Register components
ChartJS.register(ArcElement, Tooltip, Legend);

const CategoryPieChart = () => {
  const [chartData, setChartData] = useState(null); // Initialize as null
  const [legendLabels, setLegendLabels] = useState([]);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('items')) || [];
    const categoryCounts = items.reduce((counts, item) => {
      if (item.label) {
        counts[item.label] = (counts[item.label] || 0) + 1;
      }
      return counts;
    }, {});

    const filteredCategories = Object.keys(categoryCounts).filter(
      (label) => categoryCounts[label] > 0
    );

    if (filteredCategories.length > 0) {
      setChartData({
        labels: filteredCategories,
        datasets: [
          {
            data: filteredCategories.map((label) => categoryCounts[label]),
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
            hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
          },
        ],
      });
      setLegendLabels(filteredCategories);
    } else {
      // Handle the case where no categories exist
      setChartData({
        labels: [],
        datasets: [
          {
            data: [],
            backgroundColor: [],
            hoverBackgroundColor: [],
          },
        ],
      });
      setLegendLabels([]);
    }
  }, []);

  if (!chartData) {
    // Show a loading or empty state while the chart data is being prepared
    return <p>Loading chart data...</p>;
  }

  return (
    <div className="category-pie-chart-container">
      <h2>Category Distribution</h2>
      {chartData.labels.length > 0 ? (
        <>
          <Pie data={chartData} />
          <div className="legend">
            <h3>Legend:</h3>
            {legendLabels.map((label, index) => (
              <p key={index} style={{ color: chartData.datasets[0].backgroundColor[index] }}>
                {label}
              </p>
            ))}
          </div>
        </>
      ) : (
        <p>No items available to display in the chart.</p>
      )}
    </div>
  );
};

export default CategoryPieChart;
