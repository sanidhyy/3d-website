import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";

import CustomButton from "./CustomButton";
import {
  clearOpenAIApiKey,
  getOpenAIApiKey,
  setOpenAIApiKey,
} from "../lib/openai-api-key";

type AISettingsModalProps = {
  open: boolean;
  onClose: () => void;
  onKeyChange: () => void;
};

const EyeIcon = ({ hidden }: { hidden: boolean }) => (
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
    {hidden ? (
      <>
        <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
        <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
        <path d="M6.61 6.61A13.53 13.53 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
        <line x1="2" x2="22" y1="2" y2="22" />
      </>
    ) : (
      <>
        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
        <circle cx="12" cy="12" r="3" />
      </>
    )}
  </svg>
);

const AISettingsModal = ({
  open,
  onClose,
  onKeyChange,
}: AISettingsModalProps) => {
  const titleId = useId();
  const descriptionId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [apiKey, setApiKey] = useState("");
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState("");
  const [hasSavedKey, setHasSavedKey] = useState(false);

  useEffect(() => {
    if (!open) return;

    const saved = getOpenAIApiKey() ?? "";
    setApiKey(saved);
    setHasSavedKey(saved.length > 0);
    setVisible(false);
    setError("");

    const frame = window.requestAnimationFrame(() => {
      inputRef.current?.focus();
    });

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      window.cancelAnimationFrame(frame);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  const handleSave = () => {
    try {
      setOpenAIApiKey(apiKey);
      onKeyChange();
      onClose();
    } catch (saveError) {
      setError(
        saveError instanceof Error
          ? saveError.message
          : "Could not save your API key.",
      );
    }
  };

  const handleRemove = () => {
    const confirmed = window.confirm(
      "Remove your OpenAI API key from this browser?",
    );
    if (!confirmed) return;

    clearOpenAIApiKey();
    setApiKey("");
    setHasSavedKey(false);
    onKeyChange();
    onClose();
  };

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        className="bg-white w-full max-w-md rounded-md p-5 shadow-lg"
        onClick={(event) => event.stopPropagation()}
      >
        <h2 id={titleId} className="text-lg font-semibold text-gray-900">
          AI Settings
        </h2>

        <p id={descriptionId} className="text-sm text-gray-600">
          Add your OpenAI API key to start generating AI logos and textures.
        </p>

        <form
          className="mt-4 flex flex-col gap-4"
          autoComplete="off"
          onSubmit={(event) => {
            event.preventDefault();
            handleSave();
          }}
        >
          <label className="flex flex-col gap-1.5 text-sm font-medium text-gray-800">
            OpenAI API Key
            <div className="relative">
              <input
                ref={inputRef}
                type={visible ? "text" : "password"}
                value={apiKey}
                onChange={(event) => {
                  setApiKey(event.target.value);
                  setError("");
                }}
                placeholder="sk-•••••••••••••••••••••••••••••••••••"
                autoComplete="off"
                autoCapitalize="off"
                spellCheck={false}
                className="w-full bg-white/60 border border-gray-300 rounded-md py-2 pl-3 pr-10 text-sm outline-hidden focus:ring-1 focus:ring-gray-500"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 px-3 text-gray-600 hover:text-gray-900"
                onClick={() => setVisible((current) => !current)}
                title={visible ? "Hide API key" : "Show API key"}
                aria-label={visible ? "Hide API key" : "Show API key"}
              >
                <EyeIcon hidden={visible} />
              </button>
            </div>
          </label>

          <p className="text-xs font-medium text-gray-600">
            Get your API Key from{" "}
            <a
              href="https://platform.openai.com/account/api-keys"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-medium text-gray-900 underline underline-offset-2 hover:opacity-75"
            >
              OpenAI
            </a>
            . Make sure your account has sufficient{" "}
            <a
              href="https://platform.openai.com/settings/organization/billing/credit-grants"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-medium text-gray-900 underline underline-offset-2 hover:opacity-75"
            >
              credit grants
            </a>
            .
          </p>

          {error ? (
            <p className="text-xs text-red-600" role="alert">
              {error}
            </p>
          ) : null}

          <div className="flex flex-wrap gap-2">
            <CustomButton
              type="filled"
              title="Save"
              customStyles="text-sm"
              nativeType="submit"
            />
            <CustomButton
              type="outline"
              title="Cancel"
              customStyles="text-sm"
              handleClick={onClose}
            />
            {hasSavedKey ? (
              <CustomButton
                type="destructive"
                title="Remove key"
                customStyles="text-sm"
                handleClick={handleRemove}
              />
            ) : null}
          </div>
        </form>
      </div>
    </div>,
    document.body,
  );
};

export default AISettingsModal;
