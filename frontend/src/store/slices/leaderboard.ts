import { createSlice } from '@reduxjs/toolkit';

type LeaderboardState = {
  filters: {
    stream_id: number;
    test_id: number[];
    filter_by: 'daily' | 'weekly' | 'monthly';
  };
  isFiltersOpen: boolean;
};

const initialState: LeaderboardState = {
  filters: {
    stream_id: 0,
    test_id: [],
    filter_by: 'daily',
  },
  isFiltersOpen: false,
};

const setFilters = (
  state: LeaderboardState,
  action: { payload: Partial<LeaderboardState['filters']> },
) => {
  const { payload } = action;
  state.filters = { ...state.filters, ...payload };
};

const resetFilters = (state: LeaderboardState) => {
  state.filters = initialState.filters;
};

const setIsFiltersOpen = (
  state: LeaderboardState,
  action: { payload: boolean },
) => {
  const { payload } = action;
  state.isFiltersOpen = payload;
};

const leaderboardSlice = createSlice({
  name: 'leaderboard',
  initialState,
  reducers: {
    setFilters,
    resetFilters,
    setIsFiltersOpen,
  },
});

export { leaderboardSlice };
export default leaderboardSlice.reducer;
