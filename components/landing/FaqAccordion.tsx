'use client';

import { useState } from 'react';

const faqs = [
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
];

export default function FaqAccordion() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl font-bold text-curb-navy text-center mb-16">Frequently Asked Questions</h2>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="border border-gray-200 rounded-lg overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full text-left px-6 py-4 bg-gray-50 hover:bg-gray-100 transition flex justify-between items-center"
              >
                <span className="font-semibold text-curb-navy">{faq.q}</span>
                <span className="text-curb-orange text-xl">{openFaq === idx ? '\u2212' : '+'}</span>
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
  );
}
