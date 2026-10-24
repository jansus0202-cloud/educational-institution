import React, { useState } from 'react';
import { Calendar, Bell, ChevronRight, FileText, Check } from 'lucide-react';
import { NOTICES_DATA } from '../../data/noticesData';
import { Notice } from '../../types/programme';

interface NoticesSectionProps {
  onOpenEnquiry: (topic?: string) => void;
}

export const NoticesSection: React.FC<NoticesSectionProps> = ({ onOpenEnquiry }) => {
  const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null);
  const [downloadedDoc, setDownloadedDoc] = useState<string | null>(null);

  const handleDownloadSynopsis = (title: string) => {
    setDownloadedDoc(title);
    setTimeout(() => {
      setDownloadedDoc(null);
    }, 4000);
  };

  return (
    <section id="notices" className="w-full py-20 bg-[#080d1d] border-t border-[#c5a059]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#c5a059] font-sans font-medium mb-2">
              <span>Campus Bulletin</span>
              <span aria-hidden="true">·</span>
              <span>Examination Alerts &amp; Batches</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
              Academic Notices &amp; Cohort Schedules
            </h2>
            <p className="text-base text-slate-300 font-sans mt-3 leading-relaxed">
              Timely updates on upcoming classroom batches, diagnostic scholarship testing, regional seminar schedules,
              and curated answer-writing compendiums.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Bell className="w-4 h-4 text-[#c5a059]" />
            <span>Updated regularly for Gandhi Nagar campus</span>
          </div>
        </div>

        {/* Notices Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {NOTICES_DATA.map((item) => (
            <div
              key={item.id}
              className="p-6 bg-[#0e172e] rounded-2xl border border-slate-800/90 hover:border-[#c5a059]/30 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-4 mb-3">
                  {/* Clean unboxed tag */}
                  <span className="text-xs font-mono font-medium text-[#c5a059]">
                    {item.category}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-slate-400">
                    <Calendar className="w-3.5 h-3.5 text-slate-500" />
                    <span>{item.date}</span>
                  </div>
                </div>

                <h3 className="font-display text-lg font-bold text-white tracking-wide mb-2">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed mb-4">
                  {item.summary}
                </p>

                {selectedNotice?.id === item.id && (
                  <div className="p-3.5 bg-[#070b16] rounded-xl border border-slate-800 text-xs text-slate-300 space-y-2 mb-4 animate-in fade-in duration-200">
                    <div className="font-semibold text-[#e5c378]">Details &amp; Instructions:</div>
                    <p className="leading-relaxed">{item.details}</p>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedNotice(selectedNotice?.id === item.id ? null : item)}
                  className="text-xs text-slate-400 hover:text-white flex items-center gap-1 transition-colors cursor-pointer py-1"
                >
                  <span>{selectedNotice?.id === item.id ? 'Hide Details' : 'Read Full Notice'}</span>
                  <ChevronRight
                    className={`w-3.5 h-3.5 transition-transform ${
                      selectedNotice?.id === item.id ? 'rotate-90 text-[#c5a059]' : ''
                    }`}
                  />
                </button>

                {item.actionLabel && (
                  <button
                    type="button"
                    onClick={() => onOpenEnquiry(item.title)}
                    className="text-xs font-medium text-[#e5c378] hover:underline cursor-pointer"
                  >
                    {item.actionLabel} →
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Study Resource Download Strip */}
        <div className="mt-10 p-6 bg-[#0a1128] rounded-2xl border border-[#c5a059]/25 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#c5a059]">
              <FileText className="w-4 h-4" />
              <span>Civil Services Syllabus &amp; Booklist Guide</span>
            </div>
            <h4 className="font-display text-lg sm:text-xl font-bold text-white">
              Download the 2026–2027 UPSC &amp; JKAS Integrated Syllabus Compendium
            </h4>
            <p className="text-xs text-slate-400 max-w-2xl leading-relaxed">
              Includes comprehensive paper-wise micro-topics, standard reference recommendations, and past 5 years question trends.
            </p>
          </div>

          <div className="shrink-0">
            <button
              type="button"
              onClick={() => handleDownloadSynopsis('2026_UPSC_JKAS_Integrated_Syllabus_Compendium.pdf')}
              className="px-5 py-3 text-xs font-semibold uppercase tracking-wider bg-[#c5a059] hover:bg-[#e5c378] text-[#090e1f] rounded-lg transition-colors flex items-center gap-2 cursor-pointer shadow-md min-h-[44px]"
            >
              {downloadedDoc ? (
                <>
                  <Check className="w-4 h-4 text-[#090e1f]" />
                  <span>Syllabus Guide Prepared</span>
                </>
              ) : (
                <>
                  <FileText className="w-4 h-4" />
                  <span>Download Free PDF Guide</span>
                </>
              )}
            </button>
            {downloadedDoc && (
              <p className="text-[11px] text-emerald-400 mt-1 text-center animate-in fade-in">
                Demonstration download generated.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
