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
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const sectionIds = navItems.map((item) => item.href.slice(1));
    const HEADER_OFFSET = 80;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      setScrollProgress((scrollTop / (scrollHeight - clientHeight)) * 100);
      setScrolled(scrollTop > 10);

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
        className="fixed left-0 top-0 z-[60] h-px bg-accent"
        style={{ width: `${scrollProgress}%` }}
      />

      <header
        className={`sticky top-0 z-50 bg-paper transition-shadow duration-300 ${
          scrolled ? "shadow-[0_1px_0_var(--rule)]" : ""
        }`}
      >
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <span className="text-[13px] font-medium tracking-tight text-ink">
            Sujithkumar Menon
          </span>

          <div className="hidden items-center gap-8 md:flex">
            <nav className="flex gap-6">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className={`text-[10px] uppercase tracking-[0.18em] transition-colors ${
                    activeSection === item.href.slice(1)
                      ? "text-accent"
                      : "text-mid hover:text-ink"
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </nav>
            <Link
              href="https://calendar.app.google/7fvRq224455C7kNS8"
              target="_blank"
              className="text-[10px] uppercase tracking-[0.18em] text-accent transition-opacity hover:opacity-70"
            >
              Book a Call
            </Link>
          </div>

          <button
            className="text-mid transition-colors hover:text-ink md:hidden"
            onClick={() => setMobileMenuOpen((v) => !v)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M2 2l12 12M14 2L2 14"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M2 4h12M2 8h12M2 12h12"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            )}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="border-t border-rule bg-paper md:hidden">
            <nav className="mx-auto flex max-w-5xl flex-col gap-5 px-6 py-6">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-[11px] uppercase tracking-[0.18em] transition-colors ${
                    activeSection === item.href.slice(1)
                      ? "text-accent"
                      : "text-mid"
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
                className="text-[11px] uppercase tracking-[0.18em] text-accent"
              >
                Book a Call
              </a>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
