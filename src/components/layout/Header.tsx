"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";

const NAV_LINKS: { name: string; href: string }[] = [
  { name: "Why Recce?", href: "/why-recce" },
  { name: "How it Works", href: "/how-it-works" },
  { name: "Rewards", href: "/rewards" },
  { name: "Gossip", href: "/gossip" },
  { name: "Partners", href: "/partners" },
  { name: "Benefits", href: "/benefits" },
  { name: "Team", href: "/team" },
  { name: "Help", href: "/help" },
];

export default function Header() {
  const pathname = usePathname() || "/";
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Set initial state
    setIsMobile(window.innerWidth < 1024);

    function handleResize() {
      setIsMobile(window.innerWidth < 1024);
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    }

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isMenuOpen]);

  return (
    <header className="w-full py-4 relative z-50" ref={headerRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#ff7802] rounded-2xl px-4 lg:px-6 py-2 shadow-lg relative z-50">
          <div className="flex items-center justify-between gap-2 lg:gap-6">
            {/* Left: R logo placeholder */}
            <Link href="/" className="flex items-center shrink-0">
              <div className="w-10 h-10 rounded-full flex items-center justify-center shadow-sm">
                <img src="/assets/Recce_logo.svg" alt="" />
              </div>
            </Link>

            {/* Center: nav - hidden on mobile/tablet, visible on lg screens */}
            <nav className="hidden lg:flex flex-1 justify-center">
              <ul className="flex gap-1 lg:gap-3 items-center text-white text-sm lg:text-base whitespace-nowrap">
                {NAV_LINKS.map((link) => {
                  const isActive = pathname.startsWith(link.href);
                  const textLength = link.name.length;
                  const widthClass = textLength <= 4 ? 'w-8' : textLength <= 6 ? 'w-12' : textLength <= 10 ? 'w-20' : 'w-24';

                  return (
                    <li key={link.href} className="relative flex items-center">
                      <Link href={link.href} className="z-10 px-2 py-3 text-sm">
                        <span className="leading-none">{link.name}</span>
                      </Link>
                      {isActive && (
                        <span
                          aria-hidden="true"
                          className={`absolute left-1/2 -translate-x-1/2 bottom-[-8.5px] h-1.5 bg-white rounded-t-xl ${widthClass}`}
                        />
                      )}
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Right: Download button and hamburger menu */}
            <div className="flex items-center gap-2 lg:gap-3 flex-shrink-0">
              <button className="hidden lg:flex items-center justify-center bg-white text-gray-800 font-medium px-6 lg:px-8 py-2 rounded-2xl border border-white/30 shadow-sm text-sm lg:text-base">
                Download Now
              </button>

              {/* Mobile Download button */}
              <button className="lg:hidden flex items-center justify-center bg-white text-gray-800 font-medium px-3 py-2 rounded-lg text-xs">
                Download
              </button>

              {/* Hamburger menu - tablet and mobile only */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden flex items-center justify-center bg-black hover:bg-gray-600 text-white w-9 h-9 rounded-lg"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          {isMenuOpen && (
            <nav className="lg:hidden mt-2 pb-4 px-2">
              <ul className="flex flex-col gap-1">
                {NAV_LINKS.map((link) => {
                  const isActive = pathname.startsWith(link.href);
                  return (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        onClick={() => setIsMenuOpen(false)}
                        className={`block px-4 py-2 rounded-lg text-white transition-colors text-sm ${isActive ? 'bg-orange-600 font-semibold' : 'hover:bg-[#ff7802]'
                          }`}
                      >
                        {link.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
}