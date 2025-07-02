import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import teamReducer from '../features/teams/teamSlice'; 

export const store = configureStore({
  reducer: {
    auth: authReducer,
    team: teamReducer
  },
});
