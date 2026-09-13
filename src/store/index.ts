import { proxy, subscribe } from "valtio";

export interface State {
  intro: boolean;
  color: string;
  isLogoTexture: boolean;
  isFullTexture: boolean;
  logoDecal: string;
  fullDecal: string;
}

const STORAGE_KEY = "tshirt-customizer-v1";

const defaults: State = {
  intro: true, // are we on home page?
  color: "#EFBD48", // color of t-shirt
  isLogoTexture: true, // are we showing logo on t-shirt?
  isFullTexture: false, // full textures
  logoDecal: "/threejs.png", // t-shirt logo image
  fullDecal: "/full-texture.jpg", // t-shirt full texture image
};

const isNonEmptyString = (value: unknown): value is string =>
  typeof value === "string" && value.length > 0;

const parseSavedState = (raw: string): Partial<State> | null => {
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return null;

    const saved = parsed as Record<string, unknown>;
    const next: Partial<State> = {};

    if (typeof saved.intro === "boolean") next.intro = saved.intro;
    if (isNonEmptyString(saved.color)) next.color = saved.color;
    if (typeof saved.isLogoTexture === "boolean") {
      next.isLogoTexture = saved.isLogoTexture;
    }
    if (typeof saved.isFullTexture === "boolean") {
      next.isFullTexture = saved.isFullTexture;
    }
    if (isNonEmptyString(saved.logoDecal)) next.logoDecal = saved.logoDecal;
    if (isNonEmptyString(saved.fullDecal)) next.fullDecal = saved.fullDecal;

    return next;
  } catch {
    return null;
  }
};

const loadState = (): Partial<State> => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    return parseSavedState(raw) ?? {};
  } catch {
    return {};
  }
};

const persistState = (current: State) => {
  try {
    const payload: State = {
      intro: current.intro,
      color: current.color,
      isLogoTexture: current.isLogoTexture,
      isFullTexture: current.isFullTexture,
      logoDecal: current.logoDecal,
      fullDecal: current.fullDecal,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch (error) {
    console.warn("Failed to persist customizer state to localStorage", error);
  }
};

// Default State (hydrated from localStorage when available)
const state = proxy<State>({
  ...defaults,
  ...loadState(),
});

subscribe(state, () => {
  persistState(state);
});

export default state;
