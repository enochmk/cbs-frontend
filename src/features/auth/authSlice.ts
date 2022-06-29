import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  accessToken: null,
  user: null,
};

// slice
export const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    signIn: (state: any, action: any) => {
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;
    },
    signOut: (state: any) => {
      state.accessToken = null;
      state.user = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { signIn, signOut } = authSlice.actions;

// Reducer
export default authSlice.reducer;
