import { NetworkPatternBackground } from "../components/NetworkPatternBackground";

export function ContactPage() {
  return (
    <div className="relative isolate mx-auto max-w-3xl overflow-hidden px-4 py-16 sm:px-6">
      <NetworkPatternBackground />
      <h1 className="text-3xl font-bold text-slate-900">Contact Us</h1>
      <p className="mt-4 text-slate-600">
        [Placeholder] Have a question about our courses or platform content? Reach out at{" "}
        <a href="mailto:hello@aidatasense.com" className="font-semibold text-indigo-600 hover:text-indigo-500">
          hello@aidatasense.com
        </a>
        .
      </p>
    </div>
  );
}
