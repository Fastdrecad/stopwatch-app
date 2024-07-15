interface CustomButtonProps {
  text: string;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  color?: string;
  background?: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  text,
  className = "",
  disabled = false,
  onClick,
  color,
  background
}) => {
  return (
    <button
      className={`custom-button ${className}`}
      onClick={onClick}
      style={{
        pointerEvents: disabled ? "none" : "auto",
        color: color,
        background: background,
        opacity: disabled ? 0.5 : 1
      }}
    >
      {text}
    </button>
  );
};

export default CustomButton;
