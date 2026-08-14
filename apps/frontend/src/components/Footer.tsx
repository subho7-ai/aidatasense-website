import { Link } from "react-router-dom";

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
  return (
    <footer className="border-t border-slate-200">
      <div className="bg-white py-6 text-center text-sm text-slate-700 sm:text-base">
        Call us today at{" "}
        <a href="tel:+12027873835" className="font-semibold text-indigo-600 hover:text-indigo-500">
          +1 202 787 3835
        </a>{" "}
        or Email us at{" "}
        <a href="mailto:info@aidatasense.com" className="font-semibold text-indigo-600 hover:text-indigo-500">
          info@aidatasense.com
        </a>
      </div>

      <div className="bg-slate-900 text-slate-300">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-white">Contact Us</h3>
            <p className="mt-4 text-sm">aidatasense</p>
            <a href="tel:+12027873835" className="mt-2 block text-sm hover:text-white">
              +1 202 787 3835
            </a>
            <a href="mailto:info@aidatasense.com" className="mt-1 block text-sm hover:text-white">
              info@aidatasense.com
            </a>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-white">Locations</h3>
            <p className="mt-4 text-sm">300 Colonial Center Parkway STE 100N Roswell, GA 30076</p>
            <p className="mt-4 text-sm">101, Gillespie Dr., Unit 14301, Franklin Tennessee 37067</p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-white">Support</h3>
            <ul className="mt-4 space-y-2 text-sm">
              {supportLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-white">Social Connect</h3>
            <div className="mt-4 flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-700 text-white hover:bg-indigo-600"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                    <path d={social.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 py-6 text-center text-xs text-slate-400">
          Copyright &copy; {new Date().getFullYear()} All Rights Reserved by aidatasense.
        </div>
      </div>
    </footer>
  );
}
