import React, { useState } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  onOpenEnquiry: (preselectedExam?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenEnquiry }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Programmes', href: '#programmes' },
    { label: 'Academic Ethos', href: '#ethos' },
    { label: 'Notices & Batches', href: '#notices' },
    { label: 'Aspirant FAQs', href: '#faqs' },
    { label: 'Jammu Center', href: '#contact' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#090e1f]/95 border-b border-[#c5a059]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-20">
          {/* Zone 1: Single text wordmark */}
          <a
            href="/"
            className="flex items-center gap-2 group whitespace-nowrap shrink-0 text-decoration-none"
            aria-label="SR College of Competitions Homepage"
          >
            <div className="flex flex-col">
              <span className="font-display font-bold text-lg sm:text-xl tracking-wider text-slate-100 group-hover:text-[#e5c378] transition-colors">
                SR COLLEGE OF COMPETITIONS
              </span>
              <span className="text-[10px] tracking-widest uppercase text-[#c5a059] font-sans -mt-1 font-semibold">
                Gandhi Nagar, Jammu
              </span>
            </div>
          </a>

          {/* Zone 2: 4–5 clean single-line text navigation links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-300">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="hover:text-[#e5c378] transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-8 decoration-[#c5a059]/60"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center gap-4 shrink-0">
            <button
              type="button"
              onClick={() => onOpenEnquiry()}
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold tracking-wider uppercase text-[#090e1f] bg-[#c5a059] hover:bg-[#e5c378] active:bg-[#a7823e] rounded-md transition-colors whitespace-nowrap shrink-0 shadow-sm cursor-pointer"
            >
              <span>Admissions Enquiry</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-300 hover:text-white rounded-md border border-slate-700/60 cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-[#e5c378]" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Accessible Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0a1128] border-b border-[#c5a059]/20 px-6 py-6 shadow-2xl animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-slate-200 hover:text-[#e5c378] transition-colors py-2 border-b border-slate-800/80 min-h-[44px] flex items-center"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenEnquiry();
                }}
                className="w-full flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold tracking-wider uppercase text-[#090e1f] bg-[#c5a059] hover:bg-[#e5c378] rounded-md transition-colors shadow-md min-h-[44px] cursor-pointer"
              >
                <span>Admissions Enquiry</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
