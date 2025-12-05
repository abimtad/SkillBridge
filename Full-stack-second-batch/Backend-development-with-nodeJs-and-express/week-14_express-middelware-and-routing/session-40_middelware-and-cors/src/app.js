import express from "express";
import usersRouter from "./routes/users.js";
import corsOptions from "./config/corsOptions";
import logger from "./middleware/logger";
import requestTime from "./middleware/requestTime";
import errorHandler from "./middleware/errorHandler";

const app = express();

app.use(express.json());

app.use(cors(corsOptions));

app.use(logger);
app.use(requestTime);


app.use("/api/v1/users", usersRouter);

app.use("/api/v1", (req, res) => {
  res.status(404).json({ error: "Not Found" });
});

app.use(errorHandler);


export default app;