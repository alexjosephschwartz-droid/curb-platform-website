'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function LandingNav() {
  const [showBuyerForm, setShowBuyerForm] = useState(false);
  const [buyerForm, setBuyerForm] = useState({
    email: '',
    firstName: '',
    lastName: '',
    location: '',
    vehicleType: '',
    priceRange: '',
  });

  const handleBuyerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for joining the waitlist! We\'ll be in touch soon.');
    setBuyerForm({ email: '', firstName: '', lastName: '', location: '', vehicleType: '', priceRange: '' });
    setShowBuyerForm(false);
  };

  return (
    <>
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-curb-navy">CURB</span>
            </div>
            <div className="hidden md:flex space-x-8">
              <Link href="/browse" className="text-gray-700 hover:text-curb-orange transition">Browse Auctions</Link>
              <a href="#how-it-works" className="text-gray-700 hover:text-curb-orange transition">How It Works</a>
              <a href="#buyers" className="text-gray-700 hover:text-curb-orange transition">For Buyers</a>
              <a href="#dealers" className="text-gray-700 hover:text-curb-orange transition">For Dealers</a>
              <Link href="/roadmap" className="text-gray-700 hover:text-curb-orange transition">Roadmap</Link>
              <a href="#faq" className="text-gray-700 hover:text-curb-orange transition">FAQ</a>
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
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-8">
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
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  required
                  value={buyerForm.lastName}
                  onChange={(e) => setBuyerForm({ ...buyerForm, lastName: e.target.value })}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-curb-orange"
                />
              </div>
              <input
                type="email"
                placeholder="Email"
                required
                value={buyerForm.email}
                onChange={(e) => setBuyerForm({ ...buyerForm, email: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-curb-orange"
              />
              <input
                type="text"
                placeholder="Location (City, State)"
                required
                value={buyerForm.location}
                onChange={(e) => setBuyerForm({ ...buyerForm, location: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-curb-orange"
              />
              <select
                required
                value={buyerForm.vehicleType}
                onChange={(e) => setBuyerForm({ ...buyerForm, vehicleType: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-curb-orange"
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
              >
                <option value="">Price Range</option>
                <option value="5-10k">$5,000 - $10,000</option>
                <option value="10-15k">$10,000 - $15,000</option>
                <option value="15-25k">$15,000 - $25,000</option>
                <option value="25k+">$25,000+</option>
              </select>
              <div className="flex gap-4 mt-6">
                <button
                  type="button"
                  onClick={() => setShowBuyerForm(false)}
                  className="flex-1 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-curb-orange text-white rounded-lg hover:bg-orange-600 transition font-medium"
                >
                  Join Waitlist
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
