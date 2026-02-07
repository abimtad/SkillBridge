const mongoose = require("mongoose");

// Course Schema - Demonstrates referenced relationships
const courseSchema = new mongoose.Schema({
  courseCode: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
    trim: true
  },
  courseName: {
    type: String,
    required: true,
    trim: true
  },
  instructor: {
    type: String,
    required: true,
    trim: true
  },
  credits: {
    type: Number,
    required: true,
    min: 1,
    max: 6
  },
  capacity: {
    type: Number,
    required: true,
    min: 1
  },
  enrolledStudents: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student"
  }],
  schedule: {
    days: [String], // e.g., ["Monday", "Wednesday"]
    time: String,   // e.g., "10:00 AM - 11:30 AM"
    room: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true // Adds createdAt and updatedAt automatically
});

// --------- INDEXING FOR PERFORMANCE ----------
// Compound index for common query patterns
courseSchema.index({ courseCode: 1, instructor: 1 });

// Single field index
courseSchema.index({ instructor: 1 });

// Text index for search functionality
courseSchema.index({ courseName: "text", courseCode: "text" });

// Index on enrolledStudents for population queries
courseSchema.index({ enrolledStudents: 1 });

// --------- STATIC METHOD ----------
courseSchema.statics.findByInstructor = function (instructor) {
  return this.find({ instructor });
};

courseSchema.statics.findAvailableCourses = function () {
  return this.aggregate([
    {
      $addFields: {
        enrolledCount: { $size: { $ifNull: ["$enrolledStudents", []] } }
      }
    },
    {
      $match: {
        $expr: { $lt: ["$enrolledCount", "$capacity"] }
      }
    }
  ]);
};

// --------- INSTANCE METHOD ----------
courseSchema.methods.isFull = function () {
  return this.enrolledStudents.length >= this.capacity;
};

courseSchema.methods.enrollStudent = async function (studentId) {
  if (this.isFull()) {
    throw new Error("Course is full");
  }
  if (this.enrolledStudents.includes(studentId)) {
    throw new Error("Student already enrolled");
  }
  this.enrolledStudents.push(studentId);
  return this.save();
};

module.exports = mongoose.model("Course", courseSchema);

