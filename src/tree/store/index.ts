import {combineReducers} from 'redux';
import {useSelector, TypedUseSelectorHook} from 'react-redux';
import undoable, {excludeAction} from 'redux-undo';

import {displayScale} from '@shared/store/displayScale';
import {INITIALIZE_ACTION_TYPE} from '@src/constants';

import {tree} from './tree';
import {commonSetting} from './commonSetting';
import {nodeSize} from './nodeSize';

const history = undoable(combineReducers({tree, commonSetting}), {
  filter: excludeAction([INITIALIZE_ACTION_TYPE]),
});

export const reducer = combineReducers({history, nodeSize, displayScale});

type RootState = ReturnType<typeof reducer>;

const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export {useTypedSelector as useSelector};
