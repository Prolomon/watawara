import mongoose from "mongoose";
import { v4 as uuidv4 } from 'uuid';

const blogSchema = mongoose.Schema(
  {
    title: { type: String },
    body: {type: String},
    author: {type: String},
    id: {type: String, default: uuidv4}
  },
  { timestamps: true }
);

// export const blog = mongoose.models.blog || mongoose.model("blog", blogSchema);

let Blog;
if (mongoose && mongoose.models && mongoose.models.blog) {
  Blog = mongoose.models.blog;
} else if (mongoose) {
  Blog = mongoose.model("blog", blogSchema);
} else {
  console.error("Mongoose is not available to define the blog model.");
  throw new Error(
    "Mongoose instance is required to define the blog model."
  );
}

export { Blog };
