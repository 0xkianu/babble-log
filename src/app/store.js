import { configureStore } from '@reduxjs/toolkit';
import babbleReducer from '../features/babble/babbleSlice';

export const store = configureStore({
  reducer: {
    babbles: babbleReducer,
  },
});
