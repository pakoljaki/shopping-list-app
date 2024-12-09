import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ShoppingList.css';


const ShoppingList = () => {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState(''); // State to hold the current filter

  // Fetch items from localStorage when the component loads
  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem('items')) || [];
    setItems(storedItems);
  }, []);

  // Handle filter change
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  // Filtered items based on the selected label
  const filteredItems = filter
    ? items.filter((item) => item.label === filter)
    : items;

  // Handle delete item
  const handleDelete = (index) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      const updatedItems = [...items];
      updatedItems.splice(index, 1); // Remove the item at the given index
      setItems(updatedItems); // Update the local state
      localStorage.setItem('items', JSON.stringify(updatedItems)); // Update localStorage
    }
  };

  return (
    <div>
      <h2>Shopping List</h2>
      <Link to="/add-item">Add Item</Link> {/* Link to Add Item Page */}
      
      {/* Dropdown to filter items by label */}
      <div>
        <label htmlFor="filter">Filter by Label:</label>
        <select id="filter" value={filter} onChange={handleFilterChange}>
          <option value="">All</option>
          <option value="Fruit">Fruit</option>
          <option value="Vegetable">Vegetable</option>
          <option value="Meat">Meat</option>
          <option value="Dairy">Dairy</option>
          <option value="Bakery">Bakery</option>
        </select>
      </div>

      {filteredItems.length > 0 ? (
        <ul>
          {filteredItems.map((item, index) => (
            <li key={index}>
              <strong>{item.name}</strong>
              {item.label && <span> - <em>{item.label}</em></span>}
              {item.quantity && <span> | Quantity: {item.quantity}</span>}
              {item.price && <span> | Price: ${item.price}</span>}
              <br />
              {/* Styled Edit and Delete buttons */}
              <Link to={`/edit-item/${index}`} className="button edit">Edit</Link>
              <button onClick={() => handleDelete(index)} className="button delete">Delete</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No items found for the selected label.</p>
      )}
    </div>
  );
};

export default ShoppingList;
