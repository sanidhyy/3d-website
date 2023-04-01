import React from "react";
import { useSnapshot } from "valtio";

import state from "../store";

// Tab
const Tab = ({ tab, isFilterTab, isActiveTab, handleClick }) => {
  // current snapshot state
  const snap = useSnapshot(state);

  // active styles
  const activeStyles =
    isFilterTab && isActiveTab
      ? { backgroundColor: snap.color, opacity: 0.5 }
      : {
          backgroundColor: "transparent",
          opacity: 1,
        };

  return (
    <div
      key={tab.name}
      className={`tab-btn ${
        isFilterTab ? "rounded-full glassmorphism" : "rounded-4"
      } `}
      onClick={handleClick}
      style={activeStyles}
    >
      {/* Icon */}
      <img
        src={tab.icon}
        alt={tab.name}
        title={tab.name.toUpperCase()}
        className={`${
          isFilterTab ? "w-2/3 h-2/3" : "w-11/12 h-11/12 object-contain"
        }`}
      />
    </div>
  );
};

export default Tab;
