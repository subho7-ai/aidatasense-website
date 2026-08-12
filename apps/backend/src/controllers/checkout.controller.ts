import type { Request, Response } from "express";
import { prisma } from "../services/prisma";
import { createCheckoutSession } from "../services/stripe.service";

export async function createSession(req: Request, res: Response) {
  const { courseId } = req.body;
  if (!courseId) {
    return res.status(400).json({ error: "courseId is required" });
  }

  const course = await prisma.course.findUnique({ where: { id: courseId } });
  if (!course || !course.isPublished) {
    return res.status(404).json({ error: "Course not found" });
  }

  const session = await createCheckoutSession({
    stripePriceId: course.stripePriceId,
    userId: req.user!.id,
    courseId: course.id,
  });

  await prisma.enrollment.upsert({
    where: { userId_courseId: { userId: req.user!.id, courseId: course.id } },
    update: { stripeCheckoutSessionId: session.id, status: "PENDING" },
    create: {
      userId: req.user!.id,
      courseId: course.id,
      stripeCheckoutSessionId: session.id,
      status: "PENDING",
    },
  });

  return res.json({ url: session.url });
}
