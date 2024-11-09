import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk to fetch categories from the API using fetch
export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async () => {
    const response = await fetch('http://localhost:5000/users');
    if (!response.ok) {
      throw new Error('Failed to fetch Users');
    }
    return response.json(); // Convert response to JSON
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: [],
    status: 'idle', // idle, loading, succeeded, failed
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export default userSlice.reducer;
