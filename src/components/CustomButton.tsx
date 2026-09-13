import { useSnapshot } from "valtio";

import state from "../store";
import { getContrastingColor } from "../config/helpers";
import { Loader } from "./Loader";

type ButtonType = "filled" | "outline";

type CustomButtonProps = {
  type: ButtonType;
  title: string;
  customStyles?: string;
  handleClick?: () => void;
  disabled?: boolean;
  showLoader?: boolean;
};

// Custom Button
const CustomButton = ({
  type,
  title,
  customStyles,
  handleClick,
  disabled = false,
  showLoader = false,
}: CustomButtonProps) => {
  // current state snapshot
  const snap = useSnapshot(state);

  // generate style
  const generateStyle = (buttonType: ButtonType) => {
    // filled type
    if (buttonType === "filled") {
      return {
        backgroundColor: snap.color,
        color: getContrastingColor(snap.color),
      };
      // outline type
    } else if (buttonType === "outline") {
      return {
        borderWidth: "1px",
        borderColor: snap.color,
        color: snap.color,
      };
    }
  };

  return (
    <button
      className={`px-2 py-1.5 flex-1 rounded-md hover:opacity-75 transition-opacity duration-300 disabled:cursor-not-allowed disabled:opacity-50 flex items-center justify-center gap-1.5 ${customStyles}`}
      style={generateStyle(type)}
      onClick={handleClick}
      disabled={disabled}
      title={title}
    >
      {showLoader && disabled ? <Loader size={12} /> : null}
      {title}
    </button>
  );
};

export default CustomButton;
