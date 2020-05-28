import React, {useRef, useCallback} from 'react';

export const useModal = () => {
  const ref: React.MutableRefObject<HTMLDialogElement | null> = useRef(null);
  const showModal = useCallback(() => {
    if (ref.current) {
      ref.current.showModal();
    }
  }, []);
  const closeModal = useCallback(() => {
    if (ref.current) {
      ref.current.close();
    }
  }, []);
  return {ref, showModal, closeModal} as const;
};
