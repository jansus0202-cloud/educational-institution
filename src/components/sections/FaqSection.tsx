import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { FAQ_DATA } from '../../data/noticesData';

export const FaqSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>('faq-01');

  const toggleFaq = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faqs" className="w-full py-20 bg-[#080d1d] border-t border-[#c5a059]/15">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-widest text-[#c5a059] font-sans font-medium mb-2">
            <span>Aspirant Queries</span>
            <span aria-hidden="true">·</span>
            <span>Guidance &amp; Verification</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-sm sm:text-base text-slate-300 font-sans mt-3 leading-relaxed">
            Essential information regarding preparation strategy, syllabus alignment, Jammu center facilities, and enrollment procedures.
          </p>
        </div>

        {/* FAQ Accordions List */}
        <div className="space-y-3.5">
          {FAQ_DATA.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-[#0e172e] rounded-xl border border-slate-800/90 overflow-hidden transition-colors hover:border-[#c5a059]/30"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(faq.id)}
                  aria-expanded={isOpen}
                  className="w-full p-5 sm:p-6 text-left flex items-start justify-between gap-4 cursor-pointer min-h-[44px]"
                >
                  <div className="flex items-start gap-3">
                    <HelpCircle className="w-4 h-4 text-[#c5a059] shrink-0 mt-1" />
                    <div>
                      <span className="text-[11px] font-mono text-[#c5a059] block uppercase tracking-wider mb-1">
                        {faq.category}
                      </span>
                      <span className="font-display text-base sm:text-lg font-semibold text-white tracking-wide">
                        {faq.question}
                      </span>
                    </div>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 mt-1 ${
                      isOpen ? 'rotate-180 text-[#e5c378]' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-slate-300 font-sans leading-relaxed border-t border-slate-800/60 animate-in fade-in duration-200 pl-12">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Further Consultation Card */}
        <div className="mt-12 p-6 bg-[#0a1128] rounded-xl border border-slate-800 text-center space-y-3">
          <p className="text-xs sm:text-sm text-slate-300">
            Have a specific academic background question or need individual advice on optional subjects?
          </p>
          <a
            href="#admissions"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#e5c378] hover:text-[#c5a059] transition-colors cursor-pointer"
          >
            <span>Request A Personal Faculty Consultation in Jammu →</span>
          </a>
        </div>
      </div>
    </section>
  );
};
