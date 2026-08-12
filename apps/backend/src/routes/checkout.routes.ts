import { Router } from "express";
import { createSession } from "../controllers/checkout.controller";
import { authenticate } from "../middleware/authenticate";

export const checkoutRouter = Router();

checkoutRouter.post("/create-session", authenticate, createSession);
