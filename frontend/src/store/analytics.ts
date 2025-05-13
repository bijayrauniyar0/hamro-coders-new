import { create } from 'zustand';

type AnalyticsState = {
  mockTestId: number | null;
  // eslint-disable-next-line no-unused-vars
  setMockTestId: (id: number) => void;
};

const useAnalyticsStore = create<AnalyticsState>(set => ({
  mockTestId: null,
  setMockTestId: (id: number) => set({ mockTestId: id }),
}));

export default useAnalyticsStore;
