import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import { authRouter } from "./routes/auth.routes";
import { checkoutRouter } from "./routes/checkout.routes";
import { coursesRouter } from "./routes/courses.routes";
import { meRouter } from "./routes/me.routes";
import { webhooksRouter } from "./routes/webhooks.routes";
import { errorHandler } from "./middleware/errorHandler";

export const app = express();

app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));

// Stripe needs the raw request body to verify the webhook signature, so this
// route must be mounted with express.raw() BEFORE the global express.json()
// parser below. If express.json() runs first, the raw body is consumed and
// signature verification will always fail.
app.use("/api/webhooks", express.raw({ type: "application/json" }), webhooksRouter);

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/courses", coursesRouter);
app.use("/api/checkout", checkoutRouter);
app.use("/api/me", meRouter);

app.use(errorHandler);
