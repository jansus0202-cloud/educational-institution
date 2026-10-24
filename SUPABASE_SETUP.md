# Supabase setup — SR College of Competitions

1. Create a Supabase project.
2. Open its SQL Editor and run `supabase/migrations/202610250001_create_admissions_enquiries.sql`.
3. Copy `.env.example` to `.env.local` and set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.
4. For Vercel, add those same two variables under Project Settings → Environment Variables, then redeploy.
5. Submit a test enquiry and verify it appears in Table Editor → `admissions_enquiries`.
6. Verify that an anonymous visitor cannot SELECT any enquiry rows.

Security: this migration allows public INSERT only. It intentionally provides no public read access or staff dashboard. Never use a service-role/secret key in frontend code or a `VITE_` variable. Add CAPTCHA/rate limiting before broad public promotion and verify the institution's privacy notice and contact details before accepting real student data.
