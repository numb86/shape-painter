import {
  INITIALIZE_ACTION_TYPE,
  MAX_DISPLAY_SCALE,
  MIN_DISPLAY_SCALE,
} from '@src/constants';

const SET_ABSOLUTE_VALUE = 'SET_ABSOLUTE_VALUE';

const INITIAL_DISPLAY_SCALE = 1 as const;

interface SetAbsoluteValue<E> {
  type: typeof SET_ABSOLUTE_VALUE;
  payload: E extends true ? Error : {value: number};
  error?: E;
}

type Initialize = {
  type: typeof INITIALIZE_ACTION_TYPE;
};

const hasError = (
  action: SetAbsoluteValue<true | undefined>
): action is SetAbsoluteValue<true> => action.error === true;

export const setAbsoluteValue = (
  value: number
): SetAbsoluteValue<true | undefined> => {
  if (value > MAX_DISPLAY_SCALE) {
    return {
      type: SET_ABSOLUTE_VALUE,
      payload: new Error(`Max scale is ${MAX_DISPLAY_SCALE}.`),
      error: true,
    } as SetAbsoluteValue<true>;
  }
  if (value < MIN_DISPLAY_SCALE) {
    return {
      type: SET_ABSOLUTE_VALUE,
      payload: new Error(`Min scale is ${MIN_DISPLAY_SCALE}.`),
      error: true,
    } as SetAbsoluteValue<true>;
  }
  return {
    type: SET_ABSOLUTE_VALUE,
    payload: {
      value,
    },
  } as SetAbsoluteValue<undefined>;
};

const initialState = INITIAL_DISPLAY_SCALE;

export const displayScale = (
  state = initialState as number,
  action: SetAbsoluteValue<true | undefined> | Initialize
) => {
  switch (action.type) {
    case SET_ABSOLUTE_VALUE: {
      if (hasError(action)) {
        throw action.payload;
      }
      const {value} = (action as SetAbsoluteValue<undefined>).payload;
      return value;
    }
    case INITIALIZE_ACTION_TYPE:
      return initialState;
    default:
      return state;
  }
};
