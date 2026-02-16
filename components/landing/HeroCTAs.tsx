'use client';

import { useState } from 'react';

export default function HeroCTAs() {
  const [showBuyerForm, setShowBuyerForm] = useState(false);
  const [showDealerForm, setShowDealerForm] = useState(false);

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
    <>
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

      {showBuyerForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-8">
            <h3 className="text-2xl font-bold text-curb-navy mb-6">Join the Waitlist</h3>
            <form onSubmit={handleBuyerSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input type="text" placeholder="First Name" required value={buyerForm.firstName} onChange={(e) => setBuyerForm({ ...buyerForm, firstName: e.target.value })} className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-curb-orange" />
                <input type="text" placeholder="Last Name" required value={buyerForm.lastName} onChange={(e) => setBuyerForm({ ...buyerForm, lastName: e.target.value })} className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-curb-orange" />
              </div>
              <input type="email" placeholder="Email" required value={buyerForm.email} onChange={(e) => setBuyerForm({ ...buyerForm, email: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-curb-orange" />
              <input type="text" placeholder="Location (City, State)" required value={buyerForm.location} onChange={(e) => setBuyerForm({ ...buyerForm, location: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-curb-orange" />
              <select required value={buyerForm.vehicleType} onChange={(e) => setBuyerForm({ ...buyerForm, vehicleType: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-curb-orange">
                <option value="">Preferred Vehicle Type</option>
                <option value="sedan">Sedan</option>
                <option value="suv">SUV</option>
                <option value="truck">Truck</option>
                <option value="coupe">Coupe</option>
                <option value="van">Van</option>
              </select>
              <select required value={buyerForm.priceRange} onChange={(e) => setBuyerForm({ ...buyerForm, priceRange: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-curb-orange">
                <option value="">Price Range</option>
                <option value="5-10k">$5,000 - $10,000</option>
                <option value="10-15k">$10,000 - $15,000</option>
                <option value="15-25k">$15,000 - $25,000</option>
                <option value="25k+">$25,000+</option>
              </select>
              <div className="flex gap-4 mt-6">
                <button type="button" onClick={() => setShowBuyerForm(false)} className="flex-1 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition font-medium">Cancel</button>
                <button type="submit" className="flex-1 px-6 py-3 bg-curb-orange text-white rounded-lg hover:bg-orange-600 transition font-medium">Join Waitlist</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showDealerForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-8">
            <h3 className="text-2xl font-bold text-curb-navy mb-6">Request Dealer Access</h3>
            <form onSubmit={handleDealerSubmit} className="space-y-4">
              <input type="text" placeholder="Business Name" required value={dealerForm.businessName} onChange={(e) => setDealerForm({ ...dealerForm, businessName: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-curb-orange" />
              <input type="email" placeholder="Email" required value={dealerForm.email} onChange={(e) => setDealerForm({ ...dealerForm, email: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-curb-orange" />
              <input type="tel" placeholder="Phone Number" required value={dealerForm.phone} onChange={(e) => setDealerForm({ ...dealerForm, phone: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-curb-orange" />
              <select required value={dealerForm.locations} onChange={(e) => setDealerForm({ ...dealerForm, locations: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-curb-orange">
                <option value="">Number of Locations</option>
                <option value="1">1 Location</option>
                <option value="2-5">2-5 Locations</option>
                <option value="6-10">6-10 Locations</option>
                <option value="10+">10+ Locations</option>
              </select>
              <select required value={dealerForm.inventoryVolume} onChange={(e) => setDealerForm({ ...dealerForm, inventoryVolume: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-curb-orange">
                <option value="">Monthly Inventory Volume</option>
                <option value="10-50">10-50 vehicles</option>
                <option value="50-100">50-100 vehicles</option>
                <option value="100-200">100-200 vehicles</option>
                <option value="200+">200+ vehicles</option>
              </select>
              <div className="flex gap-4 mt-6">
                <button type="button" onClick={() => setShowDealerForm(false)} className="flex-1 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition font-medium">Cancel</button>
                <button type="submit" className="flex-1 px-6 py-3 bg-curb-orange text-white rounded-lg hover:bg-orange-600 transition font-medium">Submit Request</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
