import React from 'react';
import './About.css'; // Import the CSS file for this component

const About = () => {
  return (
    <div className="about-container">
      <h1>About Shopping App</h1>
      <p>
        Welcome to the Shopping App! This app helps you manage your shopping list effectively. 
        You can add items to your shopping list, filter them by categories, edit details, and 
        even delete items you no longer need.
      </p>

      <h2>Key Features</h2>
      <ul>
        <li>Add items to your shopping list with details like name, category, quantity, and price.</li>
        <li>Filter items by categories for easier navigation.</li>
        <li>Edit existing items to update details.</li>
        <li>Delete items you no longer need.</li>
        <li>Keep track of your shopping list conveniently.</li>
      </ul>

      <h2>How to Use</h2>
      <ol>
        <li>Start by logging in or registering if you are a new user.</li>
        <li>Use the <strong>Shopping List</strong> page to view and manage your items.</li>
        <li>Click <strong>Add Item</strong> to add new items to your list.</li>
        <li>Use the <strong>Edit</strong> button to modify an item's details.</li>
        <li>Use the <strong>Delete</strong> button to remove an item.</li>
        <li>Use the <strong>Filter</strong> dropdown to view items by category.</li>
      </ol>

      <p>Enjoy a seamless shopping experience with our app!</p>
    </div>
  );
};

export default About;
