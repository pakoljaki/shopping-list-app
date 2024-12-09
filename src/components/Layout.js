import React from 'react';
import { Navigate } from 'react-router-dom';
import MyNavbar from './MyNavbar';

const Layout = ({ children }) => {
  const isLoggedIn = localStorage.getItem('user'); // Check if a user is logged in

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />; // Redirect to login if not authenticated
  }

  return (
    <div>
      <MyNavbar />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
