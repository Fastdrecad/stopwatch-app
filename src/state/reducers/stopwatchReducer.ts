import { setInputValue } from "../actionsCreators/stopwatchActions";
import * as types from "../actionTypes/stopwatchTypes";

export interface StopwatchState {
  targetMilliseconds: number;
  milliseconds: number;
  isActive: boolean;
  isButtonVisible: boolean;
  inputValue: string;
  buttonLabel: string;
  isStartable: boolean;
  isSet: boolean;
}

export const initialState: StopwatchState = {
  targetMilliseconds: 0,
  milliseconds: 0,
  isActive: false,
  isButtonVisible: false,
  inputValue: "0",
  buttonLabel: "Start",
  isStartable: false,
  isSet: false
};

export interface UpdateStopwatchSettingsAction {
  inputValue: string;
  isValid: boolean;
  targetMilliseconds: number;
  startable: boolean;
}

function stopwatchReducer(state = initialState, action: any): StopwatchState {
  switch (action.type) {
    case types.SET_INPUT_VALUE:
      if (!setInputValue) {
        return {
          ...state,
          inputValue: "0",
          isButtonVisible: false
        };
      } else {
        return {
          ...state,
          inputValue: action.payload
        };
      }
    case types.TOGGLE_BUTTON_VISIBILITY:
      return {
        ...state,
        isButtonVisible: action.payload
      };
    case types.SET_TARGET_MILLISECONDS:
      return {
        ...state,
        targetMilliseconds: action.payload,
        milliseconds: 0, // Start from 0 milliseconds
        inputValue: (action.payload / 1000).toString(),
        isStartable: true,
        isSet: true,
        isButtonVisible: false
      };
    case types.RESET_STOPWATCH:
      return {
        ...initialState,
        inputValue: "0",
        buttonLabel: "Start"
      };
    case types.TOGGLE_START_PAUSE:
      if (state.isActive && state.isStartable) {
        return {
          ...state,
          isActive: false,
          buttonLabel: "Resume"
        };
      } else {
        return {
          ...state,
          isActive: true,
          buttonLabel: "Pause",
          milliseconds: state.milliseconds
        };
      }
    case types.TOGGLE_ACTIVE:
      if (state.milliseconds === state.targetMilliseconds) {
        return {
          ...state,
          buttonLabel: "Start",
          isActive: false,
          isSet: false
        };
      } else {
        const newActiveState = !state.isActive;
        return {
          ...state,
          isActive: newActiveState,
          buttonLabel: newActiveState ? "Pause" : "Resume"
        };
      }

    case types.TICK:
      if (state.isActive && state.milliseconds < state.targetMilliseconds) {
        return {
          ...state,
          milliseconds: Math.min(
            state.targetMilliseconds,
            state.milliseconds + 10
          )
        };
      } else if (
        state.milliseconds >= state.targetMilliseconds &&
        state.isActive
      ) {
        return {
          ...state,
          isActive: false,
          buttonLabel: "Reset"
        };
      }
      return state;
    default:
      return state;
  }
}

export default stopwatchReducer;
