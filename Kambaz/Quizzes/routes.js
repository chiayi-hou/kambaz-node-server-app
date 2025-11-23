import QuizzesDao from "../Quizzes/dao.js";

export default function QuizzesRoutes(app, db) {
  const dao = QuizzesDao(db);

  const findQuizzesForCourse = (req, res) => {
    const { courseId } = req.params;
    const quizzes = dao.findQuizzesForCourse(courseId);
    res.json(quizzes);
  };

  const findQuizWithID = (req, res) => {
    const { quizId } = req.params;
    const quiz = dao.findQuizWithID(quizId);
    if (!quiz) {
      return res.status(404).send({ message: "Quiz not found" });
    }
    res.send(quiz);
  };

  const createQuizForCourse = (req, res) => {
    const { courseId } = req.params;
    const quiz = {
      ...req.body,
      course: courseId,
    };
    const newQuiz = dao.createQuiz(quiz);
    res.status(201).send(newQuiz);
  };

  const deleteQuiz = (req, res) => {
    const { quizId } = req.params;
    const status = dao.deleteQuiz(quizId);
    res.send(status);
  };

  const updateQuiz = (req, res) => {
    const { quizId } = req.params;
    const quizUpdates = req.body;
    const updated = dao.updateQuiz(quizId, quizUpdates);
    if (!updated) {
      return res.status(404).send({ message: "Quiz not found" });
    }
    res.send(updated);
  };

  app.post("/api/courses/:courseId/quizzes", createQuizForCourse);
  app.get("/api/courses/:courseId/quizzes", findQuizzesForCourse);
  app.get("/api/quizzes/:quizId", findQuizWithID);
  app.delete("/api/quizzes/:quizId", deleteQuiz);
  app.put("/api/quizzes/:quizId", updateQuiz);
}
