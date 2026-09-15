import type { Handler, HandlerResponse } from "@netlify/functions";
import OpenAI, {
  APIError,
  AuthenticationError,
  OpenAIError,
  RateLimitError,
} from "openai";

import type {
  AiSettingsErrorResponse,
  AiSettingsSaveRequest,
  AiSettingsStatusResponse,
  AiSettingsSuccessResponse,
} from "../../shared/ai-settings";
import { isOpenAIApiKeyFormat } from "../../shared/dalle";
import {
  buildAiSettingsCookie,
  buildClearedAiSettingsCookie,
  getOpenAIApiKeyFromEvent,
  isAiSettingsConfigError,
} from "../lib/ai-settings-cookie";

const json = <T>(
  statusCode: number,
  body: T,
  extraHeaders?: Record<string, string>,
): HandlerResponse => ({
  statusCode,
  headers: { "Content-Type": "application/json", ...extraHeaders },
  body: JSON.stringify(body),
});

const configError = () =>
  json<AiSettingsErrorResponse>(500, {
    message: "AI settings are not configured on the server.",
  });

const getAISettingsErrorMessage = (error: unknown): string => {
  if (
    error instanceof AuthenticationError ||
    (error instanceof APIError && error.status === 401)
  ) {
    return "Invalid API key. Please check your key and try again";
  }

  if (
    error instanceof RateLimitError ||
    (error instanceof APIError && error.status === 429)
  ) {
    const code = error instanceof APIError ? error.code : null;
    const message = error instanceof Error ? error.message : "";
    const isQuota =
      code === "insufficient_quota" ||
      /insufficient_quota|exceeded your current quota|quota|billing/i.test(
        message,
      );

    if (isQuota) {
      return "Not enough credits. Please purchase more credits and try again";
    }

    return "Rate limit reached. Please try again in a moment";
  }

  if (error instanceof OpenAIError) {
    return error.message || "Failed to verify API key";
  }

  if (error instanceof Error) return error.message;

  return "Failed to verify API key";
};

const validateOpenAIKey = async (apiKey: string) => {
  const openai = new OpenAI({ apiKey, timeout: 25_000, maxRetries: 0 });

  try {
    await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: "hi" }],
      max_tokens: 1,
    });
  } catch (error) {
    throw new Error(getAISettingsErrorMessage(error));
  }
};

export const handler: Handler = async (event) => {
  if (event.httpMethod === "GET") {
    try {
      const apiKey = getOpenAIApiKeyFromEvent(event.headers);
      const includeKey = event.queryStringParameters?.includeKey === "1";

      return json<AiSettingsStatusResponse>(200, {
        hasKey: apiKey !== null,
        ...(includeKey && apiKey ? { apiKey } : {}),
      });
    } catch (error) {
      if (isAiSettingsConfigError(error)) return configError();
      throw error;
    }
  }

  if (event.httpMethod === "DELETE") {
    try {
      return json<AiSettingsSuccessResponse>(
        200,
        { success: true },
        { "Set-Cookie": buildClearedAiSettingsCookie(event.headers) },
      );
    } catch (error) {
      if (isAiSettingsConfigError(error)) return configError();
      throw error;
    }
  }

  if (event.httpMethod !== "POST") {
    return json<AiSettingsErrorResponse>(405, { message: "Method not allowed" });
  }

  let apiKey = "";

  try {
    const body = JSON.parse(event.body || "{}") as Partial<AiSettingsSaveRequest>;
    apiKey = typeof body.apiKey === "string" ? body.apiKey.trim() : "";
  } catch {
    return json<AiSettingsErrorResponse>(400, { message: "Invalid request body" });
  }

  if (!isOpenAIApiKeyFormat(apiKey)) {
    return json<AiSettingsErrorResponse>(400, {
      message: "Invalid OpenAI API Key.",
    });
  }

  try {
    await validateOpenAIKey(apiKey);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to verify API key";
    return json<AiSettingsErrorResponse>(400, { message });
  }

  try {
    return json<AiSettingsSuccessResponse>(
      200,
      { success: true },
      { "Set-Cookie": buildAiSettingsCookie(apiKey, event.headers) },
    );
  } catch (error) {
    if (isAiSettingsConfigError(error)) return configError();

    console.error("Failed to save AI settings cookie", error);
    return json<AiSettingsErrorResponse>(500, {
      message: "Could not save your API key.",
    });
  }
};
