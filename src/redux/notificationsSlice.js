import { createSlice } from '@reduxjs/toolkit';

export const notificationsSlice = createSlice({
  name: 'notifications',
  initialState: {
    notifications: [], // Holds the list of notifications
  },
  reducers: {
    addNotification: (state, action) => {
      state.notifications.push(action.payload);
    },
    removeNotification: (state, action) => {
      state.notifications = state.notifications.filter(
        notification => notification.id !== action.payload.id
      );
    },
    clearNotifications: (state) => {
      state.notifications = [];
    },
  },
});

// Export actions
export const { addNotification, removeNotification, clearNotifications } = notificationsSlice.actions;

// Export reducer
export default notificationsSlice.reducer;
