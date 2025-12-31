"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useTheme } from "@/lib/ThemeContext";
import { getTodayKey } from "@/utils/date";

type HeaderProps = {
  version?: string;
};

export default function Header({ version = "0.0" }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { theme, mounted, toggleTheme } = useTheme();
  const todayKey = getTodayKey();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setAboutDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-gold bg-parchment">
      <div className="px-4 py-2.5">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex items-baseline gap-1.5" title="This website is a work in progress">
              <Link href="/" className="text-lg sm:text-xl font-bold text-burgundy hover:text-gold transition-colors leading-none">
                OCHRID
              </Link>
              <span 
                className="px-1.5 py-0.5 text-[10px] font-semibold tracking-wider text-burgundy border border-burgundy/30 rounded leading-none"
                style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}
              >
                BETA · v{version}
              </span>
            </div>
            <span className="hidden sm:inline text-burgundy/30 text-sm leading-none">•</span>
            <p className="hidden sm:block m-0 text-xs text-burgundy/80 leading-none">
              A Daily Orthodox Companion
            </p>
          </div>

          <nav className="hidden md:flex items-center gap-4 text-xs">
            <button
              onClick={toggleTheme}
              className="text-burgundy hover:text-gold transition-all duration-200 p-1 hover:rotate-12 w-6 h-6 flex items-center justify-center"
              aria-label="Toggle theme"
            >
              {mounted && (theme === "dark" ? (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              ))}
            </button>
            <Link 
              href={`/readings/${todayKey}`}
              className="text-burgundy hover:text-gold transition-colors uppercase tracking-wider py-0"
            >
              Daily Reading
            </Link>
            <Link 
              href="/prayers" 
              className="text-burgundy hover:text-gold transition-colors uppercase tracking-wider py-0"
            >
              Prayers
            </Link>
            <Link 
              href="/donate" 
              className="text-burgundy hover:text-gold transition-colors uppercase tracking-wider py-0"
            >
              Support
            </Link>
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setAboutDropdownOpen(!aboutDropdownOpen)}
                className="text-burgundy hover:text-gold transition-colors uppercase tracking-wider py-0 flex items-center gap-1"
              >
                About
                <svg className={`w-3 h-3 transition-transform ${aboutDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {aboutDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-parchment border border-gold rounded shadow-lg py-1 animate-slide-down">
                  <Link
                    href="/about"
                    onClick={() => setAboutDropdownOpen(false)}
                    className="block px-4 py-2 text-burgundy hover:text-gold hover:bg-burgundy/5 transition-colors uppercase tracking-wider text-xs"
                  >
                    About This Website
                  </Link>
                  <Link
                    href="/censorship"
                    onClick={() => setAboutDropdownOpen(false)}
                    className="block px-4 py-2 text-burgundy hover:text-gold hover:bg-burgundy/5 transition-colors uppercase tracking-wider text-xs"
                  >
                    Censorship
                  </Link>
                </div>
              )}
            </div>
          </nav>

          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="text-burgundy hover:text-gold transition-all duration-200 p-1 hover:rotate-12 w-7 h-7 flex items-center justify-center"
              aria-label="Toggle theme"
            >
              {mounted && (theme === "dark" ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              ))}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-burgundy p-1"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t border-burgundy/20 mt-2 pt-2 animate-fade-in">
            <nav className="flex flex-col text-sm">
              <Link 
                href={`/readings/${todayKey}`}
                onClick={() => setMobileMenuOpen(false)}
                className="text-burgundy hover:text-gold transition-colors uppercase tracking-wider py-2"
              >
                Daily Reading
              </Link>
              <Link 
                href="/prayers" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-burgundy hover:text-gold transition-colors uppercase tracking-wider py-2"
              >
                Prayers
              </Link>
              <Link 
                href="/donate" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-burgundy hover:text-gold transition-colors uppercase tracking-wider py-2"
              >
                Support
              </Link>
              <div>
                <button
                  onClick={() => setMobileAboutOpen(!mobileAboutOpen)}
                  className="w-full flex items-center justify-between text-burgundy hover:text-gold transition-colors uppercase tracking-wider py-2"
                >
                  <span>About</span>
                  <svg 
                    className={`w-4 h-4 transition-transform ${mobileAboutOpen ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {mobileAboutOpen && (
                  <div className="flex flex-col pl-4 border-l border-burgundy/20 ml-1 animate-slide-down">
                    <Link 
                      href="/about" 
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-burgundy hover:text-gold transition-colors uppercase tracking-wider py-2 text-xs"
                    >
                      About This Website
                    </Link>
                    <Link 
                      href="/censorship" 
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-burgundy hover:text-gold transition-colors uppercase tracking-wider py-2 text-xs"
                    >
                      Censorship
                    </Link>
                  </div>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

