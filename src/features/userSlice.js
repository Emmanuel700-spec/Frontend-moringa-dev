import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userInfo: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  userType: null,  // Added userType for role-based routing
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginStart(state) {
      state.loading = true;
      state.error = null;
    },
    loginSuccess(state, action) {
      state.userInfo = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
      state.userType = action.payload.userType;  // Capture userType for role-based routing
    },
    loginFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    logout(state) {
      state.userInfo = null;
      state.isAuthenticated = false;
      state.userType = null;
    },
    updateUserProfile(state, action) {
      state.userInfo = { ...state.userInfo, ...action.payload };
      if (action.payload.userType) {
        state.userType = action.payload.userType;
      }
    },
  },
});

// Export actions
export const { loginStart, loginSuccess, loginFailure, logout, updateUserProfile } = userSlice.actions;

// Export the reducer
export default userSlice.reducer;
