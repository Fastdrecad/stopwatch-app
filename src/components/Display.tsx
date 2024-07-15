import { useEffect, useState } from "react";
import CircularProgress from "./CircularProgress";

interface DisplayProps {
  time: number;
  totalTime: number;
  isActive?: boolean;
}

const Display: React.FC<DisplayProps> = ({ time, totalTime, isActive }) => {
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
    // const newMilliseconds = pad(milliseconds % 1000, 3); // Adjust pad to handle three digits for milliseconds
    const newMilliseconds = pad(Math.floor((milliseconds % 1000) / 10)); // Now treating milliseconds as two-digit numbers
    // const newMilliseconds = Math.floor((milliseconds % 1000) / 100).toString();

    return { hours, minutes, seconds, newMilliseconds };
  };

  const timeParts = formatTime(time);
  const progress = totalTime > 0 ? (time / totalTime) * 100 : 0;

  return (
    <div className="display">
      <CircularProgress isActive={isActive} size={size} progress={progress} />
      <div className="time-display">
        <span className="hours">{timeParts.hours}:</span>
        {/* {parseInt(timeParts.hours) < 24 && parseInt(timeParts.hours) > 0 && (
          <span className="hours">{timeParts.hours}:</span>
        )} */}

        <span className="minutes">{timeParts.minutes}:</span>

        <span className="seconds">{timeParts.seconds},</span>

        <span className="milliseconds">{timeParts.newMilliseconds}</span>
      </div>
    </div>
  );
};

export default Display;
