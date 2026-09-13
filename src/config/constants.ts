// Contains all constants to be used in site
// Don't remove anything from here if not sure

import { swatch, fileIcon, ai, logoShirt, stylishShirt } from "../assets";

// Editor Tabs
export const EditorTabs = [
  {
    name: "colorpicker",
    icon: swatch,
  },
  {
    name: "filepicker",
    icon: fileIcon,
  },
  {
    name: "aipicker",
    icon: ai,
  },
] as const;

export type EditorTabName = (typeof EditorTabs)[number]["name"];

export type TabItem = {
  name: string;
  icon: string;
};

// Filter Tabs
export const FilterTabs = [
  {
    name: "logoShirt",
    icon: logoShirt,
  },
  {
    name: "stylishShirt",
    icon: stylishShirt,
  },
] as const;

export type FilterTabName = (typeof FilterTabs)[number]["name"];

// Decal Types
export const DecalTypes = {
  logo: {
    stateProperty: "logoDecal",
    filterTab: "logoShirt",
  },
  full: {
    stateProperty: "fullDecal",
    filterTab: "stylishShirt",
  },
} as const;

export type DecalKey = keyof typeof DecalTypes;
