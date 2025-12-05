import express from "express";
import usersRouter from "./routes/users.js";

const app = express();

app.use(express.json());

app.use("/api/v1/users", usersRouter);

app.use("/api/v1", (req, res) => {
  res.status(404).json({ error: "Not Found" });
});



export default app;