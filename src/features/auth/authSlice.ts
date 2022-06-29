import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  accessToken: null,
  isLoading: false,
};

// slice
export const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {},
});

// Reducer
export default authSlice.reducer;
