import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    _id: String,
    title: String,
    description: String,
    course: { type: String, ref: "CourseModel" },
    due: Date,
    available: Date, 
    point: Number,
  },
  { collection: "assignments" }
);
export default schema;