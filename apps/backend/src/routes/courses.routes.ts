import { Router } from "express";
import { getCourse, listCourses } from "../controllers/courses.controller";

export const coursesRouter = Router();

coursesRouter.get("/", listCourses);
coursesRouter.get("/:id", getCourse);
