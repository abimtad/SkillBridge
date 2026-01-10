require("dotenv").config();
const express = require("express");
const app = express();

const connectDB = require("./config/db");
const logger = require("./middleware/logger");
const studentRoutes = require("./routes/student.routes");

// Connect DB
connectDB();

// Middleware
app.use(express.json());
app.use(logger);

// Routes
app.use("/students", studentRoutes);
console.log("process", process.env)
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
