import { useEffect, useRef, useState } from "react";

interface TimerInputProps {
  setTargetSeconds: (seconds: number) => void;
  isButtonVisible: boolean;
  inputValue: string;
  setInputValue: (value: string) => void;
}

const TimerInput: React.FC<TimerInputProps> = ({
  setTargetSeconds,
  isButtonVisible,
  setInputValue,
  inputValue
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [inputWidth, setInputWidth] = useState(50);
  const measureRef = useRef<HTMLSpanElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!value || /^\d+$/.test(value)) {
      setInputValue(value);
    }
  };

  useEffect(() => {
    if (measureRef.current) {
      setInputWidth(measureRef.current.offsetWidth + 30); // Add some padding to the width
    }
  }, [inputValue]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numericValue = parseInt(inputValue, 10);
    if (!isNaN(numericValue)) {
      setTargetSeconds(numericValue);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="timer-input-form">
      <div className="input-wrapper">
        <p className={` ${isButtonVisible ? "hidden" : ""}`}>Timer set for:</p>
        <div className="input-box">
          <input
            type="text"
            value={inputValue}
            onChange={handleChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={isFocused ? "" : "Enter Time"}
            className="timer-input"
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
            {inputValue || "Enter Time"}
          </span>
          {!isButtonVisible && <span className="seconds">sec</span>}
        </div>
        <button
          type="submit"
          className={`set-timer-button ${!isButtonVisible ? "hidden" : ""}`}
        >
          Set Time
        </button>
      </div>
    </form>
  );
};

export default TimerInput;
