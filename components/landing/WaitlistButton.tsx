'use client';

import { useState } from 'react';

const FORMSPREE_URL = 'https://formspree.io/f/xvzrezkd';

export default function WaitlistButton() {
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    email: '',
    firstName: '',
    lastName: '',
    location: '',
    vehicleType: '',
    priceRange: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      const res = await fetch(FORMSPREE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          ...form,
          source: 'curb-buyer-waitlist-footer',
          submittedAt: new Date().toISOString(),
        }),
      });
      if (res.ok) {
        setSubmitted(true);
        setForm({ email: '', firstName: '', lastName: '', location: '', vehicleType: '', priceRange: '' });
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
    setSubmitted(false);
    setError('');
  };

  return (
    <>
      <button
        onClick={() => setShowForm(true)}
        className="inline-flex items-center justify-center gap-2 bg-curb-orange text-white px-10 py-5 rounded-full hover:bg-orange-600 transition-all font-bold text-lg shadow-lg shadow-curb-orange/30 hover:shadow-xl hover:shadow-curb-orange/40 hover:-translate-y-0.5"
      >
        Join the SoCal waitlist
        <svg className="w-5 h-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
      </button>

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
                <h3 className="text-2xl font-bold text-curb-navy mb-2">You&apos;re on the list!</h3>
                <p className="text-gray-600 mb-6">We&apos;ll be in touch soon with early access details.</p>
                <button onClick={closeModal} className="px-6 py-3 bg-curb-orange text-white rounded-lg hover:bg-orange-600 transition font-medium">
                  Done
                </button>
              </div>
            ) : (
              <>
                <h3 className="text-2xl font-bold text-curb-navy mb-6">Join the Waitlist</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <input type="text" placeholder="First Name" required value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-curb-orange text-gray-900" disabled={submitting} />
                    <input type="text" placeholder="Last Name" required value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-curb-orange text-gray-900" disabled={submitting} />
                  </div>
                  <input type="email" placeholder="Email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-curb-orange text-gray-900" disabled={submitting} />
                  <input type="text" placeholder="Location (City, State)" required value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-curb-orange text-gray-900" disabled={submitting} />
                  <select required value={form.vehicleType} onChange={(e) => setForm({ ...form, vehicleType: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-curb-orange text-gray-900" disabled={submitting}>
                    <option value="">Preferred Vehicle Type</option>
                    <option value="sedan">Sedan</option>
                    <option value="suv">SUV</option>
                    <option value="truck">Truck</option>
                    <option value="coupe">Coupe</option>
                    <option value="van">Van</option>
                  </select>
                  <select required value={form.priceRange} onChange={(e) => setForm({ ...form, priceRange: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-curb-orange text-gray-900" disabled={submitting}>
                    <option value="">Price Range</option>
                    <option value="5-10k">$5,000 - $10,000</option>
                    <option value="10-15k">$10,000 - $15,000</option>
                    <option value="15-25k">$15,000 - $25,000</option>
                    <option value="25k+">$25,000+</option>
                  </select>
                  {error && <p className="text-red-600 text-sm">{error}</p>}
                  <div className="flex gap-4 mt-6">
                    <button type="button" onClick={closeModal} className="flex-1 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition font-medium text-gray-900" disabled={submitting}>Cancel</button>
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
    </>
  );
}
