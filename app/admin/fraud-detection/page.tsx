'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function FraudDetectionPage() {
  const [activeTab, setActiveTab] = useState<'flagged' | 'patterns' | 'blocked'>('flagged');

  const flaggedActivities = [
    {
      id: 1,
      type: 'Suspicious Bidding',
      severity: 'High',
      user: 'john_smith_2025',
      userId: 'U12345',
      details: 'Rapid account creation (created 2 hours ago) + immediate bid on high-value vehicle ($45K)',
      vehicle: '2023 Tesla Model 3',
      auctionId: 'A789',
      timestamp: '10 minutes ago',
      ipAddress: '192.168.1.45',
      signals: ['New account', 'High-value bid', 'No KYC verification'],
    },
    {
      id: 2,
      type: 'Bid War Pattern',
      severity: 'Critical',
      user: 'buyer_mike88',
      userId: 'U67890',
      details: 'Coordinated bidding with user buyer_tom99 - 12 rapid bids back-and-forth',
      vehicle: '2022 BMW X5',
      auctionId: 'A654',
      timestamp: '1 hour ago',
      ipAddress: '10.0.0.123',
      signals: ['Coordinated bidding', 'Same IP cluster', 'Artificial inflation'],
    },
    {
      id: 3,
      type: 'Payment Failure',
      severity: 'Medium',
      user: 'car_buyer_pro',
      userId: 'U11223',
      details: 'Won 3 auctions in past week, failed to complete payment on all',
      vehicle: '2021 Honda Accord',
      auctionId: 'A543',
      timestamp: '3 hours ago',
      ipAddress: '172.16.0.88',
      signals: ['Multiple wins', 'No payment', 'Wasting dealer time'],
    },
    {
      id: 4,
      type: 'Duplicate Listing',
      severity: 'High',
      user: 'AutoCity Motors',
      userId: 'D445',
      details: 'Listed same VIN (1HGBH41JXMN109186) 3 times in 48 hours',
      vehicle: '2020 Ford Explorer',
      auctionId: 'A432',
      timestamp: '5 hours ago',
      ipAddress: '203.0.113.42',
      signals: ['Duplicate VIN', 'Multiple listings', 'Possible fraud'],
    },
  ];

  const patterns = [
    {
      id: 1,
      pattern: 'Multi-Account Bidding Ring',
      accounts: 5,
      description: 'Group of accounts bidding on same auctions, driving up prices artificially',
      riskScore: 92,
      detectedDate: '2025-02-12',
    },
    {
      id: 2,
      pattern: 'High-Value Non-Payers',
      accounts: 3,
      description: 'Accounts winning high-value auctions ($30K+) but never completing payment',
      riskScore: 88,
      detectedDate: '2025-02-10',
    },
    {
      id: 3,
      pattern: 'Rapid Account Creation',
      accounts: 12,
      description: 'Accounts created within same hour from similar IP ranges',
      riskScore: 75,
      detectedDate: '2025-02-08',
    },
  ];

  const blockedUsers = [
    {
      id: 1,
      username: 'scammer_detected',
      userId: 'U99888',
      reason: 'Confirmed fraud - fake payment confirmations',
      blockedDate: '2025-02-10',
      lifetime: 'Permanent',
    },
    {
      id: 2,
      username: 'bid_manipulator',
      userId: 'U77666',
      reason: 'Coordinated bid inflation with accomplice',
      blockedDate: '2025-02-08',
      lifetime: 'Permanent',
    },
    {
      id: 3,
      username: 'no_pay_buyer',
      userId: 'U55444',
      reason: 'Won 5 auctions, failed to pay on all',
      blockedDate: '2025-02-05',
      lifetime: '90 days',
    },
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Critical':
        return 'bg-red-100 text-red-700 border-red-300';
      case 'High':
        return 'bg-orange-100 text-orange-700 border-orange-300';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-curb-navy mb-2">🛡️ Fraud Detection</h1>
          <p className="text-gray-600">AI-powered monitoring and pattern detection</p>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold text-gray-600">Flagged Today</h3>
              <span className="text-2xl">🚩</span>
            </div>
            <p className="text-3xl font-bold text-curb-navy">12</p>
            <p className="text-sm text-red-600 mt-1">+3 from yesterday</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold text-gray-600">Active Patterns</h3>
              <span className="text-2xl">🔍</span>
            </div>
            <p className="text-3xl font-bold text-curb-navy">3</p>
            <p className="text-sm text-gray-500 mt-1">Under investigation</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold text-gray-600">Blocked Users</h3>
              <span className="text-2xl">🚫</span>
            </div>
            <p className="text-3xl font-bold text-curb-navy">47</p>
            <p className="text-sm text-gray-500 mt-1">Lifetime + temporary</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold text-gray-600">Prevented Loss</h3>
              <span className="text-2xl">💰</span>
            </div>
            <p className="text-3xl font-bold text-green-600">$142K</p>
            <p className="text-sm text-gray-500 mt-1">This month</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm mb-6">
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab('flagged')}
              className={`flex-1 px-6 py-4 font-semibold transition ${
                activeTab === 'flagged'
                  ? 'text-curb-orange border-b-2 border-curb-orange'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              🚩 Flagged Activities
            </button>
            <button
              onClick={() => setActiveTab('patterns')}
              className={`flex-1 px-6 py-4 font-semibold transition ${
                activeTab === 'patterns'
                  ? 'text-curb-orange border-b-2 border-curb-orange'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              🔍 Fraud Patterns
            </button>
            <button
              onClick={() => setActiveTab('blocked')}
              className={`flex-1 px-6 py-4 font-semibold transition ${
                activeTab === 'blocked'
                  ? 'text-curb-orange border-b-2 border-curb-orange'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              🚫 Blocked Users
            </button>
          </div>
        </div>

        {/* Flagged Activities */}
        {activeTab === 'flagged' && (
          <div className="space-y-4">
            {flaggedActivities.map((activity) => (
              <div key={activity.id} className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="text-4xl">🚨</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-curb-navy">{activity.type}</h3>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold border ${getSeverityColor(
                            activity.severity
                          )}`}
                        >
                          {activity.severity}
                        </span>
                      </div>
                      <p className="text-gray-700 mb-3">{activity.details}</p>
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">User: </span>
                          <span className="font-semibold">
                            {activity.user} ({activity.userId})
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-500">Vehicle: </span>
                          <span className="font-semibold">{activity.vehicle}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">IP: </span>
                          <span className="font-mono text-xs">{activity.ipAddress}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Detected: </span>
                          <span className="font-semibold">{activity.timestamp}</span>
                        </div>
                      </div>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {activity.signals.map((signal, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-red-50 text-red-700 text-xs rounded border border-red-200"
                          >
                            {signal}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 pt-4 border-t">
                  <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition font-semibold">
                    Block User
                  </button>
                  <button className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition font-semibold">
                    Require KYC
                  </button>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition font-semibold">
                    Contact User
                  </button>
                  <button className="border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-100 transition font-semibold">
                    Mark as False Positive
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Fraud Patterns */}
        {activeTab === 'patterns' && (
          <div className="space-y-4">
            {patterns.map((pattern) => (
              <div key={pattern.id} className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-start gap-4">
                  <div className="text-4xl">🕵️</div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-xl font-bold text-curb-navy">{pattern.pattern}</h3>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">Risk Score:</span>
                        <span className="text-2xl font-bold text-red-600">{pattern.riskScore}</span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">{pattern.description}</p>
                    <div className="flex gap-6 text-sm mb-4">
                      <div>
                        <span className="text-gray-500">Involved Accounts: </span>
                        <span className="font-semibold">{pattern.accounts}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">First Detected: </span>
                        <span className="font-semibold">{pattern.detectedDate}</span>
                      </div>
                    </div>

                    {/* Risk Score Bar */}
                    <div className="mb-4">
                      <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-yellow-500 to-red-600 rounded-full"
                          style={{ width: `${pattern.riskScore}%` }}
                        />
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <button className="bg-curb-orange text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition font-semibold">
                        View Details
                      </button>
                      <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition font-semibold">
                        Block All Accounts
                      </button>
                      <button className="border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-100 transition font-semibold">
                        Export Report
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Blocked Users */}
        {activeTab === 'blocked' && (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Username
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    User ID
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Reason
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Blocked Date
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Duration
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {blockedUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-semibold text-curb-navy">{user.username}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{user.userId}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{user.reason}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{user.blockedDate}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                          user.lifetime === 'Permanent'
                            ? 'bg-red-100 text-red-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}
                      >
                        {user.lifetime}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button className="text-curb-orange hover:underline text-sm font-semibold">
                        Unblock
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
