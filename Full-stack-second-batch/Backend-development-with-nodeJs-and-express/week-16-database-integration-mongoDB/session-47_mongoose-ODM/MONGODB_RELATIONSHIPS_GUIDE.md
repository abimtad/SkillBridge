# MongoDB Relationships, Population, Aggregation, and Best Practices

This guide demonstrates MongoDB relationships, population, aggregation, indexing, and data modeling best practices using Mongoose ODM.

## Table of Contents
1. [Embedded Documents vs References](#embedded-documents-vs-references)
2. [Population](#population)
3. [Aggregation](#aggregation)
4. [Indexing for Performance](#indexing-for-performance)
5. [Data Modeling Best Practices](#data-modeling-best-practices)

---

## Embedded Documents vs References

### Embedded Documents

**What are they?**
Embedded documents are stored directly within the parent document. They don't have separate collections.

**When to use:**
- ✅ One-to-one relationships (e.g., User → Address)
- ✅ One-to-few relationships (e.g., Blog Post → Comments)
- ✅ Data that's always accessed together
- ✅ Data that doesn't need to be queried independently
- ✅ Small, bounded arrays

**Example in our codebase:**
```javascript
// models/student.model.js
address: {
  type: addressSchema,  // Embedded document
  required: false
}
```

**Pros:**
- Fast reads (single query)
- Atomic updates
- No need for joins/population
- Better for small, bounded data

**Cons:**
- Document size limit (16MB in MongoDB)
- Can't query embedded documents independently
- Duplication if same data needed in multiple places

### References

**What are they?**
References store ObjectIds pointing to documents in other collections.

**When to use:**
- ✅ Many-to-many relationships (e.g., Students ↔ Courses)
- ✅ One-to-many relationships (e.g., Author → Books)
- ✅ Data that grows independently
- ✅ Data that needs to be queried independently
- ✅ Large arrays that could exceed document size

**Example in our codebase:**
```javascript
// models/student.model.js
courses: [{
  type: mongoose.Schema.Types.ObjectId,
  ref: "Course"  // Reference to Course collection
}]
```

**Pros:**
- No document size issues
- Can query referenced documents independently
- Better for large, growing datasets
- Avoids duplication

**Cons:**
- Requires multiple queries or population
- More complex queries
- No referential integrity by default (can have orphaned references)

---

## Population

Population replaces ObjectIds with actual documents from referenced collections.

### Basic Population

```javascript
// Get student with populated courses
const student = await Student.findById(studentId)
  .populate("courses", "courseCode courseName instructor");
```

### Selective Field Population

```javascript
// Only populate specific fields
const course = await Course.findById(courseId)
  .populate("enrolledStudents", "firstName lastName email gpa");
```

### Nested Population

```javascript
// Populate nested references
const course = await Course.findById(courseId)
  .populate({
    path: "enrolledStudents",
    select: "firstName lastName courses",
    populate: {
      path: "courses",
      select: "courseName courseCode"
    }
  });
```

### Multiple Paths Population

```javascript
const student = await Student.findById(studentId)
  .populate("courses")
  .populate("enrolledPrograms");
```

### Conditional Population

```javascript
const course = await Course.findById(courseId)
  .populate({
    path: "enrolledStudents",
    match: { gpa: { $gte: 3.5 } },  // Only populate honor students
    select: "firstName lastName gpa"
  });
```

### API Endpoints Demonstrating Population

- `GET /students/:id/courses` - Get student with populated courses
- `GET /students/with-courses` - Get all students with courses populated
- `GET /courses/:id/students` - Get course with populated students
- `GET /courses/:id/students-details` - Nested population example

---

## Aggregation

Aggregation pipelines process documents through multiple stages, transforming and computing data.

### Common Aggregation Stages

1. **$match** - Filter documents (like WHERE in SQL)
2. **$group** - Group documents and compute aggregates
3. **$project** - Reshape documents (like SELECT in SQL)
4. **$lookup** - Join with another collection (like JOIN in SQL)
5. **$unwind** - Deconstruct array fields
6. **$sort** - Sort documents
7. **$limit** - Limit number of documents
8. **$addFields** - Add computed fields

### Example: Course Statistics

```javascript
// Get course statistics grouped by instructor
const stats = await Course.aggregate([
  {
    $addFields: {
      enrolledCount: { $size: { $ifNull: ["$enrolledStudents", []] } }
    }
  },
  {
    $group: {
      _id: "$instructor",
      totalCourses: { $sum: 1 },
      totalEnrolled: { $sum: "$enrolledCount" },
      averageCredits: { $avg: "$credits" }
    }
  },
  {
    $sort: { totalEnrolled: -1 }
  }
]);
```

### Example: Lookup (Join)

```javascript
// Join courses with students
const courses = await Course.aggregate([
  {
    $lookup: {
      from: "students",  // Collection name (lowercase, pluralized)
      localField: "enrolledStudents",
      foreignField: "_id",
      as: "studentDetails"
    }
  }
]);
```

### Example: Complex Aggregation

```javascript
// Get students with course statistics
const students = await Student.aggregate([
  {
    $lookup: {
      from: "courses",
      localField: "courses",
      foreignField: "_id",
      as: "courseDetails"
    }
  },
  {
    $addFields: {
      totalCredits: {
        $reduce: {
          input: "$courseDetails",
          initialValue: 0,
          in: { $add: ["$$value", "$$this.credits"] }
        }
      }
    }
  },
  {
    $project: {
      firstName: 1,
      lastName: 1,
      totalCredits: 1,
      courseCount: { $size: "$courseDetails" }
    }
  }
]);
```

### API Endpoints Demonstrating Aggregation

- `GET /courses/statistics` - Course statistics grouped by instructor
- `GET /courses/with-students-details` - Courses with student details using $lookup
- `GET /courses/available` - Available courses using aggregation
- `GET /students/course-stats` - Students with course statistics
- `GET /students/cohort/:cohort` - Students grouped by cohort

---

## Indexing for Performance

Indexes improve query performance by allowing MongoDB to quickly locate documents.

### Types of Indexes

1. **Single Field Index**
```javascript
studentSchema.index({ email: 1 });  // Ascending
studentSchema.index({ gpa: -1 });   // Descending
```

2. **Compound Index**
```javascript
// Useful for queries on multiple fields
studentSchema.index({ cohort: 1, gpa: -1 });
courseSchema.index({ courseCode: 1, instructor: 1 });
```

3. **Text Index**
```javascript
// For full-text search
studentSchema.index({ firstName: "text", lastName: "text", email: "text" });
courseSchema.index({ courseName: "text", courseCode: "text" });
```

4. **Array Index**
```javascript
// Index on array fields for population queries
studentSchema.index({ courses: 1 });
courseSchema.index({ enrolledStudents: 1 });
```

### Index Best Practices

✅ **DO:**
- Index fields used in queries frequently
- Create compound indexes for common query patterns
- Index foreign keys (references) for faster population
- Use text indexes for search functionality

❌ **DON'T:**
- Over-index (each index slows writes)
- Index fields that are rarely queried
- Create indexes on fields with low cardinality (few unique values)

### Checking Index Usage

```javascript
// Explain query execution plan
const explain = await Student.find({ cohort: "FS-2024" }).explain("executionStats");
console.log(explain.executionStats);
```

### Indexes in Our Codebase

**Student Model:**
- `email: 1` - Unique index for email lookups
- `cohort: 1` - For filtering by cohort
- `gpa: -1` - For sorting by GPA
- `cohort: 1, gpa: -1` - Compound index for cohort + GPA queries
- `courses: 1` - For population queries
- Text index on `firstName`, `lastName`, `email`

**Course Model:**
- `courseCode: 1, instructor: 1` - Compound index
- `instructor: 1` - Single field index
- Text index on `courseName`, `courseCode`
- `enrolledStudents: 1` - For population queries

---

## Data Modeling Best Practices

### 1. Schema Design Principles

**✅ Embed when:**
- Data is accessed together
- One-to-one or one-to-few relationships
- Data size is small and bounded

**✅ Reference when:**
- Many-to-many relationships
- Data grows independently
- Need to query independently

### 2. Schema Validation

```javascript
const studentSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: {
      validator: function(v) {
        return /^\S+@\S+\.\S+$/.test(v);
      },
      message: 'Invalid email format'
    }
  },
  gpa: {
    type: Number,
    min: 0,
    max: 4
  }
});
```

### 3. Virtual Properties

```javascript
// Computed properties that don't exist in database
studentSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`;
});

// Enable virtuals in JSON
studentSchema.set('toJSON', { virtuals: true });
```

### 4. Instance Methods

```javascript
// Methods available on document instances
studentSchema.methods.isHonorStudent = function () {
  return this.gpa >= 3.5;
};

// Usage
const student = await Student.findById(id);
if (student.isHonorStudent()) {
  // ...
}
```

### 5. Static Methods

```javascript
// Methods available on the model
studentSchema.statics.findByCohort = function (cohort) {
  return this.find({ cohort });
};

// Usage
const students = await Student.findByCohort("2024");
```

### 6. Query Helpers

```javascript
// Chainable query methods
studentSchema.query.honor = function () {
  return this.where("gpa").gte(3.5);
};

// Usage
const honorStudents = await Student.find().honor();
```

### 7. Middleware (Hooks)

```javascript
// Pre-save hook
studentSchema.pre("save", function (next) {
  // Modify data before saving
  this.cohort = "FS-" + this.cohort;
  next();
});

// Post-save hook
studentSchema.post("save", function (doc) {
  // Actions after saving
  console.log("Student saved:", doc.fullName);
});
```

### 8. Timestamps

```javascript
const courseSchema = new mongoose.Schema({
  // ... fields
}, {
  timestamps: true  // Adds createdAt and updatedAt automatically
});
```

### 9. Document Size Considerations

- MongoDB document limit: 16MB
- Keep documents under 1MB for optimal performance
- Use references for large arrays

### 10. Denormalization Strategy

**When to denormalize:**
- Frequently accessed data together
- Read-heavy applications
- Data that changes infrequently

**Example:**
```javascript
// Denormalize instructor name in course for faster reads
courseSchema.add({
  instructorName: String  // Denormalized from User collection
});
```

### 11. Relationship Patterns

**One-to-One:**
- Use embedded documents (e.g., User → Address)

**One-to-Many:**
- Use references (e.g., Author → Books)
- Store ObjectId array in parent or ObjectId in child

**Many-to-Many:**
- Use references with ObjectId arrays in both documents
- Or create a junction collection

**Example (Many-to-Many):**
```javascript
// Student model
courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }]

// Course model
enrolledStudents: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }]
```

---

## Testing the Concepts

### 1. Create a Student with Embedded Address

```http
POST /students
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "cohort": "2024",
  "gpa": 3.8,
  "address": {
    "street": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zipCode": "10001"
  }
}
```

### 2. Create a Course

```http
POST /courses
Content-Type: application/json

{
  "courseCode": "CS101",
  "courseName": "Introduction to Computer Science",
  "instructor": "Dr. Smith",
  "credits": 3,
  "capacity": 30,
  "schedule": {
    "days": ["Monday", "Wednesday"],
    "time": "10:00 AM - 11:30 AM",
    "room": "Room 101"
  }
}
```

### 3. Enroll Student in Course (Creates Reference)

```http
POST /courses/:courseId/enroll/:studentId
```

### 4. Get Student with Populated Courses

```http
GET /students/:id/courses
```

### 5. Get Course Statistics (Aggregation)

```http
GET /courses/statistics
```

### 6. Get Students with Course Stats (Aggregation)

```http
GET /students/course-stats
```

---

## Summary

- **Embedded Documents**: Use for one-to-one, one-to-few, small bounded data
- **References**: Use for many-to-many, independent data, large arrays
- **Population**: Replace ObjectIds with actual documents
- **Aggregation**: Complex queries, transformations, joins using pipeline stages
- **Indexing**: Improve query performance on frequently queried fields
- **Best Practices**: Proper schema design, validation, methods, hooks, and relationship patterns

For more examples, check the controller files:
- `controllers/student.controller.js`
- `controllers/course.controller.js`

