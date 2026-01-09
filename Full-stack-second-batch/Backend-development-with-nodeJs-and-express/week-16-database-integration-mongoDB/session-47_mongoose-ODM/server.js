require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const studentRoutes = require("./routes/student.routes");

const app = express();
app.use(express.json());

// connect to Mongo
connectDB();

// routes
app.use("/students", studentRoutes);

app.listen(3000, () => console.log("Server running on port 3000"));
