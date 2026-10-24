import type { AdmissionEnquiry, AdmissionsSubmissionResult } from '../types/admissions';

type EnquiryPayload = Omit<AdmissionEnquiry, 'id' | 'submittedAt' | 'status'>;

const supabaseUrl = (import.meta.env.VITE_SUPABASE_URL as string | undefined)?.replace(/\/$/, '');
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

function validate(payload: EnquiryPayload): string | null {
  if (!payload.fullName.trim() || !payload.phone.trim() || !payload.email.trim()) {
    return 'Please complete your name, mobile number, and email address.';
  }
  if (payload.fullName.trim().length > 120) return 'Name must be 120 characters or fewer.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email.trim())) return 'Please enter a valid email address.';
  if (payload.phone.replace(/\D/g, '').length < 10 || payload.phone.length > 30) return 'Please enter a valid mobile number.';
  if (payload.message && payload.message.length > 1500) return 'Please keep your message under 1,500 characters.';
  return null;
}

export class AdmissionsService {
  /** Public submissions use only the anon/publishable key; RLS must restrict this table to INSERT. */
  public static async submitEnquiry(payload: EnquiryPayload): Promise<AdmissionsSubmissionResult> {
    const error = validate(payload);
    if (error) return { success: false, message: error };

    if (!supabaseUrl || !supabaseAnonKey) {
      return { success: false, message: 'Admissions are not connected yet. Configure the Supabase environment variables and apply the included SQL migration.' };
    }

    const row = {
      full_name: payload.fullName.trim(),
      email: payload.email.trim().toLowerCase(),
      phone: payload.phone.trim(),
      target_exam: payload.targetExam,
      current_status: payload.currentStatus,
      district_location: payload.districtLocation.trim(),
      preferred_timing: payload.preferredTiming,
      message: payload.message?.trim() || null,
    };

    try {
      const response = await fetch(`${supabaseUrl}/rest/v1/admissions_enquiries`, {
        method: 'POST',
        headers: {
          apikey: supabaseAnonKey,
          Authorization: `Bearer ${supabaseAnonKey}`,
          'Content-Type': 'application/json',
          Prefer: 'return=minimal',
        },
        body: JSON.stringify(row),
      });

      if (!response.ok) {
        const detail = await response.text().catch(() => '');
        console.error('Admissions submission failed:', response.status, detail);
        if (response.status === 404) return { success: false, message: 'Admissions database table is missing. Apply the included Supabase SQL migration.' };
        if (response.status === 401 || response.status === 403) return { success: false, message: 'The database rejected this enquiry. Check the Supabase URL, public key, table grants, and INSERT policy.' };
        return { success: false, message: 'We could not submit your enquiry. Please try again or contact the institute directly.' };
      }

      const enquiry: AdmissionEnquiry = {
        ...payload,
        id: 'SUBMITTED',
        submittedAt: new Date().toISOString(),
        status: 'Received',
      };
      return { success: true, message: 'Your enquiry was submitted successfully.', enquiry };
    } catch (cause) {
      console.error('Admissions network error:', cause);
      return { success: false, message: 'The admissions service could not be reached. Check your connection and try again.' };
    }
  }

  // Deliberately do not expose enquiry records to public website visitors.
  public static getAllEnquiries(): AdmissionEnquiry[] {
    return [];
  }

  public static getBackendStatus(): { isConnected: boolean; driver: string; details: string } {
    return {
      isConnected: isSupabaseConfigured,
      driver: isSupabaseConfigured ? 'Supabase REST API' : 'Not configured',
      details: isSupabaseConfigured
        ? 'Environment variables are present; verify the migration and INSERT policy before accepting enquiries.'
        : 'Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY, then apply supabase/migrations/202610250001_create_admissions_enquiries.sql.',
    };
  }
}
