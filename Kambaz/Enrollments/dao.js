import { v4 as uuidv4 } from "uuid";
import model from "./model.js";

export default function EnrollmentsDao() {

  function enrollUserInCourse(userId, courseId) {
    return model.create({
     user: userId,
     course: courseId,
     _id: `${userId}-${courseId}`,
   });

    // const { enrollments } = db;
    // const newEnrollment = { _id: uuidv4(), user: userId, course: courseId }
    // enrollments.push(newEnrollment);
    // return newEnrollment;

  }
 /*
  function unEnrollUser(userId, courseId){
    const { enrollments } = db;
    db.enrollments = enrollments.filter((enrollment) => !(enrollment.user===userId && enrollment.course===courseId));
  }
  */

  // use when deleting a course
  function unenrollAllUsersFromCourse(courseId) {
    return model.deleteMany({ course: courseId });
  }

  async function findUserEnrollment(userId){
    const userEnrollments = await model.find({user: userId});
    return userEnrollments;
    //const {enrollments} = db;
    //const userEnrollments = enrollments.filter((enrollment) => enrollment.user===userId);
    //return userEnrollments;
  }

  async function findCoursesForUser(userId) {
    // find.(query).populate(<要return的東東>)
    const enrollments = await model.find({ user: userId }).populate("course");
    return enrollments.map((enrollment) => enrollment.course);
  }

  async function unenrollUserFromCourse(userId, courseId){
    return model.deleteOne({user: userId, course: courseId})
  }

  async function findUsersForCourse(courseId){
    const enrollments = await model.find({course: courseId}).populate("user")
    return enrollments.map((enrollment)=>enrollment.user);
  }

  return { enrollUserInCourse, findUserEnrollment, findCoursesForUser, unenrollAllUsersFromCourse, unenrollUserFromCourse, 
    findUsersForCourse
   };
}
