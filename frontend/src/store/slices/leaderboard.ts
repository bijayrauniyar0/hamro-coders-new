/* eslint-disable no-unused-vars */
import { create } from 'zustand';

type FilterBy = 'daily' | 'weekly' | 'monthly';

type Filters = {
  stream_id: number;
  test_id: number[];
  filter_by: FilterBy;
};

type LeaderboardState = {
  filters: Filters;
  isFiltersOpen: boolean;
  setFilters: (filters: Partial<Filters>) => void;
  resetFilters: () => void;
  setIsFiltersOpen: (isOpen: boolean) => void;
};

const initialFilters: Filters = {
  stream_id: 0,
  test_id: [],
  filter_by: 'daily',
};

const useLeaderboardStore = create<LeaderboardState>(set => ({
  filters: initialFilters,
  isFiltersOpen: false,

  setFilters: filters =>
    set(state => ({
      filters: {
        ...state.filters,
        ...filters,
      },
    })),

  resetFilters: () =>
    set(() => ({
      filters: initialFilters,
    })),

  setIsFiltersOpen: isOpen =>
    set(() => ({
      isFiltersOpen: isOpen,
    })),
}));

export default useLeaderboardStore;
