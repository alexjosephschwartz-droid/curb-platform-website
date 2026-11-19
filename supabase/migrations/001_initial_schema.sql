-- Curb MVP Database Schema
-- Initial migration: profiles, vehicles, auctions, bids, transactions

-- ============================================================
-- EXTENSIONS
-- ============================================================
create extension if not exists "uuid-ossp";

-- ============================================================
-- ENUMS
-- ============================================================
create type user_role as enum ('buyer', 'dealer', 'admin');
create type vehicle_status as enum ('draft', 'pending_approval', 'approved', 'listed', 'sold', 'cancelled');
create type auction_status as enum ('scheduled', 'active', 'ended', 'sold', 'cancelled', 'no_sale');
create type transaction_status as enum ('pending_payment', 'paid', 'in_escrow', 'inspection_scheduled', 'inspection_complete', 'delivered', 'funds_released', 'disputed', 'refunded', 'cancelled');
create type bid_status as enum ('active', 'outbid', 'won', 'lost');

-- ============================================================
-- PROFILES
-- ============================================================
create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role user_role not null default 'buyer',
  email text not null,
  full_name text,
  phone text,
  -- dealer-specific fields
  dealership_name text,
  dealer_license text,
  dealer_address text,
  dealer_city text,
  dealer_state text,
  dealer_zip text,
  -- buyer-specific fields
  billing_address text,
  -- stripe
  stripe_customer_id text,
  stripe_connect_account_id text, -- dealers only (for payouts)
  -- meta
  is_verified boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ============================================================
