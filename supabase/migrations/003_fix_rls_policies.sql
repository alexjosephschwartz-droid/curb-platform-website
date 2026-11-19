-- Fix RLS policies: original migration created all policies without TO clause,
-- which defaults to {public} (anon role). Authenticated users need explicit
-- TO authenticated to have policies apply to them.

-- ============================================================
-- VEHICLES: fix all three policies
-- ============================================================
DROP POLICY IF EXISTS "vehicles_insert_dealer" ON vehicles;
DROP POLICY IF EXISTS "vehicles_select_public" ON vehicles;
DROP POLICY IF EXISTS "vehicles_update_dealer" ON vehicles;

CREATE POLICY "vehicles_select_public" ON vehicles FOR SELECT
  TO anon, authenticated
  USING (status IN ('approved', 'listed', 'sold') OR dealer_id = auth.uid());

CREATE POLICY "vehicles_insert_dealer" ON vehicles FOR INSERT
  TO authenticated
  WITH CHECK (dealer_id = auth.uid());

CREATE POLICY "vehicles_update_dealer" ON vehicles FOR UPDATE
  TO authenticated
  USING (dealer_id = auth.uid() OR EXISTS (
    SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
  ));

-- ============================================================
-- STORAGE: vehicle-photos bucket policies
-- ============================================================
INSERT INTO storage.buckets (id, name, public)
VALUES ('vehicle-photos', 'vehicle-photos', true)
ON CONFLICT (id) DO UPDATE SET public = true;

CREATE POLICY "vehicle_photos_insert" ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'vehicle-photos');

CREATE POLICY "vehicle_photos_select" ON storage.objects FOR SELECT
  TO anon, authenticated
  USING (bucket_id = 'vehicle-photos');

CREATE POLICY "vehicle_photos_update" ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'vehicle-photos' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "vehicle_photos_delete" ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'vehicle-photos' AND auth.uid()::text = (storage.foldername(name))[1]);
