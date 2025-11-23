import { v4 as uuidv4 } from "uuid";

export default function QuizzesDao(db) {
  function findQuizzesForCourse(courseId) {
    const { quizzes } = db;
    return quizzes.filter((quiz) => quiz.course === courseId);
  }

  function findQuizWithID(qid) {
    const { quizzes } = db;
    const quiz = quizzes.find((quiz) => quiz._id === qid);
    return quiz;
  }

  function createQuiz(quiz) {
    const newQuiz = { ...quiz, _id: uuidv4() };
    db.quizzes = [...db.quizzes, newQuiz];
    return newQuiz;
  }

  function deleteQuiz(qid) {
    const { quizzes } = db;
    const originalLength = quizzes.length;
    db.quizzes = quizzes.filter((quiz) => quiz._id !== qid);
    return { deleted: originalLength !== db.quizzes.length };
  }

  function updateQuiz(qid, quizUpdates) {
    const { quizzes } = db;
    const quiz = quizzes.find((quiz) => quiz._id === qid);
    if (!quiz) return null;
    Object.assign(quiz, quizUpdates);
    return quiz;
  }

  return {
    findQuizzesForCourse,
    findQuizWithID,
    createQuiz,
    deleteQuiz,
    updateQuiz,
  };
}
