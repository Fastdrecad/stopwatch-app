import { useCallback, useContext, useEffect } from "react";
import ControlPanel from "./components/ControlPanel";
import Display from "./components/Display";
import TimerInput from "./components/TimerInput";
import { StopwatchContext } from "./context/StopwatchContext";
import { tick, toggleActive } from "./state";
import "./styles/style.scss";

const App: React.FC = () => {
  const { state, dispatch } = useContext(StopwatchContext);

  // Memoize the interval callback
  const handleTick = useCallback(() => {
    if (state.milliseconds < state.targetMilliseconds) {
      dispatch(tick());
    } else {
      dispatch(toggleActive(false));
    }
  }, [state.milliseconds, state.targetMilliseconds, dispatch]);

  useEffect(() => {
    if (!state.isActive) return;

    const interval = setInterval(handleTick, 10);
    return () => clearInterval(interval);
  }, [state.isActive, handleTick]);

  return (
    <div className="stopwatch-page">
      <TimerInput />
      <Display />
      <ControlPanel />
    </div>
  );
};

export default App;
