import express from "express";
import usersRouter from "./routes/users.js";
import corsOptions from "./config/corsOptions.js";
import logger from "./middelwares/logger.js";
import requestTime from "./middelwares/requestTime.js";
import errorHandler from "./middelwares/errorHandler.js";
import cors from "cors";

const app = express();

app.use(express.json());

app.use(cors(corsOptions));

app.use(logger);
app.use(requestTime);

app.use("/api/v1/users", usersRouter);

app.use("/api/v1", (req, res) => {
  res.status(404).json({ error: "Not Found" });
});


export default app;
