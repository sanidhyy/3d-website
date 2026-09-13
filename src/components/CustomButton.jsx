import React from "react";
import { useSnapshot } from "valtio";

import state from "../store";
import { getContrastingColor } from "../config/helpers";

// Custom Button
const CustomButton = ({
  type,
  title,
  customStyles,
  handleClick,
  disabled = false,
}) => {
  // current state snapshot
  const snap = useSnapshot(state);

  // generate style
  const generateStyle = (type) => {
    // filled type
    if (type === "filled") {
      return {
        backgroundColor: snap.color,
        color: getContrastingColor(snap.color),
      };
      // outline type
    } else if (type === "outline") {
      return {
        borderWidth: "1px",
        borderColor: snap.color,
        color: snap.color,
      };
    }
  };

  return (
    <button
      className={`px-2 py-1.5 flex-1 rounded-md ${customStyles}`}
      style={generateStyle(type)}
      onClick={handleClick}
      disabled={disabled}
      title={title}
    >
      {title}
    </button>
  );
};

export default CustomButton;
