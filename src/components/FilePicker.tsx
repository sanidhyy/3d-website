import CustomButton from "./CustomButton";
import type { DecalKey } from "../config/constants";

type FilePickerProps = {
  file: File | null;
  setFile: (file: File | null) => void;
  readFile: (type: DecalKey) => void;
};

// File Picker
const FilePicker = ({ file, setFile, readFile }: FilePickerProps) => {
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
            const selected = e.target.files?.[0];

            // if any file is choosen
            if (selected) {
              // create image instance
              const image = new Image();

              // on image load
              image.onload = () => {
                // check if image is correct
                if (image.width) {
                  setFile(selected);
                }
              };

              // if image is correct, set image src
              image.src = URL.createObjectURL(selected);
            }
          }}
        />

        {/* Upload File */}
        <label htmlFor="file-upload" className="filepicker-label">
          Upload File
        </label>

        {/* Uploaded File Name */}
        <p className="mt-2 text-gray-500 text-xs truncate">
          {file === null ? "No file selected" : file.name}
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
