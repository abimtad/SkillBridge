const path = require("path");
const express = require("express");

const app = express();

// Parse JSON bodies for demo endpoints
app.use(express.json());

// Serve static files from /public
app.use(express.static(path.join(__dirname, "..", "public")));

// Health check demonstrating different status codes
app.get("/health", (req, res) => {
  // Query flag to simulate failure: /health?fail=true
  const shouldFail = req.query.fail === "true";
  if (shouldFail) {
    return res.status(503).json({
      status: "unhealthy",
      message: "Service temporarily unavailable",
    });
  }
  res.status(200).json({ status: "ok", uptime: process.uptime() });
});

// Meaningful resource: users
const USERS = [
  { id: 1, name: "Ada Lovelace" },
  { id: 2, name: "Linus Torvalds" },
];

// Return JSON response
app.get("/api/users", (req, res) => {
  res.status(200).json({ data: USERS });
});

// Return text response
app.get("/api/welcome", (req, res) => {
  res.status(200).send("Welcome to the Express demo API");
});

// Demonstrate 201 Created with Location header
app.post("/api/users", (req, res) => {
  const { name } = req.body || {};
  if (!name) {
    return res.status(400).json({ error: "name is required" });
  }
  const id = USERS[USERS.length - 1]?.id + 1 || 1;
  const newUser = { id, name };
  USERS.push(newUser);
  // Set Location header to the new resource URL
  res.set("Location", `/api/users/${id}`);
  return res.status(201).json({ data: newUser });
});

// Demonstrate editing headers explicitly
app.get("/api/headers-demo", (req, res) => {
  res.set({
    "X-Powered-By": "Express-Demo", // override or add custom header
    "Cache-Control": "no-store",
    "Content-Type": "application/json; charset=utf-8",
  });
  res.status(200).send(JSON.stringify({ message: "Custom headers set!" }));
});

// Demonstrate redirect (302 by default)
app.get("/go-to-docs", (req, res) => {
  res.redirect("/static/index.html");
});

// 404 handler for unknown routes
app.use((req, res) => {
  res.status(404).json({ error: "Not Found" });
});

// Error handler example for completeness
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Internal Server Error" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Express demo running on http://localhost:${PORT}`);
});
