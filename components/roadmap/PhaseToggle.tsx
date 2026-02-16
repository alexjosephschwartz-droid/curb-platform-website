'use client';

import { useState } from 'react';

const phase2Features = [
  { id: 1, title: 'Curb Certified Badge', status: 'Phase 2', priority: 'High', complexity: 'Medium', description: 'Premium tier with stricter inspection standards and higher buyer trust', features: ['Third-party certified mechanic inspection', 'Stricter condition standards (no frame damage, major repairs)', '30-day powertrain warranty included', 'Dealer rating >95% required', 'Premium pricing opportunity for dealers'], impact: 'Increases buyer confidence and allows premium pricing on quality vehicles' },
  { id: 2, title: 'Delivery & Transport Logistics', status: 'Phase 2', priority: 'High', complexity: 'High', description: 'Seamless vehicle delivery coordination with partner carriers', features: ['Partner integrations (uShip, TransCare)', 'White-glove delivery for premium vehicles', 'Real-time delivery tracking', 'Cost calculator at checkout', 'Door-to-door service across all 50 states'], impact: 'Removes friction from buyer experience, enables nationwide expansion' },
  { id: 3, title: 'Enterprise Dealer Portal', status: 'Phase 2', priority: 'Medium', complexity: 'Medium', description: 'Advanced tools for high-volume dealerships', features: ['Bulk listing upload via CSV', 'Multi-location inventory management', 'Automated pricing optimization', 'Advanced analytics & forecasting', 'Dedicated account manager'], impact: 'Attracts larger dealers, increases platform inventory and GMV' },
  { id: 4, title: 'Mobile Apps (iOS & Android)', status: 'Phase 2', priority: 'High', complexity: 'High', description: 'Native mobile applications for buyers and dealers', features: ['Browse auctions optimized for mobile', 'Real-time bid notifications', 'Quick bidding with saved payment methods', 'Camera integration for dealer listings', 'Push notifications for auction activity'], impact: 'Increases engagement, enables mobile-first user experience' },
];

const phase3Features = [
  { id: 5, title: 'Financing Marketplace', status: 'Phase 3', priority: 'High', complexity: 'High', description: 'Integrated auto financing from multiple lenders', features: ['Partner with lending platforms (LendingClub, etc.)', '"Finance this purchase" option at checkout', 'Pre-approval in minutes', 'Competitive rate comparison', 'Lender funds escrow directly'], impact: 'Expands buyer pool, increases average transaction value' },
  { id: 6, title: 'Extended Warranty Products', status: 'Phase 3', priority: 'Medium', complexity: 'Low', description: 'Optional warranty upsells for additional peace of mind', features: ['30-day powertrain warranty (Curb Certified)', '1-year extended coverage options', 'Powertrain, electrical, and A/C coverage', 'Partner with warranty providers', 'Instant online purchase'], impact: 'Additional revenue stream, increases buyer confidence' },
  { id: 7, title: 'Curb Direct (Buy/Resell)', status: 'Phase 3', priority: 'High', complexity: 'High', description: 'Curb-owned inventory for higher-margin sales', features: ['Direct wholesale vehicle acquisition', 'Leverage dealer network for repairs', 'Premium vehicle curation', 'Higher margin than marketplace take rate', 'Institutional buyer relationships'], impact: 'Diversified revenue model, higher profit margins on select inventory' },
];

export default function PhaseToggle() {
  const [selectedPhase, setSelectedPhase] = useState<'phase2' | 'phase3'>('phase2');
  const allFeatures = selectedPhase === 'phase2' ? phase2Features : phase3Features;

  return (
    <>
      {/* Phase Toggle */}
      <div className="flex gap-4 mb-10 justify-center">
        <button
          onClick={() => setSelectedPhase('phase2')}
          className={`px-10 py-4 rounded-xl font-bold text-lg transition ${
            selectedPhase === 'phase2'
              ? 'bg-curb-orange text-white shadow-lg border-2 border-curb-orange'
              : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-curb-orange'
          }`}
        >
          Phase 2 (2025 Q3-Q4)
        </button>
        <button
          onClick={() => setSelectedPhase('phase3')}
          className={`px-10 py-4 rounded-xl font-bold text-lg transition ${
            selectedPhase === 'phase3'
              ? 'bg-curb-orange text-white shadow-lg border-2 border-curb-orange'
              : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-curb-orange'
          }`}
        >
          Phase 3 (2026+)
        </button>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-2 gap-8">
        {allFeatures.map((feature) => (
          <div
            key={feature.id}
            className="bg-white rounded-2xl shadow-lg p-8 border-2 border-gray-100 hover:border-curb-orange hover:shadow-xl transition"
          >
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-curb-orange/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <div className="w-7 h-7 bg-curb-orange rounded"></div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-curb-navy mb-2">{feature.title}</h3>
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

            <p className="text-gray-700 mb-6 text-lg">{feature.description}</p>

            <div className="mb-6">
              <h4 className="font-semibold text-curb-navy mb-4 text-sm uppercase tracking-wider">Key Capabilities</h4>
              <ul className="space-y-3">
                {feature.features.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                      <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-gray-700 flex-1">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg p-4 border border-orange-200">
              <p className="font-semibold text-curb-orange mb-1">Expected Impact:</p>
              <p className="text-sm text-gray-700">{feature.impact}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
