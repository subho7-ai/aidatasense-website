import type { Request, Response } from "express";
import { prisma } from "../services/prisma";

export async function listMyEnrollments(req: Request, res: Response) {
  const enrollments = await prisma.enrollment.findMany({
    where: { userId: req.user!.id },
    include: { course: true },
    orderBy: { createdAt: "desc" },
  });
  return res.json({ enrollments });
}
