import { createSlice } from '@reduxjs/toolkit';

type CommonState = {
  isModesOpen: boolean;
};
const initialState: CommonState = {
  isModesOpen: false,
};

const setIsModesOpen = (state: CommonState) => {
  state.isModesOpen = !state.isModesOpen;
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
