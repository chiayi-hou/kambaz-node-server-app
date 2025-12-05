import mongoose from "mongoose";

const answerSchema = new mongoose.Schema({
  questionId: String,
  answer: mongoose.Schema.Types.Mixed, // Can be string, boolean, number, etc.
}, { _id: false });

const quizAttemptSchema = new mongoose.Schema({
  _id: String,
  quizId: { type: String, ref: "QuizModel" },
  course: { type: String, ref: "CourseModel" },
  userId: { type: String, ref: "UserModel" },
  attemptNumber: Number,
  startedAt: Date,
  submittedAt: Date,
  score: Number,
  answers: [answerSchema],
}, { collection: "quizAttempts" });

export default quizAttemptSchema;

