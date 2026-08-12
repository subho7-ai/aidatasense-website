import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-8 text-sm text-slate-500 sm:flex-row sm:px-6 lg:px-8">
        <p>&copy; {new Date().getFullYear()} aidatasense. All rights reserved.</p>
        <div className="flex gap-4">
          <Link to="/about" className="hover:text-indigo-600">
            About Us
          </Link>
          <Link to="/contact" className="hover:text-indigo-600">
            Contact Us
          </Link>
        </div>
      </div>
    </footer>
  );
}
