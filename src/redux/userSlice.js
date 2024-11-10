import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk to fetch users from the API
export const fetchUsers = createAsyncThunk(
  'user/fetchUsers', // Action name
  async () => {
    const response = await fetch('http://localhost:5000/users'); // Replace with your API URL
    if (!response.ok) {
      throw new Error('Failed to fetch users'); // Throw error if request fails
    }
    return response.json(); // Return the JSON data if successful
  }
);

// The userSlice with initialState and extraReducers to handle the async thunk
const userSlice = createSlice({
  name: 'user', // Unique name for the slice
  initialState: {
    users: [], // The initial state of the users (plural for consistency)
    status: 'idle', // status for tracking the request state: idle, loading, succeeded, failed
    error: null // Holds any error message if the request fails
  },
  reducers: {}, // You can add more reducers here if needed (not necessary in this case)
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading'; // Set status to loading when the fetch starts
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded'; // Set status to succeeded when the fetch is successful
        state.users = action.payload; // Save the fetched users to the state
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed'; // Set status to failed when the fetch fails
        state.error = action.error.message; // Store the error message
      });
  }
});

export default userSlice.reducer; // Export the reducer to be used in the store
