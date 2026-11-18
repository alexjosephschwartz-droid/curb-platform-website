import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import DealerRevenueCalculator from '@/components/DealerRevenueCalculator';
import LandingNav from '@/components/landing/LandingNav';
import HeroCTAs from '@/components/landing/HeroCTAs';
import FaqAccordion from '@/components/landing/FaqAccordion';
import DealerCTA from '@/components/landing/DealerCTA';
import ScrollReveal from '@/components/landing/ScrollReveal';

export const metadata: Metadata = {
  title: 'Curb - Wholesale Prices. Retail Access.',
  description: 'Access wholesale car pricing through transparent 3-day auctions with dealer inspection guarantees. Skip the markup, know exactly what you\'re buying.',
};

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <LandingNav />

      {/* Hero Section — split layout with listing card */}
      <section className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white via-gray-50 to-orange-50/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: messaging */}
            <div>
              <div className="inline-flex items-center px-4 py-1.5 bg-curb-orange/10 text-curb-orange text-sm font-semibold rounded-full mb-6">
                <span className="w-2 h-2 bg-curb-orange rounded-full mr-2 animate-pulse"></span>
                Now accepting early access signups
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-curb-navy mb-6 leading-[1.08] tracking-tight">
                Wholesale Prices.<br />
                <span className="text-curb-orange">Retail Access.</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-lg">
                Dealers take in trade-ins they don&apos;t want to recondition and ship them to wholesale auctions you can&apos;t access. <strong className="text-curb-navy">Curb changes that.</strong> Same cars, transparent inspections, thousands less.
              </p>
              <HeroCTAs />

              {/* Trust stats — inline */}
              <div className="mt-10 flex flex-wrap gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" viewBox="0 0 24 24" stroke="currentColor"><path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                  </div>
                  <span className="text-gray-700 font-medium">Escrow protected</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <svg className="w-4 h-4 text-blue-600" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" viewBox="0 0 24 24" stroke="currentColor"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  </div>
                  <span className="text-gray-700 font-medium">Dealer inspected</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
                    <svg className="w-4 h-4 text-curb-orange" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" viewBox="0 0 24 24" stroke="currentColor"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  </div>
                  <span className="text-gray-700 font-medium">3-day auctions</span>
                </div>
              </div>
            </div>

            {/* Right: example listing card */}
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-curb-orange/20 to-blue-500/10 rounded-3xl blur-2xl"></div>
              <div className="relative bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
                <div className="bg-gray-100 h-56 sm:h-64 relative overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1200&auto=format&fit=crop"
                    alt="2019 BMW 330i"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 left-4 px-3 py-1 bg-green-500 text-white text-xs font-bold rounded-full flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
                    Live Auction
                  </div>
                  <div className="absolute top-4 right-4 px-3 py-1 bg-black/60 backdrop-blur-sm text-white text-xs font-semibold rounded-full">
                    2d 14h left
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="text-xl font-bold text-curb-navy">2019 BMW 330i</h4>
                      <p className="text-gray-500 text-sm">68,000 mi &bull; Clean title &bull; Los Angeles, CA</p>
                    </div>
                  </div>
                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 mb-4">
                    <p className="font-semibold text-gray-800 text-sm mb-1">Inspection Notes:</p>
                    <p className="text-xs text-gray-600">
                      Front brake pads (~$280), minor curb rash on 2 wheels, AC blows cold
                    </p>
                  </div>
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Current Bid</p>
                      <p className="text-3xl font-bold text-curb-navy">$18,500</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-400 mb-1">Retail value</p>
                      <p className="text-lg text-gray-400 line-through">$24,000</p>
                      <div className="mt-1 inline-block px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">
                        Save $5,500
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <h2 className="text-4xl font-bold text-curb-navy text-center mb-4">How It Works</h2>
            <p className="text-lg text-gray-600 text-center mb-16 max-w-2xl mx-auto">From listing to delivery in five simple steps</p>
          </ScrollReveal>
          <div className="grid md:grid-cols-5 gap-8 relative">
            <div className="hidden md:block absolute top-12 left-0 right-0 h-1 bg-gradient-to-r from-curb-orange via-curb-orange to-curb-navy" style={{ top: '3rem' }}></div>
            {[
              { number: 1, title: 'Dealer Lists Car', desc: 'VIN, photos, professional inspection & repair quote' },
              { number: 2, title: 'Buyers Browse & Bid', desc: 'Transparent 3-day auction with real-time updates' },
              { number: 3, title: 'Winner Pays via Escrow', desc: 'Secure payment through Escrow.com protection' },
              { number: 4, title: 'Dealer Repairs Car', desc: 'Buyer reviews and approves completed repairs' },
              { number: 5, title: 'Delivery & Release', desc: 'Funds released, both parties rate the experience' },
            ].map((step, i) => (
              <ScrollReveal key={step.number} delay={i * 100}>
                <div className="relative z-10">
                  <div className="bg-white border-4 border-curb-orange rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-curb-orange">{step.number}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-curb-navy text-center mb-2">{step.title}</h3>
                  <p className="text-gray-600 text-center text-sm">{step.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* For Buyers — with distinct icons */}
      <section id="buyers" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <h2 className="text-4xl font-bold text-curb-navy text-center mb-4">For Buyers</h2>
            <p className="text-xl text-gray-600 text-center mb-16 max-w-3xl mx-auto">
              Access wholesale pricing directly and skip the middleman markup
            </p>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              {
                title: 'Wholesale Pricing',
                desc: 'Save thousands by buying directly from dealers at wholesale prices without retail markup',
                icon: (
                  <svg className="w-6 h-6 text-curb-orange" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                ),
              },
              {
                title: 'Transparent Inspections',
                desc: "Complete condition reports and pre-sale inspections reveal exactly what you're buying",
                icon: (
                  <svg className="w-6 h-6 text-curb-orange" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path>
                  </svg>
                ),
              },
              {
                title: 'Repairs Included',
                desc: 'Certified dealers complete repairs before delivery—no surprise costs or "as-is" sales',
                icon: (
                  <svg className="w-6 h-6 text-curb-orange" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                    <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                ),
              },
              {
                title: 'Escrow Protection',
                desc: 'Secure payment through Escrow.com ensures buyer protection throughout the process',
                icon: (
                  <svg className="w-6 h-6 text-curb-orange" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                  </svg>
                ),
              },
              {
                title: 'No Surprises',
                desc: 'Review and approve all repairs before taking delivery with complete transparency',
                icon: (
                  <svg className="w-6 h-6 text-curb-orange" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                  </svg>
                ),
              },
              {
                title: 'Dealer Ratings',
                desc: 'Verified reviews and ratings help you buy from trusted, professional dealers',
                icon: (
                  <svg className="w-6 h-6 text-curb-orange" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>
                  </svg>
                ),
              },
            ].map((benefit, i) => (
              <ScrollReveal key={benefit.title} delay={i * 80}>
                <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition border border-gray-100 h-full">
                  <div className="w-12 h-12 bg-curb-orange/10 rounded-lg flex items-center justify-center mb-4">
                    {benefit.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-curb-navy mb-3">{benefit.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{benefit.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Price comparison — visual storytelling */}
          <ScrollReveal>
            <div className="max-w-4xl mx-auto mb-16">
              <h3 className="text-3xl font-bold text-curb-navy text-center mb-12">See where the money goes</h3>
              <div className="grid md:grid-cols-3 gap-6">
                {/* Traditional path */}
                <div className="bg-white rounded-xl p-6 border-2 border-gray-200 relative">
                  <div className="absolute -top-3 left-4 px-3 py-0.5 bg-gray-200 text-gray-600 text-xs font-bold rounded-full uppercase tracking-wide">Wholesale Auction</div>
                  <div className="mt-4 mb-6">
                    <p className="text-sm text-gray-500 mb-1">Dealer sells for</p>
                    <p className="text-2xl font-bold text-gray-700">$17,000</p>
                  </div>
                  <p className="text-sm text-gray-500">Car goes to another dealer. Consumer never sees it at this price.</p>
                </div>
                {/* Retail lot */}
                <div className="bg-white rounded-xl p-6 border-2 border-red-200 relative">
                  <div className="absolute -top-3 left-4 px-3 py-0.5 bg-red-100 text-red-600 text-xs font-bold rounded-full uppercase tracking-wide">Retail Lot</div>
                  <div className="mt-4 mb-6">
                    <p className="text-sm text-gray-500 mb-1">You pay</p>
                    <p className="text-2xl font-bold text-red-600">$24,000</p>
                  </div>
                  <p className="text-sm text-gray-500">Second dealer adds markup, recon, and profit. &ldquo;As-is&rdquo; or limited warranty.</p>
                </div>
                {/* Curb */}
                <div className="bg-white rounded-xl p-6 border-2 border-curb-orange relative ring-2 ring-curb-orange/20">
                  <div className="absolute -top-3 left-4 px-3 py-0.5 bg-curb-orange text-white text-xs font-bold rounded-full uppercase tracking-wide">On Curb</div>
                  <div className="mt-4 mb-6">
                    <p className="text-sm text-gray-500 mb-1">You pay</p>
                    <p className="text-2xl font-bold text-curb-orange">$18,500</p>
                  </div>
                  <p className="text-sm text-gray-500">Direct from dealer. Inspected, repaired, escrow-protected. <strong className="text-curb-navy">Save $5,500.</strong></p>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <div className="text-center mt-12">
            <Link
              href="/browse"
              className="inline-block bg-curb-orange text-white px-8 py-4 rounded-full hover:bg-orange-600 transition font-semibold text-lg shadow-lg shadow-curb-orange/25"
            >
              Start Shopping
            </Link>
          </div>
        </div>
      </section>

      {/* For Dealers */}
      <section id="dealers" className="py-20 px-4 sm:px-6 lg:px-8 bg-curb-navy text-white">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <h2 className="text-4xl font-bold text-center mb-4">For Dealers</h2>
            <p className="text-xl text-gray-300 text-center mb-16 max-w-3xl mx-auto">
              Liquidate wholesale inventory in 3 days while earning service revenue
            </p>
          </ScrollReveal>

          <ScrollReveal>
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
          </ScrollReveal>

          <ScrollReveal>
            <DealerRevenueCalculator />
          </ScrollReveal>
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
                <li><Link href="/about" className="hover:text-curb-orange transition">About</Link></li>
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
