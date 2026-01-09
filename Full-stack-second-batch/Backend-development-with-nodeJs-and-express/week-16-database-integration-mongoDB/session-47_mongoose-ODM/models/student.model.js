const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  cohort: String,
  enrolledAt: { type: Date, default: Date.now },
  gpa: Number,
  interests: [String]
});

module.exports = mongoose.model("Student", studentSchema);