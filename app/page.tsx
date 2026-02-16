import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import DealerRevenueCalculator from '@/components/DealerRevenueCalculator';
import LandingNav from '@/components/landing/LandingNav';
import HeroCTAs from '@/components/landing/HeroCTAs';
import FaqAccordion from '@/components/landing/FaqAccordion';
import DealerCTA from '@/components/landing/DealerCTA';

export const metadata: Metadata = {
  title: 'Curb - Wholesale Prices. Retail Access.',
  description: 'Access wholesale car pricing through transparent 3-day auctions with dealer inspection guarantees. Skip the markup, know exactly what you\'re buying.',
};

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <LandingNav />

      {/* Hero Section */}
      <section className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-curb-navy mb-8 leading-tight">
              Wholesale Prices.<br />Retail Access.
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
              Access wholesale pricing through transparent 3-day auctions with dealer inspection guarantees.
              Skip the markup, know exactly what you&apos;re buying.
            </p>
            <HeroCTAs />

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
              { title: 'Wholesale Pricing', desc: 'Save thousands by buying directly from dealers at wholesale prices without retail markup' },
              { title: 'Transparent Inspections', desc: "Complete condition reports and pre-sale inspections reveal exactly what you're buying" },
              { title: 'Repairs Included', desc: 'Certified dealers complete repairs before delivery\u2014no surprise costs or "as-is" sales' },
              { title: 'Escrow Protection', desc: 'Secure payment through Escrow.com ensures buyer protection throughout the process' },
              { title: 'No Surprises', desc: 'Review and approve all repairs before taking delivery with complete transparency' },
              { title: 'Dealer Ratings', desc: 'Verified reviews and ratings help you buy from trusted, professional dealers' },
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

          {/* Example Listing Card */}
          <div className="max-w-4xl mx-auto mb-16">
            <h3 className="text-3xl font-bold text-curb-navy text-center mb-8">Skip the markup. See what&apos;s real.</h3>
            <p className="text-lg text-gray-600 text-center mb-12 max-w-2xl mx-auto">
              Dealers take in cars they don&apos;t want to recondition. Usually, they ship them to a wholesale auction, another dealer buys them, marks them up, and sells them to you. <strong>Curb cuts out the middleman.</strong> You see what&apos;s wrong, you decide if it&apos;s worth it, and you pay less.
            </p>

            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="grid md:grid-cols-2">
                <div className="bg-gray-100 h-80 relative overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1200&auto=format&fit=crop"
                    alt="2019 BMW 330i"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-8">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="text-2xl font-bold text-curb-navy mb-2">2019 BMW 330i</h4>
                      <p className="text-gray-600">68,000 miles &bull; Clean title &bull; Los Angeles, CA</p>
                    </div>
                    <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-semibold rounded-full">
                      Dealer Listing
                    </span>
                  </div>
                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
                    <p className="font-semibold text-gray-800 mb-2">Inspection Notes:</p>
                    <p className="text-sm text-gray-700">
                      Needs front brake pads (~$280), minor curb rash on 2 wheels, AC blows cold
                    </p>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Current Bid</span>
                      <span className="text-3xl font-bold text-curb-navy">$18,500</span>
                    </div>
                    <div className="flex justify-between items-center pt-3 border-t">
                      <span className="text-gray-500 text-sm">Retail value</span>
                      <span className="text-xl text-gray-400 line-through">$24,000</span>
                    </div>
                    <div className="bg-green-500 text-white rounded-lg p-3 text-center">
                      <span className="font-bold">Save $5,500 vs. retail</span>
                    </div>
                  </div>
                </div>
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
                'Premium marketplace positioning\u2014not an auction junkyard',
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
          <DealerCTA />
        </div>
      </section>

      {/* FAQ Section */}
      <FaqAccordion />

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
    </div>
  );
}
