import CustomButton from "./CustomButton";

interface ControlPanelProps {
  isActive: boolean;
  onStartPause: () => void;
  onReset: () => void;
  buttonLabel: string;
  isStartable: boolean;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  isActive,
  buttonLabel,
  isStartable,
  onStartPause,
  onReset
}) => {
  return (
    <div className="control-panel">
      <CustomButton
        text={buttonLabel}
        className={isActive ? "pause-button" : "start-button"}
        onClick={onStartPause}
        disabled={!isStartable}
      />
      <CustomButton text="Reset" className="reset-button" onClick={onReset} />
    </div>
  );
};

export default ControlPanel;
