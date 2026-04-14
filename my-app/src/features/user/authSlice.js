import { createSlice } from '@reduxjs/toolkit';

const CURRENT_USER_SESSION_KEY = 'currentUserSession';

const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: true, 
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    initializeAuth: (state) => {
      try {
        const storedSession = localStorage.getItem(CURRENT_USER_SESSION_KEY);
        if (storedSession) {
          const sessionData = JSON.parse(storedSession);
          if (sessionData && sessionData.user && sessionData.isAuthenticated === true) {
            state.user = sessionData.user;
            state.isAuthenticated = true;
          }
        }
      } catch (e) {
        console.error("Error loading auth session from localStorage:", e);
        localStorage.removeItem(CURRENT_USER_SESSION_KEY);
      } finally {
        state.isLoading = false;
      }
    },
    loginSuccess: (state, action) => {
      const user = action.payload;
      state.user = {
        id: user.id,
        email: user.email,
        fullName: user.fullName || user.full_name || '',
        role: user.role || 'user',
        token: user.token,
        ...user,
      };
      state.isAuthenticated = true;
      state.isLoading = false;
      localStorage.setItem(CURRENT_USER_SESSION_KEY, JSON.stringify({
        user: state.user,
        isAuthenticated: true,
      }));
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      try {
        const users = JSON.parse(localStorage.getItem('user-data')) || [];
        const updatedUsers = users.map((user) => ({
          ...user,
          isLoggedIn: false,
        }));
        localStorage.setItem('user-data', JSON.stringify(updatedUsers));
      } catch (error) {
        console.error("Error updating user data on logout:", error);
      }
      localStorage.removeItem(CURRENT_USER_SESSION_KEY);
    },
    updateUserRole: (state, action) => {
      if (state.user) {
        state.user.role = action.payload;
        localStorage.setItem(CURRENT_USER_SESSION_KEY, JSON.stringify({
          user: state.user,
          isAuthenticated: state.isAuthenticated,
        }));
      }
    },
  },
});

export const { initializeAuth, loginSuccess, logout, updateUserRole } = authSlice.actions;

export const selectUser = (state) => state.auth.user;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectIsLoading = (state) => state.auth.isLoading;
export const selectUserRole = (state) => state.auth.user?.role || null;
export const selectIsAdmin = (state) => state.auth.user?.role === 'admin';

export default authSlice.reducer;
