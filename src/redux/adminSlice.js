import { createSlice } from '@reduxjs/toolkit';

export const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    users: [],
    content: [],
    categories: [],
    loading: false,
    error: null,
  },
  reducers: {
    setUsers: (state, action) => {
      if (Array.isArray(action.payload)) {
        state.users = action.payload;
      } else {
        console.error('Payload for setUsers must be an array');
      }
    },

    setContent: (state, action) => {
      if (Array.isArray(action.payload)) {
        state.content = action.payload;
      } else {
        console.error('Payload for setContent must be an array');
      }
    },

    setCategories: (state, action) => {
      if (Array.isArray(action.payload)) {
        state.categories = action.payload;
      } else {
        console.error('Payload for setCategories must be an array');
      }
    },

    addUser: (state, action) => {
      if (action.payload?.id) {
        state.users.push(action.payload);
      } else {
        console.error('Payload for addUser is invalid. It must include an id');
      }
    },

    updateUser: (state, action) => {
      const index = state.users.findIndex(user => user.id === action.payload.id);
      if (index !== -1 && action.payload) {
        state.users[index] = action.payload;
      } else {
        console.error('Payload for updateUser is invalid or user not found');
      }
    },

    removeUser: (state, action) => {
      if (action.payload?.id) {
        state.users = state.users.filter(user => user.id !== action.payload.id);
      } else {
        console.error('Payload for removeUser is invalid. It must include an id');
      }
    },

    addContent: (state, action) => {
      if (action.payload) {
        state.content.push(action.payload);
      } else {
        console.error('Payload for addContent is invalid');
      }
    },

    removeContent: (state, action) => {
      if (action.payload?.id) {
        state.content = state.content.filter(content => content.id !== action.payload.id);
      } else {
        console.error('Payload for removeContent is invalid. It must include an id');
      }
    },

    addCategory: (state, action) => {
      if (action.payload) {
        state.categories.push(action.payload);
      } else {
        console.error('Payload for addCategory is invalid');
      }
    },

    removeCategory: (state, action) => {
      if (action.payload?.id) {
        state.categories = state.categories.filter(category => category.id !== action.payload.id);
      } else {
        console.error('Payload for removeCategory is invalid. It must include an id');
      }
    },

    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    setError: (state, action) => {
      if (action.payload) {
        state.error = action.payload;
      } else {
        state.error = 'An unknown error occurred';
      }
    },

    clearError: (state) => {
      state.error = null;
    },
  },
});

// Export actions
export const {
  setUsers,
  setContent,
  setCategories,
  addUser,
  updateUser,
  removeUser,
  addContent,
  removeContent,
  addCategory,
  removeCategory,
  setLoading,
  setError,
  clearError,
} = adminSlice.actions;

// Export reducer
export default adminSlice.reducer;
