import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type User = {
  id: number;
  name: string;
  email: string;
  number: string;
  avatar: string;
};

type CommonState = {
  isModesOpen: boolean;
  userProfile: Partial<User>;
  [key: string]: any;
};

const initialState: CommonState = {
  isModesOpen: false,
  userProfile: {},
  isAuthenticated: false,
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

const setUserProfile = (
  state: CommonState,
  action: PayloadAction<Partial<User>>,
) => {
  const { payload } = action;
  state.userProfile = payload;
};

const setIsAuthenticated = (
  state: CommonState,
  action: PayloadAction<boolean>,
) => {
  const { payload } = action;
  state.isAuthenticated = payload;
};

const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    setIsModesOpen,
    setGameDetails,
    setUserProfile,
    setIsAuthenticated,
  },
});

export { commonSlice };

export default commonSlice.reducer;
