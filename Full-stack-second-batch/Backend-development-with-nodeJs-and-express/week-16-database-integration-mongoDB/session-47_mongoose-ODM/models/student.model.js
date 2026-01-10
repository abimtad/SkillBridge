const mongoose = require("mongoose");

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

  interests: [String]
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



// --------- POST-SAVE HOOK ----------
studentSchema.post("save", function (doc) {
  console.log("Student saved successfully:", doc.fullName);
});


module.exports = mongoose.model("Student", studentSchema);
