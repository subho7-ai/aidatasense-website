import { Router } from "express";
import { handleStripeWebhook } from "../controllers/webhooks.controller";

export const webhooksRouter = Router();

webhooksRouter.post("/stripe", handleStripeWebhook);
