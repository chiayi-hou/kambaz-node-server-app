import QuizzesDao from "../Quizzes/dao.js";

export default function QuizzesRoutes(app) {
  const dao = QuizzesDao();

  const findQuizzesForCourse = async (req, res) => {
    const { courseId } = req.params;
    const currentUser = req.session?.currentUser;
    const isFaculty = currentUser?.role === "FACULTY";

    // Students can only see published quizzes, faculty can see all
    const quizzes = await dao.findQuizzesForCourse(courseId, isFaculty);
    res.json(quizzes);
  };

  const findQuizWithID = async (req, res) => {
    const { quizId } = req.params;
    const currentUser = req.session?.currentUser;
    const isFaculty = currentUser?.role === "FACULTY";

    const quiz = await dao.findQuizWithID(quizId);
    if (!quiz) {
      return res.status(404).send({ message: "Quiz not found" });
    }

    // Students cannot access unpublished quizzes
    if (!isFaculty && !quiz.published) {
      return res.status(403).send({ message: "Quiz not available" });
    }

    res.send(quiz);
  };

  const createQuizForCourse = async (req, res) => {
    const { courseId } = req.params;
    const quiz = {
      ...req.body,
      course: courseId,
    };
    const newQuiz = await dao.createQuiz(quiz);
    res.status(201).send(newQuiz);
  };

  const deleteQuiz = async (req, res) => {
    const { quizId } = req.params;
    const status = await dao.deleteQuiz(quizId);
    res.send(status);
  };

  const updateQuiz = async (req, res) => {
    const { quizId } = req.params;
    const quizUpdates = req.body;
    const updated = await dao.updateQuiz(quizId, quizUpdates);
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
