import React, { createContext, useReducer, ReactNode } from "react";
import { initialState, StopwatchState } from "../state";
import stopwatchReducer from "../state/reducers/stopwatchReducer";

// Creating the context with the initial value for state and dispatch
export const StopwatchContext = createContext<{
  state: StopwatchState;
  dispatch: React.Dispatch<any>;
}>({
  state: initialState,
  dispatch: () => null
});

// Create a provider component
export const StopwatchProvider: React.FC<{ children: ReactNode }> = ({
  children
}) => {
  const [state, dispatch] = useReducer(stopwatchReducer, initialState);

  return (
    <StopwatchContext.Provider value={{ state, dispatch }}>
      {children}
    </StopwatchContext.Provider>
  );
};
