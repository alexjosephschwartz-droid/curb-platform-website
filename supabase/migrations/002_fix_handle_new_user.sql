-- Fix: handle_new_user() trigger was failing when raw_user_meta_data->>'role'
-- contained an invalid or empty value. The ::user_role cast throws an error
-- BEFORE coalesce can check for NULL, crashing the entire INSERT on auth.users.
--
-- This version safely checks whether the metadata role is a valid enum value
-- before attempting the cast.

create or replace function handle_new_user()
returns trigger as $$
declare
  _role user_role;
begin
  -- Safely extract role: only cast if the value is a valid enum member
  if new.raw_user_meta_data ->> 'role' in ('buyer', 'dealer', 'admin') then
    _role := (new.raw_user_meta_data ->> 'role')::user_role;
  else
    _role := 'buyer';
  end if;

  insert into profiles (id, email, role)
  values (new.id, new.email, _role);

  return new;
end;
$$ language plpgsql security definer;

-- Re-create the trigger (drop first in case it was removed during debugging)
drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function handle_new_user();
