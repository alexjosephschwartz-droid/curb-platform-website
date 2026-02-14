'use client';

import { useState } from 'react';
import Link from 'next/link';

type Tab = 'active' | 'flagged' | 'disputes';

export default function AdminAuctions() {
  const [activeTab, setActiveTab] = useState<Tab>('active');

  // Mock data
  const activeAuctions = [
    {
      id: '1',
      vehicle: '2019 Honda Civic EX',
      dealer: 'Premium Auto',
      currentBid: 12500,
      bidCount: 8,
      timeRemaining: '2d 5h',
      status: 'Active',
      views: 142,
    },
    {
      id: '2',
      vehicle: '2020 Toyota Camry SE',
      dealer: 'Elite Motors',
      currentBid: 16200,
      bidCount: 12,
      timeRemaining: '1d 3h',
      status: 'Ending Soon',
      views: 256,
    },
  ];

  const flaggedAuctions = [
    {
      id: '3',
      vehicle: '2021 Tesla Model 3',
      dealer: 'Valley Auto',
      currentBid: 35000,
      bidCount: 45,
      reason: 'Rapid bid escalation',
      severity: 'High',
      flaggedTime: '15 mins ago',
    },
    {
      id: '4',
      vehicle: '2018 BMW X5',
      dealer: 'Quick Sales',
      currentBid: 28000,
      bidCount: 12,
      reason: 'Same IP multiple bids',
      severity: 'Medium',
      flaggedTime: '2 hours ago',
    },
  ];

  const disputes = [
    {
      id: '1',
      vehicle: '2019 Honda Civic',
      buyer: 'John D. (buyer***23)',
      dealer: 'Premium Auto Wholesalers',
      issue: 'Repair quality concern',
      description: 'Buyer claims brake replacement was not completed properly',
      status: 'Open',
      priority: 'High',
      createdDate: '2 hours ago',
    },
    {
      id: '2',
      vehicle: '2020 Toyota Camry',
      buyer: 'Sarah M. (buyer***89)',
      dealer: 'Elite Motors',
      issue: 'Missing documentation',
      description: 'Title transfer documents not provided',
      status: 'Investigating',
      priority: 'Medium',
      createdDate: '1 day ago',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-curb-navy text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/admin/dashboard" className="flex items-center gap-3">
              <span className="text-2xl font-bold">CURB</span>
              <span className="px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full">ADMIN</span>
            </Link>
            <div className="flex items-center gap-6">
              <Link href="/admin/dashboard" className="text-gray-300 hover:text-white transition">
                Dashboard
              </Link>
              <Link href="/admin/dealers" className="text-gray-300 hover:text-white transition">
                Dealers
              </Link>
              <Link href="/admin/auctions" className="text-white hover:text-curb-orange transition">
                Auctions
              </Link>
              <Link href="/admin/escrow" className="text-gray-300 hover:text-white transition">
                Escrow
              </Link>
              <Link href="/admin/users" className="text-gray-300 hover:text-white transition">
                Users
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-curb-navy mb-2">Auction Monitoring</h1>
          <p className="text-gray-600">Monitor live auctions, fraud detection, and dispute resolution</p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm mb-6">
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
                Active Auctions ({activeAuctions.length})
              </button>
              <button
                onClick={() => setActiveTab('flagged')}
                className={`py-4 border-b-2 font-semibold transition ${
                  activeTab === 'flagged'
                    ? 'border-curb-orange text-curb-orange'
                    : 'border-transparent text-gray-500 hover:text-curb-navy'
                }`}
              >
                Flagged ({flaggedAuctions.length})
              </button>
              <button
                onClick={() => setActiveTab('disputes')}
                className={`py-4 border-b-2 font-semibold transition ${
                  activeTab === 'disputes'
                    ? 'border-curb-orange text-curb-orange'
                    : 'border-transparent text-gray-500 hover:text-curb-navy'
                }`}
              >
                Disputes ({disputes.length})
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Active Auctions */}
            {activeTab === 'active' && (
              <div className="space-y-4">
                {activeAuctions.map((auction) => (
                  <div key={auction.id} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-bold text-curb-navy mb-1">{auction.vehicle}</h3>
                        <p className="text-sm text-gray-600">Listed by {auction.dealer}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        auction.status === 'Ending Soon'
                          ? 'bg-red-100 text-red-700'
                          : 'bg-green-100 text-green-700'
                      }`}>
                        {auction.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-5 gap-4 mb-4">
                      <div className="bg-gray-50 rounded-lg p-3">
                        <p className="text-xs text-gray-500 mb-1">Current Bid</p>
                        <p className="text-lg font-bold text-curb-orange">${auction.currentBid.toLocaleString()}</p>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3">
                        <p className="text-xs text-gray-500 mb-1">Bid Count</p>
                        <p className="text-lg font-bold text-curb-navy">{auction.bidCount}</p>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3">
                        <p className="text-xs text-gray-500 mb-1">Time Left</p>
                        <p className="text-lg font-bold text-red-600">{auction.timeRemaining}</p>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3">
                        <p className="text-xs text-gray-500 mb-1">Views</p>
                        <p className="text-lg font-bold text-curb-navy">{auction.views}</p>
                      </div>
                      <div className="flex items-center">
                        <Link
                          href={`/vehicle/${auction.id}`}
                          className="w-full px-4 py-2 bg-curb-orange text-white rounded-lg hover:bg-orange-600 transition text-center font-medium"
                        >
                          View Auction
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Flagged Auctions */}
            {activeTab === 'flagged' && (
              <div className="space-y-4">
                {flaggedAuctions.map((auction) => (
                  <div key={auction.id} className="border border-orange-200 rounded-lg p-6 bg-orange-50">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-bold text-curb-navy">{auction.vehicle}</h3>
                          <span className={`px-2 py-1 rounded text-xs font-bold ${
                            auction.severity === 'High'
                              ? 'bg-red-600 text-white'
                              : 'bg-yellow-600 text-white'
                          }`}>
                            {auction.severity} Risk
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-1">Listed by {auction.dealer}</p>
                        <p className="text-sm text-red-600 font-medium">⚠️ {auction.reason}</p>
                        <p className="text-xs text-gray-500 mt-1">Flagged {auction.flaggedTime}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600 mb-1">Current Bid</p>
                        <p className="text-2xl font-bold text-curb-orange">${auction.currentBid.toLocaleString()}</p>
                        <p className="text-sm text-gray-600">{auction.bidCount} bids</p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <button className="flex-1 px-6 py-3 bg-curb-navy text-white rounded-lg font-semibold hover:bg-slate-800 transition">
                        Review Bid History
                      </button>
                      <button className="flex-1 px-6 py-3 bg-yellow-600 text-white rounded-lg font-semibold hover:bg-yellow-700 transition">
                        Contact Dealer
                      </button>
                      <button className="flex-1 px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition">
                        Cancel Auction
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Disputes */}
            {activeTab === 'disputes' && (
              <div className="space-y-4">
                {disputes.map((dispute) => (
                  <div key={dispute.id} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-bold text-curb-navy">{dispute.vehicle}</h3>
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            dispute.priority === 'High'
                              ? 'bg-red-100 text-red-700'
                              : 'bg-yellow-100 text-yellow-700'
                          }`}>
                            {dispute.priority} Priority
                          </span>
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            dispute.status === 'Open'
                              ? 'bg-red-100 text-red-700'
                              : 'bg-blue-100 text-blue-700'
                          }`}>
                            {dispute.status}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-1">
                          {dispute.buyer} vs {dispute.dealer}
                        </p>
                        <p className="text-sm font-medium text-curb-navy mb-2">{dispute.issue}</p>
                        <p className="text-sm text-gray-700 mb-2">{dispute.description}</p>
                        <p className="text-xs text-gray-500">Opened {dispute.createdDate}</p>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4 mb-4">
                      <h4 className="text-sm font-semibold text-curb-navy mb-3">Resolution Actions</h4>
                      <div className="grid grid-cols-3 gap-3">
                        <button className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition">
                          Approve Buyer
                        </button>
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition">
                          Approve Dealer
                        </button>
                        <button className="px-4 py-2 bg-curb-orange text-white rounded-lg text-sm font-medium hover:bg-orange-600 transition">
                          Partial Refund
                        </button>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <button className="flex-1 px-4 py-3 bg-curb-navy text-white rounded-lg font-semibold hover:bg-slate-800 transition">
                        View Full Details
                      </button>
                      <button className="flex-1 px-4 py-3 border border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition">
                        Contact Buyer
                      </button>
                      <button className="flex-1 px-4 py-3 border border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition">
                        Contact Dealer
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
