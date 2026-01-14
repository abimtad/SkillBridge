const express = require("express");
const router = express.Router();

const {
  createStudent,
  getStudents,
  getStudent,
  getStudentWithCourses,
  getStudentsWithCourses,
  getStudentsWithCourseStats,
  getStudentsByCohort,
  updateStudent,
  deleteStudent
} = require("../controllers/student.controller");

// Basic CRUD routes
router.post("/", createStudent);
router.get("/", getStudents);
router.get("/with-courses", getStudentsWithCourses); // Population example
router.get("/course-stats", getStudentsWithCourseStats); // Aggregation example
router.get("/cohort/:cohort", getStudentsByCohort); // Aggregation example
router.get("/:id", getStudent);
router.get("/:id/courses", getStudentWithCourses); // Population example
router.put("/:id", updateStudent);
router.delete("/:id", deleteStudent);

module.exports = router;
