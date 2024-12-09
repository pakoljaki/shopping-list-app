import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
    <form onSubmit={handleSubmit}>
      <h2>Add Item</h2>
      <input
        type="text"
        name="name"
        placeholder="Item Name (required)"
        value={item.name}
        onChange={handleChange}
        required
      />
      <select
        name="label"
        value={item.label}
        onChange={handleChange}
      >
        <option value="">Select Label (optional)</option>
        <option value="Fruit">Fruit</option>
        <option value="Vegetable">Vegetable</option>
        <option value="Meat">Meat</option>
        <option value="Dairy">Dairy</option>
        <option value="Bakery">Bakery</option>
      </select>
      <input
        type="number"
        name="quantity"
        placeholder="Quantity (optional)"
        value={item.quantity}
        onChange={handleChange}
      />
      <input
        type="number"
        step="0.01"
        name="price"
        placeholder="Price (optional)"
        value={item.price}
        onChange={handleChange}
      />
      <button type="submit">Add Item</button>
    </form>
  );
};

export default AddItem;
