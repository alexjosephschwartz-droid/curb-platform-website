'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function RoadmapPage() {
  const [selectedPhase, setSelectedPhase] = useState<'phase2' | 'phase3'>('phase2');

  const phase2Features = [
    {
      id: 1,
      icon: '🏆',
      title: 'Curb Certified Badge',
      status: 'Phase 2',
      priority: 'High',
      complexity: 'Medium',
      description: 'Premium tier with stricter inspection standards and higher buyer trust',
      features: [
        'Third-party certified mechanic inspection',
        'Stricter condition standards (no frame damage, major repairs)',
        '30-day powertrain warranty included',
        'Dealer rating >95% required',
        'Premium pricing opportunity for dealers',
      ],
      impact: 'Increases buyer confidence and allows premium pricing on quality vehicles',
    },
    {
      id: 2,
      icon: '🚚',
      title: 'Delivery & Transport Logistics',
      status: 'Phase 2',
      priority: 'High',
      complexity: 'High',
      description: 'Seamless vehicle delivery coordination with partner carriers',
      features: [
        'Partner integrations (uShip, TransCare)',
        'White-glove delivery for premium vehicles',
        'Real-time delivery tracking',
        'Cost calculator at checkout',
        'Door-to-door service across all 50 states',
      ],
      impact: 'Removes friction from buyer experience, enables nationwide expansion',
    },
    {
      id: 3,
      icon: '🏢',
      title: 'Enterprise Dealer Portal',
      status: 'Phase 2',
      priority: 'Medium',
      complexity: 'Medium',
      description: 'Advanced tools for high-volume dealerships',
      features: [
        'Bulk listing upload via CSV',
        'Multi-location inventory management',
        'Automated pricing optimization',
        'Advanced analytics & forecasting',
        'Dedicated account manager',
      ],
      impact: 'Attracts larger dealers, increases platform inventory and GMV',
    },
    {
      id: 4,
      icon: '📱',
      title: 'Mobile Apps (iOS & Android)',
      status: 'Phase 2',
      priority: 'High',
      complexity: 'High',
      description: 'Native mobile applications for buyers and dealers',
      features: [
        'Browse auctions optimized for mobile',
        'Real-time bid notifications',
        'Quick bidding with saved payment methods',
        'Camera integration for dealer listings',
        'Push notifications for auction activity',
      ],
      impact: 'Increases engagement, enables mobile-first user experience',
    },
  ];

  const phase3Features = [
    {
      id: 5,
      icon: '💳',
      title: 'Financing Marketplace',
      status: 'Phase 3',
      priority: 'High',
      complexity: 'High',
      description: 'Integrated auto financing from multiple lenders',
      features: [
        'Partner with lending platforms (LendingClub, etc.)',
        '"Finance this purchase" option at checkout',
        'Pre-approval in minutes',
        'Competitive rate comparison',
        'Lender funds escrow directly',
      ],
      impact: 'Expands buyer pool, increases average transaction value',
    },
    {
      id: 6,
      icon: '🛡️',
      title: 'Extended Warranty Products',
      status: 'Phase 3',
      priority: 'Medium',
      complexity: 'Low',
      description: 'Optional warranty upsells for additional peace of mind',
      features: [
        '30-day powertrain warranty (Curb Certified)',
        '1-year extended coverage options',
        'Powertrain, electrical, and A/C coverage',
        'Partner with warranty providers',
        'Instant online purchase',
      ],
      impact: 'Additional revenue stream, increases buyer confidence',
    },
    {
      id: 7,
      icon: '🚗',
      title: 'Curb Direct (Buy/Resell)',
      status: 'Phase 3',
      priority: 'High',
      complexity: 'High',
      description: 'Curb-owned inventory for higher-margin sales',
      features: [
        'Direct wholesale vehicle acquisition',
        'Leverage dealer network for repairs',
        'Premium vehicle curation',
        'Higher margin than marketplace take rate',
        'Institutional buyer relationships',
      ],
      impact: 'Diversified revenue model, higher profit margins on select inventory',
    },
  ];

  const allFeatures = selectedPhase === 'phase2' ? phase2Features : phase3Features;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-curb-navy text-white py-4 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold">
              CURB
            </Link>
            <nav className="flex gap-6">
              <Link href="/browse" className="hover:text-curb-orange transition">
                Browse
              </Link>
              <Link href="/login" className="hover:text-curb-orange transition">
                Login
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-curb-navy via-slate-800 to-curb-navy text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Product Roadmap</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Our vision for the future of transparent car buying. Innovative features coming in
            Phase 2 and Phase 3 to deliver even more value to buyers and dealers.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-7xl">
        {/* Current Platform Status */}
        <div className="bg-gradient-to-r from-green-50 to-green-100 border-2 border-green-300 rounded-2xl p-8 mb-12">
          <div className="flex items-center gap-4 mb-4">
            <div className="text-5xl">✅</div>
            <div>
              <h2 className="text-2xl font-bold text-green-800">Phase 1: LIVE NOW</h2>
              <p className="text-green-700">Core platform features are deployed and operational</p>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-4 mt-6">
            <div className="bg-white rounded-lg p-4 border border-green-200">
              <p className="font-semibold text-green-800">✓ Buyer Marketplace</p>
              <p className="text-sm text-gray-600">Browse, bid, and purchase vehicles</p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-green-200">
              <p className="font-semibold text-green-800">✓ Dealer Dashboard</p>
              <p className="text-sm text-gray-600">List vehicles and manage auctions</p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-green-200">
              <p className="font-semibold text-green-800">✓ AI Automation</p>
              <p className="text-sm text-gray-600">Smart pricing, fraud detection, chatbot</p>
            </div>
          </div>
        </div>

        {/* Phase Toggle */}
        <div className="flex gap-4 mb-8 justify-center">
          <button
            onClick={() => setSelectedPhase('phase2')}
            className={`px-8 py-4 rounded-xl font-bold text-lg transition ${
              selectedPhase === 'phase2'
                ? 'bg-curb-orange text-white shadow-lg scale-105'
                : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-curb-orange'
            }`}
          >
            📅 Phase 2 (2025 Q3-Q4)
          </button>
          <button
            onClick={() => setSelectedPhase('phase3')}
            className={`px-8 py-4 rounded-xl font-bold text-lg transition ${
              selectedPhase === 'phase3'
                ? 'bg-curb-orange text-white shadow-lg scale-105'
                : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-curb-orange'
            }`}
          >
            🚀 Phase 3 (2026)
          </button>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {allFeatures.map((feature) => (
            <div
              key={feature.id}
              className="bg-white rounded-2xl shadow-lg p-8 border-2 border-gray-100 hover:border-curb-orange hover:shadow-xl transition"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="text-6xl">{feature.icon}</div>
                  <div>
                    <h3 className="text-2xl font-bold text-curb-navy mb-1">{feature.title}</h3>
                    <div className="flex gap-2">
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
                        {feature.status}
                      </span>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          feature.priority === 'High'
                            ? 'bg-red-100 text-red-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}
                      >
                        {feature.priority} Priority
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-700 mb-6 text-lg">{feature.description}</p>

              {/* Features List */}
              <div className="mb-6">
                <h4 className="font-semibold text-curb-navy mb-3">Key Features:</h4>
                <ul className="space-y-2">
                  {feature.features.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-green-600 mt-1">✓</span>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Impact */}
              <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg p-4 border border-orange-200">
                <p className="font-semibold text-curb-orange mb-1">Expected Impact:</p>
                <p className="text-sm text-gray-700">{feature.impact}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Timeline Visualization */}
        <div className="mt-16 bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-curb-navy mb-8 text-center">Development Timeline</h2>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-green-500 via-curb-orange to-blue-500 h-full"></div>

            {/* Phase 1 */}
            <div className="relative flex items-center mb-12">
              <div className="flex-1 text-right pr-8">
                <div className="bg-green-100 inline-block px-6 py-3 rounded-lg">
                  <h3 className="font-bold text-green-800 text-xl">Phase 1 - Core Platform</h3>
                  <p className="text-green-700 text-sm">2025 Q1-Q2 ✅ Complete</p>
                </div>
              </div>
              <div className="w-8 h-8 bg-green-500 rounded-full border-4 border-white shadow-lg z-10"></div>
              <div className="flex-1 pl-8">
                <p className="text-gray-600">Marketplace, Auctions, AI Tools</p>
              </div>
            </div>

            {/* Phase 2 */}
            <div className="relative flex items-center mb-12">
              <div className="flex-1 text-right pr-8">
                <p className="text-gray-600">Mobile Apps, Enterprise Tools, Delivery</p>
              </div>
              <div className="w-8 h-8 bg-curb-orange rounded-full border-4 border-white shadow-lg z-10"></div>
              <div className="flex-1 pl-8">
                <div className="bg-orange-100 inline-block px-6 py-3 rounded-lg">
                  <h3 className="font-bold text-curb-orange text-xl">Phase 2 - Growth Features</h3>
                  <p className="text-orange-700 text-sm">2025 Q3-Q4 🚧 Planned</p>
                </div>
              </div>
            </div>

            {/* Phase 3 */}
            <div className="relative flex items-center">
              <div className="flex-1 text-right pr-8">
                <div className="bg-blue-100 inline-block px-6 py-3 rounded-lg">
                  <h3 className="font-bold text-blue-800 text-xl">Phase 3 - Advanced Services</h3>
                  <p className="text-blue-700 text-sm">2026+ 🔮 Future</p>
                </div>
              </div>
              <div className="w-8 h-8 bg-blue-500 rounded-full border-4 border-white shadow-lg z-10"></div>
              <div className="flex-1 pl-8">
                <p className="text-gray-600">Financing, Warranties, Curb Direct</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 bg-gradient-to-r from-curb-orange to-orange-600 rounded-2xl p-12 text-center text-white">
          <h2 className="text-4xl font-bold mb-4">Want Early Access?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join our waitlist to be the first to try new features as they launch
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/"
              className="bg-white text-curb-orange px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition"
            >
              Join Waitlist
            </Link>
            <Link
              href="/browse"
              className="bg-curb-navy text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-slate-800 transition"
            >
              Explore Platform
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
