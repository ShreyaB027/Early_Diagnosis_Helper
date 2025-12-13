import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import { handlePredict } from "./routes/predict";
import { handleGetHistory } from "./routes/history";
import { connectDB } from "./db";

let dbConnected = false;
let dbInitPromise: Promise<void> | null = null;

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Initialize database connection (fire and forget, non-blocking)
  if (!dbConnected && !dbInitPromise) {
    dbInitPromise = connectDB()
      .then(() => {
        dbConnected = true;
      })
      .catch((error) => {
        console.error("Failed to connect to database:", error);
      });
  }

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  // Diabetes prediction routes
  app.post("/api/predict", handlePredict);
  app.get("/api/history", handleGetHistory);

  return app;
}
