import type { Course } from "@aidatasense/shared";
import { useEffect, useState } from "react";
import { listCourses } from "../api/courses";
import { CourseCard } from "../components/CourseCard";
import { NetworkPatternBackground } from "../components/NetworkPatternBackground";

export function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    listCourses()
      .then(({ courses }) => setCourses(courses))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="relative isolate mx-auto max-w-6xl overflow-hidden px-4 py-16 sm:px-6 lg:px-8">
      <NetworkPatternBackground />
      <h1 className="text-3xl font-bold text-slate-900">Courses</h1>
      <p className="mt-2 text-slate-600">Build real skill in the modern data & AI stack.</p>

      {isLoading ? (
        <p className="mt-8 text-slate-500">Loading…</p>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      )}
    </div>
  );
}
