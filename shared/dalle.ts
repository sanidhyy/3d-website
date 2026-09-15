export const OPENAI_API_KEY_PREFIX = "sk-";

export const isOpenAIApiKeyFormat = (value: unknown): value is string => {
  if (typeof value !== "string") return false;

  const trimmed = value.trim();
  return (
    trimmed.startsWith(OPENAI_API_KEY_PREFIX) &&
    trimmed.length > OPENAI_API_KEY_PREFIX.length
  );
};

export type DalleImageType = "logo" | "full";

export const isDalleImageType = (value: unknown): value is DalleImageType =>
  value === "logo" || value === "full";

export const buildDallePrompt = (
  prompt: string,
  type: DalleImageType,
): string => {
  if (type === "logo") {
    return `Isolated T-shirt logo. Centered, readable at small size, transparent background, no mockup, no scene. Subject: ${prompt}`;
  }

  return `All-over T-shirt print. Seamless or full-bleed repeating pattern that wraps a garment, not a centered logo, no product photo, no mockup. Subject: ${prompt}`;
};

export type DalleRequest = {
  prompt: string;
  type: DalleImageType;
};

export type DalleSuccessResponse = {
  photo: string;
};

export type DalleErrorCode =
  | "invalid_api_key"
  | "insufficient_quota"
  | "rate_limit"
  | "timeout";

export type DalleErrorResponse = {
  message: string;
  error?: string;
  code?: DalleErrorCode;
};

export type DalleHelloResponse = {
  message: string;
};

export type GenerateResult =
  | { ok: true }
  | { ok: false; message: string; needsApiKey?: boolean };
