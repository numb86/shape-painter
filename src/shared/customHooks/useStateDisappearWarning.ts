import {useEffect} from 'react';

export const useStateDisappearWarning = (hasHistory: boolean) => {
  useEffect(() => {
    const listener = (e: BeforeUnloadEvent) => {
      e.returnValue = '';
    };
    if (hasHistory) {
      window.addEventListener('beforeunload', listener);
    }
    return () => {
      window.removeEventListener('beforeunload', listener);
    };
  }, [hasHistory]);
};
