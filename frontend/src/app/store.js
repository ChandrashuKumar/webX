import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import teamReducer from '../features/teams/teamSlice'; 
import taskReducer from "../features/tasks/taskSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    team: teamReducer,
    task: taskReducer
  },
});
