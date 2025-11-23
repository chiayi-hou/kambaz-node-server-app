// QuizAttempts/dao.js
import { v4 as uuidv4 } from "uuid";

export default function QuizAttemptsDao(db) {
  function createAttempt(attempt) {
    const newAttempt = { ...attempt, _id: uuidv4() };
    db.quizAttempts = [...db.quizAttempts, newAttempt];
    return newAttempt;
  }

  function findAttemptsForQuizAndUser(quizId, userId) {
    const { quizAttempts } = db;
    return quizAttempts.filter(
      (a) => a.quizId === quizId && a.userId === userId
    );
  }

  function findLatestAttemptForQuizAndUser(quizId, userId) {
    const attempts = findAttemptsForQuizAndUser(quizId, userId);
    if (!attempts.length) return null;
    // 假設 attemptNumber 一直增加
    return attempts.reduce((latest, cur) =>
      cur.attemptNumber > latest.attemptNumber ? cur : latest
    );
  }

  return {
    createAttempt,
    findAttemptsForQuizAndUser,
    findLatestAttemptForQuizAndUser,
  };
}
