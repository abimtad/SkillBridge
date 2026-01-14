const mongoose = require("mongoose");
const addressSchema = require("./address.model");

// Schema definition
const studentSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },

  lastName: {
    type: String,
    required: true,
    trim: true
  },

  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true
  },

  cohort: {
    type: String,
    required: true
  },

  enrolledAt: {
    type: Date,
    default: Date.now
  },

  gpa: {
    type: Number,
    min: 0,
    max: 4
  },

  interests: [String],

  // --------- EMBEDDED DOCUMENT (One-to-One) ----------
  // Embedded documents are stored directly in the parent document
  // Best for: Data that's always accessed together, one-to-one relationships
  address: {
    type: addressSchema,
    required: false
  },

  // --------- REFERENCED DOCUMENTS (Many-to-Many) ----------
  // References store ObjectIds pointing to other documents
  // Best for: Many-to-many relationships, data that grows independently
  courses: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course"
  }]
}, {
  // Enable virtuals in JSON output
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});


// --------- VIRTUAL PROPERTY ----------
studentSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`;
});


// --------- INSTANCE METHOD ----------
studentSchema.methods.isHonorStudent = function () {
  return this.gpa >= 3.5;
};


// --------- STATIC METHOD ----------
studentSchema.statics.findByCohort = function (cohort) {
  return this.find({ cohort });
};


// --------- PRE-SAVE HOOK ----------
studentSchema.pre("save", function (next) {
  console.log("Before saving student:", this.fullName);
  this.cohort = "FS-" + this.cohort;
  next();
});

studentSchema.query.honor = function () {
  return this.where("gpa").gte(3.5);
};

// --------- INDEXING FOR PERFORMANCE ----------
// Single field indexes
studentSchema.index({ email: 1 }); // Already unique, but explicit index helps queries
studentSchema.index({ cohort: 1 });
studentSchema.index({ gpa: -1 }); // Descending for sorting high GPA first

// Compound index for common query patterns (e.g., find by cohort and GPA)
studentSchema.index({ cohort: 1, gpa: -1 });

// Index on courses array for population queries
studentSchema.index({ courses: 1 });

// Text index for searching across multiple fields
studentSchema.index({ firstName: "text", lastName: "text", email: "text" });

// --------- POST-SAVE HOOK ----------
studentSchema.post("save", function (doc) {
  console.log("Student saved successfully:", doc.fullName);
});

module.exports = mongoose.model("Student", studentSchema);
