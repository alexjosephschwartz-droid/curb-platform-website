'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function AdminDashboard() {
  const [timeRange, setTimeRange] = useState('30d');

  // Mock data
  const kpis = {
    gmv: 1245000,
    gmvGrowth: 12.5,
    takeRate: 5.8,
    activeBuyers: 342,
    activeDealers: 28,
    activeAuctions: 45,
    conversionRate: 87,
    avgSalePrice: 14250,
  };

  const pendingApprovals = [
    { id: '1', businessName: 'Elite Auto Group', location: 'San Diego, CA', date: '2 hours ago', type: 'dealer' },
    { id: '2', businessName: 'Premier Motors', location: 'Los Angeles, CA', date: '5 hours ago', type: 'dealer' },
    { id: '3', businessName: 'Valley Auto Sales', location: 'Orange County, CA', date: '1 day ago', type: 'dealer' },
  ];

  const recentDisputes = [
    { id: '1', vehicle: '2019 Honda Civic', buyer: 'John D.', dealer: 'Premium Auto', status: 'Open', issue: 'Repair quality concern' },
    { id: '2', vehicle: '2020 Toyota Camry', buyer: 'Sarah M.', dealer: 'Elite Motors', status: 'Investigating', issue: 'Missing documentation' },
  ];

  const flaggedAuctions = [
    { id: '1', vehicle: '2021 Tesla Model 3', reason: 'Rapid bid escalation', bidCount: 45, currentBid: 35000 },
    { id: '2', vehicle: '2018 BMW X5', reason: 'Same IP multiple bids', bidCount: 12, currentBid: 28000 },
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
              <Link href="/admin/dashboard" className="text-white hover:text-curb-orange transition">
                Dashboard
              </Link>
              <Link href="/admin/dealers" className="text-gray-300 hover:text-white transition">
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
              <div className="flex items-center gap-3 ml-4 pl-4 border-l border-gray-600">
                <div className="w-8 h-8 bg-curb-orange rounded-full flex items-center justify-center font-bold text-sm">
                  A
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-curb-navy mb-2">Admin Dashboard</h1>
            <p className="text-gray-600">Platform overview and operations management</p>
          </div>
          <div>
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-curb-orange"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
              <option value="12m">Last 12 months</option>
            </select>
          </div>
        </div>

        {/* KPI Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-500">GMV (Gross Merchandise Value)</p>
              <span className="text-green-600 text-sm font-semibold">↑ {kpis.gmvGrowth}%</span>
            </div>
            <p className="text-3xl font-bold text-curb-navy mb-1">${(kpis.gmv / 1000).toFixed(0)}K</p>
            <p className="text-xs text-gray-500">Total vehicle sales</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <p className="text-sm text-gray-500 mb-2">Platform Take Rate</p>
            <p className="text-3xl font-bold text-curb-orange mb-1">{kpis.takeRate}%</p>
            <p className="text-xs text-gray-500">Revenue / GMV</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <p className="text-sm text-gray-500 mb-2">Active Buyers</p>
            <p className="text-3xl font-bold text-curb-navy mb-1">{kpis.activeBuyers}</p>
            <p className="text-xs text-gray-500">Last 30 days</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <p className="text-sm text-gray-500 mb-2">Active Dealers</p>
            <p className="text-3xl font-bold text-curb-navy mb-1">{kpis.activeDealers}</p>
            <p className="text-xs text-gray-500">Approved & listing</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <p className="text-sm text-gray-500 mb-2">Active Auctions</p>
            <p className="text-3xl font-bold text-curb-orange mb-1">{kpis.activeAuctions}</p>
            <p className="text-xs text-gray-500">Live right now</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <p className="text-sm text-gray-500 mb-2">Conversion Rate</p>
            <p className="text-3xl font-bold text-green-600 mb-1">{kpis.conversionRate}%</p>
            <p className="text-xs text-gray-500">Listings → Sales</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <p className="text-sm text-gray-500 mb-2">Avg Sale Price</p>
            <p className="text-3xl font-bold text-curb-navy mb-1">${kpis.avgSalePrice.toLocaleString()}</p>
            <p className="text-xs text-gray-500">All categories</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <p className="text-sm text-gray-500 mb-2">Revenue (30d)</p>
            <p className="text-3xl font-bold text-green-600 mb-1">${Math.round(kpis.gmv * (kpis.takeRate / 100) / 1000)}K</p>
            <p className="text-xs text-gray-500">Fees + premiums</p>
          </div>
        </div>

        {/* Alerts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Pending Approvals */}
          <div className="bg-white rounded-xl shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-curb-navy">Pending Approvals</h2>
                <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-semibold">
                  {pendingApprovals.length}
                </span>
              </div>
            </div>
            <div className="p-6 space-y-4">
              {pendingApprovals.map((approval) => (
                <div key={approval.id} className="border border-gray-200 rounded-lg p-4 hover:border-curb-orange transition">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-curb-navy">{approval.businessName}</h3>
                      <p className="text-sm text-gray-600">{approval.location}</p>
                    </div>
                    <span className="text-xs text-gray-500">{approval.date}</span>
                  </div>
                  <div className="flex gap-2">
                    <button className="flex-1 px-3 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition">
                      Approve
                    </button>
                    <button className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 transition">
                      Review
                    </button>
                  </div>
                </div>
              ))}
              <Link
                href="/admin/dealers"
                className="block text-center text-curb-orange hover:text-orange-600 font-medium text-sm mt-4"
              >
                View All Approvals →
              </Link>
            </div>
          </div>

          {/* Recent Disputes */}
          <div className="bg-white rounded-xl shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-curb-navy">Recent Disputes</h2>
                <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-semibold">
                  {recentDisputes.length}
                </span>
              </div>
            </div>
            <div className="p-6 space-y-4">
              {recentDisputes.map((dispute) => (
                <div key={dispute.id} className="border border-gray-200 rounded-lg p-4 hover:border-curb-orange transition">
                  <h3 className="font-semibold text-curb-navy mb-1">{dispute.vehicle}</h3>
                  <p className="text-sm text-gray-600 mb-2">{dispute.issue}</p>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500">{dispute.buyer} vs {dispute.dealer}</span>
                    <span className={`px-2 py-1 rounded font-medium ${
                      dispute.status === 'Open' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
                    }`}>
                      {dispute.status}
                    </span>
                  </div>
                  <button className="w-full mt-3 px-3 py-2 bg-curb-orange text-white rounded-lg text-sm font-medium hover:bg-orange-600 transition">
                    Investigate
                  </button>
                </div>
              ))}
              <Link
                href="/admin/auctions"
                className="block text-center text-curb-orange hover:text-orange-600 font-medium text-sm mt-4"
              >
                View All Disputes →
              </Link>
            </div>
          </div>

          {/* Flagged Auctions */}
          <div className="bg-white rounded-xl shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-curb-navy">Flagged Auctions</h2>
                <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-semibold">
                  {flaggedAuctions.length}
                </span>
              </div>
            </div>
            <div className="p-6 space-y-4">
              {flaggedAuctions.map((auction) => (
                <div key={auction.id} className="border border-gray-200 rounded-lg p-4 hover:border-curb-orange transition">
                  <h3 className="font-semibold text-curb-navy mb-1">{auction.vehicle}</h3>
                  <p className="text-sm text-red-600 mb-2">⚠️ {auction.reason}</p>
                  <div className="flex items-center justify-between text-xs mb-3">
                    <span className="text-gray-600">{auction.bidCount} bids</span>
                    <span className="font-semibold text-curb-orange">${auction.currentBid.toLocaleString()}</span>
                  </div>
                  <button className="w-full px-3 py-2 bg-curb-navy text-white rounded-lg text-sm font-medium hover:bg-slate-800 transition">
                    Review Auction
                  </button>
                </div>
              ))}
              <Link
                href="/admin/auctions"
                className="block text-center text-curb-orange hover:text-orange-600 font-medium text-sm mt-4"
              >
                View All Flagged →
              </Link>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* GMV Trend */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-bold text-curb-navy mb-4">GMV Trend</h2>
            <div className="h-64 flex items-end justify-around gap-2">
              {[850, 920, 1100, 1050, 1180, 1245].map((value, index) => (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div
                    className="w-full bg-gradient-to-t from-curb-orange to-orange-400 rounded-t transition-all hover:opacity-80"
                    style={{ height: `${(value / 1300) * 100}%` }}
                  />
                  <span className="text-xs text-gray-500 mt-2">
                    {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'][index]}
                  </span>
                  <span className="text-xs font-semibold text-curb-navy">${value}K</span>
                </div>
              ))}
            </div>
          </div>

          {/* Category Breakdown */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-bold text-curb-navy mb-6">Sales by Category</h2>
            <div className="space-y-4">
              {[
                { category: 'Sedans', count: 142, percentage: 35 },
                { category: 'SUVs', count: 98, percentage: 25 },
                { category: 'Trucks', count: 85, percentage: 21 },
                { category: 'Coupes', count: 52, percentage: 13 },
                { category: 'Vans', count: 23, percentage: 6 },
              ].map((item) => (
                <div key={item.category}>
                  <div className="flex justify-between mb-1 text-sm">
                    <span className="text-gray-700 font-medium">{item.category}</span>
                    <span className="text-gray-500">{item.count} sales ({item.percentage}%)</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-curb-orange h-2 rounded-full transition-all"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
