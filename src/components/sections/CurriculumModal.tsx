import React from 'react';
import { X, BookOpen, Clock, MapPin, ArrowRight } from 'lucide-react';
import { Programme } from '../../types/programme';

interface CurriculumModalProps {
  programme: Programme | null;
  onClose: () => void;
  onEnquire: (programmeTitle: string) => void;
}

export const CurriculumModal: React.FC<CurriculumModalProps> = ({ programme, onClose, onEnquire }) => {
  if (!programme) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="curriculum-modal-title"
    >
      <div className="relative w-full max-w-2xl bg-[#0b132b] border border-[#c5a059]/30 rounded-2xl shadow-2xl p-6 sm:p-8 my-8 text-slate-100 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800/60 transition-colors cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
          aria-label="Close Curriculum Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-6 pr-10">
          <div className="text-xs font-serif uppercase tracking-widest text-[#c5a059] mb-1">
            {programme.targetExam}
          </div>
          <h2
            id="curriculum-modal-title"
            className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight"
          >
            {programme.title}
          </h2>
          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 mt-2 font-sans">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-[#c5a059]" />
              <span>{programme.duration}</span>
            </span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-[#c5a059]" />
              <span>{programme.mode}</span>
            </span>
          </div>
        </div>

        {/* Overview */}
        <div className="p-4 bg-[#070b16] rounded-xl border border-slate-800 mb-6">
          <h4 className="text-xs uppercase tracking-wider text-slate-400 font-medium mb-1">Programme Scope</h4>
          <p className="text-sm text-slate-200 leading-relaxed">{programme.overview}</p>
        </div>

        {/* Structured Syllabus Modules */}
        <div className="space-y-4 mb-6">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-[#e5c378] flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-[#c5a059]" />
            <span>Structured Syllabus Phases</span>
          </h3>

          <div className="space-y-3">
            {programme.curriculumModules.map((module, idx) => (
              <div
                key={module.title}
                className="p-4 bg-[#0e172e] rounded-xl border border-slate-800/80 hover:border-[#c5a059]/20 transition-colors"
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-xs font-mono font-bold text-[#c5a059]">0{idx + 1}.</span>
                  <h4 className="text-sm font-semibold text-white">{module.title}</h4>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pl-6">{module.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Key Highlights */}
        <div className="mb-6 p-4 bg-[#0a1128] rounded-xl border border-[#c5a059]/20">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-[#e5c378] mb-2">Key Pedagogy Pillars</h4>
          <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
            {programme.keyHighlights.map((hl) => (
              <li key={hl} className="flex items-start gap-2">
                <span className="text-[#c5a059] font-bold">›</span>
                <span>{hl}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-slate-800">
          <button
            type="button"
            onClick={() => {
              onClose();
              onEnquire(programme.title);
            }}
            className="w-full sm:w-auto flex-1 py-3 px-6 text-xs font-semibold uppercase tracking-wider bg-[#c5a059] hover:bg-[#e5c378] text-[#090e1f] rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer min-h-[44px]"
          >
            <span>Enquire for this Programme</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto py-3 px-6 text-xs font-medium uppercase tracking-wider text-slate-300 hover:text-white bg-slate-800/60 rounded-lg transition-colors cursor-pointer min-h-[44px]"
          >
            Close Synopsis
          </button>
        </div>
      </div>
    </div>
  );
};
