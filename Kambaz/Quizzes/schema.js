import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  _id: String,
  title: String,
  points: Number,
  question: String,
  type: String, // "Multiple Choice", "True/False", "Fill in the Blank"
  choices: [String],
  answers: [mongoose.Schema.Types.Mixed], // Can be strings, booleans, etc.
}, { _id: false });

const quizSchema = new mongoose.Schema({
  _id: String,
  course: { type: String, ref: "CourseModel" },
  title: String,
  instructions: String,
  published: Boolean,
  type: String, // "Graded Quiz", "Practice Quiz", "Graded Survey", "Ungraded Survey"
  points: Number,
  assignmentGroup: String, // "Quizzes", "Exams", "Assignments", "Project"
  shuffleAnswers: Boolean,
  timeLimit: Number, // minutes
  multipleAttempts: Boolean,
  maxAttempts: Number,
  showCorrectAnswers: mongoose.Schema.Types.Mixed, // true/false or string
  accessCode: String,
  oneQuestionAtATime: Boolean,
  webcamRequired: Boolean,
  lockQuestionsAfterAnswering: Boolean,
  due: Date,
  availableFrom: Date,
  availableUntil: Date,
  questions: [questionSchema],
}, { collection: "quizzes" });

export default quizSchema;

