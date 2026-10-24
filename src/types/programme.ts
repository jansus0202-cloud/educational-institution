export type ProgrammeCategory = 'all' | 'upsc' | 'jkas' | 'jkssb' | 'foundation';

export interface Programme {
  id: string;
  category: 'upsc' | 'jkas' | 'jkssb' | 'foundation';
  title: string;
  badge: string;
  targetExam: string;
  duration: string;
  mode: string;
  focus: string;
  overview: string;
  curriculumModules: {
    title: string;
    description: string;
  }[];
  keyHighlights: string[];
  batchScheduleNote: string;
  isVerified: boolean;
}

export interface Notice {
  id: string;
  title: string;
  date: string;
  category: 'Exam Alert' | 'Batch Update' | 'Mentorship' | 'Resource';
  summary: string;
  details: string;
  actionLabel?: string;
  isImportant?: boolean;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}
