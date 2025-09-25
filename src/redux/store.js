import { configureStore } from '@reduxjs/toolkit'
import sidebarReducer from './features/sidebarSlice';
import authReducer from "./features/authSlice";


export const store = configureStore({
  reducer: {
    sidebar: sidebarReducer,
    auth: authReducer,
  },
})