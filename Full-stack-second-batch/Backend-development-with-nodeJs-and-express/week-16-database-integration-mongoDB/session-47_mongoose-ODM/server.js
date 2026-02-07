require("dotenv").config();
const express = require("express");
const app = express();

const connectDB = require("./config/db");
const logger = require("./middleware/logger");
const studentRoutes = require("./routes/student.routes");
const courseRoutes = require("./routes/course.routes");
const testRoutes = require("./routes/test.routes");

// Connect DB
connectDB();

// Middleware
app.use(express.json());
app.use(logger);

// Routes
app.use("/students", studentRoutes);
app.use("/courses", courseRoutes);
app.use("/test", testRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
