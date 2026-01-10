const Student = require("../models/student.model");

// CREATE
exports.createStudent = async (req, res) => {
  try {
    const student = await Student.create(req.body);
    res.status(201).json({ success: true, student });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// READ ALL
exports.getStudents = async (req, res) => {
  const students = await Student.find();
  res.json(students);
};

// READ ONE
exports.getStudent = async (req, res) => {
  const student = await Student.findById(req.params.id);
  if (!student) return res.status(404).json({ message: "Not found" });
  res.json(student);
};

// UPDATE
exports.updateStudent = async (req, res) => {
  const student = await Student.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );

  if (!student) return res.status(404).json({ message: "Not found" });

  res.json(student);
};

// DELETE
exports.deleteStudent = async (req, res) => {
  const student = await Student.findByIdAndDelete(req.params.id);

  if (!student) return res.status(404).json({ message: "Not found" });

  res.json({ message: "Deleted successfully" });
};
