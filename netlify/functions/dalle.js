import OpenAI from "openai";

const json = (statusCode, body) => ({
  statusCode,
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
});

export async function handler(event) {
  if (event.httpMethod === "GET") {
    return json(200, { message: "Hello from Dall.E Routes" });
  }

  if (event.httpMethod !== "POST") {
    return json(405, { message: "Method not allowed" });
  }

  try {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const { prompt } = JSON.parse(event.body || "{}");

    const response = await openai.images.generate({
      prompt,
      n: 1,
      size: "1024x1024",
      response_format: "b64_json",
    });

    const image = response.data[0].b64_json;

    return json(200, { photo: image });
  } catch (error) {
    console.log("Error in fetching image from dalle", error);
    return json(500, {
      message: "Something went wrong",
      error: error?.message || String(error),
    });
  }
}
