import { Link } from "react-router-dom";
import { PlatformSection } from "../components/PlatformSection";
import { allPlatforms } from "../content";

export function LandingPage() {
  return (
    <div>
      <section className="bg-gradient-to-b from-indigo-200 via-indigo-50 to-white py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Master the modern data & AI stack
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            aidatasense is an education platform for technically skilled employees and students —
            explore the architectures behind Databricks, Snowflake, and Microsoft Fabric, track the
            frontier of agentic AI, and take courses that build real skill.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link
              to="/courses"
              className="rounded-md bg-indigo-600 px-6 py-3 text-sm font-semibold text-white hover:bg-indigo-500"
            >
              Browse Courses
            </Link>
            <Link
              to="/ai-progress"
              className="rounded-md border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              Explore Agentic AI
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-slate-900">Platforms & Architectures</h2>
        <p className="mt-2 text-slate-600">
          Deep dives into the architectures that power today's data and AI platforms.
        </p>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {allPlatforms.map((platform) => (
            <PlatformSection key={platform.slug} content={platform} />
          ))}
        </div>
      </section>
    </div>
  );
}
