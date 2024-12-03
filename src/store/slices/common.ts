import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type CommonState = {
  isModesOpen: boolean;
};
const initialState: CommonState = {
  isModesOpen: false,
};

const setIsModesOpen = (state: CommonState, action: PayloadAction<boolean>) => {
  const { payload } = action;
  state.isModesOpen = payload;
};

const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    setIsModesOpen,
  },
});

export { commonSlice };

export default commonSlice.reducer;
