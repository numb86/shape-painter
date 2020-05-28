import {createStore, Store, CombinedState} from 'redux';
import {devToolsEnhancer} from 'redux-devtools-extension';

import {reducer as reducerOfTree} from '@tree/store/index';
import {reducer as reducerOfClientServer} from '@clientServer/store/index';

export type Reducer = typeof reducerOfTree | typeof reducerOfClientServer;

export const configureStore = (
  reducer: Reducer
): Store<CombinedState<any>, any> => {
  return createStore(reducer as any, undefined, devToolsEnhancer({}));
};
