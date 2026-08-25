import { NetworkPatternBackground } from "../components/NetworkPatternBackground";

export function AboutPage() {
  return (
    <div className="relative isolate mx-auto max-w-3xl overflow-hidden px-4 py-16 sm:px-6">
      <NetworkPatternBackground />
      <h1 className="text-3xl font-bold text-slate-900">About Us</h1>
      <p className="mt-4 text-slate-600">
        [Placeholder] aidatasense is an education platform built to help technically skilled
        employees and students master the modern data and AI stack. Replace this copy with your
        company's real story.
      </p>
    </div>
  );
}
