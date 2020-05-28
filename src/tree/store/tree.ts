import {
  editContentOfSpecifiedNode,
  addNode,
  removeNode,
  Tree,
  UserEditablePropertyOfTree,
} from '@tree/tree.ts';

import {INITIALIZE_ACTION_TYPE, OVER_WRITE_ACTION_TYPE} from '@src/constants';

const INITIAL_TEXT = 'element';
const INITIAL_TEXT_COLOR = '#fff';
const INITIAL_BACKGROUND_COLOR = '#000';
const INITIAL_EDGE_COLOR = '#000';

const EDIT_NODE = 'EDIT_NODE';
const ADD_NODE = 'ADD_NODE';
const REMOVE_NODE = 'REMOVE_NODE';

type EditNodeAction = {
  type: typeof EDIT_NODE;
  payload: {
    targetNodeId: number;
    editContent: Partial<UserEditablePropertyOfTree>;
  };
};

type AddNodeAction = {
  type: typeof ADD_NODE;
  payload: {
    parentNodeId: number;
    node: Omit<Tree, 'id'>;
  };
};

type RemoveNodeAction = {
  type: typeof REMOVE_NODE;
  payload: {
    targetNodeId: number;
  };
};

type OverWriteTreeAction = {
  type: typeof OVER_WRITE_ACTION_TYPE;
  payload: {
    tree: Tree;
  };
};

type InitializeAction = {
  type: typeof INITIALIZE_ACTION_TYPE;
};

type TreeActions =
  | EditNodeAction
  | AddNodeAction
  | RemoveNodeAction
  | OverWriteTreeAction
  | InitializeAction;

export const editNodeActionCreator = (
  targetNodeId: number,
  editContent: Partial<UserEditablePropertyOfTree>
): EditNodeAction => ({
  type: EDIT_NODE,
  payload: {
    targetNodeId,
    editContent,
  },
});

export const addNodeActionCreator = (parentNodeId: number): AddNodeAction => ({
  type: ADD_NODE,
  payload: {
    parentNodeId,
    node: {
      text: INITIAL_TEXT,
      layout: {top: 0, left: 0},
      style: {
        textColor: {
          isOverrideByCommonSetting: true,
          value: INITIAL_TEXT_COLOR,
        },
        backgroundColor: {
          isOverrideByCommonSetting: true,
          value: INITIAL_BACKGROUND_COLOR,
        },
        edgeColor: {
          isOverrideByCommonSetting: true,
          value: INITIAL_EDGE_COLOR,
        },
      },
      children: [],
    },
  },
});

export const removeNodeActionCreator = (
  targetNodeId: number
): RemoveNodeAction => ({
  type: REMOVE_NODE,
  payload: {
    targetNodeId,
  },
});

const initialState: Tree = {
  id: 1,
  text: 'Parent',
  layout: {
    top: 0,
    left: 0,
  },
  style: {
    textColor: {
      isOverrideByCommonSetting: true,
      value: INITIAL_TEXT_COLOR,
    },
    backgroundColor: {
      isOverrideByCommonSetting: true,
      value: INITIAL_BACKGROUND_COLOR,
    },
    edgeColor: {
      isOverrideByCommonSetting: true,
      value: INITIAL_EDGE_COLOR,
    },
  },
  children: [
    {
      id: 2,
      text: 'Child A',
      layout: {
        top: 0,
        left: 0,
      },
      style: {
        textColor: {
          isOverrideByCommonSetting: true,
          value: INITIAL_TEXT_COLOR,
        },
        backgroundColor: {
          isOverrideByCommonSetting: true,
          value: INITIAL_BACKGROUND_COLOR,
        },
        edgeColor: {
          isOverrideByCommonSetting: true,
          value: INITIAL_EDGE_COLOR,
        },
      },
      children: [],
    },
    {
      id: 3,
      text: 'Child B',
      layout: {
        top: 0,
        left: 0,
      },
      style: {
        textColor: {
          isOverrideByCommonSetting: true,
          value: INITIAL_TEXT_COLOR,
        },
        backgroundColor: {
          isOverrideByCommonSetting: true,
          value: INITIAL_BACKGROUND_COLOR,
        },
        edgeColor: {
          isOverrideByCommonSetting: true,
          value: INITIAL_EDGE_COLOR,
        },
      },
      children: [],
    },
  ],
};

export const tree = (state = initialState, action: TreeActions): Tree => {
  switch (action.type) {
    case EDIT_NODE: {
      return editContentOfSpecifiedNode(
        state,
        action.payload.targetNodeId,
        action.payload.editContent
      );
    }
    case ADD_NODE: {
      return addNode(state, action.payload.node, action.payload.parentNodeId);
    }
    case REMOVE_NODE: {
      return removeNode(state, action.payload.targetNodeId);
    }
    case OVER_WRITE_ACTION_TYPE: {
      return {...action.payload.tree};
    }
    case INITIALIZE_ACTION_TYPE: {
      return {...initialState};
    }
    default:
      return state;
  }
};
