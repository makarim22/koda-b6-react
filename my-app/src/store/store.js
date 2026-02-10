import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/user/authSlice.js'; 

export const store = configureStore({
  reducer: {
    auth: authReducer, 
  },
});