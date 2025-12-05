import { v4 as uuidv4 } from "uuid";
import model from "./model.js";

export default function QuizzesDao() {
  async function findQuizzesForCourse(courseId, isFaculty = false) {
    const query = { course: courseId };
    // If student, only return published quizzes
    if (!isFaculty) {
      query.published = true;
    }
    const quizzes = await model.find(query);
    return quizzes;
  }

  async function findQuizWithID(qid) {
    const quiz = await model.findOne({ _id: qid });
    return quiz;
  }

  async function createQuiz(quiz) {
    const newQuiz = { ...quiz, _id: uuidv4() };
    return await model.create(newQuiz);
  }

  async function deleteQuiz(qid) {
    const result = await model.deleteOne({ _id: qid });
    return { deleted: result.deletedCount > 0 };
  }

  async function updateQuiz(qid, quizUpdates) {
    const result = await model.updateOne({ _id: qid }, { $set: quizUpdates });
    if (result.matchedCount === 0) return null;
    return await model.findOne({ _id: qid });
  }

  return {
    findQuizzesForCourse,
    findQuizWithID,
    createQuiz,
    deleteQuiz,
    updateQuiz,
  };
}
