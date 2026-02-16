'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<'account' | 'security' | 'notifications' | 'privacy'>(
    'account'
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <h1 className="text-3xl font-bold text-curb-navy mb-8">Settings</h1>

        <div className="grid md:grid-cols-4 gap-6">
          {/* Sidebar Navigation */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-4 sticky top-8">
              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab('account')}
                  className={`w-full text-left px-4 py-3 rounded-lg transition ${
                    activeTab === 'account'
                      ? 'bg-curb-orange text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Account
                </button>
                <button
                  onClick={() => setActiveTab('security')}
                  className={`w-full text-left px-4 py-3 rounded-lg transition ${
                    activeTab === 'security'
                      ? 'bg-curb-orange text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Security
                </button>
                <button
                  onClick={() => setActiveTab('notifications')}
                  className={`w-full text-left px-4 py-3 rounded-lg transition ${
                    activeTab === 'notifications'
                      ? 'bg-curb-orange text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Notifications
                </button>
                <button
                  onClick={() => setActiveTab('privacy')}
                  className={`w-full text-left px-4 py-3 rounded-lg transition ${
                    activeTab === 'privacy'
                      ? 'bg-curb-orange text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Privacy
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="md:col-span-3">
            {/* Account Settings */}
            {activeTab === 'account' && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-sm p-8">
                  <h2 className="text-2xl font-bold text-curb-navy mb-6">Account Settings</h2>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Display Name
                      </label>
                      <input
                        type="text"
                        defaultValue="John Smith"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-curb-orange focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <div className="flex gap-3">
                        <input
                          type="email"
                          defaultValue="john.smith@example.com"
                          className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-curb-orange focus:border-transparent"
                        />
                        <button className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition font-semibold">
                          Change
                        </button>
                      </div>
                      <p className="text-sm text-green-600 mt-2 flex items-center gap-2">
                        <span>✓</span> Verified
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <div className="flex gap-3">
                        <input
                          type="tel"
                          defaultValue="(555) 123-4567"
                          className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-curb-orange focus:border-transparent"
                        />
                        <button className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition font-semibold">
                          Change
                        </button>
                      </div>
                      <p className="text-sm text-green-600 mt-2 flex items-center gap-2">
                        <span>✓</span> Verified
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Language
                      </label>
                      <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-curb-orange focus:border-transparent">
                        <option>English (US)</option>
                        <option>Español</option>
                        <option>Français</option>
                        <option>Deutsch</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Time Zone
                      </label>
                      <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-curb-orange focus:border-transparent">
                        <option>Pacific Time (PT)</option>
                        <option>Mountain Time (MT)</option>
                        <option>Central Time (CT)</option>
                        <option>Eastern Time (ET)</option>
                      </select>
                    </div>

                    <button className="bg-curb-orange text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-600 transition">
                      Save Changes
                    </button>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-8">
                  <h3 className="text-xl font-bold text-curb-navy mb-4">Delete Account</h3>
                  <p className="text-gray-600 mb-4">
                    Permanently delete your account and all associated data. This action cannot be undone.
                  </p>
                  <button className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition">
                    Delete My Account
                  </button>
                </div>
              </div>
            )}

            {/* Security Settings */}
            {activeTab === 'security' && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-sm p-8">
                  <h2 className="text-2xl font-bold text-curb-navy mb-6">Security Settings</h2>

                  <div className="space-y-6">
                    <div>
                      <h3 className="font-semibold text-curb-navy mb-4">Change Password</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Current Password
                          </label>
                          <input
                            type="password"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-curb-orange focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            New Password
                          </label>
                          <input
                            type="password"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-curb-orange focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Confirm New Password
                          </label>
                          <input
                            type="password"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-curb-orange focus:border-transparent"
                          />
                        </div>
                        <button className="bg-curb-orange text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition">
                          Update Password
                        </button>
                      </div>
                    </div>

                    <div className="pt-6 border-t">
                      <h3 className="font-semibold text-curb-navy mb-4">Two-Factor Authentication</h3>
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                        <div className="flex items-center gap-3">
                          <span className="text-green-600 text-2xl">✓</span>
                          <div>
                            <p className="font-semibold text-green-800">2FA Enabled</p>
                            <p className="text-sm text-green-700">Via SMS to (555) xxx-4567</p>
                          </div>
                        </div>
                      </div>
                      <button className="border border-gray-300 px-6 py-3 rounded-lg hover:bg-gray-100 transition font-semibold">
                        Configure 2FA
                      </button>
                    </div>

                    <div className="pt-6 border-t">
                      <h3 className="font-semibold text-curb-navy mb-4">Active Sessions</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                          <div className="flex items-center gap-4">
                            <div className="text-3xl">💻</div>
                            <div>
                              <p className="font-semibold text-curb-navy">MacBook Pro</p>
                              <p className="text-sm text-gray-500">Los Angeles, CA • Current session</p>
                            </div>
                          </div>
                          <span className="text-green-600 font-semibold">Active</span>
                        </div>
                        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                          <div className="flex items-center gap-4">
                            <div className="text-3xl">📱</div>
                            <div>
                              <p className="font-semibold text-curb-navy">iPhone 15 Pro</p>
                              <p className="text-sm text-gray-500">Los Angeles, CA • 2 hours ago</p>
                            </div>
                          </div>
                          <button className="text-red-600 hover:underline font-semibold">
                            Revoke
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Notification Settings */}
            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-sm p-8">
                  <h2 className="text-2xl font-bold text-curb-navy mb-6">Notification Settings</h2>

                  <div className="space-y-8">
                    <div>
                      <h3 className="font-semibold text-curb-navy mb-4">Email Notifications</h3>
                      <div className="space-y-4">
                        <label className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                          <div>
                            <p className="font-semibold text-gray-800">Bid Updates</p>
                            <p className="text-sm text-gray-500">When you're outbid or win an auction</p>
                          </div>
                          <input
                            type="checkbox"
                            defaultChecked
                            className="w-5 h-5 text-curb-orange border-gray-300 rounded focus:ring-curb-orange"
                          />
                        </label>
                        <label className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                          <div>
                            <p className="font-semibold text-gray-800">Auction Endings</p>
                            <p className="text-sm text-gray-500">Reminders when auctions are ending soon</p>
                          </div>
                          <input
                            type="checkbox"
                            defaultChecked
                            className="w-5 h-5 text-curb-orange border-gray-300 rounded focus:ring-curb-orange"
                          />
                        </label>
                        <label className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                          <div>
                            <p className="font-semibold text-gray-800">New Listings</p>
                            <p className="text-sm text-gray-500">Vehicles matching your saved searches</p>
                          </div>
                          <input
                            type="checkbox"
                            defaultChecked
                            className="w-5 h-5 text-curb-orange border-gray-300 rounded focus:ring-curb-orange"
                          />
                        </label>
                        <label className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                          <div>
                            <p className="font-semibold text-gray-800">Newsletters</p>
                            <p className="text-sm text-gray-500">Weekly digest and platform updates</p>
                          </div>
                          <input
                            type="checkbox"
                            className="w-5 h-5 text-curb-orange border-gray-300 rounded focus:ring-curb-orange"
                          />
                        </label>
                      </div>
                    </div>

                    <div className="border-t pt-8">
                      <h3 className="font-semibold text-curb-navy mb-4">SMS Notifications</h3>
                      <div className="space-y-4">
                        <label className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                          <div>
                            <p className="font-semibold text-gray-800">Urgent Bid Alerts</p>
                            <p className="text-sm text-gray-500">Immediate notifications when outbid</p>
                          </div>
                          <input
                            type="checkbox"
                            defaultChecked
                            className="w-5 h-5 text-curb-orange border-gray-300 rounded focus:ring-curb-orange"
                          />
                        </label>
                        <label className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                          <div>
                            <p className="font-semibold text-gray-800">Auction Ending (30 min)</p>
                            <p className="text-sm text-gray-500">Final reminder before auction ends</p>
                          </div>
                          <input
                            type="checkbox"
                            defaultChecked
                            className="w-5 h-5 text-curb-orange border-gray-300 rounded focus:ring-curb-orange"
                          />
                        </label>
                        <label className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                          <div>
                            <p className="font-semibold text-gray-800">Security Alerts</p>
                            <p className="text-sm text-gray-500">Login attempts and account changes</p>
                          </div>
                          <input
                            type="checkbox"
                            defaultChecked
                            className="w-5 h-5 text-curb-orange border-gray-300 rounded focus:ring-curb-orange"
                          />
                        </label>
                      </div>
                    </div>

                    <div className="border-t pt-8">
                      <h3 className="font-semibold text-curb-navy mb-4">Push Notifications</h3>
                      <div className="space-y-4">
                        <label className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                          <div>
                            <p className="font-semibold text-gray-800">All Push Notifications</p>
                            <p className="text-sm text-gray-500">Enable browser/app notifications</p>
                          </div>
                          <input
                            type="checkbox"
                            defaultChecked
                            className="w-5 h-5 text-curb-orange border-gray-300 rounded focus:ring-curb-orange"
                          />
                        </label>
                      </div>
                    </div>

                    <button className="bg-curb-orange text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-600 transition">
                      Save Preferences
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Privacy Settings */}
            {activeTab === 'privacy' && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-sm p-8">
                  <h2 className="text-2xl font-bold text-curb-navy mb-6">Privacy Settings</h2>

                  <div className="space-y-6">
                    <div>
                      <h3 className="font-semibold text-curb-navy mb-4">Profile Visibility</h3>
                      <div className="space-y-3">
                        <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                          <input
                            type="radio"
                            name="visibility"
                            defaultChecked
                            className="w-4 h-4 text-curb-orange border-gray-300 focus:ring-curb-orange"
                          />
                          <div>
                            <p className="font-semibold text-gray-800">Public</p>
                            <p className="text-sm text-gray-500">
                              Your profile and bid history are visible to other users
                            </p>
                          </div>
                        </label>
                        <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                          <input
                            type="radio"
                            name="visibility"
                            className="w-4 h-4 text-curb-orange border-gray-300 focus:ring-curb-orange"
                          />
                          <div>
                            <p className="font-semibold text-gray-800">Private</p>
                            <p className="text-sm text-gray-500">Only you can see your profile information</p>
                          </div>
                        </label>
                      </div>
                    </div>

                    <div className="pt-6 border-t">
                      <h3 className="font-semibold text-curb-navy mb-4">Data & Privacy</h3>
                      <div className="space-y-4">
                        <label className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                          <div>
                            <p className="font-semibold text-gray-800">Activity Tracking</p>
                            <p className="text-sm text-gray-500">
                              Allow us to track your activity to improve recommendations
                            </p>
                          </div>
                          <input
                            type="checkbox"
                            defaultChecked
                            className="w-5 h-5 text-curb-orange border-gray-300 rounded focus:ring-curb-orange"
                          />
                        </label>
                        <label className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                          <div>
                            <p className="font-semibold text-gray-800">Personalized Ads</p>
                            <p className="text-sm text-gray-500">Show ads based on your interests</p>
                          </div>
                          <input
                            type="checkbox"
                            className="w-5 h-5 text-curb-orange border-gray-300 rounded focus:ring-curb-orange"
                          />
                        </label>
                      </div>
                    </div>

                    <div className="pt-6 border-t">
                      <h3 className="font-semibold text-curb-navy mb-4">Data Management</h3>
                      <div className="space-y-3">
                        <button className="w-full p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left">
                          <p className="font-semibold text-gray-800">Download My Data</p>
                          <p className="text-sm text-gray-500">Get a copy of all your account data</p>
                        </button>
                        <button className="w-full p-4 border border-red-200 rounded-lg hover:bg-red-50 text-left">
                          <p className="font-semibold text-red-600">Delete All My Data</p>
                          <p className="text-sm text-gray-500">
                            Permanently delete all your data from Curb
                          </p>
                        </button>
                      </div>
                    </div>

                    <button className="bg-curb-orange text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-600 transition">
                      Save Privacy Settings
                    </button>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-8">
                  <h3 className="text-xl font-bold text-curb-navy mb-4">Legal</h3>
                  <div className="space-y-3">
                    <Link
                      href="/terms"
                      className="block text-curb-orange hover:underline font-semibold"
                    >
                      Terms of Service →
                    </Link>
                    <Link
                      href="/privacy"
                      className="block text-curb-orange hover:underline font-semibold"
                    >
                      Privacy Policy →
                    </Link>
                    <Link
                      href="/cookies"
                      className="block text-curb-orange hover:underline font-semibold"
                    >
                      Cookie Policy →
                    </Link>
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
