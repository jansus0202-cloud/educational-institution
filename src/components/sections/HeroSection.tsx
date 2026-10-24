import React from 'react';
import { ArrowDown, ArrowUpRight, BookOpen, ShieldCheck, MapPin } from 'lucide-react';
import { KnowledgeArmillaryScene } from '../3d/KnowledgeArmillaryScene';

interface HeroSectionProps {
  onOpenEnquiry: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenEnquiry }) => {
  return (
    <section className="relative w-full pt-8 pb-16 lg:pt-14 lg:pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Editorial Headline & Purpose */}
          <div className="lg:col-span-6 space-y-6">
            {/* Unboxed Metadata Trust Kicker (Zero-Pill Rule) */}
            <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-widest text-[#c5a059] font-sans font-medium">
              <span>Gandhi Nagar, Jammu</span>
              <span aria-hidden="true">·</span>
              <span>UPSC CSE &amp; JKAS Specialists</span>
              <span aria-hidden="true">·</span>
              <span>Prelims to Interview</span>
            </div>

            {/* Display Headline */}
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.08] text-balance">
              Prepare With Purpose. <br />
              <span className="italic font-serif font-normal text-[#e5c378]">Lead With Knowledge.</span>
            </h1>

            {/* Supporting Copy */}
            <p className="text-base sm:text-lg text-slate-300 font-sans leading-relaxed max-w-xl">
              Civil services and state administrative examination mentorship tailored for ambitious aspirants across
              Jammu &amp; Kashmir. Grounded in constitutional governance, analytical answer-writing, and systematic syllabus mastery.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#programmes"
                className="inline-flex items-center gap-2 px-6 py-3.5 text-xs sm:text-sm font-semibold tracking-wider uppercase text-[#090e1f] bg-[#c5a059] hover:bg-[#e5c378] active:bg-[#a7823e] rounded-md transition-colors shadow-md min-h-[44px]"
              >
                <span>Explore Programmes</span>
                <ArrowDown className="w-4 h-4" />
              </a>

              <button
                type="button"
                onClick={onOpenEnquiry}
                className="inline-flex items-center gap-2 px-6 py-3.5 text-xs sm:text-sm font-semibold tracking-wider uppercase text-slate-100 bg-[#0e172e] hover:bg-[#132247] border border-[#c5a059]/30 rounded-md transition-colors min-h-[44px] cursor-pointer"
              >
                <span>Enquire About Admissions</span>
                <ArrowUpRight className="w-4 h-4 text-[#c5a059]" />
              </button>
            </div>

            {/* Institutional Anchors Grid */}
            <div className="pt-6 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-300">
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-white font-medium">
                  <MapPin className="w-3.5 h-3.5 text-[#c5a059]" />
                  <span>Gandhi Nagar Campus</span>
                </div>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  Centrally accessible physical classrooms and dedicated library in Jammu.
                </p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-white font-medium">
                  <BookOpen className="w-3.5 h-3.5 text-[#c5a059]" />
                  <span>Dual Examination Focus</span>
                </div>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  Synchronized preparation for UPSC CSE &amp; JKPSC Combined Competitive.
                </p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-white font-medium">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#c5a059]" />
                  <span>Structured Pedagogy</span>
                </div>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  Answer evaluation within 48 hours and faculty-led doubt resolution.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Knowledge Armillary Scene */}
          <div className="lg:col-span-6">
            <KnowledgeArmillaryScene />
          </div>
        </div>
      </div>
    </section>
  );
};
