"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

const navItems = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#education", label: "Education" },
  { href: "#contact", label: "Contact" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const sectionIds = navItems.map((item) => item.href.slice(1));
    const HEADER_OFFSET = 80;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      setScrollProgress((scrollTop / (scrollHeight - clientHeight)) * 100);

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && el.getBoundingClientRect().top <= HEADER_OFFSET) {
          setActiveSection(sectionIds[i]);
          return;
        }
      }
      setActiveSection(sectionIds[0]);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div
        className="fixed left-0 top-0 z-[60] h-0.5 bg-blue-600"
        style={{ width: `${scrollProgress}%` }}
      />

      <header className="relative sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
              SM
            </span>
            <div className="flex flex-col">
              <span className="font-display text-sm font-semibold tracking-tight">
                Sujithkumar Menon
              </span>
              <span className="text-[11px] text-slate-500">
                Analytics Product Manager · BI · GenAI
              </span>
            </div>
          </div>

          <div className="hidden items-center gap-4 md:flex">
            <nav className="flex gap-4 text-xs font-medium">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className={`rounded-full px-3 py-1 transition-colors ${
                    activeSection === item.href.slice(1)
                      ? "bg-blue-50 font-semibold text-blue-700"
                      : "text-slate-600 hover:bg-blue-50 hover:text-blue-700"
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </nav>
            <Link
              href="https://calendar.app.google/7fvRq224455C7kNS8"
              target="_blank"
              className="rounded-full bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm shadow-blue-500/40 hover:bg-blue-700"
            >
              📅 Book Intro Call
            </Link>
          </div>

          <button
            className="flex h-8 w-8 items-center justify-center rounded-full text-slate-600 hover:bg-slate-100 md:hidden"
            onClick={() => setMobileMenuOpen((v) => !v)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M2 2l12 12M14 2L2 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M2 4h12M2 8h12M2 12h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            )}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="absolute left-0 right-0 top-full border-b border-slate-100 bg-white/95 shadow-lg backdrop-blur md:hidden">
            <nav className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-3">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                    activeSection === item.href.slice(1)
                      ? "bg-blue-50 font-semibold text-blue-700"
                      : "text-slate-700 hover:bg-blue-50 hover:text-blue-700"
                  }`}
                >
                  {item.label}
                </a>
              ))}
              <a
                href="https://calendar.app.google/7fvRq224455C7kNS8"
                target="_blank"
                rel="noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-2 rounded-full bg-blue-600 px-3 py-2.5 text-center text-sm font-semibold text-white hover:bg-blue-700"
              >
                📅 Book Intro Call
              </a>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
