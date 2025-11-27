import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    _id: String,
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: String,
    email: String,
    lastName: String,
    dob: Date,
    role: {
      type: String,
      enum: ["STUDENT", "FACULTY", "ADMIN", "USER"], // should be one of the four
      default: "USER",
    },
    loginId: String,
    section: String,
    lastActivity: Date,
    totalActivity: String,
  },
  { collection: "users" }
);
export default userSchema;