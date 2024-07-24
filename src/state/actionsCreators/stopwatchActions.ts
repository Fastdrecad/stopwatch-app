import * as types from "../actionTypes/stopwatchTypes";

export const setTargetMilliseconds = (milliseconds: number) => ({
  type: types.SET_TARGET_MILLISECONDS,
  payload: milliseconds
});

export const toggleStartPause = (isStartable: boolean) => ({
  type: types.TOGGLE_START_PAUSE,
  payload: isStartable
});

export const toggleActive = (isActive: boolean) => ({
  type: types.TOGGLE_ACTIVE,
  payload: isActive
});

export const toggleButtonVisibillity = (isValid: boolean) => ({
  type: types.TOGGLE_BUTTON_VISIBILITY,
  payload: isValid
});

export const setInputValue = (value: string) => ({
  type: types.SET_INPUT_VALUE,
  payload: value
});

export const tick = () => ({
  type: types.TICK
});

export const resetStopwatch = () => ({
  type: types.RESET_STOPWATCH
});
