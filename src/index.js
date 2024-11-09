import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux'; // Import the Redux Provider
import { store } from './redux/store'; // Correct path to store using named import
import reportWebVitals from './reportWebVitals';

// Create root with React 18's new root API
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the app with the Redux store provided to the entire app
root.render(
  <React.StrictMode>
    <Provider store={store}>  {/* Wrap App in Provider to pass Redux store */}
      <App />
    </Provider>
  </React.StrictMode>
);

// Optional: Track app performance
reportWebVitals();
