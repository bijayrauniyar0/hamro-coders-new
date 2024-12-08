import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type CommonState = {
  isModesOpen: boolean;
  selectedMode?: string;
  [key: string]: any;
};
const initialState: CommonState = {
  isModesOpen: false,
  selectedMode: 'ranked',
};

const setIsModesOpen = (state: CommonState, action: PayloadAction<boolean>) => {
  const { payload } = action;
  state.isModesOpen = payload;
};

const setGameDetails = (
  state: CommonState,
  action: PayloadAction<{ [key: string]: any }>,
) => {
  const { payload } = action;
  return { ...state, ...payload };
};
const setSelectedMode = (state: CommonState, action: PayloadAction<string>) => {
  const { payload } = action;
  state.selectedMode = payload;
};

const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    setIsModesOpen,
    setGameDetails,
    setSelectedMode,
  },
});

export { commonSlice };

export default commonSlice.reducer;
