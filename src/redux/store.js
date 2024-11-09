// redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import adminReducer from './adminSlice';
import notificationsReducer from './notificationsSlice';

export const store = configureStore({
  reducer: {
    admin: adminReducer, // First reducer
    notifications: notificationsReducer, // Second reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(), // Middleware
  devTools: process.env.NODE_ENV !== 'production', // Enable dev tools in non-production environments
});
