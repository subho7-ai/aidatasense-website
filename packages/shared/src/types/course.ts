export interface Course {
  id: string;
  title: string;
  description: string;
  priceCents: number;
  currency: string;
  isPublished: boolean;
}

export type EnrollmentStatus = "PENDING" | "COMPLETED" | "FAILED";

export interface Enrollment {
  id: string;
  courseId: string;
  course: Course;
  status: EnrollmentStatus;
  purchasedAt: string | null;
}