-- VEHICLES
-- ============================================================
create table vehicles (
  id uuid primary key default uuid_generate_v4(),
  dealer_id uuid not null references profiles(id) on delete cascade,
  -- VIN decode data (from NHTSA API)
  vin text not null,
  year integer not null,
  make text not null,
  model text not null,
  trim text,
  body_style text,
  exterior_color text,
  interior_color text,
  engine text,
  transmission text,
  drivetrain text,
  fuel_type text,
  mileage integer not null,
  -- Pricing
  retail_value integer, -- KBB/lot price in cents
  reserve_price integer not null, -- minimum acceptable sale price in cents
  -- Condition & repairs
  condition_notes text, -- dealer's description
  known_issues text, -- disclosed problems
  repair_estimate integer, -- estimated repair cost in cents
  inspection_notes text, -- post-inspection notes (filled by Alex)
  -- Photos (array of Supabase Storage URLs)
  photos text[] not null default '{}',
  photo_count integer not null default 0,
  -- Status
  status vehicle_status not null default 'draft',
  rejection_reason text, -- if admin rejects listing
  -- Meta
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index idx_vehicles_dealer on vehicles(dealer_id);
create index idx_vehicles_status on vehicles(status);
create unique index idx_vehicles_vin on vehicles(vin) where status not in ('cancelled', 'sold');

-- ============================================================
-- AUCTIONS
-- ============================================================
create table auctions (
  id uuid primary key default uuid_generate_v4(),
  vehicle_id uuid not null references vehicles(id) on delete cascade,
  dealer_id uuid not null references profiles(id),
  -- Auction timing
  starts_at timestamptz not null,
  ends_at timestamptz not null,
  -- Pricing
  starting_price integer not null, -- in cents
  reserve_price integer not null, -- in cents (hidden from buyers)
  current_bid integer, -- in cents (null = no bids yet)
  bid_count integer not null default 0,
  -- Winner
  winning_bid_id uuid, -- set when auction ends
  winner_id uuid references profiles(id),
  -- Status
  status auction_status not null default 'scheduled',
  -- Buyer premium (3%)
  buyer_premium_rate numeric(5,4) not null default 0.03,
  -- Listing fee charged to dealer
  listing_fee integer not null default 10000, -- $100 in cents
  -- Meta
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index idx_auctions_vehicle on auctions(vehicle_id);
create index idx_auctions_status on auctions(status);
create index idx_auctions_ends_at on auctions(ends_at) where status = 'active';
create index idx_auctions_dealer on auctions(dealer_id);

-- ============================================================
-- BIDS
-- ============================================================
create table bids (
  id uuid primary key default uuid_generate_v4(),
  auction_id uuid not null references auctions(id) on delete cascade,
  bidder_id uuid not null references profiles(id),
  amount integer not null, -- in cents
  status bid_status not null default 'active',
  -- Meta
  created_at timestamptz not null default now()
);

create index idx_bids_auction on bids(auction_id);
create index idx_bids_bidder on bids(bidder_id);
create index idx_bids_auction_amount on bids(auction_id, amount desc);

-- ============================================================
-- TRANSACTIONS (post-auction escrow + delivery flow)
-- ============================================================
create table transactions (
  id uuid primary key default uuid_generate_v4(),
  auction_id uuid not null references auctions(id),
  vehicle_id uuid not null references vehicles(id),
  buyer_id uuid not null references profiles(id),
  dealer_id uuid not null references profiles(id),
  -- Amounts (all in cents)
  sale_price integer not null, -- winning bid
  buyer_premium integer not null, -- 3% of sale price
  listing_fee integer not null, -- $100
  total_buyer_pays integer not null, -- sale_price + buyer_premium
  dealer_payout integer not null, -- sale_price - listing_fee
  -- Stripe
  stripe_payment_intent_id text,
  stripe_transfer_id text, -- payout to dealer
  -- Flow tracking
  status transaction_status not null default 'pending_payment',
  paid_at timestamptz,
  inspection_scheduled_at timestamptz,
  inspection_completed_at timestamptz,
  delivered_at timestamptz,
  funds_released_at timestamptz,
  -- Notes (Alex fills these as he manages the process)
  admin_notes text,
  -- Meta
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index idx_transactions_buyer on transactions(buyer_id);
create index idx_transactions_dealer on transactions(dealer_id);
create index idx_transactions_status on transactions(status);

-- ============================================================
-- WATCHLIST (buyers save vehicles they're interested in)
-- ============================================================
create table watchlist (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references profiles(id) on delete cascade,
  auction_id uuid not null references auctions(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique(user_id, auction_id)
);

-- ============================================================
-- NOTIFICATIONS
-- ============================================================
create table notifications (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references profiles(id) on delete cascade,
  type text not null, -- 'outbid', 'auction_won', 'auction_ending', 'listing_approved', 'payment_received', etc.
  title text not null,
  message text not null,
  data jsonb, -- flexible payload (auction_id, vehicle info, etc.)
  read boolean not null default false,
  created_at timestamptz not null default now()
);

create index idx_notifications_user on notifications(user_id);
create index idx_notifications_unread on notifications(user_id) where read = false;

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

-- Enable RLS on all tables
alter table profiles enable row level security;
alter table vehicles enable row level security;
alter table auctions enable row level security;
alter table bids enable row level security;
alter table transactions enable row level security;
alter table watchlist enable row level security;
alter table notifications enable row level security;

-- PROFILES: users can read any profile, update only their own
create policy "profiles_select" on profiles for select using (true);
create policy "profiles_update_own" on profiles for update using (auth.uid() = id);
create policy "profiles_insert_own" on profiles for insert with check (auth.uid() = id);

-- VEHICLES: anyone can read approved/listed vehicles, dealers manage their own
create policy "vehicles_select_public" on vehicles for select
  using (status in ('approved', 'listed', 'sold') or dealer_id = auth.uid());
create policy "vehicles_insert_dealer" on vehicles for insert
  with check (dealer_id = auth.uid());
create policy "vehicles_update_dealer" on vehicles for update
  using (dealer_id = auth.uid() or exists (
    select 1 from profiles where id = auth.uid() and role = 'admin'
  ));

-- AUCTIONS: anyone can read active/ended auctions, admins manage all
create policy "auctions_select" on auctions for select
  using (status in ('active', 'ended', 'sold', 'no_sale') or dealer_id = auth.uid() or exists (
    select 1 from profiles where id = auth.uid() and role = 'admin'
  ));
create policy "auctions_insert_admin" on auctions for insert
  with check (exists (
    select 1 from profiles where id = auth.uid() and role = 'admin'
  ));
create policy "auctions_update_admin" on auctions for update
  using (exists (
    select 1 from profiles where id = auth.uid() and role = 'admin'
  ));

-- BIDS: bidders see their own bids, auction participants see bid amounts
create policy "bids_select" on bids for select
  using (bidder_id = auth.uid() or exists (
    select 1 from auctions where auctions.id = bids.auction_id and auctions.status = 'active'
  ));
create policy "bids_insert_buyer" on bids for insert
  with check (bidder_id = auth.uid() and exists (
    select 1 from profiles where id = auth.uid() and role = 'buyer'
  ));

-- TRANSACTIONS: buyer and dealer on the transaction, plus admins
create policy "transactions_select" on transactions for select
  using (buyer_id = auth.uid() or dealer_id = auth.uid() or exists (
    select 1 from profiles where id = auth.uid() and role = 'admin'
  ));
create policy "transactions_update_admin" on transactions for update
  using (exists (
    select 1 from profiles where id = auth.uid() and role = 'admin'
  ));

-- WATCHLIST: users manage their own
create policy "watchlist_select_own" on watchlist for select using (user_id = auth.uid());
create policy "watchlist_insert_own" on watchlist for insert with check (user_id = auth.uid());
create policy "watchlist_delete_own" on watchlist for delete using (user_id = auth.uid());

-- NOTIFICATIONS: users see their own
create policy "notifications_select_own" on notifications for select using (user_id = auth.uid());
create policy "notifications_update_own" on notifications for update using (user_id = auth.uid());

-- ============================================================
-- FUNCTIONS
-- ============================================================

-- Auto-create profile on signup
create or replace function handle_new_user()
returns trigger as $$
begin
  insert into profiles (id, email, role)
  values (
    new.id,
    new.email,
    coalesce(
      (new.raw_user_meta_data ->> 'role')::user_role,
      'buyer'
    )
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function handle_new_user();

-- Update updated_at timestamp
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger set_profiles_updated_at before update on profiles
  for each row execute function update_updated_at();
create trigger set_vehicles_updated_at before update on vehicles
  for each row execute function update_updated_at();
create trigger set_auctions_updated_at before update on auctions
  for each row execute function update_updated_at();
create trigger set_transactions_updated_at before update on transactions
  for each row execute function update_updated_at();

-- Place a bid (validates auction is active, bid is higher than current)
create or replace function place_bid(
  p_auction_id uuid,
  p_amount integer
)
returns uuid as $$
declare
  v_auction auctions%rowtype;
  v_bid_id uuid;
begin
  -- Lock the auction row
  select * into v_auction from auctions where id = p_auction_id for update;

  if v_auction is null then
    raise exception 'Auction not found';
  end if;

  if v_auction.status != 'active' then
    raise exception 'Auction is not active';
  end if;

  if now() > v_auction.ends_at then
    raise exception 'Auction has ended';
  end if;

  if v_auction.current_bid is not null and p_amount <= v_auction.current_bid then
    raise exception 'Bid must be higher than current bid of %', v_auction.current_bid;
  end if;

  if p_amount < v_auction.starting_price then
    raise exception 'Bid must be at least the starting price';
  end if;

  -- Mark previous highest bid as outbid
  update bids set status = 'outbid'
  where auction_id = p_auction_id and status = 'active';

  -- Insert new bid
  insert into bids (auction_id, bidder_id, amount, status)
  values (p_auction_id, auth.uid(), p_amount, 'active')
  returning id into v_bid_id;

  -- Update auction
  update auctions
  set current_bid = p_amount,
      bid_count = bid_count + 1,
      updated_at = now()
  where id = p_auction_id;

  return v_bid_id;
end;
$$ language plpgsql security definer;
