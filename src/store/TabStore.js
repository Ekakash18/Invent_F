import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useTabStore = create(
  persist(
    (set) => ({
      selectedTabIndex: 0,
      selectedTabName: '',
      setSelectedTabIndex: (value) => set({ selectedTabIndex: value }),
      setSelectedTabName: (value) => set({ selectedTabName: value }),
    }),
    {
      name: 'toggle-tab-selected',
      getStorage: () => localStorage,
    },
  ),
);

export default useTabStore;
