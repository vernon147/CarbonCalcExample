// src/store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import calculationReducer from './calculationSlice';

export const store = configureStore({
  reducer: {
    calculation: calculationReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
