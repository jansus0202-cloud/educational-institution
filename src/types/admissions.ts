export interface AdmissionEnquiry {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  targetExam: 'UPSC (Civil Services)' | 'JKAS (J&K Combined Competitive)' | 'Integrated UPSC + JKAS' | 'JKSSB Graduate / Allied' | 'Foundation / General Enquiry';
  currentStatus: 'Undergraduate Student' | 'Recent Graduate' | 'Working Professional' | 'Other';
  districtLocation: string;
  preferredTiming: 'Morning Batch' | 'Evening Batch' | 'Weekend Intensive';
  message?: string;
  submittedAt: string;
  status: 'Received' | 'Counselor Reviewing' | 'Contact Scheduled';
}

export interface AdmissionsSubmissionResult {
  success: boolean;
  message: string;
  enquiry?: AdmissionEnquiry;
  error?: string;
}
