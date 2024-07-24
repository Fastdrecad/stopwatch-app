import React, { useContext, useEffect, useRef, useState } from "react";
import CustomButton from "./CustomButton";
import { StopwatchContext } from "../context/StopwatchContext";
import {
  setInputValue,
  setTargetMilliseconds,
  toggleButtonVisibillity
} from "../state";

const TimerInput: React.FC = () => {
  const { state, dispatch } = useContext(StopwatchContext);

  const [inputWidth, setInputWidth] = useState(60);
  const [isAnimate, setIsAnimate] = useState(true);
  const measureRef = useRef<HTMLSpanElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (measureRef.current) {
      setInputWidth(measureRef.current.offsetWidth + 40);
    }
  }, [state.inputValue]);

  // Define the maximum allowed seconds
  const maxAllowedSeconds = 86399.099; // 23:59:59.099

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    // Remove leading zeros (ensure first character isn't 0 unless it's the only character)
    value = value.replace(/^0+/, "");

    const numericValue = parseFloat(value);
    const isValid = numericValue <= maxAllowedSeconds;
    dispatch(toggleButtonVisibillity(isValid));

    // Allow input if it's a valid number format and doesn't exceed the length or character restrictions
    if (/^\d*\.?\d*$/.test(value) && value.length <= 5) {
      dispatch(setInputValue(value));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numericValue = parseInt(state.inputValue, 10);
    if (!isNaN(numericValue) && numericValue <= maxAllowedSeconds) {
      inputRef.current?.blur();
      dispatch(setTargetMilliseconds(numericValue * 1000));
    }
  };

  const handleFocus = () => {
    if (state.inputValue === "0") {
      dispatch(setInputValue(""));
      setIsAnimate(false);
    }
  };

  const handleBlur = () => {
    if (state.inputValue === "") {
      dispatch(setInputValue("0"));
    }
  };

  const getLabel = () => {
    const { isActive, inputValue, targetMilliseconds, milliseconds } = state;

    if (isActive) {
      return "Stopwatch Running...";
    } else if (parseInt(inputValue) === 0 || inputValue === "") {
      return "Set Stopwatch";
    } else if (targetMilliseconds > 0 && !isActive && milliseconds === 0) {
      return "Time Set Successfully!";
    } else if (!isActive && milliseconds === 0) {
      return "Setting Your Stopwatch...";
    } else if (milliseconds < targetMilliseconds) {
      return "Paused";
    } else {
      return "Reset stopwatch";
    }
  };

  return (
    <form onSubmit={handleSubmit} className="timer-input-form">
      <div className="input-wrapper">
        <p className={`timer-label `}>{getLabel()}</p>
        <div className="input-box">
          <input
            min={0}
            max={Math.floor(maxAllowedSeconds)}
            ref={inputRef}
            type="number"
            value={state.inputValue}
            disabled={state.isStartable}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder={""}
            className={`timer-input ${isAnimate ? "animate" : ""} ${
              state.isSet ? "time-set" : ""
            }`}
            style={{ width: `${inputWidth}px` }}
          />
          <span
            ref={measureRef}
            style={{
              visibility: "hidden",
              position: "absolute",
              whiteSpace: "pre"
            }}
          >
            {state.inputValue || "0"}
          </span>
          {state.inputValue && <span className="sec">sec</span>}
        </div>
        <CustomButton
          disabled={!state.isButtonVisible}
          text="Set Time"
          className="set-timer-button"
          color={!state.isButtonVisible ? "#a0a0a0" : "rgb(10, 231, 18)"}
          background={
            !state.isButtonVisible
              ? "rgb(138 138 138 / 20%)"
              : "rgb(10 231 18 / 20%)"
          }
        />
      </div>
    </form>
  );
};

export default TimerInput;
