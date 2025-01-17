// Content
// 1> Schema and ObjectID
// 2> Optimization







// -------------------------------------What is an ObjectId?--------------------------------------

// ObjectId is a unique identifier used in MongoDB to represent documents.
// It consists of a 12-byte value that includes a timestamp, machine ID, process ID, and a random value.
// ObjectIds are the default type for MongoDB document _id fields.
// Why Use mongoose.Schema.Types.ObjectId?
// It is used to create references (relationships) between documents in different collections.
// When you set a field to mongoose.Schema.Types.ObjectId, you can use it to:
// Reference another document in another collection.
// Ensure the field holds a valid ObjectId.

// 1. User Schema:-------------------------------------

import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
});

export const User = mongoose.model("User", userSchema);

// 2. Post Schema with ObjectId Reference:-------------------------------
const postSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: {
      type: mongoose.Schema.Types.ObjectId, // This will store the ObjectId of a User
      ref: "User", // References the User model
      required: true,
    },
  });
  
  export const Post = mongoose.model("Post", postSchema);
  
//   3. Saving a User and Post:----------------------------------------
import { User } from "./models/User";
import { Post } from "./models/Post";

const createPost = async () => {
  // Create a User
  const user = new User({ name: "John Doe", email: "john@example.com" });
  await user.save();

  // Create a Post linked to the User
  const post = new Post({
    title: "My First Post",
    content: "This is the content of the post.",
    author: user._id, // Storing the ObjectId of the user
  });
  await post.save();

  console.log("Post created successfully:", post);
};
createPost();

// 4. Populating the Author Field:-----------------------------------------

const getPostWithAuthor = async () => {
    const post = await Post.findOne({ title: "My First Post" }).populate("author");
    console.log("Post with Author Details:", post);
  };
  getPostWithAuthor();

  Output:
//   Without .populate():
  {
    "title": "My First Post",
    "content": "This is the content of the post.",
    "author": "649f3aabc25e8761a9b5c7e2" // ObjectId of the user
  }
//   With .populate():
  {
    "title": "My First Post",
    "content": "This is the content of the post.",
    "author": {
      "_id": "649f3aabc25e8761a9b5c7e2",
      "name": "John Doe",
      "email": "john@example.com"
    }
  }
  
  // Key Benefits of Using ObjectId:
  
  // Referencing Documents: Establish relationships between collections (like foreign keys in SQL).
  // Efficient Queries: MongoDB can efficiently handle lookups using ObjectIds.
  // Data Integrity: Ensures valid references between related collections.




  //----------------------------------------- 2> Optimization in MongoDB --------------------------------------------

//   To improve the scalability of your system with MongoDB, you can focus on several strategies, both at the database level and in your application architecture. Here’s a breakdown:

// 1. Use Sharding
// MongoDB supports horizontal scaling through sharding, which distributes data across multiple servers (shards). Each shard handles part of the workload, which increases read and write performance.

// Steps:
// Identify a shard key (a field that ensures even data distribution).
// Enable sharding in MongoDB.
// Add shards to your cluster.
// 2. Optimize Indexing
// Indexes are crucial for faster query execution. Inefficient queries can bottleneck scalability.

// Strategies:
// Use compound indexes for frequently queried fields.
// Create hashed indexes for shard keys to improve query distribution.
// Regularly monitor and remove unused indexes.


// 3. Utilize Read Replicas
// MongoDB's replica sets can improve read performance by allowing read operations on secondary nodes.

// How It Helps:
// The primary node handles writes, and secondary nodes handle reads.
// Use a read preference setting in your application to distribute read queries to replicas.


// 4. Optimize Schema Design
// A poorly designed schema can lead to inefficiencies that hinder scalability.

// Best Practices:
// Avoid deeply nested documents to reduce document size.
// Use references (normalization) or embed documents (denormalization) based on your use case.
// Limit document size to avoid crossing the 16MB BSON document limit.


// 5. Implement Connection Pooling
// Efficient connection management reduces latency and improves performance under high loads.

// Action Points:
// Use a connection pool manager (e.g., MongoDB drivers have built-in support).
// Configure the pool size based on your application’s concurrency needs.


// 6. Leverage Aggregation Pipelines
// Efficient data processing at the database level reduces the application’s workload.

// Why It Helps:
// Aggregation pipelines allow MongoDB to handle complex data processing, reducing the amount of data transferred to the application.
// 7. Monitor and Optimize Queries
// Use tools like MongoDB Atlas Performance Advisor or explain() to analyze and optimize slow queries.

// What to Look For:
// Queries without indexes.
// Queries causing frequent full collection scans.


// 8. Scale Reads and Writes Separately
// For write-heavy systems, prioritize:

// Write scaling: Use sharding to distribute data evenly.
// Read scaling: Add read replicas to offload read operations.


// 9. Use Caching
// Introduce a caching layer (e.g., Redis, Memcached) to reduce load on MongoDB for frequently accessed data.

// 10. Automate Performance Monitoring
// Use tools like:

// MongoDB Atlas (cloud monitoring).
// Prometheus and Grafana (custom setups).
// Monitoring helps identify bottlenecks and scale preemptively.

