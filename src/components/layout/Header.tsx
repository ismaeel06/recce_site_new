"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

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

  return (
    <header className="w-full py-4 relative z-50">
      <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-orange-500 rounded-2xl px-3 py-2 shadow-lg relative z-50">
          <div className="flex items-center justify-between gap-4">
            {/* Left: R logo placeholder */}
            <Link href="/" className="flex items-center shrink-0">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
                <span className="text-orange-600 font-bold text-lg">R</span>
              </div>
            </Link>

            {/* Center: nav - hidden on mobile, centered on desktop */}
            <nav className="hidden md:flex flex-1 justify-center">
              <ul className="flex gap-6 items-center text-white text-sm">
                {NAV_LINKS.map((link) => {
                  const isActive = pathname.startsWith(link.href);
                  // Calculate width based on text length
                  const textLength = link.name.length;
                  const widthClass = textLength <= 4 ? 'w-8' : textLength <= 6 ? 'w-12' : textLength <= 10 ? 'w-20' : 'w-24';
                  
                  return (
                    <li key={link.href} className="relative flex items-center">
                      <Link href={link.href} className="z-10 px-2 py-3">
                        <span className="leading-none">{link.name}</span>
                      </Link>
                      {/* Active underline: positioned at bottom edge */}
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
            <div className="flex items-center gap-3 flex-shrink-0">
              <button className="hidden md:flex items-center justify-center bg-white text-gray-800 font-medium px-8 py-2 rounded-2xl border border-white/30 shadow-sm">
                Download Now
              </button>
              
              {/* Mobile Download button - smaller */}
              <button className="md:hidden flex items-center justify-center bg-white text-gray-800 font-medium px-4 py-2 rounded-xl text-sm">
                Download Now
              </button>
              
              {/* Hamburger menu - mobile only */}
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden flex items-center justify-center bg-black hover:bg-gray-600 text-white w-10 h-10 rounded-lg"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          {isMenuOpen && (
            <nav className="md:hidden mt-2 pb-4 px-2">
              <ul className="flex flex-col gap-1">
                {NAV_LINKS.map((link) => {
                  const isActive = pathname.startsWith(link.href);
                  return (
                    <li key={link.href}>
                      <Link 
                        href={link.href}
                        onClick={() => setIsMenuOpen(false)}
                        className={`block px-4 py-2 rounded-lg text-white transition-colors text-sm ${
                          isActive ? 'bg-orange-600 font-semibold' : 'hover:bg-orange-400'
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