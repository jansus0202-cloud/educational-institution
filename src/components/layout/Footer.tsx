import React from 'react';
import { ArrowUp, MapPin, Database } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#060a17] border-t border-[#c5a059]/15 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 mb-12">
          {/* Brand & Mission */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex flex-col">
              <span className="font-display font-bold text-lg text-white tracking-wider">
                SR COLLEGE OF COMPETITIONS
              </span>
              <span className="text-[10px] tracking-widest uppercase text-[#c5a059] font-sans font-semibold">
                Gandhi Nagar, Jammu, India
              </span>
            </div>
            <p className="text-slate-400 font-sans leading-relaxed max-w-sm">
              Civil services and state administrative examination mentorship dedicated to fostering intellectual clarity,
              constitutional governance values, and analytical answer-writing competence.
            </p>
            <div className="flex items-center gap-2 text-slate-400 text-xs">
              <MapPin className="w-4 h-4 text-[#c5a059]" />
              <span>Gandhi Nagar, Jammu, Jammu &amp; Kashmir 180004</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-display text-sm font-bold text-white uppercase tracking-wider">
              Examination Pathways
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#programmes" className="hover:text-[#e5c378] transition-colors">
                  UPSC Civil Services Integrated (IAS/IPS)
                </a>
              </li>
              <li>
                <a href="#programmes" className="hover:text-[#e5c378] transition-colors">
                  JKAS Combined Competitive Cohort
                </a>
              </li>
              <li>
                <a href="#programmes" className="hover:text-[#e5c378] transition-colors">
                  Undergraduate 2-Year Foundation
                </a>
              </li>
              <li>
                <a href="#programmes" className="hover:text-[#e5c378] transition-colors">
                  JKSSB Graduate Level &amp; Allied Services
                </a>
              </li>
              <li>
                <a href="#programmes" className="hover:text-[#e5c378] transition-colors">
                  Mains Answer-Writing &amp; Test Series
                </a>
              </li>
            </ul>
          </div>

          {/* Institutional Resources */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="font-display text-sm font-bold text-white uppercase tracking-wider">
              Academic Resources &amp; Center
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#ethos" className="hover:text-[#e5c378] transition-colors">
                  Academic Culture &amp; Pedagogy
                </a>
              </li>
              <li>
                <a href="#notices" className="hover:text-[#e5c378] transition-colors">
                  Notices &amp; Upcoming Cohorts
                </a>
              </li>
              <li>
                <a href="#faqs" className="hover:text-[#e5c378] transition-colors">
                  Frequently Asked Questions
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-[#e5c378] transition-colors">
                  Counseling Desk &amp; Library Hours
                </a>
              </li>
              <li>
                <a href="#admissions" className="hover:text-[#e5c378] transition-colors">
                  Admissions Enquiry Submission
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Institutional Honesty & Concept Notice (Per Section 10) */}
        <div className="p-4 rounded-xl bg-[#080d1e] border border-slate-800 text-[11px] text-slate-400 space-y-2 mb-8">
          <div className="flex items-center gap-2 text-[#e5c378] font-semibold uppercase tracking-wider">
            <Database className="w-3.5 h-3.5 text-[#c5a059]" />
            <span>Independent Concept &amp; Academic Prototype Notice</span>
          </div>
          <p className="leading-relaxed">
            This digital platform represents an independent design and technological concept for{' '}
            <strong className="text-slate-300">SR College of Competitions, Gandhi Nagar, Jammu, India</strong>. In accordance with
            strict institutional integrity guidelines, no unverified selection counts, fabricated testimonials, or unconfirmed
            fee amounts are published. Contact numbers and fee breakdowns are labeled as editable placeholders subject to direct
            in-person confirmation at the Jammu campus.
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-400 text-xs">
            © {new Date().getFullYear()} SR College of Competitions, Gandhi Nagar, Jammu. All rights reserved.
          </p>

          <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs text-slate-400 hover:text-white bg-[#0e172e] hover:bg-[#132247] border border-slate-800 transition-colors cursor-pointer min-h-[36px]"
            aria-label="Scroll back to top of page"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5 text-[#c5a059]" />
          </button>
        </div>
      </div>
    </footer>
  );
};
