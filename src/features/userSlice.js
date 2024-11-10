import { createSlice } from '@reduxjs/toolkit';

// Initial state structure
const initialState = {
  userInfo: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  userType: null,  // Track userType (role) for role-based routing
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Start login process
    loginStart(state) {
      state.loading = true;
      state.error = null;
    },
    // Successful login
    loginSuccess(state, action) {
      state.userInfo = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
      state.userType = action.payload.userType;  // Store userType for routing
    },
    // Failed login attempt
    loginFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    // User logout
    logout(state) {
      state.userInfo = null;
      state.isAuthenticated = false;
      state.userType = null;
    },
    // Update user profile (e.g., after an edit)
    updateUserProfile(state, action) {
      state.userInfo = { ...state.userInfo, ...action.payload };
      if (action.payload.userType) {
        state.userType = action.payload.userType; // Keep userType updated
      }
    },
  },
});

// Export actions
export const { loginStart, loginSuccess, loginFailure, logout, updateUserProfile } = userSlice.actions;

// Export the reducer
export default userSlice.reducer;
