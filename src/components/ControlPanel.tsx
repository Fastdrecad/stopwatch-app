import { useCallback, useContext } from "react";
import { StopwatchContext } from "../context/StopwatchContext";
import {
  resetStopwatch,
  toggleButtonVisibillity,
  toggleStartPause
} from "../state";
import CustomButton from "./CustomButton";

const ControlPanel: React.FC = () => {
  const { state, dispatch } = useContext(StopwatchContext);

  const handleStartPause = useCallback(() => {
    dispatch(toggleStartPause(state.isStartable));
    if (state.isStartable) {
      dispatch(toggleButtonVisibillity(false));
    }
  }, [dispatch, state.isStartable]);

  const handleReset = useCallback(() => {
    dispatch(resetStopwatch());
  }, [dispatch]);

  return (
    <div className="control-panel">
      <CustomButton
        disabled={!state.isSet}
        text={state.buttonLabel}
        className={state.isActive ? "pause-button" : "start-button"}
        onClick={handleStartPause}
      />
      <CustomButton
        text="Reset"
        className="reset-button"
        onClick={handleReset}
      />
    </div>
  );
};

export default ControlPanel;
