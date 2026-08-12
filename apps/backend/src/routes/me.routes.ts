import { Router } from "express";
import { listMyEnrollments } from "../controllers/me.controller";
import { authenticate } from "../middleware/authenticate";

export const meRouter = Router();

meRouter.get("/enrollments", authenticate, listMyEnrollments);
