import { proxy } from "valtio";

const state = proxy({
  intro: true, // are we on home page?
  color: "#EFBD48", // color of t-shirt
  isLogoTexture: true, // are we showing logo on t-shirt?
  isFullTexture: false, // full textures
  logoDecal: "./threejs.png", // t-shirt logo image
  fullDecal: "./threejs.png", // t-shirt full texture image
});

export default state;
