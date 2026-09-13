import { useCallback, useState } from "react";

import CustomButton from "./CustomButton";
import AISettingsModal from "./AISettingsModal";
import { hasOpenAIApiKey } from "../lib/openai-api-key";
import type { DecalKey } from "../config/constants";
import type { GenerateResult } from "../../shared/dalle";

type AIPickerProps = {
  prompt: string;
  setPrompt: (value: string) => void;
  generatingImg: boolean;
  handleSubmit: (type: DecalKey) => Promise<GenerateResult>;
};

const GearIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-4 h-4"
    aria-hidden="true"
  >
    <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09A1.65 1.65 0 0 0 15 4.6a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z" />
  </svg>
);

// AI Picker
const AIPicker = ({
  prompt,
  setPrompt,
  generatingImg,
  handleSubmit,
}: AIPickerProps) => {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [hasApiKey, setHasApiKey] = useState(() => hasOpenAIApiKey());
  const [generateError, setGenerateError] = useState("");

  const closeSettings = useCallback(() => {
    setSettingsOpen(false);
  }, []);

  const refreshKeyState = useCallback(() => {
    setHasApiKey(hasOpenAIApiKey());
  }, []);

  const onGenerate = async (type: DecalKey) => {
    setGenerateError("");

    if (!hasOpenAIApiKey()) {
      setSettingsOpen(true);
      return;
    }

    const result = await handleSubmit(type);
    if (result.ok) return;

    setGenerateError(result.message);
    if (result.needsApiKey) setSettingsOpen(true);
  };

  return (
    <div className="aipicker-container">
      <div className="flex items-center justify-between gap-2">
        <p className="text-[11px] text-gray-600 truncate">
          {hasApiKey ? "Key saved" : "Add API key"}
        </p>
        <button
          type="button"
          className="shrink-0 p-1 rounded-md text-gray-700 hover:bg-white/50 disabled:cursor-not-allowed disabled:opacity-50"
          title="AI Settings"
          aria-label="AI Settings"
          disabled={generatingImg}
          onClick={() => setSettingsOpen(true)}
        >
          <GearIcon />
        </button>
      </div>

      {/* user prompt */}
      <textarea
        disabled={generatingImg}
        rows={5}
        placeholder='Ask "Generate a modern texture..."'
        className="aipicker-textarea"
        value={prompt}
        onChange={(e) => {
          setPrompt(e.target.value);
          if (generateError) setGenerateError("");
        }}
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
            disabled
            showLoader
          />
        ) : (
          <>
            {/* generate ai logo */}
            <CustomButton
              type="outline"
              title="AI Logo"
              handleClick={() => onGenerate("logo")}
              customStyles="text-xs"
            />

            {/* generate ai full */}
            <CustomButton
              type="filled"
              title="AI Full"
              handleClick={() => onGenerate("full")}
              customStyles="text-xs"
            />
          </>
        )}
      </div>

      {generateError ? (
        <p className="text-[11px] text-red-600 leading-snug" role="alert">
          {generateError}
        </p>
      ) : null}

      <AISettingsModal
        open={settingsOpen}
        onClose={closeSettings}
        onKeyChange={refreshKeyState}
      />
    </div>
  );
};

export default AIPicker;
