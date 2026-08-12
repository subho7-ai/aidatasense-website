import type { Course, Enrollment } from "@aidatasense/shared";
import { apiFetch } from "./client";

export function listCourses(): Promise<{ courses: Course[] }> {
  return apiFetch("/courses");
}

export function listMyEnrollments(): Promise<{ enrollments: Enrollment[] }> {
  return apiFetch("/me/enrollments");
}
