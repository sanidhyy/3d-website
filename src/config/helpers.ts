// Contains all helper functions to be used in site
// Don't remove anything from here if not sure

// download canvas image
export const downloadCanvasToImage = (): void => {
  const canvas = document.querySelector("canvas");
  if (!canvas) return;

  const dataURL = canvas.toDataURL();
  const link = document.createElement("a");
  link.href = dataURL;
  link.download = `tshirt-design-${new Date().toISOString()}.png`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// render file
export const reader = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.onload = () => {
      if (typeof fileReader.result === "string") {
        resolve(fileReader.result);
      } else {
        reject(new Error("Failed to read file as data URL"));
      }
    };
    fileReader.onerror = () =>
      reject(fileReader.error ?? new Error("File read failed"));
    fileReader.readAsDataURL(file);
  });

// get contrasting color
export const getContrastingColor = (color: string): "black" | "white" => {
  // Remove the '#' character if it exists
  const hex = color.replace("#", "");

  // Convert the hex string to RGB values
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  // Calculate the brightness of the color
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;

  // Return black or white depending on the brightness
  return brightness > 128 ? "black" : "white";
};
