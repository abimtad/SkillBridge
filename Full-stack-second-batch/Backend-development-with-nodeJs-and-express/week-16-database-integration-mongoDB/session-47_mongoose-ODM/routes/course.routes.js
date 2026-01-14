const express = require("express");
const router = express.Router();

const {
  createCourse,
  getCourses,
  getCourse,
  getCourseWithStudents,
  getCourseWithStudentsDetails,
  getCourseStatistics,
  getCoursesWithStudentDetails,
  getAvailableCourses,
  enrollStudent,
  updateCourse,
  deleteCourse
} = require("../controllers/course.controller");

// Basic CRUD routes
router.post("/", createCourse);
router.get("/", getCourses);
router.get("/available", getAvailableCourses); // Aggregation example
router.get("/statistics", getCourseStatistics); // Aggregation example
router.get("/with-students-details", getCoursesWithStudentDetails); // Aggregation lookup example
router.get("/:id", getCourse);
router.get("/:id/students", getCourseWithStudents); // Population example
router.get("/:id/students-details", getCourseWithStudentsDetails); // Nested population example
router.put("/:id", updateCourse);
router.delete("/:id", deleteCourse);

// Enrollment route
router.post("/:courseId/enroll/:studentId", enrollStudent);

module.exports = router;

