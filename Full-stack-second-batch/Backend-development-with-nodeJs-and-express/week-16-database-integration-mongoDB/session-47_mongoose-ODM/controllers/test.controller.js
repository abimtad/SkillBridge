const Student = require("../models/student.model");
const Course = require("../models/course.model");
const mongoose = require("mongoose");

// Get all indexes for a model
const getModelIndexes = async (Model) => {
  try {
    const indexes = await Model.collection.getIndexes();
    return indexes;
  } catch (err) {
    return { error: err.message };
  }
};

// Get index information with details
const getIndexDetails = async (Model) => {
  try {
    const indexes = await Model.collection.getIndexes();
    
    // Get index stats
    const stats = await Model.collection.stats();
    
    // Format index information
    const formattedIndexes = Object.entries(indexes).map(([name, spec]) => {
      const indexSpec = Array.isArray(spec) ? spec : [spec];
      return {
        name,
        key: indexSpec.reduce((acc, item) => {
          Object.entries(item).forEach(([field, direction]) => {
            if (field !== '_id') {
              acc[field] = direction === 1 ? 'ascending' : direction === -1 ? 'descending' : direction;
            }
          });
          return acc;
        }, {}),
        spec: indexSpec
      };
    });
    
    return {
      indexes,
      formattedIndexes,
      totalIndexes: Object.keys(indexes).length,
      collectionStats: {
        count: stats.count,
        size: stats.size,
        avgObjSize: stats.avgObjSize,
        storageSize: stats.storageSize,
        totalIndexSize: stats.totalIndexSize
      }
    };
  } catch (err) {
    return { error: err.message };
  }
};

// Test all Student model features
exports.testStudentModel = async (req, res) => {
  try {
    const results = {
      model: "Student",
      timestamp: new Date(),
      tests: {}
    };

    // ========== INDEXES ==========
    results.tests.indexes = await getIndexDetails(Student);
    results.tests.indexesDescription = {
      "email_1": "Single field index on email (unique)",
      "cohort_1": "Single field index on cohort",
      "gpa_-1": "Single field index on gpa (descending)",
      "cohort_1_gpa_-1": "Compound index on cohort and gpa",
      "courses_1": "Array index on courses for population queries",
      "firstName_text_lastName_text_email_text": "Text index for full-text search"
    };

    // ========== VIRTUAL PROPERTIES ==========
    try {
      const testStudent = await Student.findOne();
      if (testStudent) {
        results.tests.virtualProperties = {
          fullName: testStudent.fullName,
          description: "Virtual property that combines firstName and lastName",
          example: `${testStudent.firstName} ${testStudent.lastName} = ${testStudent.fullName}`
        };
      } else {
        results.tests.virtualProperties = {
          message: "No students found to test virtual properties",
          description: "Virtual property 'fullName' combines firstName and lastName"
        };
      }
    } catch (err) {
      results.tests.virtualProperties = { error: err.message };
    }

    // ========== INSTANCE METHODS ==========
    try {
      const testStudent = await Student.findOne();
      if (testStudent) {
        results.tests.instanceMethods = {
          isHonorStudent: {
            method: "isHonorStudent()",
            description: "Returns true if student GPA >= 3.5",
            result: testStudent.isHonorStudent(),
            studentGPA: testStudent.gpa,
            explanation: `Student with GPA ${testStudent.gpa} is ${testStudent.isHonorStudent() ? 'an honor student' : 'not an honor student'}`
          }
        };
      } else {
        results.tests.instanceMethods = {
          message: "No students found to test instance methods",
          availableMethods: {
            isHonorStudent: "Returns true if student GPA >= 3.5"
          }
        };
      }
    } catch (err) {
      results.tests.instanceMethods = { error: err.message };
    }

    // ========== STATIC METHODS ==========
    try {
      // Test findByCohort
      const cohortStudents = await Student.findByCohort("FS-16");
      results.tests.staticMethods = {
        findByCohort: {
          method: "Student.findByCohort(cohort)",
          description: "Finds all students in a specific cohort",
          testQuery: "FS-16",
          resultCount: cohortStudents.length,
          example: `Student.findByCohort("FS-16") found ${cohortStudents.length} students`
        }
      };
    } catch (err) {
      results.tests.staticMethods = { error: err.message };
    }

    // ========== QUERY HELPERS ==========
    try {
      const honorStudents = await Student.find().honor();
      results.tests.queryHelpers = {
        honor: {
          method: "Student.find().honor()",
          description: "Query helper that filters students with GPA >= 3.5",
          resultCount: honorStudents.length,
          example: `Student.find().honor() found ${honorStudents.length} honor students`
        }
      };
    } catch (err) {
      results.tests.queryHelpers = { error: err.message };
    }

    // ========== SCHEMA METHODS SUMMARY ==========
    results.tests.summary = {
      virtualProperties: ["fullName"],
      instanceMethods: ["isHonorStudent()"],
      staticMethods: ["findByCohort(cohort)"],
      queryHelpers: ["honor()"],
      totalIndexes: Object.keys(results.tests.indexes.indexes || {}).length
    };

    res.json({
      success: true,
      ...results
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
      stack: err.stack
    });
  }
};

