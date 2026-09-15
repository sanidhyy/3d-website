import type { Handler } from "@netlify/functions";
import OpenAI, { type APIError } from "openai";

import {
  buildDallePrompt,
  isDalleImageType,
  type DalleErrorCode,
  type DalleErrorResponse,
  type DalleHelloResponse,
  type DalleImageType,
  type DalleRequest,
  type DalleSuccessResponse,
} from "../../shared/dalle";
import {
  getOpenAIApiKeyFromEvent,
  isAiSettingsConfigError,
} from "../lib/ai-settings-cookie";

const json = <T>(statusCode: number, body: T) => ({
  statusCode,
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
});

const errorText = (error: unknown): string =>
  error instanceof Error ? error.message : "";

const isQuotaError = (error: APIError): boolean =>
  error.code === "insufficient_quota" ||
  /insufficient_quota|exceeded your current quota|billing/i.test(error.message);

const isAuthError = (error: unknown): boolean => {
  if (error instanceof OpenAI.AuthenticationError) return true;
  if (!(error instanceof OpenAI.APIError)) return false;

  return (
    error.status === 401 ||
    error.code === "invalid_api_key" ||
    /invalid api key|incorrect api key|expired|revoked/i.test(error.message)
  );
};

const mapDalleError = (
  error: unknown,
): { status: number; message: string; code?: DalleErrorCode } => {
  if (isAuthError(error)) {
    const expired = /expir/i.test(errorText(error));

    return {
      status: 401,
      code: "invalid_api_key",
      message: expired
        ? "Your OpenAI API key has expired. Update it in AI Settings."
        : "Invalid OpenAI API key. Update it in AI Settings.",
    };
  }

  if (
    error instanceof OpenAI.APIConnectionTimeoutError ||
    (error instanceof Error && /timeout/i.test(error.message))
  ) {
    return {
      status: 504,
      code: "timeout",
      message: "The request timed out. Please try again.",
    };
  }

  if (error instanceof OpenAI.APIError) {
    if (isQuotaError(error)) {
      return {
        status: 429,
        code: "insufficient_quota",
        message:
          "Not enough OpenAI credits. Add billing credits, then try again.",
      };
    }

    if (error instanceof OpenAI.RateLimitError || error.status === 429) {
      return {
        status: 429,
        code: "rate_limit",
        message: "OpenAI rate limit reached. Try again in a moment.",
      };
    }

    if (
      error.status === 400 &&
      /safety|content policy|moderation/i.test(error.message)
    ) {
      return {
        status: 400,
        message: "That prompt was blocked. Try a different description.",
      };
    }

    if (error instanceof OpenAI.PermissionDeniedError || error.status === 403) {
      return {
        status: 403,
        message:
          "This API key cannot use image generation. Check your OpenAI project permissions.",
      };
    }
  }

  return {
    status: 500,
    message: "Something went wrong while generating the image.",
  };
};

export const handler: Handler = async (event) => {
  if (event.httpMethod === "GET") {
    return json<DalleHelloResponse>(200, {
      message: "Hello from Dall.E Routes",
    });
  }

  if (event.httpMethod !== "POST") {
    return json<DalleErrorResponse>(405, { message: "Method not allowed" });
  }

  let prompt = "";
  let type: DalleImageType | "" = "";

  try {
    const body = JSON.parse(event.body || "{}") as Partial<DalleRequest>;
    prompt = typeof body.prompt === "string" ? body.prompt.trim() : "";
    type = isDalleImageType(body.type) ? body.type : "";
  } catch {
    return json<DalleErrorResponse>(400, { message: "Invalid request body" });
  }

  if (!prompt) {
    return json<DalleErrorResponse>(400, { message: "Please enter a prompt" });
  }

  if (!type) {
    return json<DalleErrorResponse>(400, { message: "Invalid image type" });
  }

  let apiKey: string | null = null;

  try {
    apiKey = getOpenAIApiKeyFromEvent(event.headers);
  } catch (error) {
    if (isAiSettingsConfigError(error)) {
      return json<DalleErrorResponse>(500, {
        message: "AI settings are not configured on the server.",
      });
    }

    throw error;
  }

  if (!apiKey) {
    return json<DalleErrorResponse>(400, {
      message: "Please add a valid OpenAI API key in AI Settings.",
      code: "invalid_api_key",
    });
  }

  try {
    const openai = new OpenAI({
      apiKey,
      timeout: 25_000,
      maxRetries: 0,
    });

    const response = await openai.images.generate({
      model: "gpt-image-1-mini",
      prompt: buildDallePrompt(prompt, type),
      size: "1024x1024",
      quality: "low",
      output_format: "png",
      background: type === "logo" ? "transparent" : "opaque",
    });

    const image = response.data?.[0]?.b64_json;

    if (!image) {
      return json<DalleErrorResponse>(500, {
        message: "Something went wrong",
        error: "No image data returned from OpenAI",
      });
    }

    return json<DalleSuccessResponse>(200, { photo: image });
  } catch (error) {
    const mapped = mapDalleError(error);

    console.log(
      "Error in fetching image from dalle",
      error instanceof OpenAI.APIError
        ? { status: error.status, type: error.type, code: error.code }
        : { name: error instanceof Error ? error.name : "unknown" },
    );

    return json<DalleErrorResponse>(mapped.status, {
      message: mapped.message,
      code: mapped.code,
    });
  }
};
