import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import gearReducer from './gear/gearSlice';
import maintenanceReducer from './maintenance/maintenanceSlice';
import reminderReducer from './reminder/reminderSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    gear: gearReducer,
    maintenance: maintenanceReducer,
    reminder: reminderReducer
  }
});

export default store;
