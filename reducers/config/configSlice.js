import { createSlice } from '@reduxjs/toolkit';

export const configSlice = createSlice({
  name: 'config',
  initialState: {
    isDark: false,
  },
  reducers: {
    toggleDark: (state, action) => {
      state.isDark = action.payload;
    },
  },
});

export const { toggleDark } = configSlice.actions;

export default configSlice.reducer;
