// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import adminReducer from './adminSlice';
import contentReducer from './contentSlice';

// Configuring store with devTools support, middleware, and reducers
export const store = configureStore({
  reducer: {
    admin: adminReducer, // Adding the adminReducer to the store
  },
  reducer: {
    content: contentReducer,
  },
  // Middleware for additional functionality (e.g., logging, asynchronous operations)
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  // Enabling Redux DevTools for better debugging
  devTools: process.env.NODE_ENV !== 'production',  // Only enable in non-production environments
});
