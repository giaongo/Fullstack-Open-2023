import { createSlice } from '@reduxjs/toolkit';

const updateSlice = createSlice({
  name: 'update',
  initialState: false,
  reducers: {
    setUpdates(state) {
      return !state;
    },
  },
});

export default updateSlice.reducer;
export const { setUpdates } = updateSlice.actions;
