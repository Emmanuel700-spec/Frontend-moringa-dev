import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk to fetch categories from the API using fetch
export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async () => {
    const response = await fetch('http://localhost:5000/categories');
    if (!response.ok) {
      throw new Error('Failed to fetch categories');
    }
    return response.json(); // Convert response to JSON
  }
);

const categoriesSlice = createSlice({
  name: 'categories',
  initialState: {
    categories: [],
    status: 'idle', // idle, loading, succeeded, failed
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export default categoriesSlice.reducer;
