'use client';

import { useState } from 'react';
import Link from 'next/link';

const FORMSPREE_URL = 'https://formspree.io/f/xvzrezkd';

export default function LandingNav() {
  const [showForm, setShowForm] = useState(false);
  const [activeTab, setActiveTab] = useState<'buyer' | 'dealer'>('buyer');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState<'buyer' | 'dealer' | null>(null);
  const [error, setError] = useState('');

  const [buyerForm, setBuyerForm] = useState({
    email: '',
    firstName: '',
    lastName: '',
    location: '',
    vehicleType: '',
    priceRange: '',
  });

  const [dealerForm, setDealerForm] = useState({
    businessName: '',
    email: '',
    phone: '',
    locations: '',
    inventoryVolume: '',
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
          ...buyerForm,
          source: 'curb-waitlist',
          submittedAt: new Date().toISOString(),
        }),
      });
      if (response.ok) {
        setSubmitted('buyer');
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

  const handleDealerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      const response = await fetch(FORMSPREE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          ...dealerForm,
          source: 'curb-dealer-nav',
          submittedAt: new Date().toISOString(),
        }),
      });
      if (response.ok) {
        setSubmitted('dealer');
        setDealerForm({ businessName: '', email: '', phone: '', locations: '', inventoryVolume: '' });
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
    setShowForm(false);
    setSubmitted(null);
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
              onClick={() => setShowForm(true)}
              className="bg-curb-orange text-white px-6 py-2 rounded-full hover:bg-orange-600 transition font-medium"
            >
              Get Early Access
            </button>
          </div>
        </div>
      </nav>

      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={closeModal}>
          <div className="bg-white rounded-xl max-w-md w-full p-8" onClick={(e) => e.stopPropagation()}>
            {submitted ? (
              <div className="text-center py-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-curb-navy mb-2">
                  {submitted === 'buyer' ? "You’re on the list!" : 'Request Received!'}
                </h3>
                <p className="text-gray-600 mb-6">
                  {submitted === 'buyer'
                    ? "We’ll be in touch soon with early access details."
                    : 'Our team will contact you shortly about dealer partnerships.'}
                </p>
                <button onClick={closeModal} className="px-6 py-3 bg-curb-orange text-white rounded-lg hover:bg-orange-600 transition font-medium">
                  Done
                </button>
              </div>
            ) : (
              <>
                <h3 className="text-2xl font-bold text-curb-navy mb-6">Get Early Access</h3>

                {/* Buyer / Dealer Tabs */}
                <div className="flex mb-6 bg-gray-100 rounded-lg p-1">
                  <button
                    type="button"
                    onClick={() => { setActiveTab('buyer'); setError(''); }}
                    className={`flex-1 py-2.5 text-sm font-semibold rounded-md transition ${
                      activeTab === 'buyer'
                        ? 'bg-white text-curb-navy shadow-sm'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    I&apos;m a Buyer
                  </button>
                  <button
                    type="button"
                    onClick={() => { setActiveTab('dealer'); setError(''); }}
                    className={`flex-1 py-2.5 text-sm font-semibold rounded-md transition ${
                      activeTab === 'dealer'
                        ? 'bg-white text-curb-navy shadow-sm'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    I&apos;m a Dealer
                  </button>
                </div>

                {/* Buyer Form */}
                {activeTab === 'buyer' && (
                  <form onSubmit={handleBuyerSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <input type="text" placeholder="First Name" required value={buyerForm.firstName} onChange={(e) => setBuyerForm({ ...buyerForm, firstName: e.target.value })} className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-curb-orange" disabled={submitting} />
                      <input type="text" placeholder="Last Name" required value={buyerForm.lastName} onChange={(e) => setBuyerForm({ ...buyerForm, lastName: e.target.value })} className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-curb-orange" disabled={submitting} />
                    </div>
                    <input type="email" placeholder="Email" required value={buyerForm.email} onChange={(e) => setBuyerForm({ ...buyerForm, email: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-curb-orange" disabled={submitting} />
                    <input type="text" placeholder="Location (City, State)" required value={buyerForm.location} onChange={(e) => setBuyerForm({ ...buyerForm, location: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-curb-orange" disabled={submitting} />
                    <select required value={buyerForm.vehicleType} onChange={(e) => setBuyerForm({ ...buyerForm, vehicleType: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-curb-orange" disabled={submitting}>
                      <option value="">Preferred Vehicle Type</option>
                      <option value="sedan">Sedan</option>
                      <option value="suv">SUV</option>
                      <option value="truck">Truck</option>
                      <option value="coupe">Coupe</option>
                      <option value="van">Van</option>
                    </select>
                    <select required value={buyerForm.priceRange} onChange={(e) => setBuyerForm({ ...buyerForm, priceRange: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-curb-orange" disabled={submitting}>
                      <option value="">Price Range</option>
                      <option value="5-10k">$5,000 - $10,000</option>
                      <option value="10-15k">$10,000 - $15,000</option>
                      <option value="15-25k">$15,000 - $25,000</option>
                      <option value="25k+">$25,000+</option>
                    </select>
                    {error && <p className="text-red-600 text-sm">{error}</p>}
                    <div className="flex gap-4 mt-6">
                      <button type="button" onClick={closeModal} className="flex-1 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition font-medium" disabled={submitting}>Cancel</button>
                      <button type="submit" disabled={submitting} className="flex-1 px-6 py-3 bg-curb-orange text-white rounded-lg hover:bg-orange-600 transition font-medium disabled:opacity-60 disabled:cursor-not-allowed">
                        {submitting ? 'Submitting...' : 'Join Waitlist'}
                      </button>
                    </div>
                  </form>
                )}

                {/* Dealer Form */}
                {activeTab === 'dealer' && (
                  <form onSubmit={handleDealerSubmit} className="space-y-4">
                    <input type="text" placeholder="Dealership Name" required value={dealerForm.businessName} onChange={(e) => setDealerForm({ ...dealerForm, businessName: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-curb-orange" disabled={submitting} />
                    <input type="email" placeholder="Email" required value={dealerForm.email} onChange={(e) => setDealerForm({ ...dealerForm, email: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-curb-orange" disabled={submitting} />
                    <input type="tel" placeholder="Phone Number" required value={dealerForm.phone} onChange={(e) => setDealerForm({ ...dealerForm, phone: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-curb-orange" disabled={submitting} />
                    <select required value={dealerForm.locations} onChange={(e) => setDealerForm({ ...dealerForm, locations: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-curb-orange" disabled={submitting}>
                      <option value="">Number of Locations</option>
                      <option value="1">1 Location</option>
                      <option value="2-5">2-5 Locations</option>
                      <option value="6-10">6-10 Locations</option>
                      <option value="10+">10+ Locations</option>
                    </select>
                    <select required value={dealerForm.inventoryVolume} onChange={(e) => setDealerForm({ ...dealerForm, inventoryVolume: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-curb-orange" disabled={submitting}>
                      <option value="">Monthly Wholesale Volume</option>
                      <option value="10-50">10-50 vehicles</option>
                      <option value="50-100">50-100 vehicles</option>
                      <option value="100-200">100-200 vehicles</option>
                      <option value="200+">200+ vehicles</option>
                    </select>
                    {error && <p className="text-red-600 text-sm">{error}</p>}
                    <div className="flex gap-4 mt-6">
                      <button type="button" onClick={closeModal} className="flex-1 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition font-medium" disabled={submitting}>Cancel</button>
                      <button type="submit" disabled={submitting} className="flex-1 px-6 py-3 bg-curb-orange text-white rounded-lg hover:bg-orange-600 transition font-medium disabled:opacity-60 disabled:cursor-not-allowed">
                        {submitting ? 'Submitting...' : 'Request Dealer Access'}
                      </button>
                    </div>
                  </form>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
