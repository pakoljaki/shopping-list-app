import React, { useRef } from 'react';
import './SearchBar.css';

const SearchBar = ({ onSearch }) => {
  const searchInputRef = useRef();

  const handleSearch = () => {
    const query = searchInputRef.current.value.trim();
    onSearch(query);
  };

  const handleClear = () => {
    searchInputRef.current.value = '';
    onSearch(''); // Clear the search query
    searchInputRef.current.focus(); // Set focus back to the input
  };

  return (
    <div className="search-bar">
      <input
        ref={searchInputRef}
        type="text"
        placeholder="Search items..."
        className="search-input"
        onChange={handleSearch}
      />
      <button className="clear-button" onClick={handleClear}>
        Clear
      </button>
    </div>
  );
};

export default SearchBar;
