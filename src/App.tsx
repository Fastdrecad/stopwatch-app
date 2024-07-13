import { useEffect, useState } from "react";
import "./styles/style.scss";
import TimerInput from "./components/TimerInput";
import Display from "./components/Display";
import ControlPanel from "./components/ControlPanel";

const App: React.FC = () => {
  /**
   * Implement the core of your task in this file.
   */

  const [targetSeconds, setTargetSeconds] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isButtonVisible, setIsButtonVisible] = useState<boolean>(true);
  const [inputValue, setInputValue] = useState<string>("");
  const [buttonLabel, setButtonLabel] = useState<string>("Start");
  const [canStart, setCanStart] = useState<boolean>(false);
  const [totalTime, setTotalTime] = useState<number>(0);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds - 1);
      }, 1000);
    } else if (seconds <= 0 && isActive) {
      clearInterval(interval!);
      setIsActive(false);
      setButtonLabel("Start");
    }

    return () => {
      interval && clearInterval(interval);
    };
  }, [isActive, seconds]);

  const toggleStartPause = () => {
    if (isActive && canStart) {
      setIsActive(false);
      setButtonLabel("Resume");
    } else {
      setIsActive(true);
      setButtonLabel("Pause");
      if (seconds <= 0 && targetSeconds > 0) {
        setSeconds(targetSeconds);
      }
    }
  };

  const handleReset = () => {
    setIsActive(false);
    setSeconds(0);
    setIsButtonVisible(true);
    setInputValue("");
    setTotalTime(0);
    setButtonLabel("Start");
    setCanStart(false);
  };

  const handleSetTargetSeconds = (seconds: number) => {
    setTargetSeconds(seconds);
    setSeconds(seconds);
    setIsButtonVisible(false);
    setInputValue(seconds.toString());
    setCanStart(true);
    setTotalTime(seconds);
  };

  return (
    <div className="stopwatch-page">
      <TimerInput
        setTargetSeconds={handleSetTargetSeconds}
        isButtonVisible={isButtonVisible}
        inputValue={inputValue}
        setInputValue={setInputValue}
      />
      <Display time={seconds} totalTime={totalTime} isActive={isActive} />
      <ControlPanel
        isActive={isActive}
        onStartPause={toggleStartPause}
        onReset={handleReset}
        buttonLabel={buttonLabel}
        canStart={canStart}
      />
    </div>
  );
};
export default App;
