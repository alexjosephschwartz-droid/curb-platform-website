'use client';

import { useState } from 'react';
import Link from 'next/link';

const FORMSPREE_URL = 'https://formspree.io/f/xvzrezkd';

export default function HeroCTAs() {
  const [showBuyerForm, setShowBuyerForm] = useState(false);
  const [showDealerForm, setShowDealerForm] = useState(false);
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
      const res = await fetch(FORMSPREE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          ...buyerForm,
          source: 'curb-buyer-waitlist',
          submittedAt: new Date().toISOString(),
        }),
      });
      if (res.ok) {
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
      const res = await fetch(FORMSPREE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          ...dealerForm,
          source: 'curb-dealer-interest',
          submittedAt: new Date().toISOString(),
        }),
      });
      if (res.ok) {
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
    setShowBuyerForm(false);
    setShowDealerForm(false);
    setSubmitted(null);
    setError('');
  };

  const SuccessState = ({ type }: { type: 'buyer' | 'dealer' }) => (
    <div className="text-center py-6">
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg className="w-8 h-8 text-green-600" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M5 13l4 4L19 7"></path>
        </svg>
      </div>
      <h3 className="text-2xl font-bold text-curb-navy mb-2">
        {type === 'buyer' ? "You’re on the list!" : 'Request Received!'}
      </h3>
      <p className="text-gray-600 mb-6">
        {type === 'buyer'
          ? "We’ll be in touch soon with early access details."
          : "Our team will contact you shortly about dealer partnerships."}
      </p>
      <button onClick={closeModal} className="px-6 py-3 bg-curb-orange text-white rounded-lg hover:bg-orange-600 transition font-medium">
        Done
      </button>
    </div>
  );

  return (
    <>
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <Link
          href="/example"
          className="bg-curb-orange text-white px-8 py-4 rounded-full hover:bg-orange-600 transition font-semibold text-lg shadow-lg shadow-curb-orange/25 hover:shadow-xl hover:shadow-curb-orange/30 hover:-translate-y-0.5"
        >
          Try the demo
        </Link>
        <button
          onClick={() => setShowBuyerForm(true)}
          className="bg-curb-navy text-white px-8 py-4 rounded-full hover:bg-slate-800 transition font-semibold text-lg"
        >
          Join the SoCal waitlist
        </button>
        <a
          href="#dealers"
          className="text-curb-navy font-semibold hover:text-curb-orange transition text-lg"
        >
          For dealers &rarr;
        </a>
      </div>

      {showBuyerForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={closeModal}>
          <div className="bg-white rounded-xl max-w-md w-full p-8" onClick={(e) => e.stopPropagation()}>
            {submitted === 'buyer' ? (
              <SuccessState type="buyer" />
            ) : (
              <>
                <h3 className="text-2xl font-bold text-curb-navy mb-6">Join the Waitlist</h3>
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
              </>
            )}
          </div>
        </div>
      )}

      {showDealerForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={closeModal}>
          <div className="bg-white rounded-xl max-w-md w-full p-8" onClick={(e) => e.stopPropagation()}>
            {submitted === 'dealer' ? (
              <SuccessState type="dealer" />
            ) : (
              <>
                <h3 className="text-2xl font-bold text-curb-navy mb-6">Request Dealer Access</h3>
                <form onSubmit={handleDealerSubmit} className="space-y-4">
                  <input type="text" placeholder="Business Name" required value={dealerForm.businessName} onChange={(e) => setDealerForm({ ...dealerForm, businessName: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-curb-orange" disabled={submitting} />
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
                    <option value="">Monthly Inventory Volume</option>
                    <option value="10-50">10-50 vehicles</option>
                    <option value="50-100">50-100 vehicles</option>
                    <option value="100-200">100-200 vehicles</option>
                    <option value="200+">200+ vehicles</option>
                  </select>
                  {error && <p className="text-red-600 text-sm">{error}</p>}
                  <div className="flex gap-4 mt-6">
                    <button type="button" onClick={closeModal} className="flex-1 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition font-medium" disabled={submitting}>Cancel</button>
                    <button type="submit" disabled={submitting} className="flex-1 px-6 py-3 bg-curb-orange text-white rounded-lg hover:bg-orange-600 transition font-medium disabled:opacity-60 disabled:cursor-not-allowed">
                      {submitting ? 'Submitting...' : 'Submit Request'}
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
