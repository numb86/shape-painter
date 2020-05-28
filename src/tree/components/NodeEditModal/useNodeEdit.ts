import {useReducer} from 'react';

import {
  UserEditableStyleProperty,
  UserEditablePropertyOfTree,
} from '@tree/tree.ts';

export type Action = {
  [K in keyof UserEditablePropertyOfTree]?: K extends 'text'
    ? string
    : Partial<UserEditableStyleProperty>;
};

const reducer = (state: UserEditablePropertyOfTree, action: Action) => {
  const text = action.text ?? state.text;

  const style = action.style ? {...state.style, ...action.style} : state.style;

  return {
    text,
    style,
  };
};

export const useNodeEdit = (initialState: UserEditablePropertyOfTree) => {
  return useReducer(reducer, initialState);
};
