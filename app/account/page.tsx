'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState<'profile' | 'bids' | 'watchlist' | 'payments'>('profile');

  // Mock user data
  const user = {
    firstName: 'John',
    lastName: 'Smith',
    email: 'john.smith@example.com',
    phone: '(555) 123-4567',
    address: '123 Main St, Los Angeles, CA 90001',
    memberSince: 'January 2025',
    verified: true,
  };

  const myBids = [
    {
      id: 1,
      vehicle: '2022 Honda Civic EX',
      currentBid: 19500,
      myBid: 19500,
      timeLeft: '2h 34m',
      status: 'winning',
      image: '🚗',
    },
    {
      id: 2,
      vehicle: '2021 Toyota Camry SE',
      currentBid: 18200,
      myBid: 17800,
      timeLeft: '5h 12m',
      status: 'outbid',
      image: '🚙',
    },
    {
      id: 3,
      vehicle: '2020 Ford F-150 XLT',
      currentBid: 28500,
      myBid: 28500,
      timeLeft: 'Ended',
      status: 'won',
      image: '🚛',
    },
  ];

  const watchlist = [
    { id: 4, vehicle: '2023 Mazda CX-5', price: 22000, timeLeft: '1d 4h', image: '🚗' },
    { id: 5, vehicle: '2021 Subaru Outback', price: 24500, timeLeft: '3d 8h', image: '🚙' },
  ];

  const savedCards = [
    { last4: '4242', brand: 'Visa', expiry: '12/26', isDefault: true },
    { last4: '5555', brand: 'Mastercard', expiry: '08/27', isDefault: false },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-curb-navy text-white py-4 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold">
              CURB
            </Link>
            <nav className="flex gap-6">
              <Link href="/browse" className="hover:text-curb-orange transition">
                Browse
              </Link>
              <Link href="/notifications" className="hover:text-curb-orange transition relative">
                Notifications
                <span className="absolute -top-1 -right-1 bg-curb-orange text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  3
                </span>
              </Link>
              <Link href="/settings" className="hover:text-curb-orange transition">
                Settings
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="text-center mb-6">
                <div className="w-24 h-24 bg-gradient-to-br from-curb-orange to-orange-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-3xl font-bold">
                  {user.firstName[0]}{user.lastName[0]}
                </div>
                <h2 className="text-xl font-bold text-curb-navy">
                  {user.firstName} {user.lastName}
                </h2>
                {user.verified && (
                  <div className="flex items-center justify-center gap-1 text-green-600 text-sm mt-2">
                    <span>✓</span>
                    <span>Verified Account</span>
                  </div>
                )}
                <p className="text-sm text-gray-500 mt-1">Member since {user.memberSince}</p>
              </div>

              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`w-full text-left px-4 py-3 rounded-lg transition ${
                    activeTab === 'profile'
                      ? 'bg-curb-orange text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  👤 Profile
                </button>
                <button
                  onClick={() => setActiveTab('bids')}
                  className={`w-full text-left px-4 py-3 rounded-lg transition ${
                    activeTab === 'bids'
                      ? 'bg-curb-orange text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  🏷️ My Bids
                </button>
                <button
                  onClick={() => setActiveTab('watchlist')}
                  className={`w-full text-left px-4 py-3 rounded-lg transition ${
                    activeTab === 'watchlist'
                      ? 'bg-curb-orange text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  ⭐ Watchlist
                </button>
                <button
                  onClick={() => setActiveTab('payments')}
                  className={`w-full text-left px-4 py-3 rounded-lg transition ${
                    activeTab === 'payments'
                      ? 'bg-curb-orange text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  💳 Payments
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="md:col-span-3">
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="bg-white rounded-xl shadow-sm p-8">
                <h2 className="text-2xl font-bold text-curb-navy mb-6">Profile Information</h2>

                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        defaultValue={user.firstName}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-curb-orange focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        defaultValue={user.lastName}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-curb-orange focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      defaultValue={user.email}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-curb-orange focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      defaultValue={user.phone}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-curb-orange focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Address
                    </label>
                    <input
                      type="text"
                      defaultValue={user.address}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-curb-orange focus:border-transparent"
                    />
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      className="bg-curb-orange text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-600 transition"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>

                <div className="mt-8 pt-8 border-t">
                  <h3 className="text-lg font-bold text-curb-navy mb-4">Account Verification</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <span className="text-green-600 text-xl">✓</span>
                      <span className="text-gray-700">Email verified</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-green-600 text-xl">✓</span>
                      <span className="text-gray-700">Phone verified</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-yellow-500 text-xl">⏳</span>
                      <span className="text-gray-700">
                        Identity verification pending{' '}
                        <button className="text-curb-orange hover:underline ml-2">
                          Upload documents
                        </button>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* My Bids Tab */}
            {activeTab === 'bids' && (
              <div className="bg-white rounded-xl shadow-sm p-8">
                <h2 className="text-2xl font-bold text-curb-navy mb-6">My Bids</h2>

                <div className="space-y-4">
                  {myBids.map((bid) => (
                    <div
                      key={bid.id}
                      className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="text-5xl">{bid.image}</div>
                          <div>
                            <h3 className="font-bold text-curb-navy text-lg">{bid.vehicle}</h3>
                            <div className="flex gap-4 mt-2 text-sm">
                              <span className="text-gray-600">
                                Current Bid: <strong>${bid.currentBid.toLocaleString()}</strong>
                              </span>
                              <span className="text-gray-600">
                                Your Bid: <strong>${bid.myBid.toLocaleString()}</strong>
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="text-right">
                          <div
                            className={`inline-block px-4 py-2 rounded-full text-sm font-semibold mb-2 ${
                              bid.status === 'winning'
                                ? 'bg-green-100 text-green-700'
                                : bid.status === 'outbid'
                                  ? 'bg-red-100 text-red-700'
                                  : 'bg-blue-100 text-blue-700'
                            }`}
                          >
                            {bid.status === 'winning' && '🏆 Winning'}
                            {bid.status === 'outbid' && '⚠️ Outbid'}
                            {bid.status === 'won' && '✅ Won'}
                          </div>
                          <p className="text-sm text-gray-500">{bid.timeLeft}</p>
                          {bid.status === 'outbid' && (
                            <Link
                              href={`/vehicle/${bid.id}`}
                              className="text-curb-orange hover:underline text-sm mt-2 inline-block"
                            >
                              Place new bid →
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Watchlist Tab */}
            {activeTab === 'watchlist' && (
              <div className="bg-white rounded-xl shadow-sm p-8">
                <h2 className="text-2xl font-bold text-curb-navy mb-6">Watchlist</h2>

                <div className="space-y-4">
                  {watchlist.map((item) => (
                    <div
                      key={item.id}
                      className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="text-5xl">{item.image}</div>
                          <div>
                            <h3 className="font-bold text-curb-navy text-lg">{item.vehicle}</h3>
                            <p className="text-gray-600 mt-1">
                              Current Bid: <strong>${item.price.toLocaleString()}</strong>
                            </p>
                          </div>
                        </div>

                        <div className="text-right">
                          <p className="text-sm text-gray-500 mb-3">Ends in {item.timeLeft}</p>
                          <div className="flex gap-2">
                            <Link
                              href={`/vehicle/${item.id}`}
                              className="bg-curb-orange text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition text-sm"
                            >
                              View & Bid
                            </Link>
                            <button className="border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-100 transition text-sm">
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {watchlist.length === 0 && (
                    <div className="text-center py-12 text-gray-500">
                      <p className="text-lg mb-2">Your watchlist is empty</p>
                      <p className="text-sm">
                        <Link href="/browse" className="text-curb-orange hover:underline">
                          Browse vehicles
                        </Link>{' '}
                        and add them to your watchlist
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Payments Tab */}
            {activeTab === 'payments' && (
              <div className="bg-white rounded-xl shadow-sm p-8">
                <h2 className="text-2xl font-bold text-curb-navy mb-6">Payment Methods</h2>

                <div className="space-y-4 mb-6">
                  {savedCards.map((card, index) => (
                    <div
                      key={index}
                      className="border border-gray-200 rounded-lg p-6 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-gray-700 to-gray-900 rounded-lg flex items-center justify-center text-white font-bold">
                          {card.brand === 'Visa' ? 'V' : 'M'}
                        </div>
                        <div>
                          <p className="font-semibold text-curb-navy">
                            {card.brand} ending in {card.last4}
                          </p>
                          <p className="text-sm text-gray-500">Expires {card.expiry}</p>
                          {card.isDefault && (
                            <span className="inline-block mt-1 bg-green-100 text-green-700 text-xs px-2 py-1 rounded">
                              Default
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex gap-2">
                        {!card.isDefault && (
                          <button className="text-curb-orange hover:underline text-sm">
                            Set as default
                          </button>
                        )}
                        <button className="text-red-600 hover:underline text-sm">Remove</button>
                      </div>
                    </div>
                  ))}
                </div>

                <button className="w-full border-2 border-dashed border-gray-300 rounded-lg py-4 text-gray-600 hover:border-curb-orange hover:text-curb-orange transition">
                  + Add New Payment Method
                </button>

                <div className="mt-8 pt-8 border-t">
                  <h3 className="text-lg font-bold text-curb-navy mb-4">Transaction History</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between py-3 border-b">
                      <div>
                        <p className="font-semibold text-curb-navy">2020 Ford F-150 XLT</p>
                        <p className="text-sm text-gray-500">Feb 10, 2025</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-curb-navy">$28,500</p>
                        <p className="text-sm text-green-600">Completed</p>
                      </div>
                    </div>
                    <div className="flex justify-between py-3 border-b">
                      <div>
                        <p className="font-semibold text-curb-navy">Bid Deposit - Honda Civic</p>
                        <p className="text-sm text-gray-500">Feb 12, 2025</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-curb-navy">$500</p>
                        <p className="text-sm text-yellow-600">Pending</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
