import CustomButton from "./CustomButton";

interface ControlPanelProps {
  isActive: boolean;
  onStartPause: () => void;
  onReset: () => void;
  buttonLabel: string;
  canStart: boolean;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  isActive,
  buttonLabel,
  canStart,
  onStartPause,
  onReset
}) => {
  return (
    <div className="control-panel">
      <CustomButton
        text={buttonLabel}
        className={isActive ? "pause-button" : "start-button"}
        onClick={onStartPause}
        disabled={!canStart}
      />
      <CustomButton text="Reset" className="reset-button" onClick={onReset} />
    </div>
  );
};

export default ControlPanel;
