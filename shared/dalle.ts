export const OPENAI_API_KEY_PREFIX = "sk-";

export const isOpenAIApiKeyFormat = (value: unknown): value is string => {
  if (typeof value !== "string") return false;

  const trimmed = value.trim();
  return (
    trimmed.startsWith(OPENAI_API_KEY_PREFIX) &&
    trimmed.length > OPENAI_API_KEY_PREFIX.length
  );
};

export type DalleRequest = {
  prompt: string;
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
