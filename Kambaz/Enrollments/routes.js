import EnrollmentsDao from "./dao.js";


export default function EnrollmentsRoutes(app, db) {

  const dao = EnrollmentsDao(db);

  const addEnrollment = (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      return res.sendStatus(401);
    }

    const { courseId } = req.params;
    const newEnrollment = dao.enrollUserInCourse(currentUser._id, courseId);
    res.json(newEnrollment);
  }

  const deleteEnrollment = (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      return res.sendStatus(401);
    }
    const { courseId } = req.params;
    dao.unEnrollUser(currentUser._id, courseId);
    return res.json({ status: "ok", courseId });
    
  }

  const getUserEnrollment = (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      return res.sendStatus(401);
    }
    const enrollments = dao.findUserEnrollment(currentUser._id);
    res.json(enrollments);
  }

  app.post("/api/enrollments/:courseId", addEnrollment);
  app.delete("/api/enrollments/:courseId", deleteEnrollment);
  app.get("/api/enrollments", getUserEnrollment);
}
