
import { createSlice } from '@reduxjs/toolkit';

const CURRENT_USER_SESSION_KEY = 'currentUserSession';

const getInitialAuthState = () => {
  try {
    const storedSession = localStorage.getItem(CURRENT_USER_SESSION_KEY);
    if (storedSession) {
      const sessionData = JSON.parse(storedSession);
      if (sessionData && sessionData.user && sessionData.isAuthenticated === true) {
        return {
          user: sessionData.user,
          isAuthenticated: true,
        };
      }
    }
  } catch (e) {
    console.error("Error loading auth session from localStorage:", e);
    localStorage.removeItem(CURRENT_USER_SESSION_KEY);
  }
  return {
    user: null,
    isAuthenticated: false,
  };
};

const initialState = getInitialAuthState();

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload; 
      state.isAuthenticated = true;
      localStorage.setItem(CURRENT_USER_SESSION_KEY, JSON.stringify({
        user: action.payload,
        isAuthenticated: true,
      }));
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem(CURRENT_USER_SESSION_KEY);
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;