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

    if (!student) {
      return res.status(404).json({ success: false, message: "Student not found" });
    }

    res.json({ success: true, student });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// DELETE
exports.deleteStudent = async (req, res) => {

    if (!student) {
      return res.status(404).json({ success: false, message: "Student not found" });
    }

    // Remove student reference from all courses
    const Course = require("../models/course.model");
    await Course.updateMany(
      { enrolledStudents: req.params.id },
      { $pull: { enrolledStudents: req.params.id } }
    );

    res.json({
      success: true,
      message: "Student deleted successfully and removed from all courses"
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
