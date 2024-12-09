import React, { useState } from 'react';

const Settings = () => {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const [formData, setFormData] = useState(storedUser || { email: '', username: '', password: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    localStorage.setItem('user', JSON.stringify(formData));
    alert('Settings updated successfully!');
  };

  return (
    <div>
      <h2>Settings</h2>
      <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
      <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Username" />
      <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" />
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default Settings;
