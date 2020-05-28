import {INITIALIZE_ACTION_TYPE} from '@src/constants';

const ADD_NODE_SIZE = 'ADD_NODE_SIZE' as const;

export type NodeSize = {
  [k: number]: {
    width: number;
    height: number;
    text: string;
  };
};

type AddNodeSize = {
  type: typeof ADD_NODE_SIZE;
  payload: NodeSize;
};

type Initialize = {
  type: typeof INITIALIZE_ACTION_TYPE;
};

export const addNodeSize = (arg: NodeSize): AddNodeSize => ({
  type: ADD_NODE_SIZE,
  payload: arg,
});

export const nodeSize = (
  state = {},
  action: AddNodeSize | Initialize
): NodeSize => {
  switch (action.type) {
    case ADD_NODE_SIZE:
      return {
        ...state,
        ...action.payload,
      };
    case INITIALIZE_ACTION_TYPE:
      return {};
    default:
      return state;
  }
};
