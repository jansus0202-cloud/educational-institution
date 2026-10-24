import React, { useState } from 'react';
import { Clock, MapPin, ArrowRight, BookOpen } from 'lucide-react';
import { PROGRAMMES_DATA } from '../../data/programmesData';
import { Programme, ProgrammeCategory } from '../../types/programme';

interface ProgrammeDiscoveryProps {
  onSelectProgramme: (programme: Programme) => void;
  onEnquireProgramme: (programmeTitle: string) => void;
}

export const ProgrammeDiscovery: React.FC<ProgrammeDiscoveryProps> = ({
  onSelectProgramme,
  onEnquireProgramme,
}) => {
  const [activeCategory, setActiveCategory] = useState<ProgrammeCategory>('all');

  const categories: { label: string; value: ProgrammeCategory }[] = [
    { label: 'All Cohorts', value: 'all' },
    { label: 'UPSC Civil Services', value: 'upsc' },
    { label: 'JKAS (J&K State Services)', value: 'jkas' },
    { label: 'JKSSB & Allied', value: 'jkssb' },
    { label: 'Foundation & Test Series', value: 'foundation' },
  ];

  const filteredProgrammes = PROGRAMMES_DATA.filter((item) => {
    if (activeCategory === 'all') return true;
    return item.category === activeCategory;
  });

  return (
    <section id="programmes" className="w-full py-20 bg-[#090e1f] border-t border-[#c5a059]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#c5a059] font-sans font-medium mb-2">
              <span>Curriculum &amp; Batches</span>
              <span aria-hidden="true">·</span>
              <span>Classroom Mentorship at Jammu</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
              Academic Programmes &amp; Preparation Pathways
            </h2>
            <p className="text-base text-slate-300 font-sans mt-3 leading-relaxed">
              Explore disciplined preparation cohorts engineered for the UPSC Civil Services Examination and the Jammu &amp;
              Kashmir Combined Competitive Examination (JKAS).
            </p>
          </div>

          {/* Interactive Category Filter Tabs (Compliant: Functional Button Controls) */}
          <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-[#0e172e] border border-slate-800 rounded-xl self-start md:self-auto">
            {categories.map((cat) => (
              <button
                key={cat.value}
                type="button"
                onClick={() => setActiveCategory(cat.value)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                  activeCategory === cat.value
                    ? 'bg-[#c5a059] text-[#090e1f] font-semibold shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Programme Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProgrammes.map((prog) => (
            <div
              key={prog.id}
              className="flex flex-col justify-between p-6 sm:p-7 bg-[#0d1630] rounded-2xl border border-slate-800/90 hover:border-[#c5a059]/40 transition-all duration-300 shadow-xl group"
            >
              <div>
                {/* Unboxed Metadata (Zero-Pill Rule) */}
                <div className="flex items-center gap-2 text-xs text-[#c5a059] font-medium font-sans mb-3">
                  <span>{prog.badge}</span>
                  <span aria-hidden="true">·</span>
                  <span>{prog.targetExam}</span>
                </div>

                {/* Title */}
                <h3 className="font-display text-xl font-bold text-white tracking-wide group-hover:text-[#e5c378] transition-colors mb-3">
                  {prog.title}
                </h3>

                {/* Overview */}
                <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed line-clamp-3 mb-4">
                  {prog.overview}
                </p>

                {/* Meta Strip */}
                <div className="space-y-2 py-3 border-y border-slate-800/80 text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-[#c5a059] shrink-0" />
                    <span>Duration: {prog.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-[#c5a059] shrink-0" />
                    <span>Mode: {prog.mode}</span>
                  </div>
                </div>

                {/* Batch Note */}
                <p className="text-[11px] text-slate-400 italic mt-3">
                  Schedule: {prog.batchScheduleNote}
                </p>
              </div>

              {/* Actions Footer */}
              <div className="pt-6 mt-4 border-t border-slate-800/60 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => onSelectProgramme(prog)}
                  className="flex-1 py-2.5 px-3 text-xs font-semibold text-slate-200 hover:text-white bg-[#132247] hover:bg-[#1b2f61] rounded-lg border border-slate-700/60 transition-colors flex items-center justify-center gap-1.5 cursor-pointer min-h-[40px]"
                >
                  <BookOpen className="w-3.5 h-3.5 text-[#c5a059]" />
                  <span>Syllabus Breakdown</span>
                </button>

                <button
                  type="button"
                  onClick={() => onEnquireProgramme(prog.title)}
                  className="py-2.5 px-3.5 text-xs font-semibold text-[#090e1f] bg-[#c5a059] hover:bg-[#e5c378] rounded-lg transition-colors flex items-center justify-center gap-1 cursor-pointer min-h-[40px]"
                  title="Enquire for this specific programme"
                >
                  <span>Enquire</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Verification & Transparency Footer Note */}
        <div className="mt-12 p-4 bg-[#0a1128] rounded-xl border border-slate-800 text-xs text-slate-400 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="font-semibold text-slate-200">Institutional Transparency Notice:</span> Course syllabus and modules
            are synchronized with current UPSC CSE and JKPSC Combined Competitive Examination notifications. Custom fee
            schedules and installment arrangements are provided directly through the Gandhi Nagar admissions office.
          </div>
          <button
            type="button"
            onClick={() => onEnquireProgramme('Fee & Syllabus Orientation Consultation')}
            className="text-[#e5c378] hover:underline font-medium whitespace-nowrap cursor-pointer"
          >
            Request Official Brochure →
          </button>
        </div>
      </div>
    </section>
  );
};
