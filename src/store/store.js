import { configureStore } from '@reduxjs/toolkit';
import dashboardReducer from './dashboardSlice';
import appointmentReducer from './appointmentSlice';
import analyticsReducer from './analyticsSlice'
export const store = configureStore({
reducer: {
dashboard: dashboardReducer,
analytics: analyticsReducer,
appointments: appointmentReducer,
},
});