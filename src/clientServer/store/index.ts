import {combineReducers} from 'redux';
import {useSelector, TypedUseSelectorHook} from 'react-redux';

import {displayScale} from '@shared/store/displayScale';

export const reducer = combineReducers({displayScale});

type RootState = ReturnType<typeof reducer>;

const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export {useTypedSelector as useSelector};
