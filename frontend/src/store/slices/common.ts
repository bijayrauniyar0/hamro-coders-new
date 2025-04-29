import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type User = {
  id: string;
  name: string;
  email: string;
  number: string;
  avatar: string;
};

type CommonState = {
  isModesOpen: boolean;
  selectedMode?: string;
  userProfile: Partial<User>;
  [key: string]: any;
};

const initialState: CommonState = {
  isModesOpen: false,
  selectedMode: '',
  userProfile: {},
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

const setUserProfile = (
  state: CommonState,
  action: PayloadAction<Partial<User>>,
) => {
  const { payload } = action;
  state.userProfile = payload;
};

const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    setIsModesOpen,
    setGameDetails,
    setSelectedMode,
    setUserProfile,
  },
});

export { commonSlice };

export default commonSlice.reducer;
