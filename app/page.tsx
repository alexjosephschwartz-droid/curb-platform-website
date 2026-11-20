import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import DealerRevenueCalculator from '@/components/DealerRevenueCalculator';
import LandingNav from '@/components/landing/LandingNav';
import HeroCTAs from '@/components/landing/HeroCTAs';
import FaqAccordion from '@/components/landing/FaqAccordion';
import DealerCTA from '@/components/landing/DealerCTA';
import ScrollReveal from '@/components/landing/ScrollReveal';
import WaitlistButton from '@/components/landing/WaitlistButton';

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
                  <span className="text-gray-700 font-medium">Pay the dealer directly</span>
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
                        Save $3,730
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
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
              { number: 1, title: 'Dealer Lists the Car', desc: 'VIN, photos, condition report, and a professional inspection with every required repair priced up front' },
              { number: 2, title: 'Review the Price & Bid', desc: 'See the full cost breakdown — bid, repairs, and buyer premium — then place your bid in a transparent 3-day auction' },
              { number: 3, title: 'Win & Pay a Deposit', desc: 'Pay the selling dealer directly. Deposit amount, due date, and refund terms are confirmed before you bid' },
              { number: 4, title: 'Review Completed Repairs', desc: 'The dealer completes agreed-upon repairs and shares the completed repair order — no surprises' },
              { number: 5, title: 'Inspect & Pay the Balance', desc: 'Inspect the car at pickup and pay the remaining balance directly to the dealer. Title transfers to you' },
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

      {/* Price Comparison — collapsible */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <details className="group border border-gray-200 rounded-2xl overflow-hidden">
              <summary className="flex items-center justify-between px-8 py-5 cursor-pointer bg-gray-50 hover:bg-gray-100 transition select-none">
                <span className="text-lg font-bold text-curb-navy">See the price comparison</span>
                <span className="text-curb-orange text-xl group-open:rotate-45 transition-transform duration-200">+</span>
              </summary>
              <div className="p-8 pt-6">
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-gray-50 rounded-2xl p-8 border-2 border-gray-200 relative">
                    <div className="absolute -top-3 left-6 px-3 py-0.5 bg-gray-200 text-gray-600 text-xs font-bold rounded-full uppercase tracking-wide">Wholesale Auction</div>
                    <div className="mt-4 mb-6">
                      <p className="text-sm text-gray-500 mb-1">Dealer sells for</p>
                      <p className="text-3xl font-extrabold text-gray-700">$17,000</p>
                    </div>
                    <p className="text-sm text-gray-500 leading-relaxed">Car goes to another dealer. Consumer never sees it at this price.</p>
                  </div>
                  <div className="bg-red-50/50 rounded-2xl p-8 border-2 border-red-200 relative">
                    <div className="absolute -top-3 left-6 px-3 py-0.5 bg-red-100 text-red-600 text-xs font-bold rounded-full uppercase tracking-wide">Retail Lot</div>
                    <div className="mt-4 mb-6">
                      <p className="text-sm text-gray-500 mb-1">You pay</p>
                      <p className="text-3xl font-extrabold text-red-600">$24,000</p>
                    </div>
                    <p className="text-sm text-gray-500 leading-relaxed">Second dealer adds markup, recon, and profit. &ldquo;As-is&rdquo; or limited warranty.</p>
                  </div>
                  <div className="bg-orange-50 rounded-2xl p-8 border-2 border-curb-orange relative ring-2 ring-curb-orange/20">
                    <div className="absolute -top-3 left-6 px-3 py-0.5 bg-curb-orange text-white text-xs font-bold rounded-full uppercase tracking-wide">On Curb</div>
                    <div className="mt-4 mb-6">
                      <p className="text-sm text-gray-500 mb-1">Subtotal (bid + repairs + fee)</p>
                      <p className="text-3xl font-extrabold text-curb-orange">$20,270</p>
                    </div>
                    <p className="text-sm text-gray-500 leading-relaxed">Direct from dealer. Inspected, repaired, dealer-direct payment. <strong className="text-curb-navy">Save $3,730</strong> before taxes &amp; registration.</p>
                  </div>
                </div>
              </div>
            </details>
          </ScrollReveal>
        </div>
      </section>

      {/* Founder Note */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal>
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="flex-shrink-0 w-16 h-16 bg-curb-navy rounded-2xl flex items-center justify-center">
                <span className="text-xl font-bold text-white">AS</span>
              </div>
              <div className="text-center md:text-left">
                <blockquote className="text-lg text-curb-navy font-medium leading-relaxed mb-2">
                  &ldquo;I&apos;ve watched thousands of quality trade-ins get shipped to wholesale auctions where consumers will never see them. Curb opens that door.&rdquo;
                </blockquote>
                <p className="text-gray-500 text-sm">
                  <strong className="text-curb-navy">Alex Schwartz</strong> &bull; Founder &amp; CEO &bull; 15+ years automotive retail &bull; <Link href="/about" className="text-curb-orange hover:underline">Read more</Link>
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* For Dealers */}
      <section id="dealers" className="py-20 px-4 sm:px-6 lg:px-8 bg-curb-navy text-white">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4">For Dealers</h2>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              Liquidate wholesale inventory in 3 days. Earn service revenue on every deal. Net more than Manheim.
            </p>
            <DealerCTA />
          </ScrollReveal>

          <ScrollReveal>
            <details id="dealer-economics" className="mt-10 group border border-white/10 rounded-2xl overflow-hidden text-left">
              <summary className="flex items-center justify-between px-8 py-5 cursor-pointer bg-white/5 hover:bg-white/10 transition select-none">
                <span className="text-lg font-bold text-white">See the dealer economics</span>
                <span className="text-curb-orange text-xl group-open:rotate-45 transition-transform duration-200">+</span>
              </summary>
              <div className="p-6">
                <DealerRevenueCalculator />
              </div>
            </details>
          </ScrollReveal>
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
              Join the waitlist for early access to wholesale-priced vehicles in Southern California.
            </p>
            <WaitlistButton />
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
                <li><Link href="/example" className="hover:text-curb-orange transition">Try the Demo</Link></li>
                <li><a href="#faq" className="hover:text-curb-orange transition">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">For Dealers</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#dealers" className="hover:text-curb-orange transition">Partner Program</a></li>
                <li><a href="#dealer-economics" className="hover:text-curb-orange transition">Revenue Calculator</a></li>
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
