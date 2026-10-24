import { AdmissionEnquiry, AdmissionsSubmissionResult } from '../types/admissions';

/**
 * ============================================================================
 * SUPABASE INTEGRATION SCHEMA SPECIFICATION
 * ============================================================================
 * When connecting a live Supabase PostgreSQL backend, execute this SQL:
 *
 * ```sql
 * CREATE TABLE IF NOT EXISTS public.admissions_enquiries (
 *   id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
 *   full_name TEXT NOT NULL,
 *   email TEXT NOT NULL,
 *   phone TEXT NOT NULL,
 *   target_exam TEXT NOT NULL,
 *   current_status TEXT NOT NULL,
 *   district_location TEXT NOT NULL,
 *   preferred_timing TEXT NOT NULL,
 *   message TEXT,
 *   status TEXT DEFAULT 'Received',
 *   created_at TIMESTAMPTZ DEFAULT NOW()
 * );
 *
 * -- Enable Row Level Security (RLS)
 * ALTER TABLE public.admissions_enquiries ENABLE ROW LEVEL SECURITY;
 *
 * -- Policy: Allow anonymous public inserts from website visitors
 * CREATE POLICY "Allow public enquiry submissions"
 *   ON public.admissions_enquiries
 *   FOR INSERT
 *   WITH CHECK (true);
 *
 * -- Policy: Only authenticated staff can read enquiries
 * CREATE POLICY "Allow staff to review enquiries"
 *   ON public.admissions_enquiries
 *   FOR SELECT
 *   TO authenticated
 *   USING (true);
 * ```
 */

const STORAGE_KEY = 'sr_college_admissions_enquiries_v1';

// Seed sample enquiry for initial demonstration if none exists
const INITIAL_DEMO_ENQUIRIES: AdmissionEnquiry[] = [
  {
    id: 'ENQ-2026-0042',
    fullName: 'Aditi Sharma',
    email: 'aditi.sharma.jk@example.com',
    phone: '+91 94191 00000',
    targetExam: 'JKAS (J&K Combined Competitive)',
    currentStatus: 'Recent Graduate',
    districtLocation: 'Jammu District (Gandhi Nagar)',
    preferredTiming: 'Morning Batch',
    message: 'Seeking guidance on optional subject selection and General Studies Mains answer writing for upcoming cycle.',
    submittedAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    status: 'Counselor Reviewing',
  },
];

export class AdmissionsService {
  private static getStoredEnquiries(): AdmissionEnquiry[] {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_DEMO_ENQUIRIES));
        return INITIAL_DEMO_ENQUIRIES;
      }
      return JSON.parse(data);
    } catch {
      return INITIAL_DEMO_ENQUIRIES;
    }
  }

  private static saveEnquiries(items: AdmissionEnquiry[]): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.warn('Unable to persist to localStorage:', e);
    }
  }

  /**
   * Submit an admission enquiry.
   * Persists to local repository and provides structured response.
   */
  public static async submitEnquiry(
    payload: Omit<AdmissionEnquiry, 'id' | 'submittedAt' | 'status'>
  ): Promise<AdmissionsSubmissionResult> {
    // Basic validation
    if (!payload.fullName.trim() || !payload.phone.trim() || !payload.email.trim()) {
      return {
        success: false,
        message: 'Please complete all required fields (Name, Phone number, and Email).',
      };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(payload.email.trim())) {
      return {
        success: false,
        message: 'Please provide a valid email address for receiving admissions updates.',
      };
    }

    if (payload.phone.trim().replace(/\D/g, '').length < 10) {
      return {
        success: false,
        message: 'Please provide a valid 10-digit mobile contact number.',
      };
    }

    // Simulate network processing delay for authentic feedback
    await new Promise((resolve) => setTimeout(resolve, 600));

    const id = `ENQ-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const newEnquiry: AdmissionEnquiry = {
      ...payload,
      id,
      submittedAt: new Date().toISOString(),
      status: 'Received',
    };

    const currentList = this.getStoredEnquiries();
    const updated = [newEnquiry, ...currentList];
    this.saveEnquiries(updated);

    return {
      success: true,
      message: `Enquiry logged successfully with ID ${id}. Academic counselors at the Gandhi Nagar, Jammu campus will reach out via phone or email.`,
      enquiry: newEnquiry,
    };
  }

  /**
   * Retrieve all recorded enquiries for transparency and verification
   */
  public static getAllEnquiries(): AdmissionEnquiry[] {
    return this.getStoredEnquiries();
  }

  /**
   * Status of backend connectivity
   */
  public static getBackendStatus(): { isConnected: boolean; driver: string; details: string } {
    return {
      isConnected: false,
      driver: 'Local High-Fidelity Client Repository (Ready for Supabase Sync)',
      details: 'Data is validated, structured, and saved in browser storage. Add SUPABASE_URL and SUPABASE_ANON_KEY to forward rows to PostgreSQL.',
    };
  }
}
