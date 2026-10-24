-- Admissions enquiry intake. Run in the Supabase SQL Editor.
-- Public visitors may INSERT only. Never create a public SELECT policy.
create table if not exists public.admissions_enquiries (
  id uuid primary key default gen_random_uuid(),
  full_name text not null check (char_length(trim(full_name)) between 2 and 120),
  email text not null check (char_length(email) between 3 and 254),
  phone text not null check (char_length(phone) between 7 and 30),
  target_exam text not null check (char_length(target_exam) between 2 and 120),
  current_status text not null check (char_length(current_status) between 2 and 80),
  district_location text not null default '' check (char_length(district_location) <= 160),
  preferred_timing text not null check (char_length(preferred_timing) between 2 and 80),
  message text check (message is null or char_length(message) <= 1500),
  status text not null default 'Received' check (status in ('Received', 'Counselor Reviewing', 'Contact Scheduled')),
  created_at timestamptz not null default now()
);
alter table public.admissions_enquiries enable row level security;
revoke all on table public.admissions_enquiries from anon, authenticated;
grant insert on table public.admissions_enquiries to anon;
drop policy if exists "Public can submit admissions enquiries" on public.admissions_enquiries;
create policy "Public can submit admissions enquiries"
  on public.admissions_enquiries for insert to anon
  with check (
    char_length(trim(full_name)) between 2 and 120
    and char_length(email) between 3 and 254
    and char_length(phone) between 7 and 30
    and char_length(target_exam) between 2 and 120
    and char_length(current_status) between 2 and 80
    and char_length(district_location) <= 160
    and char_length(preferred_timing) between 2 and 80
    and (message is null or char_length(message) <= 1500)
  );
comment on table public.admissions_enquiries is
  'Private admissions enquiries. Public website visitors can insert only; staff access requires a separately secured authenticated workflow.';
