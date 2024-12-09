import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddItem.css'; // Import the CSS file
import MyButton from './MyButton'; // Import the MyButton component

const AddItem = () => {
  const [item, setItem] = useState({ name: '', label: '', quantity: '', price: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItem({ ...item, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!item.name.trim()) {
      alert('Item name is required.');
      return;
    }

    // Retrieve existing items from localStorage
    const storedItems = JSON.parse(localStorage.getItem('items')) || [];

    // Add the new item
    storedItems.push(item);

    // Save the updated items back to localStorage
    localStorage.setItem('items', JSON.stringify(storedItems));

    alert('Item added successfully!');
    navigate('/shopping-list'); // Redirect to the Shopping List page
  };

  return (
    <div className="add-item-container">
      <h2>Add Item</h2>
      <form className="add-item-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Item Name (required):</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter item name"
            value={item.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="label">Category (optional):</label>
          <select id="label" name="label" value={item.label} onChange={handleChange}>
            <option value="">Select a category</option>
            <option value="Fruit">Fruit</option>
            <option value="Vegetable">Vegetable</option>
            <option value="Meat">Meat</option>
            <option value="Dairy">Dairy</option>
            <option value="Bakery">Bakery</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="quantity">Quantity (optional):</label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            placeholder="Enter quantity"
            value={item.quantity}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price (optional):</label>
          <input
            type="number"
            step="0.01"
            id="price"
            name="price"
            placeholder="Enter price"
            value={item.price}
            onChange={handleChange}
          />
        </div>
        <div className="form-actions">
          <MyButton variant="primary" type="submit">Add Item</MyButton>
        </div>
      </form>
    </div>
  );
};

export default AddItem;
