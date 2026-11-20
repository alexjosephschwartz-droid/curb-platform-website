'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import LandingNav from '@/components/landing/LandingNav';

const FORMSPREE_URL = 'https://formspree.io/f/xvzrezkd';

const PHOTOS = [
  'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1556189250-72ba954cfc2b?w=800&h=480&fit=crop&auto=format&q=80',
  'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=800&h=480&fit=crop&auto=format&q=80',
  'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&h=480&fit=crop&auto=format&q=80',
];

export default function ExampleAuctionPage() {
  const [selectedPhoto, setSelectedPhoto] = useState(0);
  const [showWaitlist, setShowWaitlist] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    email: '', firstName: '', lastName: '', location: '', vehicleType: '', priceRange: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      const res = await fetch(FORMSPREE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...form, source: 'curb-example-auction-waitlist', submittedAt: new Date().toISOString() }),
      });
      if (res.ok) { setSubmitted(true); setForm({ email: '', firstName: '', lastName: '', location: '', vehicleType: '', priceRange: '' }); }
      else setError('Something went wrong. Please try again.');
    } catch { setError('Network error. Please check your connection.'); }
    finally { setSubmitting(false); }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <LandingNav />

      <div className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">

          {/* Back + badge */}
          <div className="flex items-center justify-between mb-6">
            <Link href="/" className="inline-flex items-center text-gray-600 hover:text-curb-orange transition text-sm font-medium">
              <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              Back to Home
            </Link>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              Example Auction
            </span>
          </div>

          {/* Example banner */}
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-xl flex items-start gap-3">
            <span className="text-xl mt-0.5">🏷️</span>
            <div>
              <p className="text-sm font-semibold text-blue-900">This is an example listing.</p>
              <p className="text-sm text-blue-700 mt-0.5">It shows exactly what a real Curb auction looks like — from the inspection report to what you pay. Curb is launching in Southern California soon.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* LEFT COLUMN — photos + details */}
            <div className="lg:col-span-2 space-y-6">

              {/* Photo gallery */}
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
                <div className="relative h-64 sm:h-80 md:h-96 bg-gray-200">
                  <Image
                    src={PHOTOS[selectedPhoto]}
                    alt="2019 BMW 330i"
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute top-4 right-4 px-3 py-1 bg-black/60 backdrop-blur-sm text-white text-xs font-semibold rounded-full">
                    2d 14h left
                  </div>
                </div>
                {PHOTOS.length > 1 && (
                  <div className="flex gap-2 p-3">
                    {PHOTOS.map((photo, i) => (
                      <button key={i} onClick={() => setSelectedPhoto(i)}
                        className={`relative h-16 w-24 rounded-lg overflow-hidden border-2 transition flex-shrink-0 ${i === selectedPhoto ? 'border-curb-orange' : 'border-transparent opacity-60 hover:opacity-100'}`}>
                        <Image src={photo} alt={`View ${i + 1}`} fill className="object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Vehicle specs */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-xl font-bold text-curb-navy mb-4">Vehicle Details</h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {[
                    { label: 'Year', value: '2019' },
                    { label: 'Make', value: 'BMW' },
                    { label: 'Model', value: '330i' },
                    { label: 'Trim', value: 'Base' },
                    { label: 'Mileage', value: '68,000 mi' },
                    { label: 'Exterior', value: 'Alpine White' },
                    { label: 'Interior', value: 'Black Leather' },
                    { label: 'Drivetrain', value: 'RWD' },
                    { label: 'Transmission', value: '8-Speed Auto' },
                    { label: 'Engine', value: '2.0L Turbo I4' },
                    { label: 'Fuel Type', value: 'Gasoline' },
                    { label: 'Title', value: 'Clean' },
                  ].map((spec) => (
                    <div key={spec.label}>
                      <p className="text-xs text-gray-500 uppercase tracking-wide">{spec.label}</p>
                      <p className="text-sm font-semibold text-curb-navy mt-0.5">{spec.value}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-5 pt-4 border-t border-gray-100">
                  <p className="text-xs text-gray-500 uppercase tracking-wide">VIN</p>
                  <p className="text-sm font-mono text-curb-navy mt-0.5">WBA5R1C5XKA2XXXXX</p>
                </div>
              </div>

              {/* Condition report */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-blue-600" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>
                  </div>
                  <h2 className="text-xl font-bold text-curb-navy">Condition Report</h2>
                </div>
                <p className="text-sm text-gray-500 mb-4">Completed by the listing dealer before auction start</p>
                <div className="space-y-4">
                  {[
                    { area: 'Exterior', rating: 'Good', notes: 'Minor curb rash on two front wheels. Small door ding on passenger side, barely visible. Paint in good condition overall — no major scratches or dents.' },
                    { area: 'Interior', rating: 'Very Good', notes: 'Black leather seats in great shape, no tears or heavy wear. All electronics functional — iDrive, Bluetooth, CarPlay all work. Headliner clean.' },
                    { area: 'Mechanical', rating: 'Good', notes: 'Engine runs smoothly, no warning lights. Transmission shifts cleanly through all gears. AC blows cold. Front brake pads are worn and need replacement (~30% remaining).' },
                    { area: 'Tires', rating: 'Fair', notes: 'Rear tires have adequate tread (5/32"). Front tires at 3/32" — approaching replacement. Alignment appears straight.' },
                  ].map((item) => (
                    <div key={item.area} className="bg-gray-50 rounded-xl p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-curb-navy">{item.area}</h3>
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                          item.rating === 'Very Good' ? 'bg-green-100 text-green-700' :
                          item.rating === 'Good' ? 'bg-blue-100 text-blue-700' :
                          'bg-yellow-100 text-yellow-700'
                        }`}>{item.rating}</span>
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed">{item.notes}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Repairs — clearly showing they're included */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  </div>
                  <h2 className="text-xl font-bold text-curb-navy">Repairs Before Delivery</h2>
                </div>
                <div className="mb-4 inline-flex items-center gap-1.5 px-3 py-1 bg-green-50 border border-green-200 rounded-full">
                  <svg className="w-3.5 h-3.5 text-green-600" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" viewBox="0 0 24 24" stroke="currentColor"><path d="M5 13l4 4L19 7" /></svg>
                  <span className="text-xs font-bold text-green-700">Included in your price — no extra cost</span>
                </div>
                <p className="text-sm text-gray-500 mb-4">The dealer completes these repairs after the auction ends and before you take delivery. You review and approve the work.</p>

                <div className="space-y-3">
                  {[
                    { item: 'Front brake pads + rotors', detail: 'OEM-equivalent parts, full replacement', cost: '$480' },
                    { item: 'Front tire replacement (2)', detail: 'Matching brand/size to rears', cost: '$340' },
                    { item: 'Wheel curb rash repair (2)', detail: 'Refinish both front wheels', cost: '$200' },
                    { item: 'Oil + filter service', detail: 'Full synthetic, BMW-spec', cost: '$120' },
                    { item: 'Multi-point safety inspection', detail: 'Lights, fluids, belts, battery', cost: '$75' },
                  ].map((repair) => (
                    <div key={repair.item} className="flex items-start justify-between py-3 border-b border-gray-100 last:border-0">
                      <div className="flex items-start gap-3">
                        <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                          <svg className="w-3 h-3 text-green-600" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" viewBox="0 0 24 24" stroke="currentColor"><path d="M5 13l4 4L19 7" /></svg>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-curb-navy">{repair.item}</p>
                          <p className="text-xs text-gray-500 mt-0.5">{repair.detail}</p>
                        </div>
                      </div>
                      <span className="text-sm font-medium text-gray-400 line-through ml-4 flex-shrink-0">{repair.cost}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-4 pt-4 border-t-2 border-green-200 flex items-center justify-between">
                  <span className="font-bold text-curb-navy">Total repair value</span>
                  <div className="text-right">
                    <span className="text-lg font-bold text-green-600">$0 to you</span>
                    <span className="text-sm text-gray-400 line-through ml-2">$1,215</span>
                  </div>
                </div>
              </div>

              {/* What happens after you win */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-curb-orange" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M9 5l7 7-7 7" /></svg>
                  </div>
                  <h2 className="text-xl font-bold text-curb-navy">What Happens After You Win</h2>
                </div>

                <div className="space-y-0">
                  {[
                    {
                      step: 1,
                      title: 'Fund Escrow',
                      time: 'Within 48 hours',
                      desc: 'Your payment goes into a secure escrow account — not to the dealer. The funds are held by Escrow.com and only released when you approve the car.',
                      icon: '🔒',
                    },
                    {
                      step: 2,
                      title: 'Dealer Completes Repairs',
                      time: '5–7 business days',
                      desc: 'The dealer performs all listed repairs at their service center. You\'ll receive photo updates and can message the dealer with questions through Curb.',
                      icon: '🔧',
                    },
                    {
                      step: 3,
                      title: 'Review & Approve',
                      time: 'Before delivery',
                      desc: 'Once repairs are done, you review the completed work with photos and documentation. You approve the repairs before anything ships — if something isn\'t right, the dealer fixes it.',
                      icon: '✅',
                    },
                    {
                      step: 4,
                      title: 'Pickup or Delivery',
                      time: 'Your choice',
                      desc: 'Pick up from the dealer in person, or arrange delivery to your door. Once you have the car and confirm everything looks good, escrow releases payment to the dealer.',
                      icon: '🚗',
                    },
                  ].map((step, i) => (
                    <div key={step.step} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-10 h-10 bg-curb-orange/10 rounded-full flex items-center justify-center text-lg flex-shrink-0">
                          {step.icon}
                        </div>
                        {i < 3 && <div className="w-0.5 h-full bg-curb-orange/20 my-1" />}
                      </div>
                      <div className="pb-6 last:pb-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-bold text-curb-navy">Step {step.step}: {step.title}</h3>
                          <span className="text-xs text-gray-400 font-medium">{step.time}</span>
                        </div>
                        <p className="text-sm text-gray-600 leading-relaxed">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Dealer info */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-xl font-bold text-curb-navy mb-4">Listed By</h2>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-curb-navy rounded-xl flex items-center justify-center text-white text-xl font-bold flex-shrink-0">P</div>
                  <div>
                    <h3 className="font-bold text-curb-navy">Premium Auto Group</h3>
                    <p className="text-sm text-gray-500">Licensed Dealer · Los Angeles, CA</p>
                    <div className="flex items-center gap-1 mt-1">
                      {[1,2,3,4,5].map(s => (
                        <svg key={s} className={`w-4 h-4 ${s <= 4 ? 'text-yellow-400' : 'text-gray-200'}`} fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                      ))}
                      <span className="text-sm text-gray-500 ml-1">4.8 · 142 sales</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN — sticky auction widget */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sticky top-24">
                <h1 className="text-2xl font-bold text-curb-navy mb-1">2019 BMW 330i</h1>
                <p className="text-gray-500 text-sm mb-4">68,000 mi · Clean title · Los Angeles, CA</p>

                {/* Timer */}
                <div className="flex items-center gap-2 mb-5 px-4 py-3 rounded-xl bg-orange-50 text-curb-orange">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  <span className="font-semibold text-sm">2d 14h left (example)</span>
                </div>

                {/* Pricing breakdown */}
                <div className="mb-5">
                  <p className="text-xs text-gray-500 mb-1">Current Bid</p>
                  <p className="text-4xl font-bold text-curb-orange">$18,500</p>
                  <p className="text-sm text-gray-500 mt-1">8 bids</p>
                </div>

                <div className="bg-gray-50 rounded-xl p-4 mb-5 space-y-2.5">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Winning bid</span>
                    <span className="font-semibold text-curb-navy">$18,500</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Buyer premium (3%)</span>
                    <span className="font-semibold text-curb-navy">$555</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Repairs</span>
                    <span className="font-semibold text-green-600">Included</span>
                  </div>
                  <div className="border-t border-gray-200 pt-2.5 flex justify-between">
                    <span className="font-bold text-curb-navy">Subtotal</span>
                    <span className="font-bold text-curb-navy text-lg">$19,055</span>
                  </div>
                  <p className="text-xs text-gray-400">+ taxes, registration & any other applicable charges</p>
                </div>

                {/* Savings callout */}
                <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-5 text-center">
                  <p className="text-xs text-green-600 font-semibold uppercase tracking-wider mb-1">Your Savings vs. Retail</p>
                  <p className="text-3xl font-bold text-green-600">$4,945</p>
                  <p className="text-xs text-green-600 mt-1">Retail value: <span className="line-through">$24,000</span></p>
                </div>

                {/* Primary CTA */}
                <button
                  onClick={() => setShowWaitlist(true)}
                  className="w-full py-4 bg-curb-orange text-white rounded-xl font-bold text-lg hover:bg-orange-600 transition shadow-lg shadow-curb-orange/25 hover:shadow-xl hover:shadow-curb-orange/30 mb-3"
                >
                  Join the SoCal Waitlist
                </button>
                <p className="text-xs text-gray-400 text-center mb-4">Launching soon in Southern California</p>

                {/* Trust badges */}
                <div className="border-t border-gray-100 pt-4 space-y-2.5">
                  {[
                    'Dealer-inspected condition report',
                    'All repairs completed before delivery',
                    'Escrow-protected payment',
                    'You approve before funds release',
                  ].map((badge) => (
                    <div key={badge} className="flex items-center gap-2.5 text-sm text-gray-600">
                      <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" viewBox="0 0 24 24" stroke="currentColor"><path d="M5 13l4 4L19 7" /></svg>
                      <span>{badge}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-curb-navy text-white py-12 px-4 sm:px-6 lg:px-8 border-t border-white/10">
        <div className="max-w-7xl mx-auto text-center">
          <h3 className="text-2xl font-extrabold mb-2">CURB</h3>
          <p className="text-gray-400 mb-4">Wholesale-to-consumer vehicle auction marketplace.</p>
          <div className="flex justify-center gap-6 text-sm text-gray-400">
            <Link href="/" className="hover:text-curb-orange transition">Home</Link>
            <Link href="/about" className="hover:text-curb-orange transition">About</Link>
            <Link href="/browse" className="hover:text-curb-orange transition">Browse</Link>
          </div>
          <p className="text-gray-500 text-sm mt-6">&copy; 2026 Curb. All rights reserved.</p>
        </div>
      </footer>

      {/* Waitlist modal */}
      {showWaitlist && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => { setShowWaitlist(false); setSubmitted(false); setError(''); }}>
          <div className="bg-white rounded-xl max-w-md w-full p-8" onClick={(e) => e.stopPropagation()}>
            {submitted ? (
              <div className="text-center py-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M5 13l4 4L19 7" /></svg>
                </div>
                <h3 className="text-2xl font-bold text-curb-navy mb-2">You&apos;re on the list!</h3>
                <p className="text-gray-600 mb-6">We&apos;ll be in touch soon with early access details for Southern California.</p>
                <button onClick={() => { setShowWaitlist(false); setSubmitted(false); }} className="px-6 py-3 bg-curb-orange text-white rounded-lg hover:bg-orange-600 transition font-medium">Done</button>
              </div>
            ) : (
              <>
                <h3 className="text-2xl font-bold text-curb-navy mb-2">Join the SoCal Waitlist</h3>
                <p className="text-sm text-gray-500 mb-6">Get early access when Curb launches in Southern California.</p>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <input type="text" placeholder="First Name" required value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} className="px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-curb-orange text-sm" disabled={submitting} />
                    <input type="text" placeholder="Last Name" required value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} className="px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-curb-orange text-sm" disabled={submitting} />
                  </div>
                  <input type="email" placeholder="Email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-curb-orange text-sm" disabled={submitting} />
                  <input type="text" placeholder="City, State" required value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-curb-orange text-sm" disabled={submitting} />
                  <select required value={form.vehicleType} onChange={(e) => setForm({ ...form, vehicleType: e.target.value })} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-curb-orange text-sm" disabled={submitting}>
                    <option value="">Preferred Vehicle Type</option>
                    <option value="sedan">Sedan</option>
                    <option value="suv">SUV</option>
                    <option value="truck">Truck</option>
                    <option value="coupe">Coupe</option>
                    <option value="van">Van</option>
                  </select>
                  <select required value={form.priceRange} onChange={(e) => setForm({ ...form, priceRange: e.target.value })} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-curb-orange text-sm" disabled={submitting}>
                    <option value="">Price Range</option>
                    <option value="5-10k">$5,000 – $10,000</option>
                    <option value="10-15k">$10,000 – $15,000</option>
                    <option value="15-25k">$15,000 – $25,000</option>
                    <option value="25k+">$25,000+</option>
                  </select>
                  {error && <p className="text-red-600 text-sm">{error}</p>}
                  <div className="flex gap-4 mt-6">
                    <button type="button" onClick={() => setShowWaitlist(false)} className="flex-1 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition font-medium text-sm" disabled={submitting}>Cancel</button>
                    <button type="submit" disabled={submitting} className="flex-1 px-6 py-3 bg-curb-orange text-white rounded-lg hover:bg-orange-600 transition font-medium disabled:opacity-60 text-sm">
                      {submitting ? 'Submitting...' : 'Join Waitlist'}
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
