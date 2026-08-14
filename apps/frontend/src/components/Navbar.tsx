import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { useAuth } from "../context/AuthContext";

const navItems = [
  { to: "/", label: "Home", end: true },
  { to: "/platforms/databricks", label: "Databricks" },
  { to: "/platforms/snowflake", label: "Snowflake" },
  { to: "/platforms/azure-fabric", label: "Azure Fabric" },
  { to: "/ai-progress", label: "AI Progress" },
  { to: "/courses", label: "Courses" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
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

const PHONE_DISPLAY = "+1 202 787 3835";
const PHONE_HREF = "tel:+12027873835";
const EMAIL = "info@aidatasense.com";

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `px-3 py-2 text-sm font-medium rounded-md transition-colors ${
    isActive ? "text-indigo-600 bg-indigo-50" : "text-slate-600 hover:text-indigo-600 hover:bg-slate-50"
  }`;

const mobileNavLinkClass = ({ isActive }: { isActive: boolean }) =>
  `block rounded-md px-3 py-2.5 text-base font-medium ${
    isActive ? "text-indigo-600 bg-indigo-50" : "text-slate-700 hover:bg-slate-50"
  }`;

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

export function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  async function handleLogout() {
    await logout();
    setMobileOpen(false);
    navigate("/");
  }

  function closeMobileMenu() {
    setMobileOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      {/* Slim contact bar */}
      <div className="hidden bg-indigo-600 text-indigo-50 sm:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 text-sm sm:px-6 lg:px-8">
          <a href={PHONE_HREF} className="flex items-center gap-2 transition-colors hover:text-white">
            <PhoneIcon />
            <span>{PHONE_DISPLAY}</span>
          </a>
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                className="transition-colors hover:text-white"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                  <path d={social.path} />
                </svg>
              </a>
            ))}
            <a href={`mailto:${EMAIL}`} aria-label="Email" className="transition-colors hover:text-white">
              <EmailIcon />
            </a>
          </div>
        </div>
      </div>

      {/* Main navbar */}
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-6 sm:px-6 lg:px-8">
        <NavLink to="/" className="flex items-center" onClick={closeMobileMenu}>
          <img src={logo} alt="aidatasense" className="h-24 w-auto" />
        </NavLink>

        <div className="hidden items-center gap-6 md:flex">
          <div className="flex items-center gap-1">
            {navItems.map((item) => (
              <NavLink key={item.to} to={item.to} end={item.end} className={navLinkClass}>
                {item.label}
              </NavLink>
            ))}
          </div>
          <div className="flex items-center gap-2 border-l border-slate-200 pl-6">
            {user ? (
              <>
                <NavLink to="/account" className={navLinkClass}>
                  {user.name}
                </NavLink>
                <button
                  onClick={handleLogout}
                  className="rounded-md px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50"
                >
                  Log out
                </button>
              </>
            ) : (
              <>
                <NavLink to="/login" className={navLinkClass}>
                  Log in
                </NavLink>
                <NavLink
                  to="/signup"
                  className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-500"
                >
                  Sign up
                </NavLink>
              </>
            )}
          </div>
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen((open) => !open)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
          className="inline-flex items-center justify-center rounded-md p-2 text-slate-600 hover:bg-slate-100 md:hidden"
        >
          {mobileOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </nav>

      {/* Mobile menu panel */}
      {mobileOpen && (
        <div className="border-t border-slate-200 bg-white md:hidden">
          <div className="space-y-1 px-4 py-4">
            {navItems.map((item) => (
              <NavLink key={item.to} to={item.to} end={item.end} className={mobileNavLinkClass} onClick={closeMobileMenu}>
                {item.label}
              </NavLink>
            ))}
          </div>

          <div className="space-y-1 border-t border-slate-200 px-4 py-4">
            {user ? (
              <>
                <NavLink to="/account" className={mobileNavLinkClass} onClick={closeMobileMenu}>
                  {user.name}
                </NavLink>
                <button
                  onClick={handleLogout}
                  className="block w-full rounded-md px-3 py-2.5 text-left text-base font-medium text-slate-700 hover:bg-slate-50"
                >
                  Log out
                </button>
              </>
            ) : (
              <>
                <NavLink to="/login" className={mobileNavLinkClass} onClick={closeMobileMenu}>
                  Log in
                </NavLink>
                <NavLink
                  to="/signup"
                  className="block rounded-md bg-indigo-600 px-3 py-2.5 text-base font-medium text-white hover:bg-indigo-500"
                  onClick={closeMobileMenu}
                >
                  Sign up
                </NavLink>
              </>
            )}
          </div>

          <div className="flex items-center justify-between border-t border-slate-200 px-4 py-4">
            <a href={PHONE_HREF} className="flex items-center gap-2 text-sm text-slate-600">
              <PhoneIcon />
              <span>{PHONE_DISPLAY}</span>
            </a>
            <div className="flex items-center gap-4 text-slate-500">
              {socialLinks.map((social) => (
                <a key={social.name} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.name}>
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                    <path d={social.path} />
                  </svg>
                </a>
              ))}
              <a href={`mailto:${EMAIL}`} aria-label="Email">
                <EmailIcon />
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
