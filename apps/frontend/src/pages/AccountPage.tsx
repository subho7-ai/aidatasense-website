import type { Enrollment } from "@aidatasense/shared";
import { useEffect, useState } from "react";
import { listMyEnrollments } from "../api/courses";
import { useAuth } from "../context/AuthContext";

const statusLabel: Record<Enrollment["status"], string> = {
  PENDING: "Payment pending",
  COMPLETED: "Enrolled",
  FAILED: "Payment failed",
};

export function AccountPage() {
  const { user } = useAuth();
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    listMyEnrollments()
      .then(({ enrollments }) => setEnrollments(enrollments))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="text-2xl font-bold text-slate-900">My Account</h1>
      <p className="mt-1 text-slate-600">
        {user?.name} · {user?.email}
      </p>

      <h2 className="mt-10 text-lg font-semibold text-slate-900">My Courses</h2>
      {isLoading ? (
        <p className="mt-4 text-slate-500">Loading…</p>
      ) : enrollments.length === 0 ? (
        <p className="mt-4 text-slate-500">You haven't purchased any courses yet.</p>
      ) : (
        <ul className="mt-4 divide-y divide-slate-200 rounded-lg border border-slate-200">
          {enrollments.map((enrollment) => (
            <li key={enrollment.id} className="flex items-center justify-between px-4 py-3">
              <span className="text-slate-900">{enrollment.course.title}</span>
              <span className="text-sm text-slate-500">{statusLabel[enrollment.status]}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
