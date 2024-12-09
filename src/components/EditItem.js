import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './EditItem.css';
import MyButton from './MyButton';

const EditItem = () => {
  const [item, setItem] = useState({ name: '', label: '', quantity: '', price: '' });
  const navigate = useNavigate();
  const { id } = useParams(); // Get the item ID from the URL

  useEffect(() => {
    // Load the existing items from localStorage
    const storedItems = JSON.parse(localStorage.getItem('items')) || [];

    // Find the item to edit by its index or ID
    const itemToEdit = storedItems[id];
    if (itemToEdit) {
      setItem(itemToEdit); // Set the item data to state
    } else {
      alert('Item not found.');
      navigate('/shopping-list'); // Redirect if the item doesn't exist
    }
  }, [id, navigate]);

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

    // Update the item at the specified index
    storedItems[id] = item;

    // Save the updated items back to localStorage
    localStorage.setItem('items', JSON.stringify(storedItems));

    alert('Item updated successfully!');
    navigate('/shopping-list'); // Redirect to the Shopping List page
  };

  return (
    <div className="edit-item-container">
      <form className="edit-item-form" onSubmit={handleSubmit}>
        <h2>Edit Item</h2>
        <label>Item Name (required):</label>
        <input
          type="text"
          name="name"
          placeholder="Enter item name"
          value={item.name}
          onChange={handleChange}
          required
        />
        <label>Category (optional):</label>
        <select
          name="label"
          value={item.label}
          onChange={handleChange}
        >
          <option value="">Select a category</option>
          <option value="Fruit">Fruit</option>
          <option value="Vegetable">Vegetable</option>
          <option value="Meat">Meat</option>
          <option value="Dairy">Dairy</option>
          <option value="Bakery">Bakery</option>
        </select>
        <label>Quantity (optional):</label>
        <input
          type="number"
          name="quantity"
          placeholder="Enter quantity"
          value={item.quantity}
          onChange={handleChange}
        />
        <label>Price (optional):</label>
        <input
          type="number"
          step="0.01"
          name="price"
          placeholder="Enter price"
          value={item.price}
          onChange={handleChange}
        />
        <MyButton type="submit" variant="success">
          Save Changes
        </MyButton>
      </form>
    </div>
  );
};

export default EditItem;
