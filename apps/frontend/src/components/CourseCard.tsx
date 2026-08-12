import type { Course } from "@aidatasense/shared";
import { CheckoutButton } from "./CheckoutButton";

export function CourseCard({ course }: { course: Course }) {
  const price = (course.priceCents / 100).toLocaleString(undefined, {
    style: "currency",
    currency: course.currency.toUpperCase(),
  });

  return (
    <div className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-900">{course.title}</h3>
      <p className="mt-2 flex-1 text-sm text-slate-600">{course.description}</p>
      <p className="mt-4 text-xl font-bold text-slate-900">{price}</p>
      <div className="mt-4">
        <CheckoutButton courseId={course.id} />
      </div>
    </div>
  );
}
