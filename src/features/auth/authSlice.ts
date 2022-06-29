import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  accessToken: null,
  user: null,
};

// slice
export const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {},
});

// Reducer
export default authSlice.reducer;
