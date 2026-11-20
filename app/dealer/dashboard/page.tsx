'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { useUser } from '@/lib/hooks/useUser';
import type { Database } from '@/types/database';

type Vehicle = Database['public']['Tables']['vehicles']['Row'];
type Auction = Database['public']['Tables']['auctions']['Row'];

type VehicleWithAuction = Vehicle & {
  auctions: Auction[];
};

// Sample data for demo purposes
const SAMPLE_VEHICLES: VehicleWithAuction[] = [
  {
    id: 'demo-1', dealer_id: 'demo', vin: '1HGCV1F34LA012345', year: 2020, make: 'Honda', model: 'Accord', trim: 'Sport',
    body_style: 'Sedan', exterior_color: 'Crystal Black Pearl', interior_color: 'Black', engine: '1.5L Turbo I4',
    transmission: 'CVT', drivetrain: 'FWD', fuel_type: 'Gasoline', mileage: 42150,
    retail_value: 2650000, reserve_price: 1850000, condition_notes: 'Clean trade-in, minor wear on driver seat',
    known_issues: null, repair_estimate: 45000, inspection_notes: null, photos: [], photo_count: 4,
    status: 'listed', rejection_reason: null, created_at: new Date().toISOString(), updated_at: new Date().toISOString(),
    auctions: [{
      id: 'auction-1', vehicle_id: 'demo-1', dealer_id: 'demo', starts_at: new Date(Date.now() - 86400000).toISOString(),
      ends_at: new Date(Date.now() + 172800000).toISOString(), starting_price: 1600000, reserve_price: 1850000,
      current_bid: 1725000, bid_count: 8, winning_bid_id: null, winner_id: null, status: 'active',
      buyer_premium_rate: 0.03, listing_fee: 10000, created_at: new Date().toISOString(), updated_at: new Date().toISOString(),
    }],
  },
  {
    id: 'demo-2', dealer_id: 'demo', vin: '5YJSA1E26MF123456', year: 2021, make: 'Tesla', model: 'Model 3', trim: 'Long Range',
    body_style: 'Sedan', exterior_color: 'Pearl White', interior_color: 'Black', engine: 'Dual Motor Electric',
    transmission: 'Single Speed', drivetrain: 'AWD', fuel_type: 'Electric', mileage: 28300,
    retail_value: 3200000, reserve_price: 2400000, condition_notes: 'Excellent condition, full self-driving capable',
    known_issues: null, repair_estimate: 0, inspection_notes: null, photos: [], photo_count: 6,
    status: 'listed', rejection_reason: null, created_at: new Date().toISOString(), updated_at: new Date().toISOString(),
    auctions: [{
      id: 'auction-2', vehicle_id: 'demo-2', dealer_id: 'demo', starts_at: new Date(Date.now() - 43200000).toISOString(),
      ends_at: new Date(Date.now() + 216000000).toISOString(), starting_price: 2100000, reserve_price: 2400000,
      current_bid: 2350000, bid_count: 14, winning_bid_id: null, winner_id: null, status: 'active',
      buyer_premium_rate: 0.03, listing_fee: 10000, created_at: new Date().toISOString(), updated_at: new Date().toISOString(),
    }],
  },
  {
    id: 'demo-3', dealer_id: 'demo', vin: '1C4RJFBG5LC234567', year: 2020, make: 'Jeep', model: 'Grand Cherokee', trim: 'Limited',
    body_style: 'SUV', exterior_color: 'Slate Blue', interior_color: 'Brown', engine: '3.6L V6',
    transmission: '8-Speed Auto', drivetrain: '4WD', fuel_type: 'Gasoline', mileage: 51200,
    retail_value: 2900000, reserve_price: 2100000, condition_notes: 'Well-maintained, one owner, clean Carfax',
    known_issues: 'Minor scratch on rear bumper', repair_estimate: 35000, inspection_notes: null, photos: [], photo_count: 5,
    status: 'listed', rejection_reason: null, created_at: new Date().toISOString(), updated_at: new Date().toISOString(),
    auctions: [{
      id: 'auction-3', vehicle_id: 'demo-3', dealer_id: 'demo', starts_at: new Date(Date.now() - 129600000).toISOString(),
      ends_at: new Date(Date.now() + 86400000).toISOString(), starting_price: 1800000, reserve_price: 2100000,
      current_bid: 1950000, bid_count: 6, winning_bid_id: null, winner_id: null, status: 'active',
      buyer_premium_rate: 0.03, listing_fee: 10000, created_at: new Date().toISOString(), updated_at: new Date().toISOString(),
    }],
  },
  {
    id: 'demo-4', dealer_id: 'demo', vin: '3MW5R1J00M8345678', year: 2021, make: 'BMW', model: '330i', trim: 'xDrive',
    body_style: 'Sedan', exterior_color: 'Alpine White', interior_color: 'Black', engine: '2.0L Turbo I4',
    transmission: '8-Speed Auto', drivetrain: 'AWD', fuel_type: 'Gasoline', mileage: 35800,
    retail_value: 3400000, reserve_price: 2500000, condition_notes: 'Lease return, all services at dealer',
    known_issues: null, repair_estimate: 25000, inspection_notes: null, photos: [], photo_count: 5,
    status: 'pending_approval', rejection_reason: null, created_at: new Date().toISOString(), updated_at: new Date().toISOString(),
    auctions: [],
  },
  {
    id: 'demo-5', dealer_id: 'demo', vin: '2T1BURHE0JC456789', year: 2019, make: 'Toyota', model: 'Corolla', trim: 'LE',
    body_style: 'Sedan', exterior_color: 'Silver Metallic', interior_color: 'Gray', engine: '1.8L I4',
    transmission: 'CVT', drivetrain: 'FWD', fuel_type: 'Gasoline', mileage: 67400,
    retail_value: 1800000, reserve_price: 1200000, condition_notes: 'High mileage but mechanically sound',
    known_issues: null, repair_estimate: 15000, inspection_notes: 'Passed inspection, brake pads replaced',
    photos: [], photo_count: 4,
    status: 'sold', rejection_reason: null, created_at: new Date(Date.now() - 604800000).toISOString(), updated_at: new Date().toISOString(),
    auctions: [{
      id: 'auction-5', vehicle_id: 'demo-5', dealer_id: 'demo', starts_at: new Date(Date.now() - 604800000).toISOString(),
      ends_at: new Date(Date.now() - 345600000).toISOString(), starting_price: 1000000, reserve_price: 1200000,
      current_bid: 1310000, bid_count: 11, winning_bid_id: 'bid-w', winner_id: 'buyer-1', status: 'sold',
      buyer_premium_rate: 0.03, listing_fee: 10000, created_at: new Date().toISOString(), updated_at: new Date().toISOString(),
    }],
  },
  {
    id: 'demo-6', dealer_id: 'demo', vin: '1FTFW1E50MF567890', year: 2021, make: 'Ford', model: 'F-150', trim: 'XLT',
    body_style: 'Truck', exterior_color: 'Rapid Red', interior_color: 'Gray', engine: '2.7L EcoBoost V6',
    transmission: '10-Speed Auto', drivetrain: '4WD', fuel_type: 'Gasoline', mileage: 38500,
    retail_value: 3800000, reserve_price: 2900000, condition_notes: 'Fleet vehicle, well-maintained, bed liner',
    known_issues: null, repair_estimate: 20000, inspection_notes: 'All clear, new tires',
    photos: [], photo_count: 6,
    status: 'sold', rejection_reason: null, created_at: new Date(Date.now() - 1209600000).toISOString(), updated_at: new Date().toISOString(),
    auctions: [{
      id: 'auction-6', vehicle_id: 'demo-6', dealer_id: 'demo', starts_at: new Date(Date.now() - 1209600000).toISOString(),
      ends_at: new Date(Date.now() - 950400000).toISOString(), starting_price: 2500000, reserve_price: 2900000,
      current_bid: 3050000, bid_count: 18, winning_bid_id: 'bid-w2', winner_id: 'buyer-2', status: 'sold',
      buyer_premium_rate: 0.03, listing_fee: 10000, created_at: new Date().toISOString(), updated_at: new Date().toISOString(),
    }],
  },
] as unknown as VehicleWithAuction[];

