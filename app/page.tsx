'use client';

import { useState } from 'react';
import Link from 'next/link';
import DealerRevenueCalculator from '@/components/DealerRevenueCalculator';

export default function Home() {
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

  const [showBuyerForm, setShowBuyerForm] = useState(false);
  const [showDealerForm, setShowDealerForm] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleBuyerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for joining the waitlist! We\'ll be in touch soon.');
    setBuyerForm({ email: '', firstName: '', lastName: '', location: '', vehicleType: '', priceRange: '' });
    setShowBuyerForm(false);
  };

  const handleDealerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for your interest! Our team will contact you shortly.');
    setDealerForm({ businessName: '', email: '', phone: '', locations: '', inventoryVolume: '' });
    setShowDealerForm(false);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
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
              <a href="/roadmap" className="text-gray-700 hover:text-curb-orange transition">Roadmap</a>
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

      {/* Hero Section */}
      <section className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-curb-navy mb-8 leading-tight">
              Buy & Sell Used Cars<br />With Confidence
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
              Access wholesale pricing through transparent 3-day auctions with dealer inspection guarantees.
              Skip the markup, know exactly what you're buying.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setShowBuyerForm(true)}
                className="bg-curb-orange text-white px-8 py-4 rounded-full hover:bg-orange-600 transition font-semibold text-lg"
              >
                Join as Buyer
              </button>
              <button
                onClick={() => setShowDealerForm(true)}
                className="bg-curb-navy text-white px-8 py-4 rounded-full hover:bg-slate-800 transition font-semibold text-lg"
              >
                Sell Your Lot
              </button>
            </div>

            {/* Trust Signals */}
            <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="text-4xl font-bold text-curb-orange mb-2">3 Days</div>
                <div className="text-gray-600 text-sm font-medium">Auction Window</div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="text-4xl font-bold text-curb-orange mb-2">100%</div>
                <div className="text-gray-600 text-sm font-medium">Escrow Protected</div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="text-4xl font-bold text-curb-orange mb-2">$0</div>
                <div className="text-gray-600 text-sm font-medium">Hidden Fees</div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="text-4xl font-bold text-curb-orange mb-2">Certified</div>
                <div className="text-gray-600 text-sm font-medium">Dealer Inspections</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-curb-navy text-center mb-16">How It Works</h2>
          <div className="grid md:grid-cols-5 gap-8 relative">
            {/* Connection Line */}
            <div className="hidden md:block absolute top-12 left-0 right-0 h-1 bg-gradient-to-r from-curb-orange via-curb-orange to-curb-navy" style={{ top: '3rem' }}></div>

            {[
              { number: 1, title: 'Dealer Lists Car', desc: 'VIN, photos, professional inspection & repair quote' },
              { number: 2, title: 'Buyers Browse & Bid', desc: 'Transparent 3-day auction with real-time updates' },
              { number: 3, title: 'Winner Pays via Escrow', desc: 'Secure payment through Escrow.com protection' },
              { number: 4, title: 'Dealer Repairs Car', desc: 'Buyer reviews and approves completed repairs' },
              { number: 5, title: 'Delivery & Release', desc: 'Funds released, both parties rate the experience' },
            ].map((step) => (
              <div key={step.number} className="relative z-10">
                <div className="bg-white border-4 border-curb-orange rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-curb-orange">{step.number}</span>
                </div>
                <h3 className="text-lg font-semibold text-curb-navy text-center mb-2">{step.title}</h3>
                <p className="text-gray-600 text-center text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* For Buyers */}
      <section id="buyers" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-curb-navy text-center mb-4">For Buyers</h2>
          <p className="text-xl text-gray-600 text-center mb-16 max-w-3xl mx-auto">
            Access wholesale pricing directly and skip the middleman markup
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              {
                title: 'Wholesale Pricing',
                desc: 'Save thousands by buying directly from dealers at wholesale prices without retail markup'
              },
              {
                title: 'Transparent Inspections',
                desc: 'Complete condition reports and pre-sale inspections reveal exactly what you\'re buying'
              },
              {
                title: 'Repairs Included',
                desc: 'Certified dealers complete repairs before delivery—no surprise costs or "as-is" sales'
              },
              {
                title: 'Escrow Protection',
                desc: 'Secure payment through Escrow.com ensures buyer protection throughout the process'
              },
              {
                title: 'No Surprises',
                desc: 'Review and approve all repairs before taking delivery with complete transparency'
              },
              {
                title: 'Dealer Ratings',
                desc: 'Verified reviews and ratings help you buy from trusted, professional dealers'
              },
            ].map((benefit) => (
              <div key={benefit.title} className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition border border-gray-100">
                <div className="w-12 h-12 bg-curb-orange/10 rounded-lg flex items-center justify-center mb-4">
                  <div className="w-6 h-6 bg-curb-orange rounded"></div>
                </div>
                <h3 className="text-xl font-semibold text-curb-navy mb-3">{benefit.title}</h3>
                <p className="text-gray-600 leading-relaxed">{benefit.desc}</p>
              </div>
            ))}
          </div>

          {/* Price Comparison */}
          <div className="bg-white rounded-xl shadow-lg p-10 border border-gray-100">
            <h3 className="text-3xl font-bold text-curb-navy text-center mb-14">Price Comparison</h3>
            <div className="grid md:grid-cols-2 gap-10 max-w-4xl mx-auto">
              <div className="text-center p-10 border-2 border-gray-200 rounded-xl bg-gray-50">
                <div className="text-gray-500 font-semibold mb-4 text-sm uppercase tracking-wide">Traditional Retail</div>
                <div className="text-5xl font-bold text-gray-700 mb-4">$18,500</div>
                <div className="text-gray-600 text-sm">High markup + dealer fees</div>
              </div>
              <div className="text-center p-10 border-2 border-curb-orange rounded-xl bg-gradient-to-br from-orange-50 to-white relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-green-500 text-white text-xs font-bold px-4 py-1 rounded-bl-lg">BEST VALUE</div>
                <div className="text-curb-orange font-bold mb-4 text-sm uppercase tracking-wide">Curb Platform</div>
                <div className="text-6xl font-bold text-curb-orange mb-4">$14,000</div>
                <div className="inline-block bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-bold">Save $4,500</div>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link
              href="/browse"
              className="inline-block bg-curb-orange text-white px-8 py-4 rounded-full hover:bg-orange-600 transition font-semibold text-lg"
            >
              Start Shopping
            </Link>
          </div>
        </div>
      </section>

      {/* For Dealers */}
      <section id="dealers" className="py-20 px-4 sm:px-6 lg:px-8 bg-curb-navy text-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">For Dealers</h2>
          <p className="text-xl text-gray-300 text-center mb-16 max-w-3xl mx-auto">
            Liquidate wholesale inventory in 3 days while earning service revenue
          </p>

          <div className="mb-12">
            <h3 className="text-2xl font-bold mb-6 text-curb-orange text-center">Why Curb?</h3>
            <ul className="space-y-4 max-w-2xl mx-auto mb-12">
              {[
                'Liquidate wholesale inventory in just 3 days',
                'Earn service revenue on repairs, not just sale markup',
                'We handle buyer acquisition and escrow management',
                'Premium marketplace positioning—not an auction junkyard',
                'Transparent pricing with predictable revenue per transaction',
              ].map((item) => (
                <li key={item} className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 bg-curb-orange rounded-full flex items-center justify-center mr-3 mt-0.5">
                    <svg className="w-4 h-4 text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <span className="text-gray-200 flex-1">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <DealerRevenueCalculator />

          <div className="text-center mt-12">
            <button
              onClick={() => setShowDealerForm(true)}
              className="bg-curb-orange text-white px-8 py-4 rounded-full hover:bg-orange-600 transition font-semibold text-lg"
            >
              Request Dealer Access
            </button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold text-curb-navy text-center mb-16">Frequently Asked Questions</h2>

          <div className="space-y-4">
            {[
              {
                q: 'How do I bid on a vehicle?',
                a: 'Once you create an account and verify your identity, you can browse available auctions and place bids. Each auction runs for 3 days with real-time updates. Simply enter your bid amount and confirm—we\'ll notify you if you\'re outbid.',
              },
              {
                q: 'What happens if I win an auction?',
                a: 'Congratulations! You\'ll receive instructions to deposit funds into a secure Escrow.com account. The dealer will then complete the agreed-upon repairs, you\'ll review and approve the work, and then take delivery of your vehicle.',
              },
              {
                q: 'How does escrow protection work?',
                a: 'All transactions are secured through Escrow.com. Your funds are held safely until you approve the completed repairs and take delivery. This protects both buyers and dealers throughout the entire transaction.',
              },
              {
                q: 'Can I return the car after purchase?',
                a: 'Since all vehicles include detailed inspection reports and pre-approved repairs, sales are final once you approve the repair work and take delivery. However, if repairs aren\'t completed as agreed, you can dispute through our resolution process.',
              },
              {
                q: 'What are the costs to list a vehicle?',
                a: 'Dealers pay a $100 listing fee per vehicle, plus a 3% buyer premium on successful sales. Additional fees include $75 for inspection coordination and $50 for service referrals.',
              },
              {
                q: 'Is Curb available in my area?',
                a: 'We\'re launching initially in Southern California. Join our waitlist to be notified when we expand to your region.',
              },
            ].map((faq, idx) => (
              <div key={idx} className="border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full text-left px-6 py-4 bg-gray-50 hover:bg-gray-100 transition flex justify-between items-center"
                >
                  <span className="font-semibold text-curb-navy">{faq.q}</span>
                  <span className="text-curb-orange text-xl">{openFaq === idx ? '−' : '+'}</span>
                </button>
                {openFaq === idx && (
                  <div className="px-6 py-4 bg-white">
                    <p className="text-gray-600">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-curb-navy text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">CURB</h3>
              <p className="text-gray-400">Wholesale-to-consumer vehicle auction marketplace.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">For Buyers</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#how-it-works" className="hover:text-curb-orange transition">How It Works</a></li>
                <li><a href="#buyers" className="hover:text-curb-orange transition">Benefits</a></li>
                <li><a href="#faq" className="hover:text-curb-orange transition">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">For Dealers</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#dealers" className="hover:text-curb-orange transition">Why Curb</a></li>
                <li><a href="#dealers" className="hover:text-curb-orange transition">Revenue Calculator</a></li>
                <li><button onClick={() => setShowDealerForm(true)} className="hover:text-curb-orange transition">Get Started</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-curb-orange transition">About</a></li>
                <li><a href="#" className="hover:text-curb-orange transition">Contact</a></li>
                <li><a href="#" className="hover:text-curb-orange transition">Privacy</a></li>
                <li><a href="#" className="hover:text-curb-orange transition">Terms</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
            <p>&copy; 2026 Curb. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Buyer Waitlist Modal */}
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

      {/* Dealer Waitlist Modal */}
      {showDealerForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-8">
            <h3 className="text-2xl font-bold text-curb-navy mb-6">Request Dealer Access</h3>
            <form onSubmit={handleDealerSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Business Name"
                required
                value={dealerForm.businessName}
                onChange={(e) => setDealerForm({ ...dealerForm, businessName: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-curb-orange"
              />
              <input
                type="email"
                placeholder="Email"
                required
                value={dealerForm.email}
                onChange={(e) => setDealerForm({ ...dealerForm, email: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-curb-orange"
              />
              <input
                type="tel"
                placeholder="Phone Number"
                required
                value={dealerForm.phone}
                onChange={(e) => setDealerForm({ ...dealerForm, phone: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-curb-orange"
              />
              <select
                required
                value={dealerForm.locations}
                onChange={(e) => setDealerForm({ ...dealerForm, locations: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-curb-orange"
              >
                <option value="">Number of Locations</option>
                <option value="1">1 Location</option>
                <option value="2-5">2-5 Locations</option>
                <option value="6-10">6-10 Locations</option>
                <option value="10+">10+ Locations</option>
              </select>
              <select
                required
                value={dealerForm.inventoryVolume}
                onChange={(e) => setDealerForm({ ...dealerForm, inventoryVolume: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-curb-orange"
              >
                <option value="">Monthly Inventory Volume</option>
                <option value="10-50">10-50 vehicles</option>
                <option value="50-100">50-100 vehicles</option>
                <option value="100-200">100-200 vehicles</option>
                <option value="200+">200+ vehicles</option>
              </select>
              <div className="flex gap-4 mt-6">
                <button
                  type="button"
                  onClick={() => setShowDealerForm(false)}
                  className="flex-1 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-curb-orange text-white rounded-lg hover:bg-orange-600 transition font-medium"
                >
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
