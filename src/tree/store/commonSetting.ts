import {INITIALIZE_ACTION_TYPE, OVER_WRITE_ACTION_TYPE} from '@src/constants';

const UPDATE_COMMON_SETTING_VALUE = 'UPDATE_COMMON_SETTING_VALUE' as const;

type Settings = 'textColor' | 'nodeColor' | 'edgeColor';

type UpdateValuePayload = {
  [K in Settings]?: string;
};

interface UpdateCommonSettingValue<E> {
  type: typeof UPDATE_COMMON_SETTING_VALUE;
  payload: E extends true ? Error : UpdateValuePayload;
  error?: E;
}

type OverWrite = {
  type: typeof OVER_WRITE_ACTION_TYPE;
  payload: {
    commonSetting: {
      [K in Settings]: string;
    };
  };
};

type Initialize = {
  type: typeof INITIALIZE_ACTION_TYPE;
};

const INITIAL_TEXT_COLOR = '#fff';
const INITIAL_NODE_COLOR = '#969FE6';
const INITIAL_EDGE_COLOR = '#969FE6';

const initialState = {
  textColor: INITIAL_TEXT_COLOR,
  nodeColor: INITIAL_NODE_COLOR,
  edgeColor: INITIAL_EDGE_COLOR,
};

const hasError = (
  action: UpdateCommonSettingValue<true | undefined>
): action is UpdateCommonSettingValue<true> => action.error === true;

export const updateCommonSettingValue = (
  nextSettings: UpdateValuePayload
): UpdateCommonSettingValue<true | undefined> => {
  const isExistProperty = (arg: string) =>
    Object.keys(initialState).some((key) => key === arg);

  const notExistProperties: string[] = [];
  Object.keys(nextSettings).forEach((property) => {
    if (!isExistProperty(property)) {
      notExistProperties.push(property);
    }
  });

  if (notExistProperties.length !== 0) {
    return {
      type: UPDATE_COMMON_SETTING_VALUE,
      payload: new Error(
        `These properties are invalid => ${notExistProperties.join(', ')}`
      ),
      error: true,
    };
  }

  return {
    type: UPDATE_COMMON_SETTING_VALUE,
    payload: nextSettings,
  };
};

export const commonSetting = (
  state = initialState,
  action: UpdateCommonSettingValue<true | undefined> | OverWrite | Initialize
) => {
  switch (action.type) {
    case UPDATE_COMMON_SETTING_VALUE:
      if (hasError(action)) {
        throw action.payload;
      }
      return {
        ...state,
        ...(action as UpdateCommonSettingValue<undefined>).payload,
      };
    case OVER_WRITE_ACTION_TYPE:
      return {...action.payload.commonSetting};
    case INITIALIZE_ACTION_TYPE:
      return {...initialState};
    default:
      return state;
  }
};
