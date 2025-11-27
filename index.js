// run server: nodemon index.js
// index meaning default or the beginning
import express from "express";
import mongoose from "mongoose";

import Hello from "./Hello.js";
import Lab5 from "./Lab5/index.js";
import cors from "cors";

// import to allow multiple seesions
import "dotenv/config";
import session from "express-session";

import db from "./Kambaz/Database/index.js";
import UserRoutes from "./Kambaz/Users/routes.js";
import CourseRoutes from "./Kambaz/Courses/routes.js";
import ModulesRoutes from "./Kambaz/Modules/routes.js";
import AssignmentsRoutes from "./Kambaz/Assignments/routes.js";
import EnrollmentsRoutes from "./Kambaz/Enrollments/routes.js";
import QuizzesRoutes from "./Kambaz/Quizzes/routes.js";

const app = express(); // create server

// make sure cors is used right after creating the app
app.use(cors(
    // 設定
{
    credentials: true,  // support cookies
    origin: process.env.CLIENT_URL || "http://localhost:3000",   // use different URL in dev and in production
})
);   

// configure sessions after cors
const sessionOptions = {
  secret: process.env.SESSION_SECRET || "kambaz",
  resave: false,
  saveUninitialized: false,
};
if (process.env.SERVER_ENV !== "development") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
    domain: process.env.SERVER_URL,
  };
}
// use this to set sessions
app.use(session(sessionOptions));

// mongoDB
const CONNECTION_STRING = process.env.DATABASE_CONNECTION_STRING || "mongodb://127.0.0.1:27017/kambaz"
mongoose.connect(CONNECTION_STRING).then(() => {
    console.log('Mongo connected');
    console.log('DB name:', mongoose.connection.name);
    console.log('Host:', mongoose.connection.host);
  })
  .catch((err) => console.error(err));;

mongoose.connection.once("open", async () => {
  const db = mongoose.connection.db;
  const collections = await db.listCollections().toArray();
  console.log("Collections in Kambaz:", collections.map(c => c.name));

  const users = await db.collection("users").find({}).toArray();
  console.log("Users in Kambaz.users:", users);
});

// 要用express.json才能讓他讀懂json (才能用GET/POST...)
// occurs AFTER CORS and sessions but BEFORE all the routes
app.use(express.json()); 

Hello(app);
Lab5(app);
UserRoutes(app);
CourseRoutes(app);
ModulesRoutes(app);
AssignmentsRoutes(app);
EnrollmentsRoutes(app);
// QuizzesRoutes(app, db);

app.listen(process.env.PORT || 4000);