import React from 'react';

export const InstitutionalEthos: React.FC = () => {
  const ethosPillars = [
    {
      index: '01',
      title: 'Constitutional & Governance Foundations',
      description:
        'We emphasize deep conceptual grasp over superficial memorization. Aspirants deconstruct core constitutional doctrines, administrative law, fiscal federalism, and public policy frameworks to build genuine civil-service temperament.',
    },
    {
      index: '02',
      title: 'Analytical Answer-Writing Mastery',
      description:
        'Clearing the Mains examination requires articulation under strict time limits. Our methodology trains aspirants to break down 10-marker and 15-marker prompts, structure multi-dimensional arguments, and integrate diagrams with balanced conclusions.',
    },
    {
      index: '03',
      title: 'Jammu & Kashmir Regional Specialization',
      description:
        'For JKAS aspirants, state-specific knowledge is decisive. Our curriculum offers modules on Jammu & Kashmir geography, historical treaties, administrative reorganization provisions, local agriculture, and regional socioeconomic challenges.',
    },
    {
      index: '04',
      title: 'Disciplined Evaluation & Mentorship',
      description:
        'Continuous diagnostic testing benchmarks preparation at every stage. Faculty mentors review student answer scripts with individualized margin notes, pointing out clarity gaps, factual omissions, and structural improvements.',
    },
  ];

  return (
    <section id="ethos" className="w-full py-20 bg-[#080d1d] border-t border-[#c5a059]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#c5a059] font-sans font-medium mb-2">
            <span>Academic Positioning</span>
            <span aria-hidden="true">·</span>
            <span>Educational Philosophy</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            An Academic Culture of Rigor, Reflection &amp; Public Duty
          </h2>
          <p className="text-base text-slate-300 font-sans mt-3 leading-relaxed">
            Competitive examinations demand not merely study hours, but a disciplined analytical mindset.
            At our Gandhi Nagar campus, preparation is oriented around clarity of thought, constitutional ethics, and precision in expression.
          </p>
        </div>

        {/* 2-Column Split: Editorial Imagery & Pillars */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          {/* Left Column: Visual Documentary Duo */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="relative rounded-2xl overflow-hidden border border-[#c5a059]/20 shadow-xl group">
              <img
                src="/src/assets/images/civil_services_library_1792866289049.jpg"
                alt="Scholars studying in a quiet civil services reference library"
                className="w-full h-72 sm:h-80 object-cover group-hover:scale-102 transition-transform duration-700"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#090e1f] via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-4 left-4 right-4 text-xs font-serif italic text-slate-200">
                Quiet study environment &amp; reading room facilities at Gandhi Nagar, Jammu
              </div>
            </div>

            <div className="relative rounded-2xl overflow-hidden border border-[#c5a059]/20 shadow-xl group">
              <img
                src="/src/assets/images/governance_texts_1792866289022.jpg"
                alt="Constitution of India and public administration analytical compendium on study desk"
                className="w-full h-64 sm:h-72 object-cover group-hover:scale-102 transition-transform duration-700"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#090e1f] via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-4 left-4 right-4 text-xs font-serif italic text-slate-200">
                Grounded in primary constitutional texts, analytical compendiums &amp; standard treatises
              </div>
            </div>
          </div>

          {/* Right Column: 4 Editorial Pillars */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
            {ethosPillars.map((pillar) => (
              <div
                key={pillar.index}
                className="p-6 bg-[#0e172e] rounded-xl border border-slate-800/90 hover:border-[#c5a059]/30 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <span className="font-mono text-lg font-bold text-[#c5a059] shrink-0 pt-0.5">
                    {pillar.index}
                  </span>
                  <div className="space-y-1.5">
                    <h3 className="font-display text-lg sm:text-xl font-bold text-white tracking-wide">
                      {pillar.title}
                    </h3>
                    <p className="text-sm text-slate-300 font-sans leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
