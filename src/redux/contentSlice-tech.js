import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Fetch existing content from the server
export const fetchContent = createAsyncThunk(
  'content/fetchContent',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('http://localhost:5000/content');
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Add new content to the server
export const addContent = createAsyncThunk(
  'content/addContent',
  async (contentData, thunkAPI) => {
    try {
      const response = await axios.post('http://localhost:5000/content', contentData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const contentSlice = createSlice({
  name: 'content',
  initialState: {
    content: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch content
      .addCase(fetchContent.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchContent.fulfilled, (state, action) => {
        state.loading = false;
        state.content = action.payload; // Store fetched content
      })
      .addCase(fetchContent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Add content
      .addCase(addContent.pending, (state) => {
        state.loading = true;
      })
      .addCase(addContent.fulfilled, (state, action) => {
        state.loading = false;
        state.content.push(action.payload); // Add new content to the list
      })
      .addCase(addContent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default contentSlice.reducer;
