import type { Request, Response } from "express";
import { prisma } from "../services/prisma";

export async function listCourses(_req: Request, res: Response) {
  const courses = await prisma.course.findMany({
    where: { isPublished: true },
    orderBy: { createdAt: "asc" },
  });
  return res.json({ courses });
}

export async function getCourse(req: Request, res: Response) {
  const course = await prisma.course.findUnique({ where: { id: req.params.id } });
  if (!course || !course.isPublished) {
    return res.status(404).json({ error: "Course not found" });
  }
  return res.json({ course });
}
