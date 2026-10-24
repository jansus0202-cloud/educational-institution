import React, { useState, useEffect } from 'react';
import { X, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { AdmissionsService } from '../../services/admissionsService';
import { AdmissionEnquiry } from '../../types/admissions';

interface EnquiryDrawerModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedExam?: string;
  onSubmissionSuccess?: (enquiry: AdmissionEnquiry) => void;
}

export const EnquiryDrawerModal: React.FC<EnquiryDrawerModalProps> = ({
  isOpen,
  onClose,
  preselectedExam,
  onSubmissionSuccess,
}) => {
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

  // Sync preselected exam if changed
  useEffect(() => {
    if (preselectedExam) {
      if (preselectedExam.toLowerCase().includes('jkas')) {
        setTargetExam('JKAS (J&K Combined Competitive)');
      } else if (preselectedExam.toLowerCase().includes('upsc')) {
        setTargetExam('UPSC (Civil Services)');
      } else if (preselectedExam.toLowerCase().includes('jkssb')) {
        setTargetExam('JKSSB Graduate / Allied');
      } else if (preselectedExam.toLowerCase().includes('foundation')) {
        setTargetExam('Integrated UPSC + JKAS');
      }
    }
  }, [preselectedExam]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

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
        if (onSubmissionSuccess) {
          onSubmissionSuccess(result.enquiry);
        }
      } else {
        setErrorMsg(result.message || 'Unable to process your enquiry. Please check the form fields.');
      }
    } catch (err: unknown) {
      const error = err as Error;
      setErrorMsg(error.message || 'An unexpected error occurred during submission.');
    } finally {
      setLoading(false);
    }
  };

  const handleResetForm = () => {
    setFullName('');
    setEmail('');
    setPhone('');
    setMessage('');
    setSuccessResult(null);
    setErrorMsg(null);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="enquiry-modal-title"
    >
      <div className="relative w-full max-w-xl bg-[#0b132b] border border-[#c5a059]/30 rounded-2xl shadow-2xl p-6 sm:p-8 my-8 text-slate-100">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800/60 transition-colors cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
          aria-label="Close Enquiry Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {successResult ? (
          <div className="py-6 text-center space-y-5">
            <div className="w-14 h-14 mx-auto rounded-full bg-[#c5a059]/15 border border-[#c5a059] flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-[#e5c378]" />
            </div>
            <div>
              <h3 className="font-display text-2xl font-bold text-white tracking-wide">
                Enquiry Logged Successfully
              </h3>
              <p className="text-xs uppercase tracking-widest text-[#c5a059] font-sans mt-1">
                Reference ID: <span className="font-mono">{successResult.id}</span>
              </p>
            </div>
            <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
              Thank you, <span className="font-semibold text-white">{successResult.fullName}</span>.
              Your admissions enquiry for <span className="text-[#e5c378]">{successResult.targetExam}</span> has
              been structured and persisted in our admissions repository. An academic counselor from our Gandhi Nagar,
              Jammu center will contact you shortly.
            </p>

            <div className="p-4 bg-[#070b16] rounded-xl border border-slate-800 text-left text-xs space-y-1.5 text-slate-300">
              <div className="flex justify-between">
                <span className="text-slate-500">Contact Number:</span>
                <span className="font-mono text-slate-200">{successResult.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Email Address:</span>
                <span className="font-mono text-slate-200">{successResult.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Location:</span>
                <span className="text-slate-200">{successResult.districtLocation}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Preferred Batch:</span>
                <span className="text-slate-200">{successResult.preferredTiming}</span>
              </div>
              <div className="pt-2 border-t border-slate-800/80 text-[11px] text-slate-400">
                Data layer: Persisted locally; PostgreSQL table &amp; RLS schema ready for Supabase sync.
              </div>
            </div>

            <button
              type="button"
              onClick={handleResetForm}
              className="w-full py-3 px-6 text-xs font-semibold uppercase tracking-wider bg-[#c5a059] hover:bg-[#e5c378] text-[#090e1f] rounded-lg transition-colors cursor-pointer min-h-[44px]"
            >
              Done &amp; Return to Page
            </button>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <span className="text-xs font-serif uppercase tracking-widest text-[#c5a059]">
                SR College of Competitions · Gandhi Nagar, Jammu
              </span>
              <h2
                id="enquiry-modal-title"
                className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1"
              >
                Admissions &amp; Academic Counseling
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1 leading-relaxed">
                Connect with our academic faculty in Jammu for batch timings, curriculum orientation, and preparation roadmap.
              </p>
            </div>

            {errorMsg && (
              <div className="mb-4 p-3.5 bg-rose-950/60 border border-rose-600/40 rounded-lg flex items-start gap-2.5 text-rose-200 text-xs">
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name */}
              <div>
                <label htmlFor="modal-full-name" className="block text-xs font-medium text-slate-300 mb-1">
                  Full Name <span className="text-[#c5a059]">*</span>
                </label>
                <input
                  id="modal-full-name"
                  type="text"
                  required
                  placeholder="e.g. Rahul Sharma"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#070b16] border border-slate-700 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-hidden focus:border-[#c5a059] transition-colors"
                />
              </div>

              {/* Contact Grid: Phone and Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label htmlFor="modal-phone" className="block text-xs font-medium text-slate-300 mb-1">
                    Mobile Number <span className="text-[#c5a059]">*</span>
                  </label>
                  <input
                    id="modal-phone"
                    type="tel"
                    required
                    placeholder="+91 94191..."
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#070b16] border border-slate-700 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-hidden focus:border-[#c5a059] transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="modal-email" className="block text-xs font-medium text-slate-300 mb-1">
                    Email Address <span className="text-[#c5a059]">*</span>
                  </label>
                  <input
                    id="modal-email"
                    type="email"
                    required
                    placeholder="aspirant@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#070b16] border border-slate-700 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-hidden focus:border-[#c5a059] transition-colors"
                  />
                </div>
              </div>

              {/* Examination Target */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label htmlFor="modal-exam" className="block text-xs font-medium text-slate-300 mb-1">
                    Target Examination <span className="text-[#c5a059]">*</span>
                  </label>
                  <select
                    id="modal-exam"
                    value={targetExam}
                    onChange={(e) => setTargetExam(e.target.value as AdmissionEnquiry['targetExam'])}
                    className="w-full px-3.5 py-2.5 bg-[#070b16] border border-slate-700 rounded-lg text-sm text-white focus:outline-hidden focus:border-[#c5a059] transition-colors"
                  >
                    <option value="UPSC (Civil Services)">UPSC (Civil Services - IAS/IPS)</option>
                    <option value="JKAS (J&K Combined Competitive)">JKAS (J&K Administrative Service)</option>
                    <option value="Integrated UPSC + JKAS">Integrated UPSC + JKAS Cohort</option>
                    <option value="JKSSB Graduate / Allied">JKSSB Graduate / Allied Posts</option>
                    <option value="Foundation / General Enquiry">Undergraduate 2-Yr Foundation</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="modal-status" className="block text-xs font-medium text-slate-300 mb-1">
                    Current Academic Status
                  </label>
                  <select
                    id="modal-status"
                    value={currentStatus}
                    onChange={(e) => setCurrentStatus(e.target.value as AdmissionEnquiry['currentStatus'])}
                    className="w-full px-3.5 py-2.5 bg-[#070b16] border border-slate-700 rounded-lg text-sm text-white focus:outline-hidden focus:border-[#c5a059] transition-colors"
                  >
                    <option value="Undergraduate Student">College Undergraduate (1st-3rd Year)</option>
                    <option value="Recent Graduate">Recent Graduate</option>
                    <option value="Working Professional">Working Professional</option>
                    <option value="Other">Full-time Aspirant</option>
                  </select>
                </div>
              </div>

              {/* Location & Preferred Timing */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label htmlFor="modal-location" className="block text-xs font-medium text-slate-300 mb-1">
                    Your Location / J&amp;K District
                  </label>
                  <input
                    id="modal-location"
                    type="text"
                    value={districtLocation}
                    onChange={(e) => setDistrictLocation(e.target.value)}
                    placeholder="e.g. Jammu, Kathua, Samba, Udhampur"
                    className="w-full px-3.5 py-2.5 bg-[#070b16] border border-slate-700 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-hidden focus:border-[#c5a059] transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="modal-timing" className="block text-xs font-medium text-slate-300 mb-1">
                    Preferred Batch Timing
                  </label>
                  <select
                    id="modal-timing"
                    value={preferredTiming}
                    onChange={(e) => setPreferredTiming(e.target.value as AdmissionEnquiry['preferredTiming'])}
                    className="w-full px-3.5 py-2.5 bg-[#070b16] border border-slate-700 rounded-lg text-sm text-white focus:outline-hidden focus:border-[#c5a059] transition-colors"
                  >
                    <option value="Morning Batch">Morning Batch (8:00 AM - 11:30 AM)</option>
                    <option value="Evening Batch">Evening Batch (4:00 PM - 7:30 PM)</option>
                    <option value="Weekend Intensive">Weekend Intensive (Sat &amp; Sun)</option>
                  </select>
                </div>
              </div>

              {/* Specific Question / Message */}
              <div>
                <label htmlFor="modal-message" className="block text-xs font-medium text-slate-300 mb-1">
                  Specific Query / Optional Subject Interest (Optional)
                </label>
                <textarea
                  id="modal-message"
                  rows={2}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="e.g. Inquiring about History/PSIR optional guidance and test series schedule..."
                  className="w-full px-3.5 py-2.5 bg-[#070b16] border border-slate-700 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-hidden focus:border-[#c5a059] transition-colors resize-none"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 px-6 text-xs font-semibold uppercase tracking-wider bg-[#c5a059] hover:bg-[#e5c378] active:bg-[#a7823e] text-[#090e1f] rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 shadow-lg min-h-[44px]"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Validating &amp; Logging Enquiry...</span>
                    </>
                  ) : (
                    <span>Submit Admissions Enquiry</span>
                  )}
                </button>
              </div>

              {/* Transparency Notice */}
              <p className="text-[11px] text-slate-400 text-center leading-relaxed">
                Admissions enquiries are processed through our Gandhi Nagar, Jammu counseling desk. Your information is
                held confidential in accordance with our academic advisory policy.
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
