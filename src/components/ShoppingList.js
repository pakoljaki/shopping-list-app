import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ShoppingList.css';
import MyButton from './MyButton';

const ShoppingList = () => {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState(''); // State to hold the current filter
  const [currency, setCurrency] = useState('USD'); // State for preferred currency

  // Fetch preferred currency and items from localStorage
  useEffect(() => {
    const storedCurrency = JSON.parse(localStorage.getItem('user'))?.currency || 'USD';
    const storedItems = JSON.parse(localStorage.getItem('items')) || [];
    setCurrency(storedCurrency);
    setItems(storedItems);
  }, []);

  const currencySymbols = {
    USD: '$',
    EUR: '€',
    GBP: '£',
    JPY: '¥',
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleDelete = (index) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      const updatedItems = [...items];
      updatedItems.splice(index, 1); // Remove the item at the given index
      setItems(updatedItems); // Update the local state
      localStorage.setItem('items', JSON.stringify(updatedItems)); // Update localStorage
    }
  };

  const filteredItems = filter
    ? items.filter((item) => item.label === filter)
    : items;

  return (
    <div className="shopping-list-container">
      <h2>Shopping List</h2>
      <Link to="/add-item" className="add-item-link">Add Item</Link>
      <div className="filter-container">
        <label htmlFor="filter" className="filter-label">Filter by Label:</label>
        <select id="filter" value={filter} onChange={handleFilterChange} className="filter-select">
          <option value="">All</option>
          <option value="Fruit">Fruit</option>
          <option value="Vegetable">Vegetable</option>
          <option value="Meat">Meat</option>
          <option value="Dairy">Dairy</option>
          <option value="Bakery">Bakery</option>
        </select>
      </div>
      {filteredItems.length > 0 ? (
        <ul className="shopping-list">
          {filteredItems.map((item, index) => (
            <li key={index} className="shopping-list-item">
              <div className="item-details">
                <strong>{item.name}</strong>
                {item.label && <span> - <em>{item.label}</em></span>}
                {item.quantity && <span> | Quantity: {item.quantity}</span>}
                {item.price && (
                  <span>
                    {' | Price: '}
                    {currencySymbols[currency]}{item.price}
                  </span>
                )}
              </div>
              <div className="item-actions">
                <Link to={`/edit-item/${index}`}>
                  <MyButton variant="info">Edit</MyButton>
                </Link>
                <MyButton variant="danger" onClick={() => handleDelete(index)}>Delete</MyButton>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="no-items-message">No items found for the selected label.</p>
      )}
    </div>
  );
};

export default ShoppingList;
