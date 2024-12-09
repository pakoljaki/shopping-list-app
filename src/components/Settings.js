import React, { useState } from 'react';
import './Settings.css';
import MyButton from './MyButton'; // Import the MyButton component

const Settings = () => {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const [formData, setFormData] = useState(
    storedUser || { email: '', username: '', password: '', currency: 'USD' }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    localStorage.setItem('user', JSON.stringify(formData));
    alert('Settings updated successfully!');
  };

  return (
    <div className="settings-container">
      <h2>Settings</h2>
      <form className="settings-form">
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />
        </div>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter your username"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
          />
        </div>
        <div className="form-group">
          <label htmlFor="currency">Preferred Currency:</label>
          <select
            id="currency"
            name="currency"
            value={formData.currency}
            onChange={handleChange}
          >
            <option value="USD">USD ($)</option>
            <option value="EUR">EUR (€)</option>
            <option value="GBP">GBP (£)</option>
            <option value="JPY">JPY (¥)</option>
          </select>
        </div>
        <div className="form-actions">
          <MyButton variant="success" onClick={handleSave}>Save Changes</MyButton>
        </div>
      </form>
    </div>
  );
};

export default Settings;
