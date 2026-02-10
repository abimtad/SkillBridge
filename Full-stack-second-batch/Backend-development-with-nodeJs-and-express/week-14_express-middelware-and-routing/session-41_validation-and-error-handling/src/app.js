import express from "express";
import usersRouter from "./routes/users.js";
import corsOptions from "./config/corsOptions.js";
import logger from "./middelwares/logger.js";
import requestTime from "./middelwares/requestTime.js";
import errorHandler from "./middelwares/errorHandler.js";
import cors from "cors";
// import { NotFoundError } from "./errors/ApiError.js";

const app = express();

app.use(express.json());

app.use(cors(corsOptions));

app.use(logger);
app.use(requestTime);

app.use("/api/v1/users", usersRouter);

app.use("/api/v1", (req, res, next) => {
});

app.use(errorHandler);

export default app;
