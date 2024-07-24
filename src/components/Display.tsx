import React, { useEffect, useState, useContext } from "react";
import CircularProgress from "./CircularProgress";
import { StopwatchContext } from "../context/StopwatchContext";

const Display: React.FC = () => {
  const { state } = useContext(StopwatchContext);
  const [size, setSize] = useState<number>(450);

  useEffect(() => {
    const handleResize = () => {
      setSize(window.innerWidth < 768 ? 350 : 500);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const formatTime = (milliseconds: number) => {
    const pad = (num: number, size: number = 2) =>
      num.toString().padStart(size, "0");

    const hours = pad(Math.floor(milliseconds / 3600000));
    const minutes = pad(Math.floor((milliseconds % 3600000) / 60000));
    const seconds = pad(Math.floor((milliseconds % 60000) / 1000));
    const newMilliseconds = pad(Math.floor((milliseconds % 1000) / 10));

    return { hours, minutes, seconds, newMilliseconds };
  };

  const timePartsForRendering = formatTime(state.targetMilliseconds);
  const timePartsForCounting = formatTime(state.milliseconds);

  const progress =
    state.targetMilliseconds > 0
      ? (state.milliseconds / state.targetMilliseconds) * 100
      : 0;

  return (
    <div className="display">
      <CircularProgress size={size} progress={progress} />
      <div className="time-display">
        {state.milliseconds === state.targetMilliseconds &&
        state.isStartable ? (
          <span>Time is up!</span>
        ) : (
          <>
            {parseInt(timePartsForRendering.hours) > 0 && (
              <span className="hours">{timePartsForCounting.hours}:</span>
            )}
            {parseInt(timePartsForRendering.minutes) > 0 && (
              <span className="minutes">{timePartsForCounting.minutes}:</span>
            )}
            <span className="seconds">{timePartsForCounting.seconds},</span>
            <span className="milliseconds">
              {timePartsForCounting.newMilliseconds}
            </span>
          </>
        )}
      </div>
      <div className="time-display-second">
        <div className="time-label">
          <span>hh</span>
          <span>{timePartsForRendering.hours}:</span>
        </div>
        <div className="time-label">
          <span>mm</span>
          <span>{timePartsForRendering.minutes}:</span>
        </div>
        <div className="time-label">
          <span>ss</span>
          <span>{timePartsForRendering.seconds}</span>
        </div>
      </div>
    </div>
  );
};

export default Display;
