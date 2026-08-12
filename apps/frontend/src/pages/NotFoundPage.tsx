import { Link } from "react-router-dom";

export function NotFoundPage() {
  return (
    <div className="mx-auto max-w-lg px-4 py-24 text-center sm:px-6">
      <h1 className="text-3xl font-bold text-slate-900">Page not found</h1>
      <p className="mt-4 text-slate-600">The page you're looking for doesn't exist.</p>
      <Link to="/" className="mt-6 inline-block font-semibold text-indigo-600 hover:text-indigo-500">
        Back to home
      </Link>
    </div>
  );
}
