import React, { useState } from 'react';
import { CheckCircle, AlertCircle, Loader2, Database, Shield } from 'lucide-react';
import { AdmissionsService } from '../../services/admissionsService';
import { AdmissionEnquiry } from '../../types/admissions';

export const AdmissionsEnquirySection: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [targetExam, setTargetExam] = useState<AdmissionEnquiry['targetExam']>(
    'UPSC (Civil Services)'
  );
  const [currentStatus, setCurrentStatus] = useState<AdmissionEnquiry['currentStatus']>(
    'Undergraduate Student'
  );
  const [districtLocation, setDistrictLocation] = useState('Jammu District (Gandhi Nagar / City)');
  const [preferredTiming, setPreferredTiming] = useState<AdmissionEnquiry['preferredTiming']>(
    'Morning Batch'
  );
  const [message, setMessage] = useState('');

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successResult, setSuccessResult] = useState<AdmissionEnquiry | null>(null);
  const [allEnquiries, setAllEnquiries] = useState<AdmissionEnquiry[]>(() =>
    AdmissionsService.getAllEnquiries()
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);

    try {
      const result = await AdmissionsService.submitEnquiry({
        fullName,
        email,
        phone,
        targetExam,
        currentStatus,
        districtLocation,
        preferredTiming,
        message,
      });

      if (result.success && result.enquiry) {
        setSuccessResult(result.enquiry);
        setAllEnquiries(AdmissionsService.getAllEnquiries());
        // Reset inputs
        setFullName('');
        setEmail('');
        setPhone('');
        setMessage('');
      } else {
        setErrorMsg(result.message || 'Unable to submit your enquiry.');
      }
    } catch (err: unknown) {
      const error = err as Error;
      setErrorMsg(error.message || 'Unexpected submission error.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="admissions" className="w-full py-20 bg-[#090e1f] border-t border-[#c5a059]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Context & Advisory Details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#c5a059] font-sans font-medium">
              <span>Admissions &amp; Advisory Desk</span>
              <span aria-hidden="true">·</span>
              <span>Gandhi Nagar, Jammu</span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Begin Your Preparation With Methodical Guidance
            </h2>

            <p className="text-sm sm:text-base text-slate-300 font-sans leading-relaxed">
              Every serious aspirant requires an honest assessment of their starting baseline, syllabus timeline, and
              optional subject strengths. Our academic faculty provides one-on-one counseling before enrollment.
            </p>

            <div className="space-y-4 pt-2">
              <div className="p-4 bg-[#0e172e] rounded-xl border border-slate-800 text-xs space-y-1.5">
                <div className="font-semibold text-white flex items-center gap-2">
                  <Shield className="w-4 h-4 text-[#c5a059]" />
                  <span>Confidential Academic Counseling</span>
                </div>
                <p className="text-slate-400 leading-relaxed">
                  We do not share your contact details. Your inquiry is solely accessed by academic counselors at our Jammu center.
                </p>
              </div>

              {/* Supabase Ready Architecture Transparency Card */}
              <div className="p-4 bg-[#070b16] rounded-xl border border-[#c5a059]/25 text-xs space-y-2">
                <div className="flex items-center gap-2 text-[#e5c378] font-semibold">
                  <Database className="w-4 h-4 text-[#c5a059]" />
                  <span>Supabase-Ready Data Architecture</span>
                </div>
                <p className="text-slate-400 leading-relaxed">
                  Structured data access layer active. Submissions validate and persist to local client state and are
                  pre-configured with full PostgreSQL schemas and Row Level Security (RLS) policies for Supabase deployment.
                </p>
              </div>
            </div>

            {/* Active Enquiries Preview */}
            {allEnquiries.length > 0 && (
              <div className="pt-4 border-t border-slate-800">
                <h4 className="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-3">
                  Recent Enquiries in Local Repository ({allEnquiries.length})
                </h4>
                <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
                  {allEnquiries.slice(0, 3).map((enq) => (
                    <div
                      key={enq.id}
                      className="p-3 bg-[#0a1128] rounded-lg border border-slate-800/80 text-xs flex justify-between items-center"
                    >
                      <div>
                        <div className="font-medium text-white">{enq.fullName}</div>
                        <div className="text-[11px] text-slate-400">{enq.targetExam}</div>
                      </div>
                      <div className="text-right">
                        <span className="font-mono text-[10px] text-[#c5a059] block">{enq.id}</span>
                        <span className="text-[10px] text-emerald-400">{enq.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Interactive Form */}
          <div className="lg:col-span-7 bg-[#0e172e] rounded-2xl border border-slate-800 p-6 sm:p-8 shadow-2xl">
            <h3 className="font-display text-2xl font-bold text-white mb-1">
              Submit An Admissions Enquiry
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mb-6">
              Fill in your details below. An academic counselor will contact you with batch schedules, curriculum brochures, and fee structures.
            </p>

            {successResult && (
              <div className="mb-6 p-4 bg-emerald-950/40 border border-emerald-600/40 rounded-xl flex items-start gap-3 text-emerald-200 text-xs">
                <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <div className="font-semibold text-emerald-300">Enquiry Submitted &amp; Saved</div>
                  <p>
                    Reference ID: <span className="font-mono font-bold text-white">{successResult.id}</span>. We have
                    recorded your preference for <span className="font-semibold">{successResult.targetExam}</span>.
                  </p>
                </div>
              </div>
            )}

            {errorMsg && (
              <div className="mb-6 p-4 bg-rose-950/40 border border-rose-600/40 rounded-xl flex items-start gap-3 text-rose-200 text-xs">
                <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name */}
              <div>
                <label htmlFor="admissions-name" className="block text-xs font-medium text-slate-300 mb-1">
                  Full Name <span className="text-[#c5a059]">*</span>
                </label>
                <input
                  id="admissions-name"
                  type="text"
                  required
                  placeholder="e.g. Vikramaditya Jamwal"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#070b16] border border-slate-700 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-hidden focus:border-[#c5a059] transition-colors"
                />
              </div>

              {/* Phone & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="admissions-phone" className="block text-xs font-medium text-slate-300 mb-1">
                    Mobile Phone Number <span className="text-[#c5a059]">*</span>
                  </label>
                  <input
                    id="admissions-phone"
                    type="tel"
                    required
                    placeholder="+91 94191..."
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#070b16] border border-slate-700 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-hidden focus:border-[#c5a059] transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="admissions-email" className="block text-xs font-medium text-slate-300 mb-1">
                    Email Address <span className="text-[#c5a059]">*</span>
                  </label>
                  <input
                    id="admissions-email"
                    type="email"
                    required
                    placeholder="aspirant@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#070b16] border border-slate-700 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-hidden focus:border-[#c5a059] transition-colors"
                  />
                </div>
              </div>

              {/* Exam & Current Status */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="admissions-exam" className="block text-xs font-medium text-slate-300 mb-1">
                    Target Examination <span className="text-[#c5a059]">*</span>
                  </label>
                  <select
                    id="admissions-exam"
                    value={targetExam}
                    onChange={(e) => setTargetExam(e.target.value as AdmissionEnquiry['targetExam'])}
                    className="w-full px-3.5 py-2.5 bg-[#070b16] border border-slate-700 rounded-lg text-sm text-white focus:outline-hidden focus:border-[#c5a059] transition-colors"
                  >
                    <option value="UPSC (Civil Services)">UPSC Civil Services (IAS / IPS / IFS)</option>
                    <option value="JKAS (J&K Combined Competitive)">JKAS (J&K Administrative Service)</option>
                    <option value="Integrated UPSC + JKAS">Integrated UPSC + JKAS Cohort</option>
                    <option value="JKSSB Graduate / Allied">JKSSB Graduate / Subordinate Posts</option>
                    <option value="Foundation / General Enquiry">Undergraduate 2-Year Foundation</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="admissions-status" className="block text-xs font-medium text-slate-300 mb-1">
                    Current Academic Background
                  </label>
                  <select
                    id="admissions-status"
                    value={currentStatus}
                    onChange={(e) => setCurrentStatus(e.target.value as AdmissionEnquiry['currentStatus'])}
                    className="w-full px-3.5 py-2.5 bg-[#070b16] border border-slate-700 rounded-lg text-sm text-white focus:outline-hidden focus:border-[#c5a059] transition-colors"
                  >
                    <option value="Undergraduate Student">College Undergraduate</option>
                    <option value="Recent Graduate">Recent Graduate</option>
                    <option value="Working Professional">Working Professional</option>
                    <option value="Other">Full-time Aspirant</option>
                  </select>
                </div>
              </div>

              {/* Location & Preferred Timing */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="admissions-location" className="block text-xs font-medium text-slate-300 mb-1">
                    J&amp;K District / Current Residence
                  </label>
                  <input
                    id="admissions-location"
                    type="text"
                    value={districtLocation}
                    onChange={(e) => setDistrictLocation(e.target.value)}
                    placeholder="e.g. Jammu, Samba, Kathua, Rajouri, Srinagar"
                    className="w-full px-3.5 py-2.5 bg-[#070b16] border border-slate-700 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-hidden focus:border-[#c5a059] transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="admissions-timing" className="block text-xs font-medium text-slate-300 mb-1">
                    Preferred Batch Slot
                  </label>
                  <select
                    id="admissions-timing"
                    value={preferredTiming}
                    onChange={(e) => setPreferredTiming(e.target.value as AdmissionEnquiry['preferredTiming'])}
                    className="w-full px-3.5 py-2.5 bg-[#070b16] border border-slate-700 rounded-lg text-sm text-white focus:outline-hidden focus:border-[#c5a059] transition-colors"
                  >
                    <option value="Morning Batch">Morning Classroom (8:00 AM – 11:30 AM)</option>
                    <option value="Evening Batch">Evening Classroom (4:00 PM – 7:30 PM)</option>
                    <option value="Weekend Intensive">Weekend Intensive (Saturday &amp; Sunday)</option>
                  </select>
                </div>
              </div>

              {/* Query Details */}
              <div>
                <label htmlFor="admissions-message" className="block text-xs font-medium text-slate-300 mb-1">
                  Questions on Syllabus, Optional Subjects, or Scholarships (Optional)
                </label>
                <textarea
                  id="admissions-message"
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Mention any specific optional subjects you are considering (e.g. PSIR, Sociology, Geography, History) or questions about Jammu center facilities..."
                  className="w-full px-3.5 py-2.5 bg-[#070b16] border border-slate-700 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-hidden focus:border-[#c5a059] transition-colors resize-none"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 px-6 text-xs sm:text-sm font-semibold uppercase tracking-wider bg-[#c5a059] hover:bg-[#e5c378] active:bg-[#a7823e] text-[#090e1f] rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 shadow-lg min-h-[44px]"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Validating &amp; Recording Enquiry...</span>
                    </>
                  ) : (
                    <span>Submit Enquiry &amp; Request Counseling Call</span>
                  )}
                </button>
              </div>

              <div className="text-[11px] text-slate-400 text-center pt-1 leading-relaxed">
                By submitting, you consent to receiving academic guidance and batch notifications from SR College of Competitions, Gandhi Nagar, Jammu.
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
