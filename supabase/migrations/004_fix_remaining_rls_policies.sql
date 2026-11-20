-- Fix remaining RLS policies: all tables besides vehicles (fixed in 003).
-- Original migration 001 created policies without TO clauses, defaulting
-- to the {public} role (which maps to anon). Authenticated users were
-- silently excluded from every policy.
--
-- This migration drops and recreates policies with proper TO clauses.

-- ============================================================
-- PROFILES
-- ============================================================
DROP POLICY IF EXISTS "profiles_select" ON profiles;
DROP POLICY IF EXISTS "profiles_update_own" ON profiles;
DROP POLICY IF EXISTS "profiles_insert_own" ON profiles;

-- Anyone (including anonymous visitors) can read profiles
CREATE POLICY "profiles_select" ON profiles FOR SELECT
  TO anon, authenticated
  USING (true);

-- Users can update their own profile
CREATE POLICY "profiles_update_own" ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Users can insert their own profile (signup flow)
CREATE POLICY "profiles_insert_own" ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- ============================================================
-- AUCTIONS
-- ============================================================
DROP POLICY IF EXISTS "auctions_select" ON auctions;
DROP POLICY IF EXISTS "auctions_insert_admin" ON auctions;
DROP POLICY IF EXISTS "auctions_update_admin" ON auctions;

-- Public auctions visible to everyone; dealers see their own; admins see all
CREATE POLICY "auctions_select" ON auctions FOR SELECT
  TO anon, authenticated
  USING (
    status IN ('active', 'ended', 'sold', 'no_sale')
    OR dealer_id = auth.uid()
    OR EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Only admins can create auctions
CREATE POLICY "auctions_insert_admin" ON auctions FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Only admins can update auctions
CREATE POLICY "auctions_update_admin" ON auctions FOR UPDATE
  TO authenticated
  USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- ============================================================
-- BIDS
-- ============================================================
DROP POLICY IF EXISTS "bids_select" ON bids;
DROP POLICY IF EXISTS "bids_insert_buyer" ON bids;

-- Bidders see their own bids; anyone can see bids on active auctions
CREATE POLICY "bids_select" ON bids FOR SELECT
  TO authenticated
  USING (
    bidder_id = auth.uid()
    OR EXISTS (
      SELECT 1 FROM auctions WHERE auctions.id = bids.auction_id AND auctions.status = 'active'
    )
  );

-- Only buyers can place bids
CREATE POLICY "bids_insert_buyer" ON bids FOR INSERT
  TO authenticated
  WITH CHECK (
    bidder_id = auth.uid()
    AND EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'buyer')
  );

-- ============================================================
-- TRANSACTIONS
-- ============================================================
DROP POLICY IF EXISTS "transactions_select" ON transactions;
DROP POLICY IF EXISTS "transactions_update_admin" ON transactions;

-- Buyer, dealer, and admins can see their transactions
CREATE POLICY "transactions_select" ON transactions FOR SELECT
  TO authenticated
  USING (
    buyer_id = auth.uid()
    OR dealer_id = auth.uid()
    OR EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Only admins can update transactions (manage escrow flow)
CREATE POLICY "transactions_update_admin" ON transactions FOR UPDATE
  TO authenticated
  USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- ============================================================
-- WATCHLIST
-- ============================================================
DROP POLICY IF EXISTS "watchlist_select_own" ON watchlist;
DROP POLICY IF EXISTS "watchlist_insert_own" ON watchlist;
DROP POLICY IF EXISTS "watchlist_delete_own" ON watchlist;

CREATE POLICY "watchlist_select_own" ON watchlist FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "watchlist_insert_own" ON watchlist FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "watchlist_delete_own" ON watchlist FOR DELETE
  TO authenticated
  USING (user_id = auth.uid());

-- ============================================================
-- NOTIFICATIONS
-- ============================================================
DROP POLICY IF EXISTS "notifications_select_own" ON notifications;
DROP POLICY IF EXISTS "notifications_update_own" ON notifications;

CREATE POLICY "notifications_select_own" ON notifications FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "notifications_update_own" ON notifications FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid());
