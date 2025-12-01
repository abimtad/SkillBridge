import express from "express";
import usersRouter from "./routes/users.js";

const app = express();

// Core middleware
app.use(express.json());

// Versioned API prefix
app.use("/api/v1/users", usersRouter);

// Simple 404 for other /api/v1 paths
app.use("/api/v1", (req, res) => {
  res.status(404).json({ error: "Not Found" });
});

// Global error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Internal Server Error" });
});

export default app;
