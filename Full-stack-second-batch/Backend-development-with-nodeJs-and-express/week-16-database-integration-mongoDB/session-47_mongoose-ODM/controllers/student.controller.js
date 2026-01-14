const Student = require("../models/student.model");

// CREATE
exports.createStudent = async (req, res) => {
  try {
    // Example: req.body can include embedded address and course references
    // {
    //   "firstName": "John",
    //   "lastName": "Doe",
    //   "email": "john@example.com",
    //   "cohort": "2024",
    //   "gpa": 3.8,
    //   "address": {  // EMBEDDED DOCUMENT
    //     "street": "123 Main St",
    //     "city": "New York",
    //     "state": "NY",
    //     "zipCode": "10001"
    //   },
    //   "courses": []  // REFERENCED DOCUMENTS (ObjectIds)
    // }
    const student = await Student.create(req.body);
    res.status(201).json({
      success: true,
      student,
      message: "Student created. Note: address is embedded, courses are references."
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// READ ALL
exports.getStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.json({ success: true, students });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// READ ONE
exports.getStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ success: false, message: "Student not found" });
    }
    res.json({ success: true, student });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// --------- POPULATION EXAMPLE ----------
// Get student with populated courses (references)
exports.getStudentWithCourses = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id)
      .populate("courses", "courseCode courseName instructor credits");

    if (!student) {
      return res.status(404).json({ success: false, message: "Student not found" });
    }

    res.json({
      success: true,
      student,
      message: "Student with populated course references"
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Get all students with their courses populated
exports.getStudentsWithCourses = async (req, res) => {
  try {
    const students = await Student.find()
      .populate("courses", "courseCode courseName instructor")
      .select("firstName lastName email cohort gpa courses");

    res.json({
      success: true,
      students,
      message: "All students with populated course references"
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// --------- AGGREGATION EXAMPLE ----------
// Get students with course statistics using aggregation
exports.getStudentsWithCourseStats = async (req, res) => {
  try {
    const students = await Student.aggregate([
      // Lookup courses collection
      {
        $lookup: {
          from: "courses",
          localField: "courses",
          foreignField: "_id",
          as: "courseDetails"
        }
      },
      // Add computed fields
      {
        $addFields: {
          totalCourses: { $size: "$courseDetails" },
          totalCredits: {
            $reduce: {
              input: "$courseDetails",
              initialValue: 0,
              in: { $add: ["$$value", "$$this.credits"] }
            }
          },
          averageCredits: {
            $cond: [
              { $gt: [{ $size: "$courseDetails" }, 0] },
              {
                $divide: [
                  {
                    $reduce: {
                      input: "$courseDetails",
                      initialValue: 0,
                      in: { $add: ["$$value", "$$this.credits"] }
                    }
                  },
                  { $size: "$courseDetails" }
                ]
              },
              0
            ]
          }
        }
      },
      // Project only needed fields
      {
        $project: {
          firstName: 1,
          lastName: 1,
          email: 1,
          cohort: 1,
          gpa: 1,
          totalCourses: 1,
          totalCredits: 1,
          averageCredits: 1,
          courses: {
            $map: {
              input: "$courseDetails",
              as: "course",
              in: {
                courseCode: "$$course.courseCode",
                courseName: "$$course.courseName",
                credits: "$$course.credits"
              }
            }
          }
        }
      },
      // Sort by total credits
      {
        $sort: { totalCredits: -1 }
      }
    ]);

    res.json({
      success: true,
      students,
      message: "Students with course statistics using aggregation"
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Get students by cohort with aggregation
exports.getStudentsByCohort = async (req, res) => {
  try {
    const { cohort } = req.params;
    const students = await Student.aggregate([
      {
        $match: { cohort: cohort }
      },
      {
        $lookup: {
          from: "courses",
          localField: "courses",
          foreignField: "_id",
          as: "courseDetails"
        }
      },
      {
        $group: {
          _id: "$cohort",
          students: {
            $push: {
              id: "$_id",
              fullName: { $concat: ["$firstName", " ", "$lastName"] },
              email: "$email",
              gpa: "$gpa",
              courseCount: { $size: "$courseDetails" }
            }
          },
          averageGPA: { $avg: "$gpa" },
          totalStudents: { $sum: 1 }
        }
      }
    ]);

    res.json({
      success: true,
      data: students,
      message: `Students grouped by cohort: ${cohort}`
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// UPDATE
exports.updateStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

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
  try {
    const student = await Student.findByIdAndDelete(req.params.id);

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
