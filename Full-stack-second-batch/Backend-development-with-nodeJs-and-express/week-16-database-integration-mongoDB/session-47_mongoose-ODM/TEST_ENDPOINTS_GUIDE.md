# Test Endpoints Guide

This guide explains the test endpoints created to verify all methods, static functions, and indexes in each model.

## Available Test Endpoints

### 1. Test Student Model
**Endpoint:** `GET /test/student`

Tests all features of the Student model:
- ✅ **Indexes**: Shows all indexes (email, cohort, gpa, compound, courses array, text index)
- ✅ **Virtual Properties**: Tests `fullName` virtual property
- ✅ **Instance Methods**: Tests `isHonorStudent()` method
- ✅ **Static Methods**: Tests `findByCohort(cohort)` method
- ✅ **Query Helpers**: Tests `honor()` query helper

**Example Response:**
```json
{
  "success": true,
  "model": "Student",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "tests": {
    "indexes": {
      "indexes": { ... },
      "formattedIndexes": [ ... ],
      "totalIndexes": 6,
      "collectionStats": { ... }
    },
    "virtualProperties": {
      "fullName": "Ada Lovelace",
      "description": "Virtual property that combines firstName and lastName"
    },
    "instanceMethods": {
      "isHonorStudent": {
        "result": true,
        "studentGPA": 3.9
      }
    },
    "staticMethods": {
      "findByCohort": {
        "resultCount": 2,
        "example": "Student.findByCohort('FS-16') found 2 students"
      }
    },
    "queryHelpers": {
      "honor": {
        "resultCount": 2,
        "example": "Student.find().honor() found 2 honor students"
      }
    }
  }
}
```

### 2. Test Course Model
**Endpoint:** `GET /test/course`

Tests all features of the Course model:
- ✅ **Indexes**: Shows all indexes (compound, instructor, text index, enrolledStudents array)
- ✅ **Instance Methods**: Tests `isFull()` and shows `enrollStudent()` info
- ✅ **Static Methods**: Tests `findByInstructor(instructor)` and `findAvailableCourses()`

**Example Response:**
```json
{
  "success": true,
  "model": "Course",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "tests": {
    "indexes": {
      "indexes": { ... },
      "formattedIndexes": [ ... ],
      "totalIndexes": 4,
      "collectionStats": { ... }
    },
    "instanceMethods": {
      "isFull": {
        "result": false,
        "enrolledCount": 5,
        "capacity": 30
      },
      "enrollStudent": {
        "description": "Enrolls a student in the course if not full"
      }
    },
    "staticMethods": {
      "findByInstructor": {
        "resultCount": 1,
        "example": "Course.findByInstructor('Dr. Smith') found 1 courses"
      },
      "findAvailableCourses": {
        "result": {
          "resultCount": 2,
          "example": "Course.findAvailableCourses() found 2 courses with available spots"
        }
      }
    }
  }
}
```

### 3. Test All Models
**Endpoint:** `GET /test/all`

Tests all models at once and provides a comprehensive overview:
- ✅ Student model indexes, methods, and examples
- ✅ Course model indexes, methods, and examples
- ✅ Summary of all features

**Example Response:**
```json
{
  "success": true,
  "timestamp": "2024-01-01T00:00:00.000Z",
  "models": {
    "Student": {
      "model": "Student",
      "indexes": { ... },
      "methods": {
        "virtualProperties": ["fullName"],
        "instanceMethods": ["isHonorStudent()"],
        "staticMethods": ["findByCohort(cohort)"],
        "queryHelpers": ["honor()"]
      },
      "example": {
        "virtualProperty": {
          "fullName": "Ada Lovelace"
        },
        "instanceMethod": {
          "isHonorStudent": true
        }
      }
    },
    "Course": {
      "model": "Course",
      "indexes": { ... },
      "methods": {
        "instanceMethods": ["isFull()", "enrollStudent(studentId)"],
        "staticMethods": ["findByInstructor(instructor)", "findAvailableCourses()"]
      },
      "example": {
        "instanceMethod": {
          "isFull": false
        }
      }
    }
  },
  "summary": {
    "totalModels": 2,
    "studentIndexes": 6,
    "courseIndexes": 4
  }
}
```

