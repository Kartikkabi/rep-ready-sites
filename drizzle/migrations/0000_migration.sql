CREATE TABLE public.trial_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL CHECK (char_length(name) BETWEEN 1 AND 100),
  phone text NOT NULL CHECK (char_length(phone) BETWEEN 6 AND 20),
  email text CHECK (email IS NULL OR char_length(email) <= 255),
  preferred_time text NOT NULL CHECK (char_length(preferred_time) <= 50),
  interest text NOT NULL CHECK (char_length(interest) <= 50),
  message text CHECK (message IS NULL OR char_length(message) <= 1000),
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.trial_requests TO anon, authenticated;
GRANT ALL ON public.trial_requests TO service_role;
ALTER TABLE public.trial_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit a trial request" ON public.trial_requests FOR INSERT TO anon, authenticated WITH CHECK (true);