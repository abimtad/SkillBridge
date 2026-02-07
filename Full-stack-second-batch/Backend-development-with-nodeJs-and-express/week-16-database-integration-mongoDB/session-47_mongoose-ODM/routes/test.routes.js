const express = require("express");
const router = express.Router();

const {
  testStudentModel,
  testCourseModel,
  testAllModels,
  getModelIndexes
} = require("../controllers/test.controller");

// Test all features of Student model
router.get("/student", testStudentModel);

// Test all features of Course model
router.get("/course", testCourseModel);

// Test all models at once
router.get("/all", testAllModels);

// Get detailed index information for a specific model
router.get("/indexes/:model", getModelIndexes);

module.exports = router;

