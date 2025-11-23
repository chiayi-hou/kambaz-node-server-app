// QuizAttempts/routes.js
import QuizAttemptsDao from "../QuizAttempts/dao.js";

export default function QuizAttemptsRoutes(app, db) {
  const dao = QuizAttemptsDao(db);

  // 取得目前登入學生在某 quiz 的最新作答
  app.get("/api/quizzes/:quizId/attempts/me", (req, res) => {
    const { quizId } = req.params;
    // 這裡要換成你自己 auth 的方式取得 userId
    const currentUserId = req.session?.currentUser?._id; // 只是範例
    if (!currentUserId) {
      return res.status(401).send({ message: "Not logged in" });
    }
    const latest = dao.findLatestAttemptForQuizAndUser(quizId, currentUserId);
    res.send(latest);
  });

  // 學生提交作答
  app.post("/api/quizzes/:quizId/attempts", (req, res) => {
    const { quizId } = req.params;
    const currentUserId = req.session?.currentUser?._id; // 換成你的 auth
    if (!currentUserId) {
      return res.status(401).send({ message: "Not logged in" });
    }

    const { answers, score, attemptNumber } = req.body; // 先從前端傳過來，之後也可以在後端算分

    const attempt = dao.createAttempt({
      quizId,
      userId: currentUserId,
      course: req.body.course,
      answers,
      score,
      attemptNumber,
      startedAt: req.body.startedAt,
      submittedAt: new Date().toISOString(),
    });

    res.status(201).send(attempt);
  });
}
