import { create } from 'zustand';

const useToggleStore = create((set) => ({
  elements: {},
  toggleElement: (id) => set((state) => ({
    elements: {
      ...state.elements,
      [id]: !state.elements[id],
    },
  })),
  setOpenElement: (id, isOpen) => set((state) => ({
    elements: {
      ...state.elements,
      [id]: isOpen,
    },
  })),
}));

export { useToggleStore };

