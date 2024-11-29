// -------------------------------------What is an ObjectId?--------------------------------------

// ObjectId is a unique identifier used in MongoDB to represent documents.
// It consists of a 12-byte value that includes a timestamp, machine ID, process ID, and a random value.
// ObjectIds are the default type for MongoDB document _id fields.
// Why Use mongoose.Schema.Types.ObjectId?
// It is used to create references (relationships) between documents in different collections.
// When you set a field to mongoose.Schema.Types.ObjectId, you can use it to:
// Reference another document in another collection.
// Ensure the field holds a valid ObjectId.

// 1User Schema:

import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
});

export const User = mongoose.model("User", userSchema);

// 2. Post Schema with ObjectId Reference:
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
  
//   3. Saving a User and Post:
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

// 4. Populating the Author Field:

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