// Test all Course model features
exports.testCourseModel = async (req, res) => {
  try {
    const results = {
      model: "Course",
      timestamp: new Date(),
      tests: {}
    };

    // ========== INDEXES ==========
    results.tests.indexes = await getIndexDetails(Course);
    results.tests.indexesDescription = {
      "courseCode_1_instructor_1": "Compound index on courseCode and instructor",
      "instructor_1": "Single field index on instructor",
      "courseName_text_courseCode_text": "Text index for full-text search on courseName and courseCode",
      "enrolledStudents_1": "Array index on enrolledStudents for population queries"
    };

    // ========== INSTANCE METHODS ==========
    try {
      const testCourse = await Course.findOne();
      if (testCourse) {
        results.tests.instanceMethods = {
          isFull: {
            method: "isFull()",
            description: "Returns true if enrolledStudents.length >= capacity",
            result: testCourse.isFull(),
            enrolledCount: testCourse.enrolledStudents.length,
            capacity: testCourse.capacity,
            explanation: `Course with ${testCourse.enrolledStudents.length}/${testCourse.capacity} students is ${testCourse.isFull() ? 'full' : 'not full'}`
          },
          enrollStudent: {
            method: "enrollStudent(studentId)",
            description: "Enrolls a student in the course if not full and not already enrolled",
            note: "This method modifies the database. Use POST /courses/:courseId/enroll/:studentId to test it."
          }
        };
      } else {
        results.tests.instanceMethods = {
          message: "No courses found to test instance methods",
          availableMethods: {
            isFull: "Returns true if course is at capacity",
            enrollStudent: "Enrolls a student in the course"
          }
        };
      }
    } catch (err) {
      results.tests.instanceMethods = { error: err.message };
    }

    // ========== STATIC METHODS ==========
    try {
      // Test findByInstructor
      const instructorCourses = await Course.findByInstructor("Dr. Smith");
      results.tests.staticMethods = {
        findByInstructor: {
          method: "Course.findByInstructor(instructor)",
          description: "Finds all courses taught by a specific instructor",
          testQuery: "Dr. Smith",
          resultCount: instructorCourses.length,
          example: `Course.findByInstructor("Dr. Smith") found ${instructorCourses.length} courses`
        },
        findAvailableCourses: {
          method: "Course.findAvailableCourses()",
          description: "Uses aggregation to find courses with available spots",
          note: "This is an aggregation pipeline that filters courses where enrolledCount < capacity"
        }
      };

      // Test findAvailableCourses (aggregation)
      const availableCourses = await Course.findAvailableCourses();
      results.tests.staticMethods.findAvailableCourses.result = {
        resultCount: availableCourses.length,
        example: `Course.findAvailableCourses() found ${availableCourses.length} courses with available spots`
      };
    } catch (err) {
      results.tests.staticMethods = { error: err.message };
    }

    // ========== SCHEMA METHODS SUMMARY ==========
    results.tests.summary = {
      instanceMethods: ["isFull()", "enrollStudent(studentId)"],
      staticMethods: ["findByInstructor(instructor)", "findAvailableCourses()"],
      totalIndexes: Object.keys(results.tests.indexes.indexes || {}).length
    };

    res.json({
      success: true,
      ...results
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
      stack: err.stack
    });
  }
};

// Test all models at once
exports.testAllModels = async (req, res) => {
  try {
    const results = {
      timestamp: new Date(),
      models: {}
    };

    // Test Student Model
    try {
      const studentResults = {
        model: "Student",
        indexes: await getIndexDetails(Student),
        methods: {
          virtualProperties: ["fullName"],
          instanceMethods: ["isHonorStudent()"],
          staticMethods: ["findByCohort(cohort)"],
          queryHelpers: ["honor()"]
        }
      };

      // Test instance method
      const testStudent = await Student.findOne();
      if (testStudent) {
        studentResults.example = {
          virtualProperty: {
            fullName: testStudent.fullName
          },
          instanceMethod: {
            isHonorStudent: testStudent.isHonorStudent()
          }
        };
      }

      results.models.Student = studentResults;
    } catch (err) {
      results.models.Student = { error: err.message };
    }

    // Test Course Model
    try {
      const courseResults = {
        model: "Course",
        indexes: await getIndexDetails(Course),
        methods: {
          instanceMethods: ["isFull()", "enrollStudent(studentId)"],
          staticMethods: ["findByInstructor(instructor)", "findAvailableCourses()"]
        }
      };

      // Test instance method
      const testCourse = await Course.findOne();
      if (testCourse) {
        courseResults.example = {
          instanceMethod: {
            isFull: testCourse.isFull()
          }
        };
      }

      results.models.Course = courseResults;
    } catch (err) {
      results.models.Course = { error: err.message };
    }

    // Summary
    results.summary = {
      totalModels: Object.keys(results.models).length,
      studentIndexes: Object.keys(results.models.Student?.indexes?.indexes || {}).length,
      courseIndexes: Object.keys(results.models.Course?.indexes?.indexes || {}).length
    };

    res.json({
      success: true,
      ...results
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
      stack: err.stack
    });
  }
};

// Get detailed index information for a specific model
exports.getModelIndexes = async (req, res) => {
  try {
    const { model } = req.params;
    let Model;

    switch (model.toLowerCase()) {
      case "student":
        Model = Student;
        break;
      case "course":
        Model = Course;
        break;
      default:
        return res.status(400).json({
          success: false,
          message: "Invalid model name. Use 'student' or 'course'"
        });
    }

    const indexDetails = await getIndexDetails(Model);
    const collectionName = Model.collection.name;

    // Get explain plan for a sample query
    let explainPlan = null;
    try {
      const sampleQuery = await Model.find().limit(1);
      if (sampleQuery.length > 0) {
        explainPlan = await Model.find({ _id: sampleQuery[0]._id }).explain("executionStats");
      }
    } catch (err) {
      explainPlan = { error: "Could not generate explain plan", message: err.message };
    }

    res.json({
      success: true,
      model: model,
      collectionName,
      indexes: indexDetails,
      explainPlan: explainPlan ? {
        executionStats: explainPlan.executionStats,
        queryPlanner: explainPlan.queryPlanner
      } : null
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
};

