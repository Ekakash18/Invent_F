import { useToggleStore } from '@/store/GenericStore';

export const useToggleElement = () => {
  const elements = useToggleStore((state) => state.elements);
  const toggleElement = useToggleStore((state) => state.toggleElement);
  const setOpenElement = useToggleStore((state) => state.setOpenElement);

  const isOpen = (elementId) => elements[elementId] || false;

  const toggle = (elementId) => {
    console.log(`Toggling elementId: ${elementId}`);
    toggleElement(elementId);
  };

  const close = (elementId) => {
    console.log(`Closing elementId: ${elementId}`);
    setOpenElement(elementId, false);
  };

  const open = (elementId) => {
    console.log(`Opening elementId: ${elementId}`);
    setOpenElement(elementId, true);
  };

  return {
    isOpen,
    toggle,
    close,
    open,
  };
};

