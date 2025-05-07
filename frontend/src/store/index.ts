import { configureStore } from '@reduxjs/toolkit';

import analyticsSlice from './slices/analytics';
import commonSlice from './slices/common';
import leaderboardSlice from './slices/leaderboard';

const store = configureStore({
  reducer: {
    commonSlice,
    leaderboardSlice,
    analyticsSlice,
  },
});

export default store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
