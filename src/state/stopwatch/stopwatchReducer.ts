import * as types from "./stopwatchTypes";

// Define the initial state based on your application's needs
interface StopwatchState {
  targetMilliseconds: number;
  milliseconds: number;
  isActive: boolean;
  isButtonVisible: boolean;
  inputValue: string;
  buttonLabel: string;
  isStartable: boolean;
  totalTime: number;
  isSet: boolean;
}

const initialState: StopwatchState = {
  targetMilliseconds: 0,
  milliseconds: 0,
  isActive: false,
  isButtonVisible: false,
  inputValue: "0",
  buttonLabel: "Start",
  isStartable: false,
  totalTime: 0,
  isSet: false
};

function stopwatchReducer(state = initialState, action: any): StopwatchState {
  switch (action.type) {
    case types.SET_TARGET_MILLISECONDS:
      return {
        ...state,
        targetMilliseconds: action.payload,
        milliseconds: action.payload,
        inputValue: (action.payload / 1000).toString(),
        totalTime: action.payload,
        isStartable: true,
        isSet: true
      };
    case types.TOGGLE_ACTIVE:
      const newActiveState = !state.isActive;
      return {
        ...state,
        isActive: newActiveState,
        buttonLabel: newActiveState ? "Pause" : "Resume"
      };
    case types.RESET_ALL:
      return {
        ...initialState,
        inputValue: "0", // Reset input value to '0'
        buttonLabel: "Start" // Reset button label to 'Start'
      };
    case types.TICK:
      if (state.isActive && state.milliseconds > 0) {
        return { ...state, milliseconds: Math.max(0, state.milliseconds - 10) };
      } else if (state.milliseconds <= 0 && state.isActive) {
        return { ...state, isActive: false, buttonLabel: "Start" };
      }
      return state;
    default:
      return state;
  }
}

export default stopwatchReducer;
