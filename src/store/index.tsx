import { configureStore } from '@reduxjs/toolkit';
import commonSlice from './slices/common';

const store = configureStore({
  reducer: {
    commonSlice,
  },
});

export default store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
