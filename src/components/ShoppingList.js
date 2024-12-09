import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ShoppingList.css';
import MyButton from './MyButton';
import SearchBar from './SearchBar';

const ShoppingList = () => {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState(''); // State to hold the current filter
  const [searchQuery, setSearchQuery] = useState(''); // State for search query
  const [cart, setCart] = useState([]); // State for items in the cart
  const [currency, setCurrency] = useState('USD'); // State for preferred currency

  // Fetch preferred currency and items from localStorage
  useEffect(() => {
    const storedCurrency = JSON.parse(localStorage.getItem('user'))?.currency || 'USD';
    const storedItems = JSON.parse(localStorage.getItem('items')) || [];
    setCurrency(storedCurrency);
    setItems(storedItems);
    setCart(new Array(storedItems.length).fill(false)); // Initialize all items as not in cart
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
      setCart((prevCart) => prevCart.filter((_, i) => i !== index)); // Remove cart status
      localStorage.setItem('items', JSON.stringify(updatedItems)); // Update localStorage
    }
  };

  const toggleCartStatus = (index) => {
    setCart((prevCart) => {
      const updatedCart = [...prevCart];
      updatedCart[index] = !updatedCart[index];
      return updatedCart;
    });
  };

  const handleSearch = (query) => {
    setSearchQuery(query.toLowerCase());
  };

  // Filter, search, and sort items
  const filteredAndSortedItems = (filter
    ? items.filter((item) => item.label === filter)
    : items
  )
    .filter((item) => item.name.toLowerCase().includes(searchQuery)) // Apply search query
    .map((item, index) => ({ ...item, isInCart: cart[index], index })) // Combine item and cart info
    .sort((a, b) => a.isInCart - b.isInCart); // Sort: items not in cart (false) come first

  const itemsNotInCart = filteredAndSortedItems.filter((item) => !item.isInCart);
  const itemsInCart = filteredAndSortedItems.filter((item) => item.isInCart);

  return (
    <div className="shopping-list-container">
      <h2>Shopping List</h2>
      <Link to="/add-item" className="add-item-link">Add Item</Link>
      
      {/* Search Bar */}
      <SearchBar onSearch={handleSearch} />
      
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
      {filteredAndSortedItems.length > 0 ? (
        <ul className="shopping-list">
          {/* Render items not in cart */}
          {itemsNotInCart.map(({ name, label, quantity, price, isInCart, index }) => (
            <li
              key={index}
              className={`shopping-list-item ${isInCart ? 'in-cart' : ''}`}
            >
              <div className="item-details">
                <strong>{name}</strong>
                {label && <span> - <em>{label}</em></span>}
                {quantity && <span> | Quantity: {quantity}</span>}
                {price && (
                  <span>
                    {' | Price: '}
                    {currencySymbols[currency]}{price}
                  </span>
                )}
              </div>
              <div className="item-actions">
                <MyButton
                  variant="secondary"
                  onClick={() => toggleCartStatus(index)}
                >
                  {isInCart ? 'Take Out' : 'In Cart'}
                </MyButton>
                <Link to={`/edit-item/${index}`}>
                  <MyButton variant="info">Edit</MyButton>
                </Link>
                <MyButton variant="danger" onClick={() => handleDelete(index)}>Delete</MyButton>
              </div>
            </li>
          ))}

          {/* Divider for items already in the cart */}
          {itemsInCart.length > 0 && (
            <div className="cart-divider">
              <hr />
              <p>Items already in the cart</p>
            </div>
          )}

          {/* Render items in cart */}
          {itemsInCart.map(({ name, label, quantity, price, isInCart, index }) => (
            <li
              key={index}
              className={`shopping-list-item ${isInCart ? 'in-cart' : ''}`}
            >
              <div className="item-details">
                <strong>{name}</strong>
                {label && <span> - <em>{label}</em></span>}
                {quantity && <span> | Quantity: {quantity}</span>}
                {price && (
                  <span>
                    {' | Price: '}
                    {currencySymbols[currency]}{price}
                  </span>
                )}
              </div>
              <div className="item-actions">
                <MyButton
                  variant="secondary"
                  onClick={() => toggleCartStatus(index)}
                >
                  {isInCart ? 'Take Out' : 'In Cart'}
                </MyButton>
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
