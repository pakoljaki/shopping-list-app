import React from 'react';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import './MyButton.css';


const MyButton = ({ variant, size, children, onClick, type }) => {
  return (
    <Button 
      variant={`outline-${variant}`} 
      size={size} 
      onClick={onClick} 
      type={type}
      className="my-button"
    >
      {children}
    </Button>
  );
};

// Define default props for the button
MyButton.defaultProps = {
  variant: 'primary', // Default to primary style
  size: 'sm', // Default to small size
  type: 'button',
  onClick: () => {}, // Default to a no-op function
};

// Add prop types for validation
MyButton.propTypes = {
  variant: PropTypes.string,
  size: PropTypes.string,
  children: PropTypes.node.isRequired, // Ensures the button has children (text or elements)
  onClick: PropTypes.func,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
};

export default MyButton;