### 4. Get Model Indexes (Detailed)
**Endpoint:** `GET /test/indexes/:model`

Get detailed index information for a specific model. Replace `:model` with `student` or `course`.

**Examples:**
- `GET /test/indexes/student` - Get Student model indexes
- `GET /test/indexes/course` - Get Course model indexes

**Response includes:**
- All indexes with their specifications
- Collection statistics (count, size, storage size)
- Query execution plan (explain plan) for sample queries
- Index usage information

**Example Response:**
```json
{
  "success": true,
  "model": "student",
  "collectionName": "students",
  "indexes": {
    "indexes": {
      "_id_": { "_id": 1 },
      "email_1": { "email": 1 },
      "cohort_1": { "cohort": 1 },
      "gpa_-1": { "gpa": -1 },
      "cohort_1_gpa_-1": { "cohort": 1, "gpa": -1 },
      "courses_1": { "courses": 1 },
      "firstName_text_lastName_text_email_text": { ... }
    },
    "formattedIndexes": [
      {
        "name": "email_1",
        "key": { "email": "ascending" }
      },
      ...
    ],
    "totalIndexes": 7,
    "collectionStats": {
      "count": 10,
      "size": 12345,
      "avgObjSize": 1234,
      "storageSize": 16384,
      "totalIndexSize": 8192
    }
  },
  "explainPlan": {
    "executionStats": { ... },
    "queryPlanner": { ... }
  }
}
```

## What Each Endpoint Tests

### Student Model Features Tested:

1. **Indexes:**
   - `email_1` - Single field index (unique)
   - `cohort_1` - Single field index
   - `gpa_-1` - Single field index (descending)
   - `cohort_1_gpa_-1` - Compound index
   - `courses_1` - Array index
   - Text index on firstName, lastName, email

2. **Virtual Properties:**
   - `fullName` - Combines firstName and lastName

3. **Instance Methods:**
   - `isHonorStudent()` - Returns true if GPA >= 3.5

4. **Static Methods:**
   - `findByCohort(cohort)` - Finds students by cohort

5. **Query Helpers:**
   - `honor()` - Filters students with GPA >= 3.5

### Course Model Features Tested:

1. **Indexes:**
   - `courseCode_1_instructor_1` - Compound index
   - `instructor_1` - Single field index
   - Text index on courseName and courseCode
   - `enrolledStudents_1` - Array index

2. **Instance Methods:**
   - `isFull()` - Returns true if course is at capacity
   - `enrollStudent(studentId)` - Enrolls a student (info only, use POST endpoint to test)

3. **Static Methods:**
   - `findByInstructor(instructor)` - Finds courses by instructor
   - `findAvailableCourses()` - Uses aggregation to find courses with available spots

## Usage Examples

### Using cURL:

```bash
# Test Student model
curl http://localhost:5000/test/student

# Test Course model
curl http://localhost:5000/test/course

# Test all models
curl http://localhost:5000/test/all

# Get Student indexes
curl http://localhost:5000/test/indexes/student

# Get Course indexes
curl http://localhost:5000/test/indexes/course
```

### Using REST Client (VS Code REST Client extension):

See `rest.http` file for all test endpoint examples.

## Notes

- These endpoints are read-only and don't modify data
- They provide comprehensive information about model features
- Index information includes collection statistics
- Methods are tested with actual data from the database
- If no data exists, endpoints will still show available methods and indexes

## Error Handling

All endpoints include proper error handling:
- Returns `success: false` with error message if something fails
- Provides stack trace in development mode
- Handles cases where no data exists in the database

