"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { navLinks } from "@/data/navigation";
import Container from "@/components/ui/Container";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200">
      <Container>
        <div className="flex py-4 items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="Deutsche Rentenauskunft"
              width={400}
              height={56}
              className="h-14 w-auto cursor-pointer hover:opacity-90 transition-opacity"
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm text-slate-900">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="nav-link whitespace-nowrap hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-700 hover:text-primary transition-colors"
            aria-label="Menü öffnen"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="lg:hidden border-t border-slate-200 pb-4">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 text-sm font-medium text-slate-700 nav-link hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}
      </Container>
    </header>
  );
}
