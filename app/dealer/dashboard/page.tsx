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

export default function DealerDashboard() {
  const router = useRouter();
  const { user, profile, loading: authLoading, isDealer } = useUser();
  const [vehicles, setVehicles] = useState<VehicleWithAuction[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'active' | 'pending' | 'sold' | 'all'>('active');
  const [showListedBanner, setShowListedBanner] = useState(false);

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
    if (!user || !isDealer) {
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

      if (!error && data) {
        setVehicles(data as VehicleWithAuction[]);
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
                          {vehicle.photos && vehicle.photos.length > 0 ? (
                            <img src={vehicle.photos[0]} alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
                              className="w-20 h-14 object-cover rounded-lg" />
                          ) : (
                            <div className="w-20 h-14 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 text-xs">
                              No photo
                            </div>
                          )}
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
