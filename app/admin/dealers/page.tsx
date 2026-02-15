'use client';

import { useState } from 'react';
import Link from 'next/link';

type Tab = 'pending' | 'active' | 'suspended';

export default function AdminDealers() {
  const [activeTab, setActiveTab] = useState<Tab>('pending');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data
  const pendingDealers = [
    {
      id: '1',
      businessName: 'Elite Auto Group',
      email: 'contact@eliteauto.com',
      phone: '(619) 555-0123',
      location: 'San Diego, CA',
      locations: 3,
      volume: '50-100 vehicles/month',
      federalLicense: 'FL-123456',
      stateLicense: 'CA-DEL-789012',
      appliedDate: '2 hours ago',
      documents: ['Business License', 'Resale Certificate', 'Proof of Address'],
    },
    {
      id: '2',
      businessName: 'Premier Motors LLC',
      email: 'info@premiermotors.com',
      phone: '(323) 555-0456',
      location: 'Los Angeles, CA',
      locations: 1,
      volume: '10-50 vehicles/month',
      federalLicense: 'FL-234567',
      stateLicense: 'CA-DEL-890123',
      appliedDate: '5 hours ago',
      documents: ['Business License', 'Resale Certificate'],
    },
  ];

  const activeDealers = [
    {
      id: '3',
      businessName: 'Premium Auto Wholesalers',
      rating: 4.8,
      totalSales: 142,
      activeListings: 5,
      sellThroughRate: 92,
      avgRevenue: 645,
      location: 'Los Angeles, CA',
      joined: 'Jan 15, 2026',
    },
    {
      id: '4',
      businessName: 'Valley Auto Sales',
      rating: 4.6,
      totalSales: 89,
      activeListings: 3,
      sellThroughRate: 85,
      avgRevenue: 580,
      location: 'Orange County, CA',
      joined: 'Jan 22, 2026',
    },
  ];

  const suspendedDealers = [
    {
      id: '5',
      businessName: 'Quick Auto Sales',
      reason: 'Multiple buyer complaints',
      suspendedDate: '3 days ago',
      location: 'Riverside, CA',
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
              <Link href="/admin/dealers" className="text-white hover:text-curb-orange transition">
                Dealers
              </Link>
              <Link href="/admin/auctions" className="text-gray-300 hover:text-white transition">
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
          <h1 className="text-3xl font-bold text-curb-navy mb-2">Dealer Management</h1>
          <p className="text-gray-600">Approve applications and manage dealer accounts</p>
        </div>

        {/* Search */}
        <div className="mb-6">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search dealers by name, email, or location..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-curb-orange"
          />
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm mb-6">
          <div className="border-b border-gray-200">
            <div className="flex gap-8 px-6">
              <button
                onClick={() => setActiveTab('pending')}
                className={`py-4 border-b-2 font-semibold transition ${
                  activeTab === 'pending'
                    ? 'border-curb-orange text-curb-orange'
                    : 'border-transparent text-gray-500 hover:text-curb-navy'
                }`}
              >
                Pending ({pendingDealers.length})
              </button>
              <button
                onClick={() => setActiveTab('active')}
                className={`py-4 border-b-2 font-semibold transition ${
                  activeTab === 'active'
                    ? 'border-curb-orange text-curb-orange'
                    : 'border-transparent text-gray-500 hover:text-curb-navy'
                }`}
              >
                Active ({activeDealers.length})
              </button>
              <button
                onClick={() => setActiveTab('suspended')}
                className={`py-4 border-b-2 font-semibold transition ${
                  activeTab === 'suspended'
                    ? 'border-curb-orange text-curb-orange'
                    : 'border-transparent text-gray-500 hover:text-curb-navy'
                }`}
              >
                Suspended ({suspendedDealers.length})
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Pending Dealers */}
            {activeTab === 'pending' && (
              <div className="space-y-6">
                {pendingDealers.map((dealer) => (
                  <div key={dealer.id} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-curb-navy mb-1">{dealer.businessName}</h3>
                        <p className="text-sm text-gray-600">{dealer.location}</p>
                        <p className="text-xs text-gray-500 mt-1">Applied {dealer.appliedDate}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">Monthly Volume</p>
                        <p className="font-semibold text-curb-navy">{dealer.volume}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Email</p>
                        <p className="text-sm font-medium text-curb-navy">{dealer.email}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Phone</p>
                        <p className="text-sm font-medium text-curb-navy">{dealer.phone}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Federal License</p>
                        <p className="text-sm font-medium text-curb-navy">{dealer.federalLicense}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">State License</p>
                        <p className="text-sm font-medium text-curb-navy">{dealer.stateLicense}</p>
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="text-xs text-gray-500 mb-2">Uploaded Documents</p>
                      <div className="flex gap-2 flex-wrap">
                        {dealer.documents.map((doc) => (
                          <span
                            key={doc}
                            className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium flex items-center gap-1"
                          >
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            {doc}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <button className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition">
                        Approve Dealer
                      </button>
                      <button className="px-6 py-3 border border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition">
                        View Details
                      </button>
                      <button className="px-6 py-3 border border-red-300 text-red-600 rounded-lg font-semibold hover:bg-red-50 transition">
                        Reject
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Active Dealers */}
            {activeTab === 'active' && (
              <div className="space-y-4">
                {activeDealers.map((dealer) => (
                  <div key={dealer.id} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-curb-navy mb-1">{dealer.businessName}</h3>
                        <div className="flex items-center gap-4 text-sm">
                          <span className="text-gray-600">{dealer.location}</span>
                          <span className="text-gray-400">•</span>
                          <span className="text-gray-600">Joined {dealer.joined}</span>
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-yellow-500">★</span>
                          <span className="font-semibold">{dealer.rating}</span>
                          <span className="text-gray-500 text-sm">({dealer.totalSales} sales)</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition text-sm font-medium">
                          View Profile
                        </button>
                        <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition text-sm font-medium">
                          Suspend
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-4 gap-4">
                      <div className="bg-gray-50 rounded-lg p-3">
                        <p className="text-xs text-gray-500 mb-1">Active Listings</p>
                        <p className="text-xl font-bold text-curb-navy">{dealer.activeListings}</p>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3">
                        <p className="text-xs text-gray-500 mb-1">Sell-Through Rate</p>
                        <p className="text-xl font-bold text-green-600">{dealer.sellThroughRate}%</p>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3">
                        <p className="text-xs text-gray-500 mb-1">Avg Revenue/Tx</p>
                        <p className="text-xl font-bold text-curb-orange">${dealer.avgRevenue}</p>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3">
                        <p className="text-xs text-gray-500 mb-1">Total Sales</p>
                        <p className="text-xl font-bold text-curb-navy">{dealer.totalSales}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Suspended Dealers */}
            {activeTab === 'suspended' && (
              <div className="space-y-4">
                {suspendedDealers.map((dealer) => (
                  <div key={dealer.id} className="border border-red-200 rounded-lg p-6 bg-red-50">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-bold text-curb-navy mb-1">{dealer.businessName}</h3>
                        <p className="text-sm text-gray-600 mb-2">{dealer.location}</p>
                        <div className="flex items-center gap-2 text-sm">
                          <div className="w-5 h-5 bg-red-200 rounded flex items-center justify-center flex-shrink-0">
                            <svg className="w-3 h-3 text-red-700" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <span className="text-red-600 font-medium">Suspended:</span>
                          <span className="text-gray-700">{dealer.reason}</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">Suspended {dealer.suspendedDate}</p>
                      </div>
                      <div className="flex gap-2">
                        <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm font-medium">
                          Reinstate
                        </button>
                        <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition text-sm font-medium">
                          Review Case
                        </button>
                      </div>
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
