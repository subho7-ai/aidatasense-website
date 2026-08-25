import { Link } from "react-router-dom";
import { PlatformSection } from "../components/PlatformSection";
import { allPlatforms } from "../content";

export function LandingPage() {
  return (
    <div className="relative isolate overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-[linear-gradient(to_bottom,#c7d2fe_0%,#eef2ff_14%,#ffffff_30%,#ffffff_100%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[url('/assets/hero-network-pattern.svg')] bg-cover bg-center opacity-[0.1]"
      />
      <section className="pb-20 pt-8">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Master the modern data & AI stack
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            Your data holds real value — but only if you know how to unlock it. Left unused, it's
            not an asset; it's a recurring cost. Storage bills stack up, maintenance never stops,
            and untapped data quietly becomes clutter instead of insight.
          </p>
          <p className="mt-4 text-lg text-slate-600">
            aidatasense helps you change that. We set up and integrate your enterprise data
            platform with AI, turning scattered, underused data into a real competitive advantage
            — the gold hiding in your pile.
          </p>
          <p className="mt-4 text-lg text-slate-600">
            Whether you're modernizing a data lake, adopting a lakehouse architecture, or tracking
            the frontier of agentic AI, we help you design a platform that actually works for your
            team, not against it.
          </p>
          <p className="mt-4 text-lg text-slate-600">
            But we don't stop at the enterprise side. aidatasense also provides remote educational
            classes for students of all ages — anyone who can run a keyboard and mouse can start
            learning. From foundational concepts to hands-on platform skills, we make modern data
            and AI education accessible to everyone, no matter where you're starting from.
          </p>
          <p className="mt-4 text-lg text-slate-600">
            Ready to see what's possible? Browse our courses and peek inside — your next skill, or
            your next breakthrough, starts here.
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
        <div className="mt-8 grid items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {allPlatforms.map((platform) => (
            <PlatformSection key={platform.slug} content={platform} />
          ))}
        </div>
      </section>
    </div>
  );
}
