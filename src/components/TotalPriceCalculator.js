import React, { useEffect, useState } from 'react';
import './TotalPriceCalculator.css';

const TotalPriceCalculator = () => {
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('items')) || [];
    const total = items.reduce((sum, item) => {
      if (item.price && item.quantity) {
        return sum + item.price * item.quantity;
      }
      return sum;
    }, 0);
    setTotalPrice(total);
  }, []);

  return (
    <div className="total-price-container">
      <h2>Total Price</h2>
      <p>${totalPrice.toFixed(2)}</p>
    </div>
  );
};

export default TotalPriceCalculator;
