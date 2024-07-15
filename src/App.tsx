import { useEffect, useState } from "react";
import "./styles/style.scss";
import TimerInput from "./components/TimerInput";
import Display from "./components/Display";
import ControlPanel from "./components/ControlPanel";

const App: React.FC = () => {
  const [targetMilliseconds, setTargetMilliseconds] = useState<number>(0);
  const [milliseconds, setMilliseconds] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isButtonVisible, setIsButtonVisible] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("0");
  const [buttonLabel, setButtonLabel] = useState<string>("Start");
  const [isStartable, setIsStartable] = useState<boolean>(false);
  const [totalTime, setTotalTime] = useState<number>(0);
  const [isSet, setIsSet] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive && milliseconds > 0) {
      interval = setInterval(() => {
        setMilliseconds((prevMilliseconds) => prevMilliseconds - 10);
      }, 10);
    } else if (milliseconds <= 0 && isActive) {
      clearInterval(interval!);
      setIsActive(false);
      setButtonLabel("Start");
    }

    return () => {
      interval && clearInterval(interval);
    };
  }, [isActive, milliseconds]);

  const toggleStartPause = () => {
    if (isActive && isStartable) {
      setIsActive(false);
      setButtonLabel("Resume");
    } else {
      setIsActive(true);
      setButtonLabel("Pause");
      if (milliseconds <= 0 && targetMilliseconds > 0) {
        setMilliseconds(targetMilliseconds);
      }
    }
  };

  const handleReset = () => {
    setIsActive(false);
    setMilliseconds(0);
    setIsButtonVisible(false);
    setInputValue("0");
    setTotalTime(0);
    setButtonLabel("Start");
    setIsStartable(false);
    setIsSet(false);
  };

  const handleSetTargetMilliseconds = (milliseconds: number) => {
    setTargetMilliseconds(milliseconds);
    setMilliseconds(milliseconds);
    setIsButtonVisible(false);
    setInputValue((milliseconds / 1000).toString());
    setIsStartable(true);
    setTotalTime(milliseconds);
  };

  return (
    <div className="stopwatch-page">
      <TimerInput
        setTargetMilliseconds={handleSetTargetMilliseconds}
        isButtonVisible={isButtonVisible}
        setIsButtonVisible={setIsButtonVisible}
        inputValue={inputValue}
        setInputValue={setInputValue}
        isSet={isSet}
        setIsSet={setIsSet}
      />
      <Display time={milliseconds} totalTime={totalTime} isActive={isActive} />
      <ControlPanel
        isActive={isActive}
        onStartPause={toggleStartPause}
        onReset={handleReset}
        buttonLabel={buttonLabel}
        isStartable={isStartable}
      />
    </div>
  );
};
export default App;
