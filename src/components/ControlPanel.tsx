import { useContext } from "react";
import CustomButton from "./CustomButton";
import { StopwatchContext } from "../context/StopwatchContext";
import {
  resetStopwatch,
  toggleButtonVisibillity,
  toggleStartPause
} from "../state";

const ControlPanel: React.FC = () => {
  const { state, dispatch } = useContext(StopwatchContext);

  const handleStartPause = () => {
    dispatch(toggleStartPause(state.isStartable));
    if (state.isStartable) {
      dispatch(toggleButtonVisibillity(false));
    }
  };

  const handleReset = () => {
    dispatch(resetStopwatch());
  };

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
