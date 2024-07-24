import { useContext, useEffect } from "react";
import "./styles/style.scss";
import TimerInput from "./components/TimerInput";
import Display from "./components/Display";
import ControlPanel from "./components/ControlPanel";
import { StopwatchContext } from "./context/StopwatchContext";
import { tick, toggleActive } from "./state";

const App: React.FC = () => {
  const { state, dispatch } = useContext(StopwatchContext);
  console.log(state);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;

    const clearIntervalIfExists = () => {
      if (interval) {
        clearInterval(interval);
        interval = undefined;
      }
    };

    if (state.isActive) {
      interval = setInterval(() => {
        if (state.milliseconds < state.targetMilliseconds) {
          dispatch(tick());
        } else {
          clearIntervalIfExists();
          dispatch(toggleActive(false));
        }
      }, 10);
    } else {
      clearIntervalIfExists();
    }

    return () => {
      clearIntervalIfExists();
    };
  }, [state.isActive, state.milliseconds, state.targetMilliseconds, dispatch]);

  return (
    <div className="stopwatch-page">
      <TimerInput />
      <Display />
      <ControlPanel />
    </div>
  );
};

export default App;
