import * as types from "./stopwatchTypes";

export const setTargetMilliseconds = (milliseconds: number) => ({
  type: types.SET_TARGET_MILLISECONDS,
  payload: milliseconds
});

export const setMilliseconds = (milliseconds: number) => ({
  type: types.SET_MILLISECONDS,
  payload: milliseconds
});

export const toggleActive = (isActive: boolean) => ({
  type: types.TOGGLE_ACTIVE,
  payload: isActive
});

export const toggleButtonVisibillity = (isVisible: boolean) => ({
  type: types.TOGGLE_BUTTON_VISIBILITY,
  payload: isVisible
});

export const setInputValue = (value: string) => ({
  type: types.SET_INPUT_VALUE,
  payload: value
});

export const setButtonLabel = (label: string) => ({
  type: types.SET_BUTTON_LABEL,
  payload: label
});

export const toggleStartable = (isStartable: boolean) => ({
  type: types.TOGGLE_STARTABLE,
  payload: isStartable
});

export const setTotalTime = (totalTime: number) => ({
  type: types.SET_TOTAL_TIME,
  payload: totalTime
});

export const toggleSet = (isSet: boolean) => ({
  type: types.TOGGLE_SET
});

/**
 * TODO: Will decide if I need this functionality
export const resetAll = () => ({
 type: types.RESET_ALL
 });
 
 * TODO: Will decide if I need this functionality
export const tick = () => ({
  type: types.TICK
});

*/
