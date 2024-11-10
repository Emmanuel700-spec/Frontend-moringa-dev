// src/store.js
import { configureStore } from '@reduxjs/toolkit';
// Import the adminReducer from the slice you created
import adminReducer from './adminSlice';

// Configure the store
export const store = configureStore({
  reducer: {
    admin: adminReducer, // Add adminReducer to the Redux store
  },
  // Middleware for additional functionality (e.g., logging, async actions)
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  // Enable Redux DevTools only in non-production environments for debugging
  devTools: process.env.NODE_ENV !== 'production',  // Conditional devTools support
});
