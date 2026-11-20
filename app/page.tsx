import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import DealerRevenueCalculator from '@/components/DealerRevenueCalculator';
import LandingNav from '@/components/landing/LandingNav';
import HeroCTAs from '@/components/landing/HeroCTAs';
import FaqAccordion from '@/components/landing/FaqAccordion';
import DealerCTA from '@/components/landing/DealerCTA';
import ScrollReveal from '@/components/landing/ScrollReveal';
import AnimatedCounter from '@/components/landing/AnimatedCounter';

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
      <section className="pt-28 pb-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white via-gray-50 to-orange-50/30 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: messaging */}
            <div>
              <div className="inline-flex items-center px-4 py-1.5 bg-curb-orange/10 text-curb-orange text-sm font-semibold rounded-full mb-6">
                <span className="w-2 h-2 bg-curb-orange rounded-full mr-2 animate-pulse"></span>
                Now accepting early access signups
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-curb-navy mb-6 leading-[1.05] tracking-tight">
                Wholesale Prices.<br />
                <span className="bg-gradient-to-r from-curb-orange to-orange-500 bg-clip-text text-transparent">Retail Access.</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed max-w-lg">
                Dealers take in trade-ins they don&apos;t want to recondition and ship them to wholesale auctions you can&apos;t access. <strong className="text-curb-navy">Curb changes that.</strong>
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
            <Link href="/example" className="relative block">
              <div className="absolute -inset-4 bg-gradient-to-br from-curb-orange/20 to-blue-500/10 rounded-3xl blur-2xl"></div>
              <div className="relative bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden group hover:shadow-3xl transition-shadow duration-500 cursor-pointer">
                <div className="bg-gray-100 h-56 sm:h-64 relative overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1200&auto=format&fit=crop"
                    alt="2019 BMW 330i"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 px-3 py-1 bg-blue-500 text-white text-xs font-bold rounded-full flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    Example Auction
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
                      <p className="text-xs text-gray-500 mb-1">Subtotal</p>
                      <p className="text-3xl font-bold text-curb-navy">$20,270</p>
                      <p className="text-xs text-gray-400">Bid $18,500 + repairs + fee</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-400 mb-1">Retail value</p>
                      <p className="text-lg text-gray-400 line-through">$24,000</p>
                      <div className="mt-1 inline-block px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">
                        Save $3,730+
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Social Proof / Traction Bar */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-extrabold text-curb-navy mb-2">
                  <AnimatedCounter end={40} suffix="M+" />
                </div>
                <p className="text-sm md:text-base text-gray-500 font-medium">Used cars sold annually in the U.S.</p>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-extrabold text-curb-orange mb-2">
                  <AnimatedCounter prefix="$" end={5500} />
                </div>
                <p className="text-sm md:text-base text-gray-500 font-medium">Avg. savings vs. retail</p>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-extrabold text-curb-navy mb-2">
                  <AnimatedCounter end={3} />
                </div>
                <p className="text-sm md:text-base text-gray-500 font-medium">Day auction cycle</p>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-extrabold text-curb-orange mb-2">
                  <AnimatedCounter end={15} suffix="+" />
                </div>
                <p className="text-sm md:text-base text-gray-500 font-medium">Years founder auto experience</p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <p className="text-curb-orange font-semibold text-sm uppercase tracking-widest text-center mb-3">Simple Process</p>
            <h2 className="text-4xl md:text-5xl font-extrabold text-curb-navy text-center mb-4">How It Works</h2>
            <p className="text-lg text-gray-600 text-center mb-16 max-w-2xl mx-auto">From listing to delivery in five simple steps</p>
          </ScrollReveal>
          <div className="grid md:grid-cols-5 gap-8 relative">
            <div className="hidden md:block absolute left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-curb-orange via-curb-orange to-curb-navy" style={{ top: '2rem' }}></div>
            {[
              { number: 1, title: 'Dealer Lists Car', desc: 'VIN, photos, professional inspection & repair quote' },
              { number: 2, title: 'Buyers Browse & Bid', desc: 'Transparent 3-day auction with real-time updates' },
              { number: 3, title: 'Winner Pays via Escrow', desc: 'Secure payment through Escrow.com protection' },
              { number: 4, title: 'Dealer Repairs Car', desc: 'Buyer reviews and approves completed repairs' },
              { number: 5, title: 'Delivery & Release', desc: 'Funds released, both parties rate the experience' },
            ].map((step, i) => (
              <ScrollReveal key={step.number} delay={i * 100}>
                <div className="relative z-10 group">
                  <div className="bg-white border-4 border-curb-orange rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:bg-curb-orange group-hover:border-curb-orange transition-colors duration-300">
                    <span className="text-2xl font-bold text-curb-orange group-hover:text-white transition-colors duration-300">{step.number}</span>
                  </div>
                  <h3 className="text-lg font-bold text-curb-navy text-center mb-2">{step.title}</h3>
                  <p className="text-gray-600 text-center text-sm">{step.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Split-Screen: Buyer / Dealer Routing */}
      <section className="relative overflow-hidden">
        <div className="grid md:grid-cols-2 min-h-[480px]">
          {/* Buyer side */}
          <div className="relative bg-gradient-to-br from-orange-50 to-orange-100 p-12 md:p-16 flex flex-col justify-center group">
            <div className="absolute inset-0 bg-gradient-to-br from-curb-orange/5 to-curb-orange/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative">
              <ScrollReveal>
                <div className="inline-flex items-center px-3 py-1 bg-curb-orange/10 text-curb-orange text-xs font-bold rounded-full uppercase tracking-wider mb-6">
                  For Buyers
                </div>
                <h3 className="text-3xl md:text-4xl font-extrabold text-curb-navy mb-4 leading-tight">
                  Skip the markup.<br />Buy at wholesale.
                </h3>
                <p className="text-lg text-gray-600 mb-8 max-w-md leading-relaxed">
                  Access the same cars dealers buy at auction — with full inspections, repairs included, and escrow protection. Save $3K–$5K on every purchase.
                </p>
                <Link
                  href="/browse"
                  className="inline-flex items-center gap-2 bg-curb-orange text-white px-8 py-4 rounded-full hover:bg-orange-600 transition-all font-semibold text-lg shadow-lg shadow-curb-orange/25 hover:shadow-xl hover:shadow-curb-orange/30 hover:-translate-y-0.5"
                >
                  Browse Auctions
                  <svg className="w-5 h-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                </Link>
              </ScrollReveal>
            </div>
          </div>

          {/* Dealer side */}
          <div className="relative bg-gradient-to-br from-curb-navy to-slate-900 p-12 md:p-16 flex flex-col justify-center group">
            <div className="absolute inset-0 bg-gradient-to-br from-curb-orange/5 to-curb-orange/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative">
              <ScrollReveal delay={150}>
                <div className="inline-flex items-center px-3 py-1 bg-curb-orange/20 text-curb-orange text-xs font-bold rounded-full uppercase tracking-wider mb-6">
                  For Dealers
                </div>
                <h3 className="text-3xl md:text-4xl font-extrabold text-white mb-4 leading-tight">
                  Sell in 3 days.<br />Earn on repairs.
                </h3>
                <p className="text-lg text-gray-300 mb-8 max-w-md leading-relaxed">
                  List wholesale trade-ins directly to consumers. Net more than Manheim, plus service revenue on every deal. We handle the rest.
                </p>
                <a
                  href="#dealers"
                  className="inline-flex items-center gap-2 bg-white text-curb-navy px-8 py-4 rounded-full hover:bg-gray-100 transition-all font-semibold text-lg shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                >
                  List Your Inventory
                  <svg className="w-5 h-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                </a>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* For Buyers — with distinct icons */}
      <section id="buyers" className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <p className="text-curb-orange font-semibold text-sm uppercase tracking-widest text-center mb-3">Buyer Benefits</p>
            <h2 className="text-4xl md:text-5xl font-extrabold text-curb-navy text-center mb-4">Why Buy on Curb</h2>
            <p className="text-xl text-gray-600 text-center mb-16 max-w-3xl mx-auto">
              Every protection you&apos;d want, built into every transaction
            </p>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-8 mb-20">
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
                <div className="bg-gray-50 p-8 rounded-2xl hover:shadow-lg transition-all duration-300 border border-transparent hover:border-curb-orange/20 h-full group hover:-translate-y-1">
                  <div className="w-12 h-12 bg-curb-orange/10 rounded-xl flex items-center justify-center mb-5 group-hover:bg-curb-orange/20 transition-colors">
                    {benefit.icon}
                  </div>
                  <h3 className="text-xl font-bold text-curb-navy mb-3">{benefit.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{benefit.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Price comparison — visual storytelling */}
          <ScrollReveal>
            <div className="max-w-4xl mx-auto">
              <p className="text-curb-orange font-semibold text-sm uppercase tracking-widest text-center mb-3">Price Comparison</p>
              <h3 className="text-3xl md:text-4xl font-extrabold text-curb-navy text-center mb-12">See where the money goes</h3>
              <div className="grid md:grid-cols-3 gap-6">
                {/* Traditional path */}
                <div className="bg-gray-50 rounded-2xl p-8 border-2 border-gray-200 relative hover:shadow-md transition-all duration-300">
                  <div className="absolute -top-3 left-6 px-3 py-0.5 bg-gray-200 text-gray-600 text-xs font-bold rounded-full uppercase tracking-wide">Wholesale Auction</div>
                  <div className="mt-4 mb-6">
                    <p className="text-sm text-gray-500 mb-1">Dealer sells for</p>
                    <p className="text-3xl font-extrabold text-gray-700">$17,000</p>
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed">Car goes to another dealer. Consumer never sees it at this price.</p>
                </div>
                {/* Retail lot */}
                <div className="bg-red-50/50 rounded-2xl p-8 border-2 border-red-200 relative hover:shadow-md transition-all duration-300">
                  <div className="absolute -top-3 left-6 px-3 py-0.5 bg-red-100 text-red-600 text-xs font-bold rounded-full uppercase tracking-wide">Retail Lot</div>
                  <div className="mt-4 mb-6">
                    <p className="text-sm text-gray-500 mb-1">You pay</p>
                    <p className="text-3xl font-extrabold text-red-600">$24,000</p>
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed">Second dealer adds markup, recon, and profit. &ldquo;As-is&rdquo; or limited warranty.</p>
                </div>
                {/* Curb */}
                <div className="bg-orange-50 rounded-2xl p-8 border-2 border-curb-orange relative ring-2 ring-curb-orange/20 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <div className="absolute -top-3 left-6 px-3 py-0.5 bg-curb-orange text-white text-xs font-bold rounded-full uppercase tracking-wide">On Curb</div>
                  <div className="mt-4 mb-6">
                    <p className="text-sm text-gray-500 mb-1">Subtotal (bid + repairs + fee)</p>
                    <p className="text-3xl font-extrabold text-curb-orange">$20,270</p>
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed">Direct from dealer. Inspected, repaired, escrow-protected. <strong className="text-curb-navy">Save $3,730+</strong> before taxes &amp; registration.</p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Social Proof — Founder Credibility */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <div className="bg-white rounded-3xl p-10 md:p-14 shadow-sm border border-gray-100">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="flex-shrink-0 w-20 h-20 bg-curb-navy rounded-2xl flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">AS</span>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <blockquote className="text-xl md:text-2xl text-curb-navy font-medium leading-relaxed mb-4">
                    &ldquo;I&apos;ve watched thousands of quality trade-ins get shipped to wholesale auctions where consumers will never see them. Curb opens that door — same cars, full transparency, thousands less.&rdquo;
                  </blockquote>
                  <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                    <p className="font-bold text-curb-navy">Alex Schwartz</p>
                    <span className="hidden md:block text-gray-300">|</span>
                    <p className="text-gray-500">Founder &amp; CEO &bull; 15+ years automotive retail &bull; Former Dealership GM</p>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-4 justify-center md:justify-start">
                    <span className="px-3 py-1 bg-orange-50 text-curb-orange text-xs font-semibold rounded-full border border-orange-100">#1 Fiat Nationally (2015)</span>
                    <span className="px-3 py-1 bg-orange-50 text-curb-orange text-xs font-semibold rounded-full border border-orange-100">#1 Maserati Nationally (2017)</span>
                    <span className="px-3 py-1 bg-orange-50 text-curb-orange text-xs font-semibold rounded-full border border-orange-100">Lithia AMP Graduate</span>
                    <span className="px-3 py-1 bg-orange-50 text-curb-orange text-xs font-semibold rounded-full border border-orange-100">CA Licensed Dealer</span>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* For Dealers */}
      <section id="dealers" className="py-24 px-4 sm:px-6 lg:px-8 bg-curb-navy text-white">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <p className="text-curb-orange font-semibold text-sm uppercase tracking-widest text-center mb-3">Dealer Partner Program</p>
            <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-4">For Dealers</h2>
            <p className="text-xl text-gray-300 text-center mb-16 max-w-3xl mx-auto">
              Liquidate wholesale inventory in 3 days while earning service revenue
            </p>
          </ScrollReveal>

          <ScrollReveal>
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {[
                {
                  title: '3-Day Liquidation',
                  desc: 'Move wholesale inventory faster than traditional auction channels',
                  icon: (
                    <svg className="w-7 h-7 text-curb-orange" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                  ),
                },
                {
                  title: 'Service Revenue',
                  desc: 'Earn on repairs and reconditioning — not just the sale markup',
                  icon: (
                    <svg className="w-7 h-7 text-curb-orange" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  ),
                },
                {
                  title: 'Premium Positioning',
                  desc: 'A curated marketplace, not an auction junkyard — attract serious buyers',
                  icon: (
                    <svg className="w-7 h-7 text-curb-orange" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path></svg>
                  ),
                },
              ].map((item, i) => (
                <div key={item.title} className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 hover:-translate-y-1">
                  <div className="w-14 h-14 bg-curb-orange/10 rounded-xl flex items-center justify-center mb-5">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-gray-300 leading-relaxed">{item.desc}</p>
                </div>
              ))}
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

      {/* Final CTA */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-curb-navy via-slate-800 to-curb-navy overflow-hidden relative">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-curb-orange rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-20 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-4xl mx-auto text-center relative">
          <ScrollReveal>
            <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
              Ready to buy smarter?
            </h2>
            <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
              Join the waitlist for early access to wholesale-priced vehicles with full transparency and protection.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/browse"
                className="inline-flex items-center justify-center gap-2 bg-curb-orange text-white px-10 py-5 rounded-full hover:bg-orange-600 transition-all font-bold text-lg shadow-lg shadow-curb-orange/30 hover:shadow-xl hover:shadow-curb-orange/40 hover:-translate-y-0.5"
              >
                Browse Auctions
                <svg className="w-5 h-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur text-white px-10 py-5 rounded-full hover:bg-white/20 transition-all font-bold text-lg border border-white/20"
              >
                Learn More
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-curb-navy text-white py-12 px-4 sm:px-6 lg:px-8 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-2xl font-extrabold mb-4">CURB</h3>
              <p className="text-gray-400 leading-relaxed">Wholesale-to-consumer vehicle auction marketplace.</p>
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
