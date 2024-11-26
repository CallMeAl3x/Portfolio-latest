export const ANIMATION_STATES = {
  FORWARD: "forward",
  BACK: "back"
} as const;

export const LOCAL_STORAGE_KEYS = {
  RELOADING: "reloading",
  WAS_AT_HOME: "wasAtHome",
  IS_GOING_HOME: "isGoingHome",
  NAVIGATION_DIRECTION: "navigation_direction"
} as const;

export const INITIAL_CONTENT_STATE = {
  opacity: 0,
  visibility: "hidden"
} as const;

export const VISIBLE_CONTENT_STATE = {
  opacity: 1,
  visibility: "visible"
} as const;
