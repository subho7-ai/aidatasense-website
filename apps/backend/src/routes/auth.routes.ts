import { Router } from "express";
import { login, logout, me, refresh, signup } from "../controllers/auth.controller";
import { authenticate } from "../middleware/authenticate";

export const authRouter = Router();

authRouter.post("/signup", signup);
authRouter.post("/login", login);
authRouter.post("/refresh", refresh);
authRouter.post("/logout", logout);
authRouter.get("/me", authenticate, me);
