import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';
import App from './App';
import Register from './components/Register';
import Login from './components/Login';
import Settings from './components/Settings';
import ShoppingList from './components/ShoppingList';
import AddItem from './components/AddItem';
import Layout from './components/Layout'; // Import the Layout component
import EditItem from './components/EditItem';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <Routes>
      {/* Show Login and Register without Navbar */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Pages wrapped with Layout (Navbar included) */}
      <Route
        path="/"
        element={
          <Layout>
            <ShoppingList />
          </Layout>
        }
      />
      <Route
        path="/settings"
        element={
          <Layout>
            <Settings />
          </Layout>
        }
      />
      <Route
        path="/shopping-list"
        element={
          <Layout>
            <ShoppingList />
          </Layout>
        }
      />
      <Route
        path="/add-item"
        element={
          <Layout>
            <AddItem />
          </Layout>
        }
      />
      <Route
    path="/edit-item/:id"
    element={
      <Layout>
        <EditItem />
      </Layout>
    }
  />
    </Routes>
  </Router>
);


//ha van 20%-os kuponod melyikre hasznald fel, meg kell adni hany darab van es melyikre hasznaljuk a kuponot
