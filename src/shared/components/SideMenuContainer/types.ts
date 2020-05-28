import {reducer as reducerOfTree} from '@tree/store/index';
import {reducer as reducerOfClientServer} from '@clientServer/store/index';

export type AnyRootState =
  | ReturnType<typeof reducerOfTree>
  | ReturnType<typeof reducerOfClientServer>;
