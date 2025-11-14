import { v4 as uuidv4 } from "uuid";

export default function EnrollmentsDao(db) {

  function enrollUserInCourse(userId, courseId) {
    const { enrollments } = db;
    const newEnrollment = { _id: uuidv4(), user: userId, course: courseId }
    enrollments.push(newEnrollment);
    return newEnrollment;

  }

  function unEnrollUser(userId, courseId){
    const { enrollments } = db;
    db.enrollments = enrollments.filter((enrollment) => !(enrollment.user===userId && enrollment.course===courseId));
  }

  function findUserEnrollment(userId){
    const {enrollments} = db;
    const userEnrollments = enrollments.filter((enrollment) => enrollment.user===userId);
    return userEnrollments;
  }

  return { enrollUserInCourse, unEnrollUser, findUserEnrollment };
}
