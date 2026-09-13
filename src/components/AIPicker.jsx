import React from "react";

import CustomButton from "./CustomButton";

// AI Picker
const AIPicker = ({ prompt, setPrompt, generatingImg, handleSubmit }) => {
  return (
    <div className="aipicker-container">
      {/* user prompt */}
      <textarea
        rows={5}
        placeholder='Ask "Generate a modern texture..."'
        className="aipicker-textarea"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        style={{ resize: "none" }}
      />

      {/* buttons */}
      <div className="flex flex-wrap gap-3">
        {generatingImg ? (
          // loading button
          <CustomButton
            type="outline"
            title="Asking AI..."
            customStyles="text-xs"
            disabled={true}
          />
        ) : (
          <>
            {/* generate ai logo */}
            <CustomButton
              type="outline"
              title="AI Logo"
              handleClick={() => handleSubmit("logo")}
              customStyles="text-xs"
            />

            {/* generate ai full */}
            <CustomButton
              type="filled"
              title="AI Full"
              handleClick={() => handleSubmit("full")}
              customStyles="text-xs"
            />
          </>
        )}
      </div>
    </div>
  );
};

export default AIPicker;
