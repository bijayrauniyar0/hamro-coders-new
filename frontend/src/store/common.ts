/* eslint-disable no-unused-vars */
import { create } from 'zustand';

export type User = {
  id: number;
  name: string;
  email: string;
  number: string;
  avatar: string;
};

type CommonState = {
  userProfile: Partial<User>;
  isAuthenticated: boolean;
  setUserProfile: (user: Partial<User>) => void;
  setIsAuthenticated: (status: boolean) => void;
};

const useCommonStore = create<CommonState>(set => ({
  userProfile: {},
  isAuthenticated: false,
  setUserProfile: user => set({ userProfile: user }),
  setIsAuthenticated: status => set({ isAuthenticated: status }),
}));

export default useCommonStore;
