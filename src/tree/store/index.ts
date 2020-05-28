import {combineReducers} from 'redux';
import {useSelector, TypedUseSelectorHook} from 'react-redux';
import undoable, {excludeAction} from 'redux-undo';

import {displayScale} from '@shared/store/displayScale';
import {INITIALIZE_ACTION_TYPE} from '@src/constants';

import {tree} from './tree';
import {commonSetting} from './commonSetting';
import {nodeSize} from './nodeSize';

const history = undoable(combineReducers({tree, commonSetting}), {
  // TODO: Originally, ADD_NODE_SIZE is not necessary.
  // But without it, exclusion of INITIALIZE_ACTION_TYPE will not work.
  // It may be a bug in the library.
  // How to reproduce the bug
  // 1. Replace [INITIALIZE_ACTION_TYPE, 'ADD_NODE_SIZE'] to [INITIALIZE_ACTION_TYPE]
  // 2. Transition to top page
  // 3. Reload
  // 4. Transition to / tree
  // 5. INITIALIZE_ACTION_TYPE is included in history
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  filter: excludeAction([INITIALIZE_ACTION_TYPE, 'ADD_NODE_SIZE']),
});

export const reducer = combineReducers({history, nodeSize, displayScale});

type RootState = ReturnType<typeof reducer>;

const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export {useTypedSelector as useSelector};
