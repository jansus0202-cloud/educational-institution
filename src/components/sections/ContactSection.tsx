import React, { useState } from 'react';
import { MapPin, Phone, MessageSquare, Clock, Mail, ExternalLink, Check } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [copiedPhone, setCopiedPhone] = useState(false);

  const handleCopyPhone = () => {
    navigator.clipboard.writeText('+91 94191 00000');
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 3000);
  };

  return (
    <section id="contact" className="w-full py-20 bg-[#090e1f] border-t border-[#c5a059]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#c5a059] font-sans font-medium mb-2">
            <span>Institutional Presence</span>
            <span aria-hidden="true">·</span>
            <span>Jammu Center</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Visit the Gandhi Nagar Campus in Jammu
          </h2>
          <p className="text-base text-slate-300 font-sans mt-3 leading-relaxed">
            Our central Jammu facility accommodates physical classroom lectures, faculty counseling cabins, and the quiet
            civil services reference reading room.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          {/* Left Column: Campus Facade Visual & Highlights */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div className="relative rounded-2xl overflow-hidden border border-[#c5a059]/30 shadow-2xl h-80 sm:h-96 group">
              <img
                src="/src/assets/images/jammu_institutional_facade_1792866289750.jpg"
                alt="Institutional academic block facade in Jammu"
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#090e1f] via-[#090e1f]/30 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 space-y-1">
                <span className="text-xs font-mono uppercase tracking-wider text-[#e5c378]">
                  Gandhi Nagar, Jammu Center
                </span>
                <h4 className="font-display text-xl font-bold text-white">
                  SR College of Competitions
                </h4>
                <p className="text-xs text-slate-300">
                  Dedicated Civil Services &amp; State Administrative Examination Mentorship Center.
                </p>
              </div>
            </div>

            {/* Quick Visitor Information Strip */}
            <div className="mt-6 p-5 bg-[#0e172e] rounded-xl border border-slate-800 text-xs text-slate-300 space-y-2">
              <div className="font-semibold text-white flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#c5a059]" />
                <span>Counseling Desk &amp; Campus Visiting Hours</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-400">
                <div>Monday to Saturday: 9:30 AM – 6:30 PM</div>
                <div>Sunday: 10:00 AM – 2:00 PM (Seminar Sessions)</div>
              </div>
              <p className="text-[11px] text-slate-500 pt-1 border-t border-slate-800">
                Walk-ins are welcomed during counseling hours. Appointments recommended for one-on-one optional subject advisory.
              </p>
            </div>
          </div>

          {/* Right Column: Direct Channels & Map Navigation */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div className="p-6 sm:p-8 bg-[#0e172e] rounded-2xl border border-slate-800 space-y-6 shadow-xl">
              <h3 className="font-display text-2xl font-bold text-white">
                Contact &amp; Advisory Channels
              </h3>

              {/* Channel 1: Physical Location */}
              <div className="flex items-start gap-4">
                <div className="p-3 bg-[#132247] rounded-xl border border-slate-700 text-[#c5a059] shrink-0 mt-1">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="space-y-1 text-xs sm:text-sm">
                  <div className="font-semibold text-white">Campus Location</div>
                  <p className="text-slate-300 leading-relaxed">
                    Gandhi Nagar, Jammu, Jammu &amp; Kashmir 180004, India.
                  </p>
                  <a
                    href="https://maps.google.com/?q=Gandhi+Nagar+Jammu"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-[#e5c378] hover:underline pt-1"
                  >
                    <span>View Gandhi Nagar, Jammu on Google Maps</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Channel 2: WhatsApp Direct Line */}
              <div className="flex items-start gap-4">
                <div className="p-3 bg-emerald-950/60 rounded-xl border border-emerald-800/60 text-emerald-400 shrink-0 mt-1">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div className="space-y-1 text-xs sm:text-sm flex-1">
                  <div className="font-semibold text-white">WhatsApp Advisory Desk</div>
                  <p className="text-slate-300 leading-relaxed">
                    Receive brochure PDFs, batch timetables, and orientation seminar alerts directly on WhatsApp.
                  </p>
                  <a
                    href="https://wa.me/919419100000?text=Hello%20SR%20College%20of%20Competitions%2C%20I%20am%20inquiring%20about%20civil%20services%20batches%20in%20Gandhi%20Nagar%20Jammu."
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 mt-2 text-xs font-semibold uppercase tracking-wider bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-colors cursor-pointer min-h-[40px]"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Launch WhatsApp Chat</span>
                  </a>
                </div>
              </div>

              {/* Channel 3: Telephone Desk */}
              <div className="flex items-start gap-4">
                <div className="p-3 bg-[#132247] rounded-xl border border-slate-700 text-[#c5a059] shrink-0 mt-1">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="space-y-1 text-xs sm:text-sm flex-1">
                  <div className="font-semibold text-white">Telephone Inquiries</div>
                  <p className="text-slate-300 leading-relaxed font-mono">
                    +91 94191 00000 <span className="text-slate-500 font-sans text-xs">(Admissions Desk)</span>
                  </p>
                  <div className="flex items-center gap-2 pt-1">
                    <a
                      href="tel:+919419100000"
                      className="inline-flex items-center gap-1 text-xs font-medium text-[#e5c378] hover:underline"
                    >
                      <Phone className="w-3 h-3" />
                      <span>Call Center</span>
                    </a>
                    <span className="text-slate-600">·</span>
                    <button
                      type="button"
                      onClick={handleCopyPhone}
                      className="text-xs text-slate-400 hover:text-white cursor-pointer"
                    >
                      {copiedPhone ? (
                        <span className="text-emerald-400 flex items-center gap-1">
                          <Check className="w-3 h-3" /> Number Copied
                        </span>
                      ) : (
                        'Copy Phone'
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Channel 4: Email */}
              <div className="flex items-start gap-4">
                <div className="p-3 bg-[#132247] rounded-xl border border-slate-700 text-[#c5a059] shrink-0 mt-1">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="space-y-1 text-xs sm:text-sm">
                  <div className="font-semibold text-white">Academic Correspondence</div>
                  <p className="text-slate-300 font-mono text-xs">
                    admissions@srcollegecompetitions.edu.placeholder
                  </p>
                  <a
                    href="mailto:admissions@srcollegecompetitions.edu.placeholder?subject=Civil%20Services%20Admissions%20Enquiry%20Jammu"
                    className="inline-flex items-center gap-1 text-xs text-[#e5c378] hover:underline pt-0.5"
                  >
                    <span>Write An Email</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
