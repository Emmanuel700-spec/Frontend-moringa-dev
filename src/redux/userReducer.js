// src/redux/someReducer.js or userReducer.js
import { createSlice } from '@reduxjs/toolkit';

// Define the initial state
const initialState = {
  user: null, // Store user data after registration/login
  isAuthenticated: false, // Boolean flag to track if the user is authenticated
  loading: false, // Loading state to track async operations
  error: null, // Store error messages
};

// Create the slice of the state for user-related actions
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Action to set loading state
    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    // Action to handle successful user login or registration
    loginSuccess: (state, action) => {
      state.user = action.payload;  // Store user data
      state.isAuthenticated = true;  // Mark as authenticated
      state.loading = false; // Stop loading
      state.error = null; // Clear any previous errors
    },

    // Action to handle user logout
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null; // Clear any previous errors
    },

    // Action to handle errors
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

// Export the actions for use in components
export const { setLoading, loginSuccess, logout, setError } = userSlice.actions;

// Export the reducer to be added to the store
export default userSlice.reducer;