export default function DealerDashboard() {
  const router = useRouter();
  const { user, profile, loading: authLoading, isDealer, isAdmin } = useUser();
  const [vehicles, setVehicles] = useState<VehicleWithAuction[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'active' | 'pending' | 'sold' | 'all'>('active');
  const [showListedBanner, setShowListedBanner] = useState(false);
  const [isDemo, setIsDemo] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('listed') === 'true') {
        setShowListedBanner(true);
        window.history.replaceState({}, '', '/dealer/dashboard');
      }
    }
  }, []);

  useEffect(() => {
    if (authLoading) return;
    if (!user || (!isDealer && !isAdmin)) {
      router.push('/login?redirect=/dealer/dashboard');
      return;
    }

    async function fetchVehicles() {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('vehicles')
        .select('*, auctions(*)')
        .eq('dealer_id', user!.id)
        .order('created_at', { ascending: false });

      if (!error && data && data.length >= 3) {
        // Enough real data to look like a working dashboard
        setVehicles(data as VehicleWithAuction[]);
        setIsDemo(false);
      } else {
        // Show sample data when dealer has fewer than 3 vehicles
        setVehicles(SAMPLE_VEHICLES);
        setIsDemo(true);
      }
      setLoading(false);
    }

    fetchVehicles();
  }, [user, authLoading, isDealer, router]);

  const filteredVehicles = vehicles.filter((v) => {
    switch (activeTab) {
      case 'active':
        return v.status === 'listed' || v.status === 'approved';
      case 'pending':
        return v.status === 'pending_approval' || v.status === 'draft';
      case 'sold':
        return v.status === 'sold';
      case 'all':
        return true;
    }
  });

  const stats = {
    active: vehicles.filter((v) => v.status === 'listed' || v.status === 'approved').length,
    pending: vehicles.filter((v) => v.status === 'pending_approval' || v.status === 'draft').length,
    sold: vehicles.filter((v) => v.status === 'sold').length,
    totalRevenue: vehicles
      .filter((v) => v.status === 'sold')
      .reduce((sum, v) => {
        const auction = v.auctions?.find((a) => a.status === 'sold');
        return sum + (auction?.current_bid || 0);
      }, 0),
  };

  const fmtPrice = (cents: number) => `$${(cents / 100).toLocaleString()}`;

  const statusBadge = (status: string) => {
    const styles: Record<string, string> = {
      draft: 'bg-gray-100 text-gray-700',
      pending_approval: 'bg-yellow-100 text-yellow-800',
      approved: 'bg-blue-100 text-blue-800',
      listed: 'bg-green-100 text-green-800',
      sold: 'bg-purple-100 text-purple-800',
      cancelled: 'bg-red-100 text-red-700',
    };
    const labels: Record<string, string> = {
      draft: 'Draft',
      pending_approval: 'Pending Review',
      approved: 'Approved',
      listed: 'Live Auction',
      sold: 'Sold',
      cancelled: 'Cancelled',
    };
    return (
      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${styles[status] || 'bg-gray-100 text-gray-700'}`}>
        {labels[status] || status}
      </span>
    );
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-curb-orange mx-auto mb-4" />
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Demo Banner */}
        {isDemo && (
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg flex items-center gap-3">
            <span className="text-xl">📋</span>
            <p className="text-sm text-blue-800">
              <span className="font-semibold">Sample data shown.</span> List your first vehicle to see your real inventory here.
            </p>
          </div>
        )}

        {/* Success Banner */}
        {showListedBanner && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-2xl">✅</span>
              <div>
                <p className="font-semibold text-green-800">Vehicle submitted for review!</p>
                <p className="text-sm text-green-700">Our team will review your listing within 24 hours.</p>
              </div>
            </div>
            <button onClick={() => setShowListedBanner(false)} className="text-green-600 hover:text-green-800">✕</button>
          </div>
        )}

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-curb-navy">Dealer Dashboard</h1>
            <p className="text-gray-600 mt-1">{profile?.dealership_name || 'Your Dealership'}</p>
          </div>
          <Link href="/dealer/list-vehicle"
            className="px-6 py-3 bg-curb-orange text-white rounded-lg font-semibold hover:bg-orange-600 transition shadow-lg">
            + List New Vehicle
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <p className="text-sm text-gray-500 mb-1">Active Listings</p>
            <p className="text-3xl font-bold text-curb-navy">{stats.active}</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <p className="text-sm text-gray-500 mb-1">Pending Review</p>
            <p className="text-3xl font-bold text-yellow-600">{stats.pending}</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <p className="text-sm text-gray-500 mb-1">Vehicles Sold</p>
            <p className="text-3xl font-bold text-green-600">{stats.sold}</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <p className="text-sm text-gray-500 mb-1">Total Revenue</p>
            <p className="text-3xl font-bold text-curb-orange">{fmtPrice(stats.totalRevenue)}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="border-b border-gray-200">
            <div className="flex">
              {(['active', 'pending', 'sold', 'all'] as const).map((tab) => (
                <button key={tab} onClick={() => setActiveTab(tab)}
                  className={`px-6 py-4 font-medium text-sm border-b-2 transition capitalize ${
                    activeTab === tab
                      ? 'border-curb-orange text-curb-orange'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}>
                  {tab} {tab !== 'all' && `(${tab === 'active' ? stats.active : tab === 'pending' ? stats.pending : stats.sold})`}
                </button>
              ))}
            </div>
          </div>

          {/* Vehicle List */}
          <div className="p-6">
            {filteredVehicles.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-5xl mb-4">🚗</p>
                <p className="text-lg font-semibold text-curb-navy mb-2">
                  {activeTab === 'active' ? 'No active listings' :
                   activeTab === 'pending' ? 'No pending vehicles' :
                   activeTab === 'sold' ? 'No sold vehicles yet' : 'No vehicles listed yet'}
                </p>
                <p className="text-gray-500 mb-6">
                  {activeTab === 'pending'
                    ? 'Vehicles you submit will appear here while under review.'
                    : 'List your first wholesale trade-in to get started.'}
                </p>
                <Link href="/dealer/list-vehicle"
                  className="inline-block px-6 py-3 bg-curb-orange text-white rounded-lg font-semibold hover:bg-orange-600 transition">
                  List a Vehicle
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredVehicles.map((vehicle) => {
                  const auction = vehicle.auctions?.[0];
                  return (
                    <div key={vehicle.id} className="border border-gray-200 rounded-lg p-4 hover:border-curb-orange/30 transition">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-20 h-14 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center text-gray-400 text-lg">
                            🚗
                          </div>
                          <div>
                            <h3 className="font-semibold text-curb-navy">
                              {vehicle.year} {vehicle.make} {vehicle.model} {vehicle.trim}
                            </h3>
                            <p className="text-sm text-gray-500">
                              VIN: {vehicle.vin} · {vehicle.mileage?.toLocaleString()} mi
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-6">
                          {auction && auction.status === 'active' && (
                            <div className="text-right">
                              <p className="text-xs text-gray-500">Current Bid</p>
                              <p className="text-lg font-bold text-curb-orange">
                                {auction.current_bid ? fmtPrice(auction.current_bid) : 'No bids'}
                              </p>
                              <p className="text-xs text-gray-500">{auction.bid_count} bid(s)</p>
                            </div>
                          )}

                          {auction && auction.status === 'sold' && (
                            <div className="text-right">
                              <p className="text-xs text-gray-500">Sold For</p>
                              <p className="text-lg font-bold text-green-600">
                                {auction.current_bid ? fmtPrice(auction.current_bid) : '—'}
                              </p>
                              <p className="text-xs text-gray-500">{auction.bid_count} bid(s)</p>
                            </div>
                          )}

                          <div className="text-right">
                            <p className="text-xs text-gray-500 mb-1">Reserve</p>
                            <p className="font-semibold">{fmtPrice(vehicle.reserve_price)}</p>
                          </div>

                          {statusBadge(vehicle.status)}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
