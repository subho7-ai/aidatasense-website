import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const supportLinks = [
  { label: "My Account", to: "/account" },
  { label: "Courses", to: "/courses" },
  { label: "Terms and Conditions", to: "/terms" },
  { label: "Privacy Policy", to: "/privacy" },
  { label: "Cancellation and Refund Policy", to: "/refund-policy" },
  { label: "Contact Us", to: "/contact" },
];

const socialLinks = [
  {
    name: "Facebook",
    href: "#",
    path: "M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.1 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12",
  },
  {
    name: "Twitter",
    href: "#",
    path: "M21.5 7.1c.01.15.01.3.01.46 0 4.7-3.58 10.12-10.12 10.12A10.06 10.06 0 0 1 6 16.14a7.2 7.2 0 0 0 5.3-1.48 3.57 3.57 0 0 1-3.33-2.48 3.6 3.6 0 0 0 1.6-.06A3.56 3.56 0 0 1 6.7 8.65v-.05c.48.27 1.03.43 1.6.45A3.56 3.56 0 0 1 7.2 4.4a10.1 10.1 0 0 0 7.33 3.72 3.56 3.56 0 0 1 6.06-3.25 7.13 7.13 0 0 0 2.26-.86 3.57 3.57 0 0 1-1.57 1.97 7.1 7.1 0 0 0 2.05-.56 7.3 7.3 0 0 1-1.83 1.9",
  },
  {
    name: "LinkedIn",
    href: "#",
    path: "M6.94 5a2 2 0 1 1-4-.02 2 2 0 0 1 4 .02M3.2 8.75h3.55V21H3.2zM9.4 8.75h3.4v1.68h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.26 2.37 4.26 5.45V21H16.9v-5.32c0-1.27-.02-2.9-1.77-2.9-1.77 0-2.04 1.38-2.04 2.81V21H9.4z",
  },
];

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  function handleSubscribe(event: FormEvent) {
    event.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail("");
  }

  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-950 to-black text-slate-300">
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-400" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-96 bg-[radial-gradient(ellipse_60%_100%_at_50%_0%,rgba(99,102,241,0.16),transparent)]"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Logo + tagline + newsletter */}
        <div className="flex flex-col gap-8 border-b border-white/10 py-14 lg:flex-row lg:items-center lg:justify-between lg:gap-16">
          <div className="max-w-sm">
            <img src={logo} alt="aidatasense" className="h-10 w-auto" />
            <p className="mt-4 text-sm leading-relaxed text-slate-400">
              Practical courses and deep architecture breakdowns for the platforms and AI systems
              shaping modern data teams.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="w-full max-w-md">
            <p className="mb-3 text-sm font-semibold text-white">Get updates in your inbox</p>
            {subscribed ? (
              <p className="rounded-md border border-emerald-400/20 bg-emerald-400/10 px-4 py-2.5 text-sm text-emerald-300">
                Thanks — you're on the list.
              </p>
            ) : (
              <div className="flex flex-col gap-3 sm:flex-row">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="w-full rounded-md border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-slate-500 outline-none transition-colors focus:border-indigo-400"
                />
                <button
                  type="submit"
                  className="shrink-0 rounded-md bg-gradient-to-r from-indigo-500 to-cyan-400 px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                >
                  Subscribe
                </button>
              </div>
            )}
          </form>
        </div>

        {/* Call banner */}
        <div className="border-b border-white/10 py-6 text-center text-sm text-slate-400">
          Call us today at{" "}
          <a href="tel:+12027873835" className="font-semibold text-white transition-colors hover:text-indigo-300">
            +1 202 787 3835
          </a>{" "}
          or Email us at{" "}
          <a
            href="mailto:info@aidatasense.com"
            className="font-semibold text-white transition-colors hover:text-indigo-300"
          >
            info@aidatasense.com
          </a>
        </div>

        {/* Columns */}
        <div className="grid gap-12 py-14 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-white">Contact Us</h3>
            <div className="mt-5 space-y-2.5 text-sm">
              <p className="text-slate-400">aidatasense</p>
              <a href="tel:+12027873835" className="block text-slate-400 transition-colors hover:text-white">
                +1 202 787 3835
              </a>
              <a
                href="mailto:info@aidatasense.com"
                className="block text-slate-400 transition-colors hover:text-white"
              >
                info@aidatasense.com
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-white">Locations</h3>
            <div className="mt-5 space-y-5 text-sm">
              <p className="leading-relaxed text-slate-400">
                7286 Fiddlers Glen Dr
                <br />
                Arrington, TN 37014
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-white">Support</h3>
            <ul className="mt-5 space-y-2.5 text-sm">
              {supportLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-slate-400 transition-colors hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-white">Social Connect</h3>
            <div className="mt-5 flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="group flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 transition-all duration-200 hover:scale-110 hover:border-transparent hover:bg-gradient-to-br hover:from-indigo-500 hover:to-cyan-400 hover:text-white"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                    <path d={social.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 py-6 text-center text-xs text-slate-500">
          Copyright &copy; {new Date().getFullYear()} All Rights Reserved by aidatasense.
        </div>
      </div>
    </footer>
  );
}
