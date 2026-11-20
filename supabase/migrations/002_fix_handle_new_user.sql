-- Fix: handle_new_user() trigger function
--
-- Two issues fixed:
-- 1. The original coalesce-based role cast threw an error on invalid/empty
--    values BEFORE coalesce could check for NULL.
-- 2. Missing SET search_path = public caused the function to fail when
--    invoked by GoTrue (Supabase Auth), which uses a different search_path.
--    This blocked ALL new user signups.

CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger AS $$
DECLARE
  _role user_role;
BEGIN
  -- Safely extract role: only cast if the value is a valid enum member
  IF NEW.raw_user_meta_data ->> 'role' IN ('buyer', 'dealer', 'admin') THEN
    _role := (NEW.raw_user_meta_data ->> 'role')::user_role;
  ELSE
    _role := 'buyer';
  END IF;

  INSERT INTO public.profiles (id, email, role)
  VALUES (NEW.id, NEW.email, _role);

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Re-create the trigger (drop first in case it was removed during debugging)
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Allow the trigger function (running as postgres) to insert profiles.
-- Belt-and-suspenders: SECURITY DEFINER + postgres bypasses RLS anyway,
-- but this makes the intent explicit.
CREATE POLICY IF NOT EXISTS "profiles_insert_trigger" ON profiles FOR INSERT
  TO postgres, service_role
  WITH CHECK (true);
