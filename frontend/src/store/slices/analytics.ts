import { createSlice } from '@reduxjs/toolkit';

type AnalyticsState = {
  mockTestId: number | null;
};

const initialState: AnalyticsState = {
  mockTestId: null,
};
const setMockTestId = (state: AnalyticsState, action: { payload: number }) => {
  const { payload } = action;
  state.mockTestId = payload;
};
const analyticsSlice = createSlice({
  name: 'analytics',
  initialState,
  reducers: {
    setMockTestId,
  },
});
export { analyticsSlice };
export default analyticsSlice.reducer;
