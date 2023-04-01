import { proxy } from "valtio";

const state = proxy({
  intro: true, // are we on home page?
  color: "#EFBD48", // color of t-shirt
  isLogoTexture: true, // are we showing logo on t-shirt?
  isFullTexture: false, // full textures
  logoDecal: "./threejs.png", // logo
  fullDecal: "./threejs.png", // logo
});

export default state;
