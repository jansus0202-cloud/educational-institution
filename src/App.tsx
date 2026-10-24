import React, { useState } from 'react';
import { Navbar } from './components/layout/Navbar';
import { HeroSection } from './components/sections/HeroSection';
import { InstitutionalEthos } from './components/sections/InstitutionalEthos';
import { ProgrammeDiscovery } from './components/sections/ProgrammeDiscovery';
import { NoticesSection } from './components/sections/NoticesSection';
import { AdmissionsEnquirySection } from './components/sections/AdmissionsEnquirySection';
import { FaqSection } from './components/sections/FaqSection';
import { ContactSection } from './components/sections/ContactSection';
import { Footer } from './components/layout/Footer';
import { CurriculumModal } from './components/sections/CurriculumModal';
import { EnquiryDrawerModal } from './components/ui/EnquiryDrawerModal';
import { Programme } from './types/programme';

export default function App() {
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);
  const [enquiryPreselectedExam, setEnquiryPreselectedExam] = useState<string | undefined>(undefined);
  const [selectedProgrammeForCurriculum, setSelectedProgrammeForCurriculum] = useState<Programme | null>(null);

  const handleOpenEnquiry = (preselected?: string) => {
    setEnquiryPreselectedExam(preselected);
    setIsEnquiryModalOpen(true);
  };

  const handleCloseEnquiry = () => {
    setIsEnquiryModalOpen(false);
    setEnquiryPreselectedExam(undefined);
  };

  const handleSelectProgramme = (programme: Programme) => {
    setSelectedProgrammeForCurriculum(programme);
  };

  const handleCloseCurriculum = () => {
    setSelectedProgrammeForCurriculum(null);
  };

  return (
    <div className="min-h-screen bg-[#090e1f] text-slate-100 flex flex-col font-sans selection:bg-[#c5a059]/30 selection:text-white">
      {/* Top Navigation conforming to strict Top Bar Contract */}
      <Navbar onOpenEnquiry={handleOpenEnquiry} />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Hero with 3D Knowledge Armillary Experience */}
        <HeroSection onOpenEnquiry={() => handleOpenEnquiry('General Civil Services Counseling')} />

        {/* 2. Institutional Positioning & Academic Ethos */}
        <InstitutionalEthos />

        {/* 3. Programme Discovery & Syllabus Navigation */}
        <ProgrammeDiscovery
          onSelectProgramme={handleSelectProgramme}
          onEnquireProgramme={(title) => handleOpenEnquiry(title)}
        />

        {/* 4. Campus Notices, Cohort Releases & Syllabus Download */}
        <NoticesSection onOpenEnquiry={(topic) => handleOpenEnquiry(topic)} />

        {/* 5. Direct Admissions Enquiry Form with Supabase Architecture Notes */}
        <AdmissionsEnquirySection />

        {/* 6. Aspirant FAQs & Verification Accordions */}
        <FaqSection />

        {/* 7. Gandhi Nagar, Jammu Center Physical Orientation & Direct WhatsApp */}
        <ContactSection />
      </main>

      {/* Editorial Footer */}
      <Footer />

      {/* Global Interactive Modals */}
      <CurriculumModal
        programme={selectedProgrammeForCurriculum}
        onClose={handleCloseCurriculum}
        onEnquire={(title) => handleOpenEnquiry(title)}
      />

      <EnquiryDrawerModal
        isOpen={isEnquiryModalOpen}
        onClose={handleCloseEnquiry}
        preselectedExam={enquiryPreselectedExam}
      />
    </div>
  );
}
