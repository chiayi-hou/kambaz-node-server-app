// QuizAttempts/dao.js
import { v4 as uuidv4 } from "uuid";
import model from "./model.js";

export default function QuizAttemptsDao() {
  async function createAttempt(attempt) {
    const newAttempt = { ...attempt, _id: uuidv4() };
    return await model.create(newAttempt);
  }

  async function findAttemptsForQuizAndUser(quizId, userId) {
    const attempts = await model.find({ quizId, userId }).sort({ attemptNumber: 1 });
    return attempts;
  }

  async function findLatestAttemptForQuizAndUser(quizId, userId) {
    const latest = await model.findOne({ quizId, userId }).sort({ attemptNumber: -1 });
    return latest;
  }

  return {
    createAttempt,
    findAttemptsForQuizAndUser,
    findLatestAttemptForQuizAndUser,
  };
}
