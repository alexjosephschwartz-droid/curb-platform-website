'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function DealerDashboard() {
  const [activeTab, setActiveTab] = useState<'active' | 'scheduled' | 'ended'>('active');

  // Mock dealer data
  const dealer = {
    name: 'Premium Auto Wholesalers',
    rating: 4.8,
    totalSales: 142,
    balance: 45230,
  };

  // Mock listings data
  const listings = {
    active: [
      {
        id: '1',
        vehicle: '2019 Honda Civic EX',
        currentBid: 12500,
        bidCount: 8,
        timeRemaining: '2d 5h',
        status: 'Active',
      },
      {
        id: '3',
        vehicle: '2018 Ford F-150 XLT',
        currentBid: 19800,
        bidCount: 15,
        timeRemaining: '2d 18h',
        status: 'Active',
      },
    ],
    scheduled: [
      {
        id: '7',
        vehicle: '2020 Honda Accord Sport',
        startTime: 'Starts in 3 days',
        reservePrice: 16500,
        status: 'Scheduled',
      },
    ],
    ended: [
      {
        id: '2',
        vehicle: '2020 Toyota Camry SE',
        finalBid: 16200,
        winner: 'Buyer ***89',
        status: 'Sold',
        nextStep: 'Begin repairs',
      },
      {
        id: '5',
        vehicle: '2019 Chevrolet Silverado 1500',
        finalBid: 23400,
        winner: 'Buyer ***34',
        status: 'In Repair',
        nextStep: 'Upload completion photos',
      },
    ],
  };

  const stats = [
    { label: 'Total Listings', value: '24', change: '+3 this month' },
    { label: 'Active Auctions', value: listings.active.length.toString(), change: 'Live now' },
    { label: 'Sell-Through Rate', value: '87%', change: '+5% vs last month' },
    { label: 'Avg Sale Price', value: '$14,250', change: 'All categories' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-curb-navy text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold">CURB</span>
              <span className="ml-3 text-sm text-gray-400">Dealer Portal</span>
            </Link>
            <div className="flex items-center gap-6">
              <Link href="/dealer/dashboard" className="text-white hover:text-curb-orange transition">
                Dashboard
              </Link>
              <Link href="/dealer/list-vehicle" className="text-gray-300 hover:text-white transition">
                List Vehicle
              </Link>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm font-semibold">{dealer.name}</p>
                  <p className="text-xs text-gray-400">★ {dealer.rating} • {dealer.totalSales} sales</p>
                </div>
                <div className="w-10 h-10 bg-curb-orange rounded-full flex items-center justify-center font-bold">
                  {dealer.name[0]}
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-curb-navy mb-2">Dashboard</h1>
          <p className="text-gray-600">Manage your listings and track performance</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:border-curb-orange/30 transition">
              <p className="text-xs uppercase tracking-wider text-gray-500 font-semibold mb-2">{stat.label}</p>
              <p className="text-3xl font-bold text-curb-navy mb-2">{stat.value}</p>
              <p className="text-xs text-gray-600">{stat.change}</p>
            </div>
          ))}
        </div>

        {/* Balance Card */}
        <div className="bg-gradient-to-r from-curb-orange to-orange-600 rounded-xl shadow-lg p-6 mb-8 text-white">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm opacity-90 mb-1">Available Balance</p>
              <p className="text-4xl font-bold">${dealer.balance.toLocaleString()}</p>
              <p className="text-sm opacity-90 mt-2">Next payout: 2 business days</p>
            </div>
            <button className="bg-white text-curb-orange px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
              View Payouts
            </button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Link
            href="/dealer/list-vehicle"
            className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition group border border-gray-100"
          >
            <div className="w-12 h-12 bg-curb-orange/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-curb-orange/20 transition">
              <svg className="w-6 h-6 text-curb-orange" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M12 4v16m8-8H4"></path>
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-curb-navy mb-2 group-hover:text-curb-orange transition">
              List New Vehicle
            </h3>
            <p className="text-gray-600 text-sm">Start a new 3-day auction</p>
          </Link>
          <button className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition group text-left border border-gray-100">
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-100 transition">
              <svg className="w-6 h-6 text-blue-600" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-curb-navy mb-2 group-hover:text-blue-600 transition">
              View Analytics
            </h3>
            <p className="text-gray-600 text-sm">Performance trends & insights</p>
          </button>
          <button className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition group text-left border border-gray-100">
            <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center mb-4 group-hover:bg-green-100 transition">
              <svg className="w-6 h-6 text-green-600" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-curb-navy mb-2 group-hover:text-green-600 transition">
              Messages
            </h3>
            <p className="text-gray-600 text-sm">2 new buyer questions</p>
          </button>
        </div>

        {/* Listings Section */}
        <div className="bg-white rounded-xl shadow-sm">
          <div className="border-b border-gray-200">
            <div className="flex gap-8 px-6">
              <button
                onClick={() => setActiveTab('active')}
                className={`py-4 border-b-2 font-semibold transition ${
                  activeTab === 'active'
                    ? 'border-curb-orange text-curb-orange'
                    : 'border-transparent text-gray-500 hover:text-curb-navy'
                }`}
              >
                Active ({listings.active.length})
              </button>
              <button
                onClick={() => setActiveTab('scheduled')}
                className={`py-4 border-b-2 font-semibold transition ${
                  activeTab === 'scheduled'
                    ? 'border-curb-orange text-curb-orange'
                    : 'border-transparent text-gray-500 hover:text-curb-navy'
                }`}
              >
                Scheduled ({listings.scheduled.length})
              </button>
              <button
                onClick={() => setActiveTab('ended')}
                className={`py-4 border-b-2 font-semibold transition ${
                  activeTab === 'ended'
                    ? 'border-curb-orange text-curb-orange'
                    : 'border-transparent text-gray-500 hover:text-curb-navy'
                }`}
              >
                Ended ({listings.ended.length})
              </button>
            </div>
          </div>

          <div className="p-6">
            {/* Active Listings */}
            {activeTab === 'active' && (
              <div className="space-y-4">
                {listings.active.map((listing) => (
                  <div
                    key={listing.id}
                    className="border border-gray-200 rounded-lg p-4 hover:border-curb-orange transition"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold text-curb-navy mb-1">{listing.vehicle}</h3>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span>Current Bid: <span className="font-semibold text-curb-orange">${listing.currentBid.toLocaleString()}</span></span>
                          <span>•</span>
                          <span>{listing.bidCount} bids</span>
                          <span>•</span>
                          <span className="text-red-600 font-medium">{listing.timeRemaining} remaining</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Link
                          href={`/vehicle/${listing.id}`}
                          className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition text-sm font-medium"
                        >
                          View Listing
                        </Link>
                        <button className="px-4 py-2 bg-curb-orange text-white rounded-lg hover:bg-orange-600 transition text-sm font-medium">
                          Manage
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Scheduled Listings */}
            {activeTab === 'scheduled' && (
              <div className="space-y-4">
                {listings.scheduled.map((listing) => (
                  <div
                    key={listing.id}
                    className="border border-gray-200 rounded-lg p-4 hover:border-curb-orange transition"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold text-curb-navy mb-1">{listing.vehicle}</h3>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span>Reserve Price: <span className="font-semibold">${listing.reservePrice.toLocaleString()}</span></span>
                          <span>•</span>
                          <span className="text-blue-600">{listing.startTime}</span>
                        </div>
                      </div>
                      <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition text-sm font-medium">
                        Edit Listing
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Ended Listings */}
            {activeTab === 'ended' && (
              <div className="space-y-4">
                {listings.ended.map((listing) => (
                  <div
                    key={listing.id}
                    className="border border-gray-200 rounded-lg p-4 hover:border-curb-orange transition"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold text-curb-navy mb-1">{listing.vehicle}</h3>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span>Final Bid: <span className="font-semibold text-green-600">${listing.finalBid.toLocaleString()}</span></span>
                          <span>•</span>
                          <span>Winner: {listing.winner}</span>
                          <span>•</span>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            listing.status === 'Sold' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                          }`}>
                            {listing.status}
                          </span>
                        </div>
                        <p className="text-sm text-curb-orange font-medium mt-2">Next: {listing.nextStep}</p>
                      </div>
                      <button className="px-4 py-2 bg-curb-orange text-white rounded-lg hover:bg-orange-600 transition text-sm font-medium">
                        {listing.status === 'Sold' ? 'Begin Repairs' : 'Continue'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
