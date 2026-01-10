const Student = require("../models/student.model");

// CREATE
exports.createStudent = async (req, res) => {
  try {
    res.status(201).json({ success: true, student });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// READ ALL
exports.getStudents = async (req, res) => {
  res.json(students);
};

// READ ONE
exports.getStudent = async (req, res) => {
  if (!student) return res.status(404).json({ message: "Not found" });
  res.json(student);
};

// UPDATE
exports.updateStudent = async (req, res) => {

  if (!student) return res.status(404).json({ message: "Not found" });

  res.json(student);
};

// DELETE
exports.deleteStudent = async (req, res) => {

  if (!student) return res.status(404).json({ message: "Not found" });

  res.json({ message: "Deleted successfully" });
};
