'use client';

import { useState } from 'react';

const faqs = [
  {
    q: 'How do I bid on a vehicle?',
    a: 'Once you create an account and verify your identity, you can browse available auctions and place bids. Each auction runs for 3 days with real-time updates. Simply enter your bid amount and confirm—we\'ll notify you if you\'re outbid.',
  },
  {
    q: 'What happens if I win an auction?',
    a: 'Congratulations! You\'ll pay a deposit directly to the selling dealer. The dealer completes the agreed-upon repairs and shares the completed repair order. You inspect the car at pickup and pay the remaining balance directly to the dealer.',
  },
  {
    q: 'How does the payment process work?',
    a: 'You pay the selling dealer directly. After winning, you pay a deposit credited toward the purchase price. The dealer completes repairs and shares the repair order. You inspect the car and pay the remaining balance at pickup. The dealer confirms the deposit amount, due date, and refund terms before you bid.',
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
    q: 'How are dealers rated?',
    a: 'Every dealer on Curb is rated by buyers after each transaction. Ratings cover communication, repair quality, and accuracy of condition reports. Dealers below a 4.0 average are reviewed and may be removed from the platform.',
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
