export const GA_MEASUREMENT_ID = 'UA-167903036-1';

export const DOWNLOAD_TARGET_ELEMENT_ID = 'download-target-element';
export const DISPLAY_AREA_ELEMENT_ID = 'display-area-element';

export const INITIALIZE_ACTION_TYPE = 'INITIALIZE';
export const OVER_WRITE_ACTION_TYPE = 'OVER_WRITE';

export const LAYOUT = {
  HEADER_HEIGHT: 40,
  SIDE_MENU_WIDTH: 240,
} as const;

export const MAX_DISPLAY_SCALE = 1 as const;
export const MIN_DISPLAY_SCALE = 0.5 as const;

export const SHAPES = {
  tree: {
    url: '/tree',
  },
  'client-server': {
    url: '/client-server',
  },
} as const;

export const TREE = {
  NODE_COUNT_BETWEEN_ROWS: 3,
  NODE: {
    MINIMUM_WIDTH: 50,
    HEIGHT: 30,
    BOTH_SIDE_PADDING: 20,
  },
  EDGE: {
    LENGTH_TO_ADD: 3,
  },
  OPTIMAL_DISTANCE_TO_ADJACENT_NODE: 40,
} as const;
