# MongoDB Complete Reference Guide

## Table of Contents
- [Core Concepts](#-core-concepts)
- [Create Operations](#-1-create-insert-operations)
- [Read Operations](#-2-read-find-operations)
- [Update Operations](#️-3-update-operations)
- [Delete Operations](#-4-delete-operations)
- [Comparison Operators](#-comparison-operators)
- [Logical Operators](#-logical-operators)
- [Advanced Query Patterns](#-advanced-query-patterns)
- [Pro Tips](#-pro-tips)
- [Quick Reference](#-quick-reference-commands)

## 📚 Core Concepts

| Term       | Description                                    | Example                              |
| ---------- | ---------------------------------------------- | ------------------------------------ |
| Database   | A container for collections                    | `myApp` (like a schema in SQL)       |
| Collection | Like a table, stores related documents        | `users`, `products` (like SQL tables)|
| Document   | JSON-like record with key-value pairs         | `{ name: "John", age: 30 }`          |
| BSON       | Binary version of JSON used internally        | Optimized storage format             |
| Compass    | GUI tool for interacting with MongoDB         | Visual database browser              |
| _id        | Unique identifier auto-generated for each doc | `ObjectId("507f1f77bcf86cd799439011")` |

---

## 📥 1. CREATE (Insert Operations)

### Insert One Document
```javascript
db.users.insertOne({
  name: "Tom",
  email: "tom@example.com",
  age: 35,
  isActive: true,
  createdAt: new Date()
})
```

### Insert Many Documents
```javascript
db.users.insertMany([
  { name: "Amy", age: 27, city: "NYC" },
  { name: "Mark", age: 40, city: "LA" },
  { name: "Sarah", age: 22, city: "Chicago" }
])
```

**✔️ Key Points:**
- Automatically creates `_id` for each document if not provided
- Returns insertion result with `insertedId` or `insertedIds`
- Creates collection automatically if it doesn't exist

---

## 🔍 2. READ (Find Operations)

### Basic Find Operations
```javascript
// Find all documents
db.users.find()

// Find with pretty formatting
db.users.find().pretty()

// Find one document
db.users.findOne({ name: "Tom" })

// Count documents
db.users.countDocuments()
```

### Find with Filters
```javascript
// Simple filter
db.users.find({ age: 30 })

// Multiple conditions (implicit AND)
db.users.find({ age: 30, city: "NYC" })

// Using comparison operators
db.users.find({ age: { $gt: 30 } })
```

### Projection (Select Specific Fields)
```javascript
// Include only name and email
db.users.find({}, { name: 1, email: 1 })

// Exclude age field
db.users.find({}, { age: 0 })

// Exclude _id and include specific fields
db.users.find({}, { name: 1, email: 1, _id: 0 })
```

### Sorting and Limiting
```javascript
// Sort by age (ascending)
db.users.find().sort({ age: 1 })

// Sort by age (descending)
db.users.find().sort({ age: -1 })

// Limit results
db.users.find().limit(5)

// Skip and limit (pagination)
db.users.find().skip(10).limit(5)

// Combine operations
db.users.find({ age: { $gt: 25 } })
         .sort({ name: 1 })
         .limit(10)
```

---

## ✏️ 3. UPDATE Operations

### Update One Document
```javascript
db.users.updateOne(
  { name: "Tom" },                    // filter
  { $set: { age: 36, city: "Boston" } } // update
)
```

### Update Many Documents
```javascript
db.users.updateMany(
  { age: { $lt: 30 } },              // filter
  { $set: { isYoung: true } }        // update
)
```

### Update Operators
```javascript
// Set fields
{ $set: { age: 25, status: "active" } }

// Increment numeric values
{ $inc: { age: 1, score: 10 } }

// Remove fields
{ $unset: { isYoung: "" } }

// Add to array
{ $push: { hobbies: "reading" } }

// Add to array (avoid duplicates)
{ $addToSet: { tags: "mongodb" } }

// Remove from array
{ $pull: { hobbies: "gaming" } }

// Update current date
{ $currentDate: { lastModified: true } }
```

### Upsert (Update or Insert)
```javascript
db.users.updateOne(
  { email: "new@example.com" },
  { $set: { name: "New User", age: 25 } },
  { upsert: true } // Creates document if not found
)
```

---

## ❌ 4. DELETE Operations

### Delete One Document
```javascript
db.users.deleteOne({ name: "Amy" })
```

### Delete Many Documents
```javascript
db.users.deleteMany({ age: { $lt: 18 } })

// Delete all documents in collection
db.users.deleteMany({})
```

---

## 🔢 Comparison Operators

| Operator | Description           | Example                              | Use Case                    |
| -------- | --------------------- | ------------------------------------ | --------------------------- |
| `$eq`    | Equal to              | `{ age: { $eq: 30 } }`               | Exact match (default)       |
| `$ne`    | Not equal to          | `{ status: { $ne: "inactive" } }`    | Exclude specific values     |
| `$gt`    | Greater than          | `{ age: { $gt: 18 } }`               | Adults only                 |
| `$gte`   | Greater than or equal | `{ score: { $gte: 80 } }`            | Passing grades              |
| `$lt`    | Less than             | `{ price: { $lt: 100 } }`            | Budget items                |
| `$lte`   | Less than or equal    | `{ age: { $lte: 65 } }`              | Working age                 |
| `$in`    | In array of values    | `{ city: { $in: ["NYC", "LA"] } }`   | Multiple options            |
| `$nin`   | Not in array          | `{ status: { $nin: ["banned"] } }`   | Exclude multiple values     |

### Practical Examples
```javascript
// Find users between 25 and 40 years old
db.users.find({ 
  age: { $gte: 25, $lte: 40 } 
})

// Find users from specific cities
db.users.find({ 
  city: { $in: ["NYC", "LA", "Chicago"] } 
})

// Find active users not from banned cities
db.users.find({ 
  isActive: true,
  city: { $nin: ["Restricted City"] }
})
```

---

## 🧠 Logical Operators

### $and (All conditions must be true)
```javascript
// Explicit AND
db.users.find({
  $and: [
    { age: { $gt: 25 } },
    { isActive: true },
    { city: "NYC" }
  ]
})

// Implicit AND (same as above)
db.users.find({
  age: { $gt: 25 },
  isActive: true,
  city: "NYC"
})
```

### $or (At least one condition must be true)
```javascript
db.users.find({
  $or: [
    { age: { $lt: 20 } },      // Teenagers
    { age: { $gt: 60 } },      // Seniors
    { isVIP: true }            // VIP users
  ]
})
```

### $not (Negation)
```javascript
// Find users NOT older than 30
db.users.find({
  age: { $not: { $gt: 30 } }
})

// Equivalent to
db.users.find({
  age: { $lte: 30 }
})
```

### $nor (None of the conditions should be true)
```javascript
// Find users who are NOT (young OR inactive)
db.users.find({
  $nor: [
    { age: { $lt: 18 } },
    { isActive: false }
  ]
})
```

### Complex Logical Combinations
```javascript
// Find active users who are either young OR from NYC
db.users.find({
  isActive: true,
  $or: [
    { age: { $lt: 25 } },
    { city: "NYC" }
  ]
})

// Find users who are (active AND from NYC) OR (VIP AND any age)
db.users.find({
  $or: [
    { 
      $and: [
        { isActive: true },
        { city: "NYC" }
      ]
    },
    {
      $and: [
        { isVIP: true },
        { age: { $exists: true } }
      ]
    }
  ]
})
```

---

## 🔍 Advanced Query Patterns

### Existence and Type Checking
```javascript
// Check if field exists
db.users.find({ email: { $exists: true } })

// Check field type
db.users.find({ age: { $type: "number" } })

// Check for null values
db.users.find({ middleName: null })
```

### Regular Expressions
```javascript
// Case-insensitive search
db.users.find({ name: { $regex: /john/i } })

// Starts with pattern
db.users.find({ email: { $regex: /^admin/ } })

// Contains pattern
db.users.find({ city: { $regex: /york/i } })
```

### Array Queries
```javascript
// Find documents with specific array element
db.users.find({ hobbies: "reading" })

// Find documents with array containing any of these values
db.users.find({ hobbies: { $in: ["reading", "gaming"] } })

// Find documents with array containing all values
db.users.find({ hobbies: { $all: ["reading", "gaming"] } })

// Array size
db.users.find({ hobbies: { $size: 3 } })
```

---

## 💡 Pro Tips

### Performance Tips
- **Index frequently queried fields**: `db.users.createIndex({ email: 1 })`
- **Use projection** to limit returned data
- **Compound indexes** for multiple field queries
- **Use `explain()`** to analyze query performance

### Common Patterns
```javascript
// Pagination pattern
const page = 2;
const limit = 10;
db.users.find()
        .skip((page - 1) * limit)
        .limit(limit)

// Date range queries
db.orders.find({
  createdAt: {
    $gte: new Date("2024-01-01"),
    $lt: new Date("2024-12-31")
  }
})

// Case-insensitive email lookup
db.users.find({
  email: { $regex: new RegExp("^" + email + "$", "i") }
})
```

### Error Prevention
- Always validate data before insertion
- Use transactions for multi-document operations
- Handle duplicate key errors gracefully
- Set appropriate schema validation rules

---

## 🚀 Quick Reference Commands

```javascript
// Database operations
show dbs                    // List all databases
use myDatabase             // Switch to database
db.dropDatabase()          // Delete current database

// Collection operations
show collections           // List collections
db.createCollection("users") // Create collection
db.users.drop()           // Delete collection

// Index operations
db.users.createIndex({ email: 1 })    // Create index
db.users.getIndexes()                 // List indexes
db.users.dropIndex({ email: 1 })      // Drop index

// Utility operations
db.users.find().explain()             // Query execution plan
db.stats()                           // Database statistics
db.users.stats()                     // Collection statistics
```
____________________________________________________________________________________________________________________________________________________________________
# MongoDB Advanced Operations Guide

## Table of Contents
- [Array Queries](#-array-queries)
- [Field Existence & Type Checking](#-field-existence--type-checking)
- [Projection - Field Selection](#-projection---field-selection)
- [Sorting Results](#-sorting-results)
- [Limiting and Pagination](#-limiting-and-pagination)
- [Array Operations](#-array-operations)
- [Advanced Array Patterns](#-advanced-array-patterns)
- [Performance Tips](#-performance-tips)
- [Real-World Examples](#-real-world-examples)

---

## 📚 Array Queries

### Basic Array Matching
```javascript
// Find documents where hobbies array contains "music"
db.users.find({ hobbies: "music" })

// Sample data that would match:
// { name: "Alice", hobbies: ["music", "reading", "travel"] }
// { name: "Bob", hobbies: ["music"] }
```

### Match All Elements ($all)
```javascript
// Find documents where hobbies contains ALL specified values
db.users.find({ hobbies: { $all: ["music", "travel"] } })

// Only matches if BOTH "music" AND "travel" exist in array
// Order doesn't matter
```

### Array Size Queries
```javascript
// Find documents with exactly 3 hobbies
db.users.find({ hobbies: { $size: 3 } })

// Find documents with 2 or more hobbies (using workaround)
db.users.find({ "hobbies.1": { $exists: true } })

// Find documents with less than 4 hobbies
db.users.find({ "hobbies.3": { $exists: false } })
```

### Array Element Queries
```javascript
// Query specific array element by index
db.users.find({ "hobbies.0": "music" })  // First hobby is "music"

// Query array of objects
db.users.find({ "orders.status": "pending" })

// Multiple conditions on array elements
db.users.find({
  orders: {
    $elemMatch: {
      status: "shipped",
      amount: { $gt: 100 }
    }
  }
})
```

### Advanced Array Queries
```javascript
// Find arrays with at least one element matching condition
db.products.find({
  reviews: {
    $elemMatch: {
      rating: { $gte: 4 },
      verified: true
    }
  }
})

// Find documents where any array element matches
db.users.find({ "scores": { $gt: 80 } })

// Find documents where all array elements match condition
db.users.find({
  scores: {
    $not: {
      $elemMatch: { $lt: 70 }
    }
  }
})
```

---

## 🔍 Field Existence & Type Checking

### Field Existence
```javascript
// Check if field exists (including null values)
db.users.find({ phone: { $exists: true } })

// Check if field doesn't exist
db.users.find({ phone: { $exists: false } })

// Find documents with non-null phone numbers
db.users.find({
  phone: { 
    $exists: true, 
    $ne: null 
  }
})
```

### Type Checking
```javascript
// Check field type using BSON type numbers
db.users.find({ age: { $type: 1 } })      // Number (deprecated)
db.users.find({ age: { $type: "number" } }) // Number (preferred)

// Common BSON types
db.users.find({ name: { $type: "string" } })
db.users.find({ isActive: { $type: "bool" } })
db.users.find({ createdAt: { $type: "date" } })
db.users.find({ _id: { $type: "objectId" } })
db.users.find({ hobbies: { $type: "array" } })

// Multiple types
db.users.find({ 
  score: { 
    $type: ["number", "double"] 
  } 
})
```

### BSON Type Reference
| Type        | Number | String Alias |
|-------------|--------|--------------|
| Double      | 1      | "double"     |
| String      | 2      | "string"     |
| Object      | 3      | "object"     |
| Array       | 4      | "array"      |
| Binary data | 5      | "binData"    |
| ObjectId    | 7      | "objectId"   |
| Boolean     | 8      | "bool"       |
| Date        | 9      | "date"       |
| Null        | 10     | "null"       |
| Number      | 16     | "number"     |

---

## 🔦 Projection - Field Selection

### Understanding Projection
Projection controls which fields are returned in query results, reducing network traffic and improving performance.

### Include Specific Fields (1)
```javascript
// Show only name and email (plus _id by default)
db.users.find({}, { name: 1, email: 1 })

// Result: { _id: ..., name: "Alice", email: "alice@example.com" }
```

### Exclude Specific Fields (0)
```javascript
// Hide password field, show everything else
db.users.find({}, { password: 0 })

// Hide multiple fields
db.users.find({}, { password: 0, ssn: 0, creditCard: 0 })
```

### Exclude _id Field
```javascript
// Show only specific fields without _id
db.users.find({}, { name: 1, email: 1, _id: 0 })

// Result: { name: "Alice", email: "alice@example.com" }
```

### Projection Rules
```javascript
// ✅ VALID: Include fields (with optional _id exclusion)
db.users.find({}, { name: 1, email: 1, _id: 0 })

// ✅ VALID: Exclude fields
db.users.find({}, { password: 0, ssn: 0 })

// ❌ INVALID: Cannot mix include and exclude
db.users.find({}, { name: 1, password: 0 })  // Error!
```

### Array Projection
```javascript
// Project array elements with $slice
db.users.find(
  { name: "Alice" },
  { 
    name: 1,
    hobbies: { $slice: 3 }  // First 3 hobbies
  }
)

// Skip and limit array elements
db.users.find(
  {},
  { 
    hobbies: { $slice: [2, 3] }  // Skip 2, take 3
  }
)

// Project specific array elements
db.users.find(
  {},
  { 
    "hobbies.0": 1,  // First hobby only
    name: 1
  }
)
```

### Nested Field Projection
```javascript
// Include nested fields
db.users.find(
  {},
  { 
    name: 1,
    "address.city": 1,
    "address.zipCode": 1
  }
)

// Exclude nested fields
db.users.find(
  {},
  { 
    "profile.socialSecurityNumber": 0
  }
)
```

---

## 🔃 Sorting Results

### Basic Sorting
```javascript
// Ascending (1) - A to Z, 0 to 9, oldest to newest
db.users.find().sort({ age: 1 })

// Descending (-1) - Z to A, 9 to 0, newest to oldest
db.users.find().sort({ age: -1 })
```

### Multi-Field Sorting
```javascript
// Sort by age (ascending), then by name (descending)
db.users.find().sort({ age: 1, name: -1 })

// Priority: First by status, then by createdDate, then by name
db.orders.find().sort({ 
  status: 1, 
  createdDate: -1, 
  customerName: 1 
})
```

### Sorting with Arrays
```javascript
// Sort by first element of array
db.users.find().sort({ "scores.0": -1 })

// Sort by array size (requires additional field)
db.users.aggregate([
  { $addFields: { hobbyCount: { $size: "$hobbies" } } },
  { $sort: { hobbyCount: -1 } }
])
```

### Case-Insensitive Sorting
```javascript
// Using collation for case-insensitive sorting
db.users.find().sort({ name: 1 }).collation({ 
  locale: "en", 
  strength: 2 
})

// Alternative: Create a lowercase field for sorting
db.users.find().sort({ nameLower: 1 })
```

---

## 🎯 Limiting and Pagination

### Basic Limiting
```javascript
// Return only first 5 documents
db.users.find().limit(5)

// Skip first 10 documents
db.users.find().skip(10)

// Combine: Skip 10, take 5 (page 3 with 5 per page)
db.users.find().skip(10).limit(5)
```

### Pagination Patterns
```javascript
// Basic pagination function
function getPage(pageNumber, pageSize) {
  const skip = (pageNumber - 1) * pageSize;
  return db.users.find()
    .skip(skip)
    .limit(pageSize)
    .sort({ _id: 1 });  // Consistent ordering
}

// Example: Page 3 with 10 items per page
getPage(3, 10);  // Skip 20, limit 10
```

### Efficient Pagination with Cursor
```javascript
// For large datasets, use cursor-based pagination
// First page
db.users.find().sort({ _id: 1 }).limit(10)

// Next page (using last _id from previous page)
db.users.find({ _id: { $gt: lastIdFromPreviousPage } })
         .sort({ _id: 1 })
         .limit(10)
```

### Complete Pagination Example
```javascript
// Get users with full pagination info
function getUsersWithPagination(page = 1, limit = 10, filter = {}) {
  const skip = (page - 1) * limit;
  
  const users = db.users
    .find(filter, { password: 0 })  // Exclude sensitive data
    .sort({ createdAt: -1 })        // Newest first
    .skip(skip)
    .limit(limit);
    
  const total = db.users.countDocuments(filter);
  
  return {
    data: users,
    pagination: {
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalItems: total,
      itemsPerPage: limit,
      hasNextPage: (page * limit) < total,
      hasPrevPage: page > 1
    }
  };
}
```

### Combined Operations Order
```javascript
// Correct order: filter → sort → skip → limit → project
db.users
  .find({ isActive: true })        // 1. Filter
  .sort({ lastLogin: -1 })         // 2. Sort
  .skip(20)                        // 3. Skip
  .limit(10)                       // 4. Limit
  .project({ name: 1, email: 1 }); // 5. Project (in some drivers)
```

---

## 🧺 Array Operations

### Adding Elements to Arrays

#### $push - Add Single Element
```javascript
// Add one hobby
db.users.updateOne(
  { name: "Alice" },
  { $push: { hobbies: "reading" } }
)

// Add to nested array
db.users.updateOne(
  { name: "Alice" },
  { $push: { "profile.skills": "MongoDB" } }
)
```

#### $push with $each - Add Multiple Elements
```javascript
// Add multiple hobbies
db.users.updateOne(
  { name: "Alice" },
  {
    $push: {
      hobbies: {
        $each: ["writing", "drawing", "photography"]
      }
    }
  }
)
```

#### $push with Modifiers
```javascript
// Add with position (insert at specific index)
db.users.updateOne(
  { name: "Alice" },
  {
    $push: {
      hobbies: {
        $each: ["yoga"],
        $position: 1  // Insert at index 1
      }
    }
  }
)

// Add and keep array sorted
db.users.updateOne(
  { name: "Alice" },
  {
    $push: {
      scores: {
        $each: [85, 92],
        $sort: -1  // Sort descending
      }
    }
  }
)

// Add and limit array size (keep last N elements)
db.users.updateOne(
  { name: "Alice" },
  {
    $push: {
      recentLogins: {
        $each: [new Date()],
        $slice: -10  // Keep last 10 logins
      }
    }
  }
)
```

### Preventing Duplicates with $addToSet

#### Basic $addToSet
```javascript
// Add only if doesn't exist
db.users.updateOne(
  { name: "Alice" },
  { $addToSet: { hobbies: "reading" } }
)
// Won't add if "reading" already exists
```

#### $addToSet with Multiple Values
```javascript
// Add multiple unique values
db.users.updateOne(
  { name: "Alice" },
  {
    $addToSet: {
      hobbies: {
        $each: ["music", "traveling", "reading"]
      }
    }
  }
)
// Only adds values that don't already exist
```

### Removing Elements from Arrays

#### $pull - Remove by Value
```javascript
// Remove specific value
db.users.updateOne(
  { name: "Alice" },
  { $pull: { hobbies: "reading" } }
)

// Remove multiple values
db.users.updateOne(
  { name: "Alice" },
  { $pull: { hobbies: { $in: ["reading", "gaming"] } } }
)

// Remove by condition
db.users.updateOne(
  { name: "Alice" },
  { $pull: { scores: { $lt: 70 } } }  // Remove scores below 70
)
```

#### $pull with Complex Conditions
```javascript
// Remove objects from array based on condition
db.users.updateOne(
  { name: "John" },
  { 
    $pull: { 
      orders: { 
        status: "cancelled",
        amount: { $lt: 50 }
      } 
    } 
  }
)
```

#### $pop - Remove First/Last Element
```javascript
// Remove last element
db.users.updateOne(
  { name: "Alice" },
  { $pop: { hobbies: 1 } }
)

// Remove first element
db.users.updateOne(
  { name: "Alice" },
  { $pop: { hobbies: -1 } }
)
```

### Updating Array Elements

#### Update by Index
```javascript
// Update second hobby (index 1)
db.users.updateOne(
  { name: "Alice" },
  { $set: { "hobbies.1": "yoga" } }
)

// Update nested object in array
db.users.updateOne(
  { name: "John" },
  { 
    $set: { 
      "orders.0.status": "shipped",
      "orders.0.trackingNumber": "ABC123"
    } 
  }
)
```

#### Update Array Element with $ Positional Operator
```javascript
// Update first matching array element
db.users.updateOne(
  { 
    name: "John",
    "orders.status": "pending"
  },
  { 
    $set: { 
      "orders.$.status": "shipped",
      "orders.$.updatedAt": new Date()
    } 
  }
)
```

#### Update All Array Elements with $[]
```javascript
// Update all orders for a user
db.users.updateOne(
  { name: "John" },
  { 
    $set: { 
      "orders.$[].lastModified": new Date()
    } 
  }
)
```

#### Update Array Elements with arrayFilters
```javascript
// Update specific array elements matching condition
db.users.updateOne(
  { name: "John" },
  { 
    $set: { 
      "orders.$[elem].status": "expedited"
    } 
  },
  {
    arrayFilters: [{ 
      "elem.amount": { $gt: 100 },
      "elem.status": "pending"
    }]
  }
)
```

---

## 🎯 Advanced Array Patterns

### Array Aggregation Operations
```javascript
// Count array elements
db.users.aggregate([
  {
    $project: {
      name: 1,
      hobbyCount: { $size: "$hobbies" }
    }
  }
])

// Filter array elements
db.users.aggregate([
  {
    $project: {
      name: 1,
      expensiveOrders: {
        $filter: {
          input: "$orders",
          cond: { $gt: ["$$this.amount", 100] }
        }
      }
    }
  }
])

// Transform array elements
db.users.aggregate([
  {
    $project: {
      name: 1,
      orderTotals: {
        $map: {
          input: "$orders",
          as: "order",
          in: "$$order.amount"
        }
      }
    }
  }
])
```

### Complex Array Queries
```javascript
// Find users with at least 3 orders over $50
db.users.find({
  $expr: {
    $gte: [
      {
        $size: {
          $filter: {
            input: "$orders",
            cond: { $gt: ["$$this.amount", 50] }
          }
        }
      },
      3
    ]
  }
})

// Find users whose average order amount is over $75
db.users.find({
  $expr: {
    $gt: [
      { $avg: "$orders.amount" },
      75
    ]
  }
})
```

---

## 💡 Performance Tips

### Array Query Optimization
```javascript
// ✅ Good: Index on array field for containment queries
db.users.createIndex({ hobbies: 1 })

// ✅ Good: Compound index for array + other fields
db.users.createIndex({ hobbies: 1, age: 1 })

// ✅ Good: Sparse index for optional array fields
db.users.createIndex({ tags: 1 }, { sparse: true })

// ❌ Avoid: $size queries on large arrays (no index support)
// Instead, maintain a count field
db.users.find({ hobbyCount: 3 })  // Better than { hobbies: { $size: 3 } }
```

### Projection Best Practices
```javascript
// ✅ Good: Only request needed fields
db.users.find({}, { name: 1, email: 1, _id: 0 })

// ✅ Good: Exclude large fields when not needed
db.users.find({}, { profileImage: 0, fullBio: 0 })

// ✅ Good: Limit array size in projection
db.users.find({}, { 
  name: 1,
  recentOrders: { $slice: 5 }  // Only last 5 orders
})
```

### Pagination Performance
```javascript
// ❌ Avoid: Large skip values (slow on large collections)
db.users.find().skip(100000).limit(10)

// ✅ Better: Use cursor-based pagination
db.users.find({ _id: { $gt: lastId } }).limit(10).sort({ _id: 1 })

// ✅ Best: Combine with indexed field for sorting
db.users.find({ createdAt: { $lt: lastDate } })
         .limit(10)
         .sort({ createdAt: -1 })
```

---

## 🚀 Real-World Examples

### E-commerce Order Management
```javascript
// Sample user document with orders
{
  _id: ObjectId("..."),
  name: "John Doe",
  email: "john@example.com",
  orders: [
    { 
      id: 1, 
      items: ["Book", "Pen"], 
      amount: 25.99, 
      status: "delivered",
      date: ISODate("2024-01-15")
    },
    { 
      id: 2, 
      items: ["Laptop"], 
      amount: 999.99, 
      status: "shipped",
      date: ISODate("2024-01-20")
    }
  ],
  preferences: ["electronics", "books"]
}

// Add new order
db.users.updateOne(
  { email: "john@example.com" },
  { 
    $push: { 
      orders: { 
        id: 3,
        items: ["Phone Case", "Screen Protector"],
        amount: 29.99,
        status: "pending",
        date: new Date()
      } 
    } 
  }
)

// Update order status
db.users.updateOne(
  { 
    email: "john@example.com",
    "orders.id": 2
  },
  { 
    $set: { 
      "orders.$.status": "delivered",
      "orders.$.deliveredDate": new Date()
    } 
  }
)

// Remove cancelled orders
db.users.updateMany(
  {},
  { $pull: { orders: { status: "cancelled" } } }
)

// Find users with high-value pending orders
db.users.find({
  orders: {
    $elemMatch: {
      status: "pending",
      amount: { $gt: 500 }
    }
  }
})
```

### Social Media Tags and Followers
```javascript
// Sample user profile
{
  _id: ObjectId("..."),
  username: "alice_dev",
  followers: ["bob_user", "charlie_coder", "diana_dev"],
  following: ["eve_expert", "frank_fullstack"],
  posts: [
    {
      id: 1,
      content: "Learning MongoDB!",
      tags: ["mongodb", "database", "learning"],
      likes: 15,
      date: ISODate("2024-01-15")
    }
  ]
}

// Add follower (prevent duplicates)
db.users.updateOne(
  { username: "alice_dev" },
  { $addToSet: { followers: "new_follower" } }
)

// Remove follower
db.users.updateOne(
  { username: "alice_dev" },
  { $pull: { followers: "ex_follower" } }
)

// Add tags to post
db.users.updateOne(
  { 
    username: "alice_dev",
    "posts.id": 1
  },
  { 
    $addToSet: { 
      "posts.$.tags": { 
        $each: ["nosql", "javascript"] 
      } 
    } 
  }
)

// Find users interested in specific topics
db.users.find({
  "posts.tags": { $in: ["mongodb", "database"] }
})

// Find users with multiple common interests
db.users.find({
  "posts.tags": { $all: ["mongodb", "javascript", "backend"] }
})
```

### Inventory Management
```javascript
// Sample product document
{
  _id: ObjectId("..."),
  name: "Wireless Headphones",
  categories: ["electronics", "audio", "accessories"],
  variants: [
    { 
      sku: "WH-001-BLK", 
      color: "black", 
      size: "standard",
      stock: 25,
      price: 99.99
    },
    { 
      sku: "WH-001-WHT", 
      color: "white", 
      size: "standard",
      stock: 15,
      price: 99.99
    }
  ],
  reviews: [
    { rating: 5, comment: "Great sound quality!", verified: true },
    { rating: 4, comment: "Good value for money", verified: true }
  ]
}

// Update stock for specific variant
db.products.updateOne(
  { 
    name: "Wireless Headphones",
    "variants.sku": "WH-001-BLK"
  },
  { 
    $inc: { "variants.$.stock": -1 }  // Reduce stock by 1
  }
)

// Add new product variant
db.products.updateOne(
  { name: "Wireless Headphones" },
  { 
    $push: { 
      variants: {
        sku: "WH-001-RED",
        color: "red",
        size: "standard",
        stock: 20,
        price: 109.99
      }
    } 
  }
)

// Remove out-of-stock variants
db.products.updateMany(
  {},
  { $pull: { variants: { stock: 0 } } }
)

// Find products in multiple categories with good reviews
db.products.find({
  categories: { $all: ["electronics", "audio"] },
  reviews: {
    $elemMatch: {
      rating: { $gte: 4 },
      verified: true
    }
  }
})
```

---

## 📊 Quick Reference Summary

| Operation | Syntax | Purpose |
|-----------|--------|---------|
| **Array Queries** |
| Contains value | `{ array: "value" }` | Find if array contains specific value |
| Contains all | `{ array: { $all: ["a", "b"] } }` | Find if array contains all values |
| Array size | `{ array: { $size: 3 } }` | Find arrays with specific length |
| Element match | `{ array: { $elemMatch: { field: value } } }` | Match array elements with conditions |
| **Projection** |
| Include fields | `{ field1: 1, field2: 1 }` | Show only specified fields |
| Exclude fields | `{ field1: 0, field2: 0 }` | Hide specified fields |
| Array slice | `{ array: { $slice: 5 } }` | Limit array elements returned |
| **Sorting & Limiting** |
| Sort ascending | `.sort({ field: 1 })` | A-Z, 0-9, oldest first |
| Sort descending | `.sort({ field: -1 })` | Z-A, 9-0, newest first |
| Limit results | `.limit(10)` | Return max 10 documents |
| Skip results | `.skip(5)` | Skip first 5 documents |
| **Array Updates** |
| Add to array | `{ $push: { array: "value" } }` | Add element to array |
| Add multiple | `{ $push: { array: { $each: ["a", "b"] } } }` | Add multiple elements |
| Add unique | `{ $addToSet: { array: "value" } }` | Add only if doesn't exist |
| Remove value | `{ $pull: { array: "value" } }` | Remove specific value |
| Remove first/last | `{ $pop: { array: 1/-1 } }` | Remove from end/beginning |
| Update by index | `{ $set: { "array.0": "new" } }` | Update specific array element |

_______________________________________________________________________________________________________________________________________
# MongoDB Aggregation Pipeline - Complete Guide

## 📋 Table of Contents
- [What Is the Aggregation Pipeline?](#what-is-the-aggregation-pipeline)
- [Common Aggregation Stages](#common-aggregation-stages)
- [Building Pipeline Examples](#building-pipeline-examples)
- [The $group Stage Deep Dive](#the-group-stage-deep-dive)
- [The $project Stage Deep Dive](#the-project-stage-deep-dive)
- [Advanced Examples](#advanced-examples)
- [Quick Reference](#quick-reference)

---

## 🧠 What Is the Aggregation Pipeline?

MongoDB's aggregation pipeline is a powerful framework for data processing and transformation. It works by chaining multiple stages together, where each stage takes documents as input, processes them, and passes the results to the next stage.

**Think of it like:**
- Unix pipes (`|`) chaining commands
- SQL operations like `GROUP BY`, `JOIN`, `SELECT`
- Assembly line processing data step-by-step

### Basic Syntax
```javascript
db.collection.aggregate([
  { stage1 },
  { stage2 },
  { stage3 },
  // ... more stages
])
```

---

## ⚙️ Common Aggregation Stages

### 🔍 `$match` - Filter Documents
Acts like the `find()` method to filter documents before processing.

```javascript
{ $match: { status: "active", age: { $gte: 18 } } }
```

### 🧮 `$group` - Aggregate Data
Groups documents by specified fields and performs calculations.

```javascript
{
  $group: {
    _id: "$category",           // Group by category field
    total: { $sum: "$amount" }, // Sum all amounts
    count: { $sum: 1 },         // Count documents
    avgAmount: { $avg: "$amount" }
  }
}
```

**Key Points:**
- `_id` is the field you're grouping by
- Use `null` for `_id` to group all documents together
- Common operators: `$sum`, `$avg`, `$min`, `$max`, `$first`, `$last`

### 🧰 `$project` - Select and Transform Fields
Reshapes documents by including, excluding, or computing new fields.

```javascript
{
  $project: {
    name: 1,                                    // Include field
    email: 1,                                   // Include field
    _id: 0,                                     // Exclude _id
    totalCost: { $multiply: ["$price", "$qty"] }, // Computed field
    fullName: { $concat: ["$first", " ", "$last"] }
  }
}
```

### 🔃 `$sort`, `$skip`, `$limit` - Order and Paginate
```javascript
{ $sort: { total: -1 } }  // -1 for descending, 1 for ascending
{ $skip: 10 }             // Skip first 10 documents
{ $limit: 5 }             // Return only 5 documents
```

---

## 🧱 Building Pipeline Examples

### Example 1: Customer Spending Analysis
**Goal:** Find total spending by each customer, sorted by highest spenders first.

```javascript
db.orders.aggregate([
  { $match: { status: "delivered" } },        // Only completed orders
  {
    $group: {
      _id: "$customerId",                      // Group by customer
      totalSpent: { $sum: "$amount" },         // Sum order amounts
      orderCount: { $sum: 1 },                 // Count orders
      avgOrder: { $avg: "$amount" }            // Average order value
    }
  },
  { $sort: { totalSpent: -1 } },              // Sort by total (high to low)
  { $limit: 10 }                              // Top 10 customers
])
```

### Example 2: Product Pricing with Tax
**Goal:** Add calculated tax field to all products.

```javascript
db.products.aggregate([
  {
    $project: {
      name: 1,
      originalPrice: "$price",
      priceWithTax: { $multiply: ["$price", 1.15] }, // 15% tax
      category: 1
    }
  }
])
```

---

## 🧱 The $group Stage Deep Dive

The `$group` stage is the heart of aggregation, allowing you to group documents and perform calculations on grouped data.

### Syntax Structure
```javascript
{
  $group: {
    _id: <expression>,          // Grouping key
    field1: { <accumulator1>: <expression1> },
    field2: { <accumulator2>: <expression2> }
  }
}
```

### Accumulator Operators

| Operator | Description | Example |
|----------|-------------|---------|
| `$sum` | Adds values or counts documents | `{ $sum: "$amount" }` or `{ $sum: 1 }` |
| `$avg` | Calculates average | `{ $avg: "$score" }` |
| `$min` | Finds minimum value | `{ $min: "$price" }` |
| `$max` | Finds maximum value | `{ $max: "$salary" }` |
| `$first` | First document in group | `{ $first: "$name" }` |
| `$last` | Last document in group | `{ $last: "$timestamp" }` |
| `$push` | Creates array of all values | `{ $push: "$item" }` |
| `$addToSet` | Creates array of unique values | `{ $addToSet: "$tag" }` |

### Advanced Grouping Examples

#### Group by Multiple Fields
```javascript
db.sales.aggregate([
  {
    $group: {
      _id: { 
        year: { $year: "$saleDate" },
        month: { $month: "$saleDate" },
        category: "$category"
      },
      totalRevenue: { $sum: "$amount" },
      salesCount: { $sum: 1 }
    }
  }
])
```

#### Group All Documents (Global Aggregation)
```javascript
db.orders.aggregate([
  {
    $group: {
      _id: null,                           // Group all documents
      totalRevenue: { $sum: "$amount" },
      avgOrderValue: { $avg: "$amount" },
      totalOrders: { $sum: 1 }
    }
  }
])
```

---

## 🧰 The $project Stage Deep Dive

The `$project` stage allows you to reshape documents by including, excluding, or computing new fields.

### Field Selection
```javascript
{
  $project: {
    name: 1,        // Include field (same as name: true)
    email: 1,       // Include field
    password: 0,    // Exclude field (same as password: false)
    _id: 0          // Exclude _id (included by default)
  }
}
```

### Computed Fields
```javascript
{
  $project: {
    name: 1,
    // Arithmetic operations
    totalPrice: { $multiply: ["$price", "$quantity"] },
    discountedPrice: { $subtract: ["$price", "$discount"] },
    
    // String operations
    fullName: { $concat: ["$firstName", " ", "$lastName"] },
    nameLength: { $strLenCP: "$name" },
    upperName: { $toUpper: "$name" },
    
    // Date operations
    year: { $year: "$createdAt" },
    dayOfWeek: { $dayOfWeek: "$createdAt" },
    
    // Conditional logic
    status: {
      $cond: {
        if: { $gte: ["$score", 80] },
        then: "Pass",
        else: "Fail"
      }
    },
    
    // Type conversion
    scoreAsString: { $toString: "$score" },
    priceAsInt: { $toInt: "$price" }
  }
}
```

### Nested Field Access
```javascript
{
  $project: {
    name: 1,
    city: "$address.city",           // Access nested field
    firstHobby: { $arrayElemAt: ["$hobbies", 0] }, // First array element
    hobbyCount: { $size: "$hobbies" }              // Array size
  }
}
```

---

## 🚀 Advanced Examples

### E-commerce Analytics Pipeline
```javascript
db.orders.aggregate([
  // Stage 1: Filter recent orders
  { 
    $match: { 
      orderDate: { $gte: new Date("2024-01-01") },
      status: "completed"
    }
  },
  
  // Stage 2: Add computed fields
  {
    $project: {
      customerId: 1,
      orderDate: 1,
      totalAmount: { $multiply: ["$price", "$quantity"] },
      month: { $month: "$orderDate" },
      year: { $year: "$orderDate" }
    }
  },
  
  // Stage 3: Group by customer and month
  {
    $group: {
      _id: {
        customerId: "$customerId",
        year: "$year",
        month: "$month"
      },
      monthlyTotal: { $sum: "$totalAmount" },
      orderCount: { $sum: 1 },
      avgOrderValue: { $avg: "$totalAmount" }
    }
  },
  
  // Stage 4: Reshape final output
  {
    $project: {
      _id: 0,
      customerId: "$_id.customerId",
      period: { $concat: [
        { $toString: "$_id.year" }, 
        "-", 
        { $toString: "$_id.month" }
      ]},
      monthlyTotal: { $round: ["$monthlyTotal", 2] },
      orderCount: 1,
      avgOrderValue: { $round: ["$avgOrderValue", 2] },
      customerSegment: {
        $cond: {
          if: { $gte: ["$monthlyTotal", 1000] },
          then: "Premium",
          else: "Regular"
        }
      }
    }
  },
  
  // Stage 5: Sort and limit
  { $sort: { monthlyTotal: -1 } },
  { $limit: 50 }
])
```

### Product Performance Analysis
```javascript
db.products.aggregate([
  // Join with sales data (if using separate collections)
  {
    $lookup: {
      from: "sales",
      localField: "_id",
      foreignField: "productId",
      as: "sales"
    }
  },
  
  // Unwind sales array
  { $unwind: "$sales" },
  
  // Group by product
  {
    $group: {
      _id: "$_id",
      productName: { $first: "$name" },
      category: { $first: "$category" },
      totalSales: { $sum: "$sales.quantity" },
      totalRevenue: { $sum: { $multiply: ["$sales.quantity", "$sales.price"] }},
      uniqueCustomers: { $addToSet: "$sales.customerId" }
    }
  },
  
  // Add computed metrics
  {
    $project: {
      productName: 1,
      category: 1,
      totalSales: 1,
      totalRevenue: { $round: ["$totalRevenue", 2] },
      customerCount: { $size: "$uniqueCustomers" },
      avgRevenuePerCustomer: { 
        $round: [
          { $divide: ["$totalRevenue", { $size: "$uniqueCustomers" }] }, 
          2
        ]
      }
    }
  },
  
  { $sort: { totalRevenue: -1 } }
])
```

---

## 📚 Quick Reference

### Pipeline Stages Summary
| Stage | Purpose | Example Use Case |
|-------|---------|------------------|
| `$match` | Filter documents | Get active users only |
| `$group` | Aggregate by field | Sum sales by category |
| `$project` | Select/transform fields | Add calculated fields |
| `$sort` | Order documents | Sort by date descending |
| `$limit` | Restrict count | Get top 10 results |
| `$skip` | Skip documents | Pagination |
| `$lookup` | Join collections | Get user details with orders |
| `$unwind` | Flatten arrays | Process array elements individually |
| `$sample` | Random sample | Get random documents |

### Common Accumulator Operators
| Operator | Purpose | Note |
|----------|---------|------|
| `$sum` | Add values or count | Use `{ $sum: 1 }` to count |
| `$avg` | Calculate average | Ignores non-numeric values |
| `$min` / `$max` | Find extremes | Works with dates too |
| `$first` / `$last` | Get boundary values | Depends on sort order |
| `$push` | Collect into array | Preserves duplicates |
| `$addToSet` | Unique array | Removes duplicates |

### Performance Tips
1. **Use `$match` early** - Filter data before expensive operations
2. **Index supporting fields** - Especially for `$match` and `$sort`
3. **Limit data flow** - Use `$project` to exclude unnecessary fields
4. **Consider `$limit`** - Stop processing when you have enough results
5. **Optimize `$sort`** - Sort on indexed fields when possible

### Common Patterns
```javascript
// Pagination pattern
{ $skip: (page - 1) * pageSize },
{ $limit: pageSize }

// Top N pattern  
{ $sort: { field: -1 } },
{ $limit: N }

// Date grouping pattern
{
  $group: {
    _id: {
      year: { $year: "$date" },
      month: { $month: "$date" }
    },
    // ... aggregations
  }
}
```