import { Notice, FaqItem } from '../types/programme';

export const NOTICES_DATA: Notice[] = [
  {
    id: 'not-01',
    title: 'Admissions Open: UPSC & JKAS Comprehensive 2026–2027 Batches',
    date: 'Current Cycle',
    category: 'Batch Update',
    summary:
      'Enrollment commences for morning and evening classroom cohorts at the Gandhi Nagar campus. Limited batch sizes maintained for individual mentor access.',
    details:
      'Classes comprise 3 hours of daily lecture instruction followed by structured doubt resolution, daily answer-writing practice questions, and weekly current affairs synthesis. Candidates may schedule an on-campus academic counseling session before joining.',
    actionLabel: 'Reserve Counseling Session',
    isImportant: true,
  },
  {
    id: 'not-02',
    title: 'Jammu & Kashmir Administrative Service (JKAS) Syllabus Orientation',
    date: 'Upcoming Seminar',
    category: 'Mentorship',
    summary:
      'A dedicated academic seminar on navigating the revised JKPSC syllabus structure, state-specific topics, and optional subject selection.',
    details:
      'Open to prospective and enrolled students at our Gandhi Nagar seminar hall. Topics cover scoring patterns in GS-IV (Ethics), regional J&K economy case studies, and time-allocation strategy across Prelims and Mains.',
    actionLabel: 'View Seminar Schedule',
    isImportant: true,
  },
  {
    id: 'not-03',
    title: 'Weekly Answer-Writing & Current Affairs Compendium Published',
    date: 'Weekly Release',
    category: 'Resource',
    summary:
      'Curated editorial analysis with model civil services questions across Indian Express, The Hindu, and regional administrative developments.',
    details:
      'Available for enrolled aspirants in the campus reading room and through our student distribution counter. Features 10 practice questions with model answers.',
    actionLabel: 'Read Synopsis Details',
    isImportant: false,
  },
  {
    id: 'not-04',
    title: 'Diagnostic Scholarship & Assessment Test for Foundation Aspirants',
    date: 'Monthly Assessment',
    category: 'Exam Alert',
    summary:
      'Evaluate your baseline general awareness, reading comprehension, and analytical aptitude prior to full curriculum enrollment.',
    details:
      'Conducting an assessment test at the Gandhi Nagar center to benchmark student preparedness and recommend tailored batch pathways.',
    actionLabel: 'Register for Assessment',
    isImportant: false,
  },
];

export const FAQ_DATA: FaqItem[] = [
  {
    id: 'faq-01',
    category: 'Admissions & Batches',
    question: 'Where is SR College of Competitions located in Jammu, and how can I visit?',
    answer:
      'SR College of Competitions is situated centrally in Gandhi Nagar, Jammu, Jammu & Kashmir. Aspirants and parents are welcome to visit our counseling desk during office hours (Monday to Saturday, 9:30 AM to 6:30 PM) for in-person syllabus orientation and batch enrollment consultations.',
  },
  {
    id: 'faq-02',
    category: 'Curriculum & Strategy',
    question: 'How does the institute address the differences between UPSC Civil Services and JKAS?',
    answer:
      'While the core General Studies papers (History, Polity, Economy, Geography, Ethics) are largely synchronized between UPSC and JKPSC, our curriculum provides dedicated supplemental modules on Jammu & Kashmir specific geography, regional history, statutory reorganisation provisions, and administrative case studies required for JKAS.',
  },
  {
    id: 'faq-03',
    category: 'Beginners & Foundation',
    question: 'Can college undergraduate students in Jammu join foundation classes alongside regular degree studies?',
    answer:
      'Yes. Our 2-Year Undergraduate Foundation Programme offers evening and weekend schedules tailored specifically so that college students from Jammu University, clustered colleges, and engineering/medical institutions can systematically study NCERTs and standard reference texts without missing college exams.',
  },
  {
    id: 'faq-04',
    category: 'Answer Writing & Mentorship',
    question: 'Is answer writing covered from the beginning, or only after the Prelims stage?',
    answer:
      'Answer writing begins in Phase II of the foundation cycle. We believe writing discipline cannot be developed overnight in the short window between Prelims and Mains. Students practice structured 150-word and 250-word questions with faculty feedback as soon as core conceptual blocks are completed.',
  },
  {
    id: 'faq-05',
    category: 'Fees & Enrollment',
    question: 'What are the course fees and payment options for upcoming cohorts?',
    answer:
      'Fee structures vary according to the duration (1-Year Integrated, 2-Year Foundation, or Modular Test Series) and current scholarship tier. Please submit an admissions enquiry online or consult our Gandhi Nagar admissions desk directly for verified, current fee schedules and installment arrangements.',
  },
  {
    id: 'faq-06',
    category: 'Library & Study Facilities',
    question: 'Does the institute offer a quiet study room and library facility?',
    answer:
      'Yes. The Gandhi Nagar center features a dedicated reading room and reference library equipped with national newspapers, civil services journals, standard reference treatises, and a peaceful study atmosphere for enrolled scholars.',
  },
];
