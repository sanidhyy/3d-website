import React from "react";

import CustomButton from "./CustomButton";

// File Picker
const FilePicker = ({ file, setFile, readFile }) => {
  return (
    <div className="filepicker-container">
      <div className="flex-1 flex flex-col">
        {/* image upload input */}
        <input
          id="file-upload"
          type="file"
          accept="image/*"
          onChange={(e) => {
            // get file name
            const file = e.target.files[0];

            // if any file is choosen
            if (file) {
              // create image instance
              var image = new Image();

              // on image load
              image.onload = function () {
                // check if image is correct
                if (this.width) {
                  setFile(e.target.files[0]);
                }
              };

              // if image is correct, set image src
              image.src = URL.createObjectURL(file);
            }
          }}
        />

        {/* Upload File */}
        <label htmlFor="file-upload" className="filepicker-label">
          Upload File
        </label>

        {/* Uploaded File Name */}
        <p className="mt-2 text-gray-500 text-xs truncate">
          {file === "" ? "No file selected" : file.name}
        </p>
      </div>

      <div className="mt-4 flex flex-wrap gap-3">
        {/* Logo Texture */}
        <CustomButton
          type="outline"
          title="Logo"
          handleClick={() => readFile("logo")}
          customStyles="text-xs"
        />

        {/* Full Texture */}
        <CustomButton
          type="filled"
          title="Full"
          handleClick={() => readFile("full")}
          customStyles="text-xs"
        />
      </div>
    </div>
  );
};

export default FilePicker;
