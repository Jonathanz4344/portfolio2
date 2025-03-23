import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App.jsx';
import { testEnvironment } from './test.js';

// Call the test function to verify the environment
testEnvironment();

// Initialize theme from localStorage or default to dark
const getInitialTheme = () => {
  const savedTheme = localStorage.getItem('theme');
  return savedTheme || 'dark';
};

// Apply theme to document before render to prevent flash
document.documentElement.dataset.theme = getInitialTheme();
document.body.dataset.theme = getInitialTheme();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);