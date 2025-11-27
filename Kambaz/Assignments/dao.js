import { v4 as uuidv4 } from "uuid";
import model from "./model.js";

export default function AssignmentsDao() {

 async function findAssignmentsForCourse(courseId) {
   const assignments = await model.find({course: courseId});
   return assignments;
   // const { assignments } = db;
   // return assignments.filter((assignments) => assignments.course === courseId);
 }

 async function findAssignmentWithID(aid) {
   const assignment = await model.findOne({_id: aid});
   return assignment;
   // const { assignments } = db;
   // const assignment = assignments.find((assignment) => assignment._id === aid);
   // return assignment;
 }

 function createAssignment(assignment) {
  const newAssignment = { ...assignment, _id: uuidv4() };
  return model.create(newAssignment);
 }

 function deleteAssignment(aid) {
   return model.deleteOne({ _id: aid });
 }

 async function updateAssignment(aid, assignmentUpdates) {
    const result = await model.updateOne({_id: aid}, {$set: assignmentUpdates});
    return result;
    //const { assignments } = db;
    //const assignment = assignments.find((assignment) => assignment._id === aid);
    //Object.assign(assignment, assignmentUpdates);
    //return assignment;
 }

 return {
   findAssignmentsForCourse, findAssignmentWithID, createAssignment, deleteAssignment, updateAssignment
 };
}
