import { isOpenAIApiKeyFormat } from "../../shared/dalle";

const STORAGE_KEY = "tshirt-openai-api-key";

export const getOpenAIApiKey = (): string | null => {
  try {
    const value = localStorage.getItem(STORAGE_KEY)?.trim() ?? "";
    return isOpenAIApiKeyFormat(value) ? value : null;
  } catch {
    return null;
  }
};

export const hasOpenAIApiKey = (): boolean => getOpenAIApiKey() !== null;

export const setOpenAIApiKey = (apiKey: string): void => {
  const trimmed = apiKey.trim();

  if (!isOpenAIApiKeyFormat(trimmed)) {
    throw new Error("Invalid OpenAI API Key.");
  }

  try {
    localStorage.setItem(STORAGE_KEY, trimmed);
  } catch {
    throw new Error("Could not save your API key in this browser.");
  }
};

export const clearOpenAIApiKey = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Ignore storage failures when removing.
  }
};
