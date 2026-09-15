import { isOpenAIApiKeyFormat } from "../../shared/dalle";
import type {
  AiSettingsErrorResponse,
  AiSettingsStatusResponse,
} from "../../shared/ai-settings";

const LEGACY_STORAGE_KEY = "tshirt-openai-api-key";
const AI_SETTINGS_URL = "/api/v1/ai-settings";

const clearLegacyLocalStorage = (): void => {
  try {
    localStorage.removeItem(LEGACY_STORAGE_KEY);
  } catch {
    // Ignore storage failures when removing.
  }
};

const readErrorMessage = async (
  response: Response,
  fallback: string,
): Promise<string> => {
  try {
    const data = (await response.json()) as AiSettingsErrorResponse;
    if (typeof data.message === "string" && data.message.trim()) {
      return data.message;
    }
  } catch {
    // Ignore JSON parse failures and use the fallback.
  }

  if (response.status === 404) {
    return "AI settings need the full app server. Run netlify-cli dev.";
  }

  return fallback;
};

export const getAiSettingsStatus = async (
  options?: { includeKey?: boolean },
): Promise<{ hasKey: boolean; apiKey: string }> => {
  clearLegacyLocalStorage();

  const url = options?.includeKey
    ? `${AI_SETTINGS_URL}?includeKey=1`
    : AI_SETTINGS_URL;
  const response = await fetch(url, {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error(
      await readErrorMessage(response, "Could not check your API key."),
    );
  }

  const data = (await response.json()) as AiSettingsStatusResponse;
  return {
    hasKey: data.hasKey === true,
    apiKey: typeof data.apiKey === "string" ? data.apiKey : "",
  };
};

export const saveOpenAIApiKey = async (apiKey: string): Promise<void> => {
  const trimmed = apiKey.trim();

  if (!isOpenAIApiKeyFormat(trimmed)) {
    throw new Error("Invalid OpenAI API Key.");
  }

  const response = await fetch(AI_SETTINGS_URL, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ apiKey: trimmed }),
  });

  if (!response.ok) {
    throw new Error(
      await readErrorMessage(response, "Could not save your API key."),
    );
  }
};

export const removeOpenAIApiKey = async (): Promise<void> => {
  const response = await fetch(AI_SETTINGS_URL, {
    method: "DELETE",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error(
      await readErrorMessage(response, "Could not remove your API key."),
    );
  }

  clearLegacyLocalStorage();
};
