import { useEffect, useRef, useState } from "react";
import CustomButton from "./CustomButton";

interface TimerInputProps {
  setTargetMilliseconds: (milliseconds: number) => void;
  isButtonVisible: boolean;
  inputValue: string;
  setInputValue: (value: string) => void;
  setIsButtonVisible: (visible: boolean) => void;
  isSet: boolean;
  setIsSet: (set: boolean) => void;
}

const TimerInput: React.FC<TimerInputProps> = ({
  setTargetMilliseconds,
  isButtonVisible,
  setIsButtonVisible,
  setInputValue,
  inputValue,
  isSet,
  setIsSet
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [inputWidth, setInputWidth] = useState(60);
  const [isAnimate, setIsAnimate] = useState(true);
  const measureRef = useRef<HTMLSpanElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Define the maximum allowed seconds
  const maxAllowedSeconds = 86399.099;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    // Remove leading zeros (ensure first character isn't 0 unless it's the only character)
    value = value.replace(/^0+/, "");

    // Allow input if it's a valid number format and doesn't exceed the length or character restrictions
    if (value.length <= 5 && /^\d*\.?\d*$/.test(value)) {
      setInputValue(value);
      const numericValue = parseFloat(value);
      const isValid = numericValue <= maxAllowedSeconds;

      // Update button visibility based on input validity
      // setIsButtonVisible(isValid);
      isValid ? setIsButtonVisible(isValid) : setIsButtonVisible(false);
    }
  };

  useEffect(() => {
    if (measureRef.current) {
      setInputWidth(measureRef.current.offsetWidth + 40);
    }
  }, [inputValue]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numericValue = parseInt(inputValue, 10);
    // Only process submission if the value is within the valid range
    if (!isNaN(numericValue) && numericValue <= maxAllowedSeconds) {
      setInputValue(""); // Clear the input if it's not valid upon leaving the input
      setTargetMilliseconds(numericValue * 1000); // Convert seconds to milliseconds
      setIsSet(true);
      inputRef.current?.blur();
      setIsButtonVisible(false);
    }
  };

  const handleFocus = () => {
    if (inputValue === "0") {
      setInputValue(""); // Clear the "0" when the user focuses on the input
      setIsButtonVisible(isButtonVisible);
      setIsAnimate(false);
    }
    setIsFocused(true);
    // setIsButtonVisible(!isButtonVisible);
  };

  const handleBlur = () => {
    const numericValue = parseFloat(inputValue);
    // Validate the input value when the input loses focus
    const isValid = numericValue <= maxAllowedSeconds;

    // Additional visibility update on blur
    // setIsButtonVisible(isValid);

    if (isNaN(numericValue) || !isValid) {
      setInputValue("0");
      setIsButtonVisible(false);
    } else if (inputValue && isSet) {
      setIsButtonVisible(false);
    } else {
      setIsButtonVisible(true);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="timer-input-form">
      <div className="input-wrapper">
        <p className={`timer-label ${!isSet ? "hidden" : ""} `}>
          Timer set for:
        </p>
        <div className="input-box">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder={isFocused ? "" : ""}
            className={`timer-input ${isAnimate ? "animate" : ""} ${
              isSet ? "time-set" : ""
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
            {inputValue || "0"}
          </span>
          {inputValue && <span className="sec">sec</span>}
        </div>
        <CustomButton
          disabled={!isButtonVisible}
          text="Set Time"
          className="set-timer-button"
          color={!isButtonVisible ? "#a0a0a0" : "rgb(10, 231, 18)"}
          background={
            !isButtonVisible ? "rgb(138 138 138 / 20%)" : "rgb(10 231 18 / 20%)"
          }
        />
      </div>
    </form>
  );
};

export default TimerInput;
