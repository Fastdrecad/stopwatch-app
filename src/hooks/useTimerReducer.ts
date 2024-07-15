export interface TimerState {
  targetMilliseconds: number;
  milliseconds: number;
  isActive: boolean;
  isButtonVisible: boolean;
  inputValue: string;
  buttonLabel: string;
  isStartable: boolean;
  totalTime: number;
}

export type timerAction =
  | { type: "SET_TARGET_MILLISECONDS"; payload: number }
  | { type: "TOGGLE_START_PAUSE" }
  | { type: "RESET" }
  | { type: "SET_INPUT_VALUE"; payload: string }
  | { type: "TICK" };

export function timerReducer(
  state: TimerState,
  action: timerAction
): TimerState {
  switch (action.type) {
    case "SET_TARGET_MILLISECONDS":
      return {
        ...state,
        targetMilliseconds: action.payload,
        milliseconds: action.payload,
        isButtonVisible: false,
        inputValue: (action.payload / 1000).toString(),
        isStartable: true,
        totalTime: action.payload
      };
    case "TOGGLE_START_PAUSE":
      return state.isActive && state.isStartable
        ? { ...state, isActive: false, buttonLabel: "Resume" }
        : {
            ...state,
            isActive: true,
            buttonLabel: "Pause",
            milliseconds:
              state.milliseconds <= 0 && state.targetMilliseconds > 0
                ? state.targetMilliseconds
                : state.milliseconds
          };
    case "RESET":
      return {
        ...state,
        isActive: false,
        milliseconds: 0,
        isButtonVisible: true,
        inputValue: "",
        totalTime: 0,
        buttonLabel: "Start",
        isStartable: false
      };
    case "TICK":
      return state.isActive
        ? { ...state, milliseconds: state.milliseconds - 10 }
        : state;
    case "SET_INPUT_VALUE":
      return {
        ...state,
        inputValue: action.payload
      };
    default:
      // console.error(`Unhandled action type: ${action.type}`);
      return state; // Return the current state if the action type is unknown
  }
}
