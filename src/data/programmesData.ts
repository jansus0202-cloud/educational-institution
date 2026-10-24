import { Programme } from '../types/programme';

export const PROGRAMMES_DATA: Programme[] = [
  {
    id: 'upsc-civil-services',
    category: 'upsc',
    title: 'UPSC Civil Services Integrated Programme',
    badge: 'IAS · IPS · IFS',
    targetExam: 'Union Public Service Commission (CSE)',
    duration: '12 Months Comprehensive Cohort',
    mode: 'Classroom at Gandhi Nagar, Jammu + Guided Self-Study',
    focus: 'Prelims GS & CSAT, Comprehensive Mains (GS I–IV + Essay), & Interview Guidance',
    overview:
      'A deeply structured academic curriculum engineered for civil services aspirants seeking conceptual clarity in Indian polity, modern history, governance, international relations, ethics, and socioeconomic development.',
    curriculumModules: [
      {
        title: 'Phase I: General Studies Foundation (Prelims Focus)',
        description:
          'Indian Constitution & Governance, Physical and Economic Geography, Indian Economy & Fiscal Policy, History & Culture, Environment & Biodiversity, CSAT Analytical Reasoning.',
      },
      {
        title: 'Phase II: Mains Analytical Depth (GS Paper I to IV)',
        description:
          'In-depth thematic coverage of Society, Modern World, Governance & Social Justice, Internal Security, Science & Technology, Ethics, Integrity and Case Study Frameworks.',
      },
      {
        title: 'Phase III: Essay Formulation & Answer-Writing Mentorship',
        description:
          'Weekly simulated answer-writing sessions, argument structuring, multi-dimensional essay drafting, and individualized faculty line-by-line feedback.',
      },
      {
        title: 'Phase IV: Personality Test & Mock Interview Board',
        description:
          'Detailed Application Form (DAF) dissection, current affairs situational questioning, verbal articulation coaching, and simulated panel sessions.',
      },
    ],
    keyHighlights: [
      'Comprehensive syllabus coverage strictly aligned to UPSC CSE notification benchmarks',
      'Regular simulated full-length Prelims mock tests with negative marking analytics',
      'Daily curated editorial & current affairs analysis focused on governance relevance',
      'Dedicated Gandhi Nagar reading room & reference library access',
    ],
    batchScheduleNote: 'Morning and Evening batches enrolling for the upcoming academic cycle.',
    isVerified: true,
  },
  {
    id: 'jkas-combined-competitive',
    category: 'jkas',
    title: 'JKAS / J&K Combined Competitive Examination',
    badge: 'J&K Administrative Service',
    targetExam: 'Jammu & Kashmir Public Service Commission (JKPSC CCE)',
    duration: '10 to 12 Months Specialized Cohort',
    mode: 'Classroom at Gandhi Nagar, Jammu',
    focus: 'JKPSC Prelims, Mains GS Syllabus with regional J&K Geography, Polity & Heritage',
    overview:
      'Tailored specifically to the revised syllabus and examination scheme of the Jammu & Kashmir Public Service Commission (JKPSC), blending national governance principles with state-specific administrative context.',
    curriculumModules: [
      {
        title: 'Phase I: JKPSC CCE Prelims Foundation',
        description:
          'General Studies Paper I & Paper II (CSAT). Comprehensive instruction in history, geography, economy, polity, with special module on J&K Reorganisation and regional economy.',
      },
      {
        title: 'Phase II: Mains Subject Mastery',
        description:
          'Targeted analysis for GS Papers I, II, III & IV, contextualized with administrative challenges, geography, cultural heritage, and developmental schemes across Jammu & Kashmir.',
      },
      {
        title: 'Phase III: Answer-Writing & Timed Testing',
        description:
          'Sectional and comprehensive full-length Mains test series simulating JKPSC answer booklet standards and marking parameters.',
      },
    ],
    keyHighlights: [
      'Specialized faculty modules on J&K Geography, Rivers, History, Economy, and Statutory Provisions',
      'Bilingual lecture delivery and reference material in English with Hindi clarification support',
      'Continuous performance tracking with individual doubt-clearing sessions',
      'Centrally located campus in Gandhi Nagar, Jammu with dedicated study spaces',
    ],
    batchScheduleNote: 'Admissions open for early foundation & regular classroom batches.',
    isVerified: true,
  },
  {
    id: 'foundation-modular',
    category: 'foundation',
    title: 'Undergraduate 2-Year Civil Services Foundation',
    badge: 'Long-term Aspirants',
    targetExam: 'UPSC CSE & JKPSC Long-term Strategy',
    duration: '24 Months Weekend / Evening Hybrid',
    mode: 'Gandhi Nagar Campus + Reading Group Seminars',
    focus: 'NCERT Masterclasses, Core Conceptual Textbooks, Reading Habits & Daily Current Affairs',
    overview:
      'Engineered for college students in their 1st or 2nd year of undergraduate study in Jammu. Builds a rock-solid conceptual base in basic sciences, polity, geography, and history without disrupting university examinations.',
    curriculumModules: [
      {
        title: 'Year 1: NCERTs & Core Conceptual Reading',
        description:
          'Comprehensive breakdown of Class 6 to 12 NCERTs across History, Geography, Polity, and Economics. Newspaper reading method and synthesis note-making.',
      },
      {
        title: 'Year 2: Advanced Standard References & Writing',
        description:
          'Standard references (Laxmikanth Polity, Spectrum History, Ramesh Singh Economics, Shankar Environment), thematic debates, and introductory answer formulation.',
      },
    ],
    keyHighlights: [
      'Paced specifically around semester exam schedules so university academics are never compromised',
      'Cultivates analytical temperament, critical thinking, and structured note-taking habits early',
      'Direct faculty mentorship on career planning and optional subject choice selection',
    ],
    batchScheduleNote: 'Weekend sessions on Saturdays & Sundays.',
    isVerified: true,
  },
  {
    id: 'jkssb-graduate-allied',
    category: 'jkssb',
    title: 'JKSSB Graduate Level & Allied Competitions',
    badge: 'J&K Subordinate Services',
    targetExam: 'JKSSB Graduate Level & Allied Posts',
    duration: '4 to 6 Months Intensive Batch',
    mode: 'Classroom at Gandhi Nagar, Jammu',
    focus: 'General Knowledge with J&K Specialization, English, Mathematics, Reasoning & Basic Science',
    overview:
      'Rigorous preparation for diverse Jammu & Kashmir Services Selection Board (JKSSB) recruitments. Focuses on accuracy, quantitative speed, grammar mastery, and regional GK.',
    curriculumModules: [
      {
        title: 'General Awareness with Special Reference to J&K UT',
        description:
          'Current events, history, geography, climate, crops, heritage, Reorganisation Act, Panchayati Raj, and regional administrative schemes.',
      },
      {
        title: 'Quantitative Aptitude, Mental Ability & Reasoning',
        description:
          'Percentages, ratios, time & work, data interpretation, coding-decoding, syllogisms, and speed calculation drills.',
      },
      {
        title: 'General English & Computer Fundamentals',
        description:
          'Grammar, comprehension, tenses, sentence rearrangement, computer basics, MS Office, internet protocols, and cybersecurity basics.',
      },
    ],
    keyHighlights: [
      'High-repetition question bank practice and chapter-wise timed OMR tests',
      'Formula booklets, shortcut calculation workshops, and memorization mnemonics',
      'Updated as per the latest JKSSB syllabus notifications',
    ],
    batchScheduleNote: 'Intensive morning and evening slots available.',
    isVerified: true,
  },
  {
    id: 'mains-test-series',
    category: 'upsc',
    title: 'Civil Services Mains Answer Writing & Test Series',
    badge: 'Advanced Writing Rigor',
    targetExam: 'UPSC CSE & JKPSC Mains Cohort',
    duration: '4 Months Intensive Evaluation Series',
    mode: 'Physical Examination Hall Simulation at Gandhi Nagar',
    focus: '16 Tests (12 Sectional + 4 Full Mock) with Line-by-Line Mentorship Review',
    overview:
      'Strictly designed for serious aspirants who have cleared Prelims or completed their core curriculum. Emphasizes presentation technique, diagrams, flowcharts, balanced conclusions, and adherence to word limits.',
    curriculumModules: [
      {
        title: 'Sectional Testing: GS Papers I through IV',
        description:
          'Graduated difficulty tests with model answers provided within 48 hours and detailed scoring rubrics.',
      },
      {
        title: 'One-on-One Faculty Mentorship',
        description:
          'Personal feedback sessions breaking down answer introduction, argument density, contextual examples, and time management.',
      },
    ],
    keyHighlights: [
      'Strict 48-hour evaluation turnaround with line-by-line mark annotations',
      'Compilation of high-scoring model answers and framework templates',
      'Individual tracking of time taken per 10-marker and 15-marker question',
    ],
    batchScheduleNote: 'Ongoing rolling registration as exam cycles approach.',
    isVerified: true,
  },
];
