import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

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
    <form onSubmit={handleSubmit}>
      <h2>Edit Item</h2>
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
      <button type="submit">Save Changes</button>
    </form>
  );
};

export default EditItem;
