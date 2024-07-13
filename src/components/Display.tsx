import CircularProgress from "./CircularProgress";

interface DisplayProps {
  time: number;
  totalTime: number;
  isActive?: boolean;
}

const Display: React.FC<DisplayProps> = ({ time, totalTime, isActive }) => {
  const formatTime = (seconds: number) => {
    const pad = (num: number) => num.toString().padStart(2, "0");
    return `${pad(Math.floor(seconds / 3600))}:${pad(
      Math.floor((seconds % 3600) / 60)
    )}:${pad(seconds % 60)}`;
  };

  const progress = totalTime > 0 ? (time / totalTime) * 100 : 0;
  console.log(isActive);

  return (
    <div className="display">
      <CircularProgress isActive={isActive} size={300} progress={progress} />
      <div className="time-display">
        {/* {time === 0 ? <span>Time is up!</span> : formatTime(time)} */}
        {formatTime(time)}
      </div>
    </div>
  );
};

export default Display;
