const Course = require("../models/course.model");
const Student = require("../models/student.model");

// CREATE
exports.createCourse = async (req, res) => {
  try {
    const course = await Course.create(req.body);
    res.status(201).json({ success: true, course });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// READ ALL
exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.json({ success: true, courses });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// READ ONE
exports.getCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ success: false, message: "Course not found" });
    }
    res.json({ success: true, course });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// --------- POPULATION EXAMPLE ----------
// Population replaces ObjectIds with actual documents from referenced collections
exports.getCourseWithStudents = async (req, res) => {
  try {
    // Populate single reference field
    const course = await Course.findById(req.params.id)
      .populate("enrolledStudents", "firstName lastName email gpa"); // Only select specific fields

    if (!course) {
      return res.status(404).json({ success: false, message: "Course not found" });
    }

    res.json({
      success: true,
      course,
      message: "Course with populated student references"
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Populate with nested population (if students had references)
exports.getCourseWithStudentsDetails = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)
      .populate({
        path: "enrolledStudents",
        select: "firstName lastName email gpa courses",
        populate: {
          path: "courses",
          select: "courseName courseCode"
        }
      });

    if (!course) {
      return res.status(404).json({ success: false, message: "Course not found" });
    }

    res.json({
      success: true,
      course,
      message: "Course with nested population"
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// --------- AGGREGATION EXAMPLES ----------
// Aggregation pipeline for complex queries and data transformation
exports.getCourseStatistics = async (req, res) => {
  try {
    const stats = await Course.aggregate([
      // Stage 1: Match courses (optional filter)
      {
        $match: {}
      },
      // Stage 2: Add computed fields
      {
        $addFields: {
          enrolledCount: { $size: { $ifNull: ["$enrolledStudents", []] } },
          availableSpots: {
            $subtract: ["$capacity", { $size: { $ifNull: ["$enrolledStudents", []] } }]
          }
        }
      },
      // Stage 3: Group by instructor
      {
        $group: {
          _id: "$instructor",
          totalCourses: { $sum: 1 },
          totalEnrolled: { $sum: "$enrolledCount" },
          totalCapacity: { $sum: "$capacity" },
          averageCredits: { $avg: "$credits" },
          courses: {
            $push: {
              courseCode: "$courseCode",
              courseName: "$courseName",
              enrolled: "$enrolledCount",
              capacity: "$capacity"
            }
          }
        }
      },
      // Stage 4: Calculate utilization rate
      {
        $addFields: {
          utilizationRate: {
            $multiply: [
              { $divide: ["$totalEnrolled", "$totalCapacity"] },
              100
            ]
          }
        }
      },
      // Stage 5: Sort by utilization rate
      {
        $sort: { utilizationRate: -1 }
      }
    ]);

    res.json({
      success: true,
      statistics: stats,
      message: "Course statistics grouped by instructor"
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Aggregation with lookup (join equivalent)
exports.getCoursesWithStudentDetails = async (req, res) => {
  try {
    const courses = await Course.aggregate([
      // Lookup students collection
      {
        $lookup: {
          from: "students", // Collection name (lowercase, pluralized)
          localField: "enrolledStudents",
          foreignField: "_id",
          as: "studentDetails"
        }
      },
      // Unwind to get individual student documents
      {
        $unwind: {
          path: "$studentDetails",
          preserveNullAndEmptyArrays: true // Keep courses with no students
        }
      },
      // Group back to get student arrays
      {
        $group: {
          _id: "$_id",
          courseCode: { $first: "$courseCode" },
          courseName: { $first: "$courseName" },
          instructor: { $first: "$instructor" },
          credits: { $first: "$credits" },
          capacity: { $first: "$capacity" },
          students: {
            $push: {
              $cond: [
                { $ne: ["$studentDetails", null] },
                {
                  firstName: "$studentDetails.firstName",
                  lastName: "$studentDetails.lastName",
                  email: "$studentDetails.email",
                  gpa: "$studentDetails.gpa"
                },
                "$$REMOVE"
              ]
            }
          }
        }
      },
      {
        $project: {
          _id: 1,
          courseCode: 1,
          courseName: 1,
          instructor: 1,
          credits: 1,
          capacity: 1,
          enrolledCount: { $size: "$students" },
          students: 1
        }
      }
    ]);

    res.json({
      success: true,
      courses,
      message: "Courses with student details using aggregation lookup"
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Find available courses using aggregation
exports.getAvailableCourses = async (req, res) => {
  try {
    const availableCourses = await Course.findAvailableCourses();
    res.json({
      success: true,
      courses: availableCourses,
      message: "Courses with available spots"
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// ENROLL STUDENT IN COURSE
exports.enrollStudent = async (req, res) => {
  try {
    const { courseId, studentId } = req.params;

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ success: false, message: "Course not found" });
    }

    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ success: false, message: "Student not found" });
    }

    // Enroll student in course
    await course.enrollStudent(studentId);

    // Add course to student's courses array
    if (!student.courses.includes(courseId)) {
      student.courses.push(courseId);
      await student.save();
    }

    // Populate and return updated course
    const updatedCourse = await Course.findById(courseId)
      .populate("enrolledStudents", "firstName lastName email");

    res.json({
      success: true,
      course: updatedCourse,
      message: "Student enrolled successfully"
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// UPDATE
exports.updateCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!course) {
      return res.status(404).json({ success: false, message: "Course not found" });
    }

    res.json({ success: true, course });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// DELETE
exports.deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);

    if (!course) {
      return res.status(404).json({ success: false, message: "Course not found" });
    }

    // Remove course reference from all enrolled students
    await Student.updateMany(
      { courses: req.params.id },
      { $pull: { courses: req.params.id } }
    );

    res.json({
      success: true,
      message: "Course deleted successfully and removed from all students"
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

