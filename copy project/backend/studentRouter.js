import express from "express";


import { addStudent,getAllStudent,deleteStudent,updateStudent } from "./studentController.js";

export const studentRouter = express.Router();

studentRouter.route("/add").post(addStudent);

studentRouter.route("/student/delete/:id").delete(deleteStudent);

studentRouter.route("/student").get(getAllStudent);
studentRouter.route("/student/update/:id").put( updateStudent);


