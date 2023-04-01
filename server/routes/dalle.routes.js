// imports
import express from "express";
import * as dotenv from "dotenv";
import { Configuration, OpenAIApi } from "openai";

// initialize environment variables
dotenv.config();

// initialize router
const router = express.Router();

// config openai's api key
const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

// initialize openai instance
const openai = new OpenAIApi(config);

// handle get route
router.route("/").get((_, res) => {
  res.status(200).json({ message: "Hello from Dall.E Routes" });
});

// handle post route
router.route("/").post(async (req, res) => {
  try {
    // get prompt
    const { prompt } = req.body;

    // send open ai request
    const response = await openai.createImage({
      prompt,
      n: 1,
      size: "1024x1024",
      response_format: "b64_json",
    });

    // store image data from response
    const image = response.data.data[0].b64_json;

    // send 200 (ok) response
    res.status(200).json({ photo: image });
  } catch (error) {
    // send 500 (server error) response
    console.log("Error in fetching image from dalle", error);
    res.status(500).json({ message: "Something went wrong", error });
  }
});

export default router;
