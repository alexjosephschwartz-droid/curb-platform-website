import type { Metadata } from 'next';
import Link from 'next/link';
import LandingNav from '@/components/landing/LandingNav';

export const metadata: Metadata = {
  title: 'About Curb - Our Story',
  description: 'Learn about Curb, the wholesale-to-consumer vehicle auction marketplace founded by Alex Schwartz, a 15+ year automotive retail veteran.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <LandingNav />

      {/* Hero */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-gray-50 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-curb-navy mb-6">
            About Curb
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            We&apos;re building the bridge between wholesale and retail &mdash; giving consumers access to the same cars, at the same prices, that only dealers could reach before.
          </p>
        </div>
      </section>

      {/* The Problem */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-curb-navy mb-8">The Problem</h2>
          <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
            <p>
              Every day, dealerships take in trade-ins they don&apos;t want to recondition. These cars aren&apos;t bad &mdash; they just don&apos;t fit the dealer&apos;s brand or lot. So they ship them to wholesale auctions like Manheim or ADESA, where another dealer buys them for pennies on the dollar, marks them up $3,000&ndash;$5,000, and sells them to you at &ldquo;retail.&rdquo;
            </p>
            <p>
              The consumer never had a seat at that table. Until now.
            </p>
          </div>
        </div>
      </section>

      {/* The Solution */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-curb-navy mb-8">The Curb Model</h2>
          <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
            <p>
              Curb lets dealers list those same wholesale trade-ins directly to consumers through transparent 3-day auctions. Every listing includes a professional inspection, a repair quote, and full condition disclosure. The winning buyer pays through escrow, the dealer completes the agreed-upon repairs, and the car is delivered &mdash; inspected, repaired, and protected.
            </p>
            <p>
              Dealers earn more than wholesale auction (plus service revenue on repairs). Buyers save thousands versus retail. Everyone sees the same information. No hidden fees, no &ldquo;as-is&rdquo; surprises.
            </p>
          </div>

          <div className="mt-12 grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center">
              <div className="text-3xl font-bold text-curb-orange mb-2">$3K&ndash;$5K</div>
              <div className="text-gray-600 text-sm">Average buyer savings vs. retail</div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center">
              <div className="text-3xl font-bold text-curb-orange mb-2">3 Days</div>
              <div className="text-gray-600 text-sm">From listing to sold</div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center">
              <div className="text-3xl font-bold text-curb-orange mb-2">100%</div>
              <div className="text-gray-600 text-sm">Escrow-protected transactions</div>
            </div>
          </div>
        </div>
      </section>

      {/* Founder */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-curb-navy mb-8">Meet the Founder</h2>

          <div className="bg-gray-50 rounded-2xl p-8 md:p-12 border border-gray-100">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              {/* Avatar placeholder */}
              <div className="flex-shrink-0 w-32 h-32 bg-curb-navy rounded-2xl flex items-center justify-center">
                <span className="text-4xl font-bold text-white">AS</span>
              </div>

              <div className="flex-1">
                <h3 className="text-2xl font-bold text-curb-navy mb-1">Alex Schwartz</h3>
                <p className="text-curb-orange font-semibold mb-4">Founder &amp; CEO</p>

                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p>
                    Alex brings 15+ years of automotive retail experience to Curb, having managed every profit center in a dealership &mdash; Sales, F&amp;I, Service, and Used Vehicles. Most recently, he served as General Manager of Huntington Beach Hyundai, a Lithia Motors (NYSE: LAD) store, overseeing full P&amp;L responsibility and day-to-day operations.
                  </p>
                  <p>
                    Prior to that, he was General Sales Manager at Audi Calabasas (also Lithia), and held sales management and finance roles at Porsche Woodland Hills, Santa Monica Auto Co (Fiat/Alfa Romeo/Maserati), and The Auto Gallery &mdash; where he was ranked #1 in the nation for Fiat sales (2015) and #1 in the nation for Maserati sales (2017).
                  </p>
                  <p>
                    A graduate of Lithia&apos;s AMP leadership development program, Alex holds active California dealer and wholesale licensing. Before automotive, he worked in SaaS sales and financial advisory, giving him a cross-industry perspective on marketplace mechanics and consumer finance. He earned his BA in Business Administration from the University of San Francisco and is currently pursuing his MBA at Northwood University (expected 2027).
                  </p>
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  <span className="px-3 py-1 bg-curb-orange/10 text-curb-orange text-sm font-medium rounded-full">
                    15+ Years Automotive
                  </span>
                  <span className="px-3 py-1 bg-curb-orange/10 text-curb-orange text-sm font-medium rounded-full">
                    Dealership GM
                  </span>
                  <span className="px-3 py-1 bg-curb-orange/10 text-curb-orange text-sm font-medium rounded-full">
                    CA Licensed Dealer
                  </span>
                  <span className="px-3 py-1 bg-curb-orange/10 text-curb-orange text-sm font-medium rounded-full">
                    Lithia AMP Graduate
                  </span>
                  <span className="px-3 py-1 bg-curb-orange/10 text-curb-orange text-sm font-medium rounded-full">
                    MBA Candidate
                  </span>
                </div>

                <div className="mt-6">
                  <a
                    href="https://linkedin.com/in/alex-schwartz-4871b538"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-curb-navy hover:text-curb-orange transition font-medium"
                  >
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    Connect on LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-curb-navy text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Our Vision</h2>
          <p className="text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto mb-8">
            The used car market moves 40 million vehicles a year in the U.S. alone. Millions of those pass through wholesale auctions that consumers can&apos;t access. Curb is opening that door &mdash; starting in Southern California, then expanding market by market.
          </p>
          <p className="text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
            We believe buying a car should feel like buying anything else online: transparent pricing, clear condition information, and real protection if something goes wrong.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-curb-navy mb-6">Ready to Get Started?</h2>
          <p className="text-lg text-gray-600 mb-8">
            Whether you&apos;re a buyer looking for wholesale pricing or a dealer ready to earn more per trade-in, Curb is built for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/browse"
              className="inline-block bg-curb-orange text-white px-8 py-4 rounded-full hover:bg-orange-600 transition font-semibold text-lg"
            >
              Browse Auctions
            </Link>
            <Link
              href="/#dealers"
              className="inline-block bg-curb-navy text-white px-8 py-4 rounded-full hover:bg-gray-800 transition font-semibold text-lg border border-gray-600"
            >
              Dealer Info
            </Link>
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
                <li><Link href="/#how-it-works" className="hover:text-curb-orange transition">How It Works</Link></li>
                <li><Link href="/#buyers" className="hover:text-curb-orange transition">Benefits</Link></li>
                <li><Link href="/#faq" className="hover:text-curb-orange transition">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">For Dealers</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/#dealers" className="hover:text-curb-orange transition">Why Curb</Link></li>
                <li><Link href="/#dealers" className="hover:text-curb-orange transition">Revenue Calculator</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/about" className="hover:text-curb-orange transition text-curb-orange">About</Link></li>
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
