import type { Handler } from "@netlify/functions";
import OpenAI from "openai";

import type {
  DalleErrorResponse,
  DalleHelloResponse,
  DalleRequest,
  DalleSuccessResponse,
} from "../../shared/dalle";

const json = <T>(statusCode: number, body: T) => ({
  statusCode,
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
});

export const handler: Handler = async (event) => {
  if (event.httpMethod === "GET") {
    return json<DalleHelloResponse>(200, {
      message: "Hello from Dall.E Routes",
    });
  }

  if (event.httpMethod !== "POST") {
    return json<DalleErrorResponse>(405, { message: "Method not allowed" });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return json<DalleErrorResponse>(500, {
      message: "Something went wrong",
      error: "OPENAI_API_KEY is not configured",
    });
  }

  try {
    const openai = new OpenAI({
      apiKey,
      timeout: 25_000,
      maxRetries: 0,
    });

    const { prompt } = JSON.parse(event.body || "{}") as DalleRequest;

    const response = await openai.images.generate({
      model: "gpt-image-1-mini",
      prompt,
      size: "1024x1024",
      quality: "low",
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
    console.log("Error in fetching image from dalle", error);
    return json<DalleErrorResponse>(500, {
      message: "Something went wrong",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};
