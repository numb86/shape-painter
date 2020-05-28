import {useEffect} from 'react';
import {useStore} from 'react-redux';
import {ActionCreators} from 'redux-undo';

import {pathToReducer} from '@src/index';
import {INITIALIZE_ACTION_TYPE} from '@src/constants';

export const useReplaceReducer = (hasCorrectReducer: () => boolean) => {
  const store = useStore();

  useEffect(() => {
    if (!hasCorrectReducer()) {
      const reducer = pathToReducer.get(window.location.pathname);
      if (!reducer) {
        throw new Error(
          `No reducer corresponding to ${window.location.pathname} found.`
        );
      }

      if (store.getState().history) {
        store.dispatch(ActionCreators.clearHistory());
      }

      store.replaceReducer(reducer);
      store.dispatch({type: INITIALIZE_ACTION_TYPE});
    }
  }, [hasCorrectReducer, store]);
};
