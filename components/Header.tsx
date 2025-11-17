"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-gold bg-parchment">
      <div className="px-4 py-2.5">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex items-baseline gap-1.5" title="This website is a work in progress">
              <Link href="/">
                <h1 className="text-lg sm:text-xl font-bold text-burgundy hover:text-gold transition-colors mb-0 leading-none">
                  OCHRID
                </h1>
              </Link>
              <span 
                className="px-1.5 py-0.5 text-[10px] font-semibold tracking-wider text-burgundy border border-burgundy/30 rounded leading-none"
                style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}
              >
                BETA · v0.2
              </span>
            </div>
            <span className="hidden sm:inline text-burgundy/30 text-sm leading-none">•</span>
            <p className="hidden sm:block m-0 text-xs text-burgundy/80 leading-none">
              A Daily Orthodox Companion
            </p>
          </div>

          <nav className="hidden md:flex items-center gap-4 text-xs">
            <Link 
              href="/" 
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
              href="/about" 
              className="text-burgundy hover:text-gold transition-colors uppercase tracking-wider py-0"
            >
              About
            </Link>
          </nav>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-burgundy p-1"
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

        {mobileMenuOpen && (
          <div className="md:hidden border-t border-burgundy/20 mt-2 pt-2">
            <nav className="flex flex-col gap-2 text-sm">
              <Link 
                href="/" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-burgundy hover:text-gold transition-colors uppercase tracking-wider py-0"
              >
                Daily Reading
              </Link>
              <Link 
                href="/prayers" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-burgundy hover:text-gold transition-colors uppercase tracking-wider py-0"
              >
                Prayers
              </Link>
              <Link 
                href="/about" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-burgundy hover:text-gold transition-colors uppercase tracking-wider py-0"
              >
                About
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

