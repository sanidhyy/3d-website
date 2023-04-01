// imports

import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";

// routes
import dalleRoutes from "./routes/dalle.routes.js";

// initialize environment variables
dotenv.config();

// port
const PORT = process.env.PORT || 8080;

// initialize express app
const app = express();

// add middleware
app.use(cors());
app.use(express.json({ limit: "50mb" }));

// add routes
app.use("/api/v1/dalle", dalleRoutes);

// handle get request
app.get("/", (_, res) => {
  res.status(200).json({ message: "Hello from DALL.E" });
});

// start server
app.listen(PORT, () => console.log(`Server has started on port ${PORT}`));
