import { useEffect, useState } from "react";

interface CircularProgressProps {
  size: number;
  progress: number;
  isActive?: boolean;
}

const CircularProgress: React.FC<CircularProgressProps> = ({
  size,
  progress,
  isActive
}) => {
  const radius = size / 2;
  const strokeWidth = 6;
  const normalizedRadius = radius - strokeWidth * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  const [strokeColor, setStrokeColor] = useState("green");

  useEffect(() => {
    if (isActive && progress > 0) {
      setStrokeColor("green");
    } else if (!isActive && progress === 100) {
      setStrokeColor("orange");
    } else {
      setStrokeColor("green");
    }
  }, [progress, isActive]);

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
