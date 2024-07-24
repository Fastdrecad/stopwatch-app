import { useContext, useEffect, useState } from "react";
import { StopwatchContext } from "../context/StopwatchContext";

interface CircularProgressProps {
  size: number;
  progress: number;
  isActive?: boolean;
}

const CircularProgress: React.FC<CircularProgressProps> = ({
  size,
  progress
}) => {
  const { state } = useContext(StopwatchContext);
  const radius = size / 2;
  const strokeWidth = size > 450 ? 20 : 8;
  const normalizedRadius = radius - strokeWidth * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  const [strokeColor, setStrokeColor] = useState("green");

  useEffect(() => {
    if (state.isActive && progress > 0) {
      setStrokeColor("green");
    } else if (!state.isActive && progress === 100) {
      setStrokeColor("green");
    } else {
      setStrokeColor("orange");
    }
  }, [progress, state.isActive]);

  const bounceClass = progress === 100 ? "bounce" : "";

  return (
    <svg
      height={size}
      width={size}
      className={`circular-progress ${bounceClass}`}
    >
      <circle
        fill="transparent"
        strokeWidth={strokeWidth}
        stroke="gray"
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
      <circle
        fill="transparent"
        strokeWidth={strokeWidth}
        strokeDasharray={circumference + " " + circumference}
        style={{
          strokeDashoffset,
          stroke: strokeColor,
          transform: `rotate(-90deg)`,
          transformOrigin: `${radius}px ${radius}px`,
          transition: "stroke-dashoffset 0.1s linear"
        }}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
    </svg>
  );
};

export default CircularProgress;
