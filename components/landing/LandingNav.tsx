'use client';

import { useState } from 'react';
import Link from 'next/link';

const FORMSPREE_URL = 'https://formspree.io/f/xvzrezkd';

export default function LandingNav() {
  const [showBuyerForm, setShowBuyerForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [buyerForm, setBuyerForm] = useState({
    email: '',
    firstName: '',
    lastName: '',
    location: '',
    vehicleType: '',
    priceRange: '',
  });

  const handleBuyerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const response = await fetch(FORMSPREE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          firstName: buyerForm.firstName,
          lastName: buyerForm.lastName,
          email: buyerForm.email,
          location: buyerForm.location,
          vehicleType: buyerForm.vehicleType,
          priceRange: buyerForm.priceRange,
          source: 'curb-waitlist',
          submittedAt: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        setSubmitted(true);
        setBuyerForm({ email: '', firstName: '', lastName: '', location: '', vehicleType: '', priceRange: '' });
      } else {
        setError('Something went wrong. Please try again.');
      }
    } catch {
      setError('Network error. Please check your connection and try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const closeModal = () => {
    setShowBuyerForm(false);
    setSubmitted(false);
    setError('');
  };

  return (
    <>
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-curb-navy hover:text-curb-orange transition">CURB</Link>
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#how-it-works" className="text-gray-700 hover:text-curb-orange transition">How It Works</a>
              <a href="#dealers" className="text-gray-700 hover:text-curb-orange transition">For Dealers</a>
              <Link href="/roadmap" className="text-gray-700 hover:text-curb-orange transition">Roadmap</Link>
              <Link href="/about" className="text-gray-700 hover:text-curb-orange transition">About</Link>
            </div>
            <button
              onClick={() => setShowBuyerForm(true)}
              className="bg-curb-orange text-white px-6 py-2 rounded-full hover:bg-orange-600 transition font-medium"
            >
              Join Waitlist
            </button>
          </div>
        </div>
      </nav>

      {showBuyerForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={closeModal}>
          <div className="bg-white rounded-xl max-w-md w-full p-8" onClick={(e) => e.stopPropagation()}>
            {submitted ? (
              /* Success state */
              <div className="text-center py-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-curb-navy mb-2">You&apos;re on the list!</h3>
                <p className="text-gray-600 mb-6">We&apos;ll be in touch soon with early access details.</p>
                <button
                  onClick={closeModal}
                  className="px-6 py-3 bg-curb-orange text-white rounded-lg hover:bg-orange-600 transition font-medium"
                >
                  Done
                </button>
              </div>
            ) : (
              /* Form state */
              <>
                <h3 className="text-2xl font-bold text-curb-navy mb-6">Join the Waitlist</h3>
                <form onSubmit={handleBuyerSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="First Name"
                      required
                      value={buyerForm.firstName}
                      onChange={(e) => setBuyerForm({ ...buyerForm, firstName: e.target.value })}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-curb-orange"
                      disabled={submitting}
                    />
                    <input
                      type="text"
                      placeholder="Last Name"
                      required
                      value={buyerForm.lastName}
                      onChange={(e) => setBuyerForm({ ...buyerForm, lastName: e.target.value })}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-curb-orange"
                      disabled={submitting}
                    />
                  </div>
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    value={buyerForm.email}
                    onChange={(e) => setBuyerForm({ ...buyerForm, email: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-curb-orange"
                    disabled={submitting}
                  />
                  <input
                    type="text"
                    placeholder="Location (City, State)"
                    required
                    value={buyerForm.location}
                    onChange={(e) => setBuyerForm({ ...buyerForm, location: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-curb-orange"
                    disabled={submitting}
                  />
                  <select
                    required
                    value={buyerForm.vehicleType}
                    onChange={(e) => setBuyerForm({ ...buyerForm, vehicleType: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-curb-orange"
                    disabled={submitting}
                  >
                    <option value="">Preferred Vehicle Type</option>
                    <option value="sedan">Sedan</option>
                    <option value="suv">SUV</option>
                    <option value="truck">Truck</option>
                    <option value="coupe">Coupe</option>
                    <option value="van">Van</option>
                  </select>
                  <select
                    required
                    value={buyerForm.priceRange}
                    onChange={(e) => setBuyerForm({ ...buyerForm, priceRange: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-curb-orange"
                    disabled={submitting}
                  >
                    <option value="">Price Range</option>
                    <option value="5-10k">$5,000 - $10,000</option>
                    <option value="10-15k">$10,000 - $15,000</option>
                    <option value="15-25k">$15,000 - $25,000</option>
                    <option value="25k+">$25,000+</option>
                  </select>

                  {error && (
                    <p className="text-red-600 text-sm">{error}</p>
                  )}

                  <div className="flex gap-4 mt-6">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="flex-1 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition font-medium"
                      disabled={submitting}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="flex-1 px-6 py-3 bg-curb-orange text-white rounded-lg hover:bg-orange-600 transition font-medium disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {submitting ? 'Submitting...' : 'Join Waitlist'}
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
