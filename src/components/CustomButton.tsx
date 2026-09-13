import type { CSSProperties } from "react";
import { useSnapshot } from "valtio";

import state from "../store";
import { getContrastingColor } from "../config/helpers";
import { Loader } from "./Loader";

type ButtonType = "filled" | "outline" | "destructive";

const DESTRUCTIVE_COLOR = "#DC2626";

type CustomButtonProps = {
  type: ButtonType;
  title: string;
  customStyles?: string;
  handleClick?: () => void;
  disabled?: boolean;
  showLoader?: boolean;
  nativeType?: "button" | "submit";
};

// Custom Button
const CustomButton = ({
  type,
  title,
  customStyles,
  handleClick,
  disabled = false,
  showLoader = false,
  nativeType = "button",
}: CustomButtonProps) => {
  // current snapshot state
  const snap = useSnapshot(state);
  const contrast = getContrastingColor(snap.color);

  // generate style
  const generateStyle = (buttonType: ButtonType): CSSProperties => {
    // filled type
    if (buttonType === "filled") {
      return {
        backgroundColor: snap.color,
        color: contrast,
      };
    }

    // destructive type
    if (buttonType === "destructive") {
      return {
        backgroundColor: DESTRUCTIVE_COLOR,
        color: getContrastingColor(DESTRUCTIVE_COLOR),
        borderWidth: "1px",
        borderColor: DESTRUCTIVE_COLOR,
      };
    }

    // outline type
    return {
      borderWidth: "1px",
      borderColor: snap.color,
      ["--btn-color" as string]: snap.color,
      ["--btn-contrast" as string]: contrast,
    } as CSSProperties;
  };

  const hoverClass =
    type === "outline"
      ? "custom-btn-outline"
      : "hover:opacity-75 transition-opacity duration-300";

  return (
    <button
      className={`px-2 py-1.5 flex-1 rounded-md disabled:cursor-not-allowed disabled:opacity-50 flex items-center justify-center gap-1.5 ${hoverClass} ${customStyles}`}
      style={generateStyle(type)}
      type={nativeType}
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
