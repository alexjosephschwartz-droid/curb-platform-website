'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function VehicleDetailPage() {
  const params = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [bidAmount, setBidAmount] = useState('');
  const [showBidModal, setShowBidModal] = useState(false);

  // Mock vehicle data - in production this would come from an API
  const vehicle = {
    id: params.id,
    year: 2019,
    make: 'Honda',
    model: 'Civic',
    trim: 'EX',
    vin: '2HGFC2F59KH123456',
    mileage: 45000,
    color: 'Silver',
    transmission: 'Automatic',
    fuelType: 'Gasoline',
    kbbRetailPrice: 18500, // KBB retail purchase price
    currentBid: 12500,
    minimumBid: 12600,
    bidCount: 8,
    timeRemaining: '2 days, 5 hours, 23 minutes',
    location: 'Los Angeles, CA',
    condition: 'Good',
    images: [
      'https://images.unsplash.com/photo-1590362891991-f776e747a588?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1583267746897-c770a8276e0d?w=800&auto=format&fit=crop',
    ],
    dealer: {
      name: 'Premium Auto Wholesalers',
      rating: 4.8,
      totalSales: 142,
    },
    inspection: {
      exterior: 'Minor scratches on rear bumper, otherwise excellent condition',
      interior: 'Clean, no stains or tears. All electronics working',
      mechanical: 'Engine runs smooth, transmission shifts properly, brakes at 70%',
    },
    repairs: [
      { item: 'Brake pads replacement', cost: 450 },
      { item: 'Oil change', cost: 75 },
      { item: 'Tire rotation', cost: 50 },
    ],
    bidHistory: [
      { bidder: 'Bidder ***23', amount: 12500, time: '2 hours ago' },
      { bidder: 'Bidder ***89', amount: 12300, time: '4 hours ago' },
      { bidder: 'Bidder ***45', amount: 12100, time: '6 hours ago' },
      { bidder: 'Bidder ***23', amount: 12000, time: '8 hours ago' },
      { bidder: 'Bidder ***67', amount: 11800, time: '12 hours ago' },
    ],
  };

  const totalRepairCost = vehicle.repairs.reduce((sum, repair) => sum + repair.cost, 0);
  const buyerPremium = Math.round(vehicle.minimumBid * 0.03);
  const totalCost = vehicle.minimumBid + totalRepairCost + buyerPremium;
  const savingsVsRetail = vehicle.kbbRetailPrice - totalCost;

  const handlePlaceBid = () => {
    const bid = parseFloat(bidAmount);
    if (bid >= vehicle.minimumBid) {
      alert(`Bid of $${bid.toLocaleString()} placed successfully!`);
      setShowBidModal(false);
      setBidAmount('');
    } else {
      alert(`Bid must be at least $${vehicle.minimumBid.toLocaleString()}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold text-curb-navy">CURB</span>
            </Link>
            <div className="flex items-center gap-4">
              <Link href="/browse" className="text-gray-700 hover:text-curb-orange transition">
                Browse Auctions
              </Link>
              <button className="bg-curb-orange text-white px-6 py-2 rounded-full hover:bg-orange-600 transition font-medium">
                Sign In
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link href="/browse" className="inline-flex items-center text-curb-orange hover:text-orange-600 mb-6">
          ← Back to Browse
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Images and Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="relative h-96 bg-gray-200">
                <img
                  src={vehicle.images[selectedImage]}
                  alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-4 gap-2 p-4">
                {vehicle.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative h-20 rounded-lg overflow-hidden ${
                      selectedImage === index ? 'ring-2 ring-curb-orange' : 'opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={image} alt={`View ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Vehicle Specs */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-2xl font-bold text-curb-navy mb-4">Vehicle Specifications</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Year</p>
                  <p className="font-semibold text-curb-navy">{vehicle.year}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Make</p>
                  <p className="font-semibold text-curb-navy">{vehicle.make}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Model</p>
                  <p className="font-semibold text-curb-navy">{vehicle.model}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Trim</p>
                  <p className="font-semibold text-curb-navy">{vehicle.trim}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">VIN</p>
                  <p className="font-semibold text-curb-navy text-sm">{vehicle.vin}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Mileage</p>
                  <p className="font-semibold text-curb-navy">{vehicle.mileage.toLocaleString()} mi</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Color</p>
                  <p className="font-semibold text-curb-navy">{vehicle.color}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Transmission</p>
                  <p className="font-semibold text-curb-navy">{vehicle.transmission}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Fuel Type</p>
                  <p className="font-semibold text-curb-navy">{vehicle.fuelType}</p>
                </div>
              </div>
            </div>

            {/* Inspection Report */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-2xl font-bold text-curb-navy mb-4">Inspection Report</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-curb-navy mb-1">Exterior Condition</h3>
                  <p className="text-gray-700">{vehicle.inspection.exterior}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-curb-navy mb-1">Interior Condition</h3>
                  <p className="text-gray-700">{vehicle.inspection.interior}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-curb-navy mb-1">Mechanical Status</h3>
                  <p className="text-gray-700">{vehicle.inspection.mechanical}</p>
                </div>
              </div>
            </div>

            {/* Repairs */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-2xl font-bold text-curb-navy mb-4">Required Repairs</h2>
              <p className="text-gray-600 mb-4">These repairs will be completed by the dealer before delivery</p>
              <div className="space-y-3">
                {vehicle.repairs.map((repair, index) => (
                  <div key={index} className="flex justify-between items-center pb-3 border-b border-gray-100 last:border-0">
                    <span className="text-gray-700">{repair.item}</span>
                    <span className="font-semibold text-curb-navy">${repair.cost}</span>
                  </div>
                ))}
                <div className="flex justify-between items-center pt-2 font-bold text-lg">
                  <span className="text-curb-navy">Total Repair Cost</span>
                  <span className="text-curb-orange">${totalRepairCost}</span>
                </div>
              </div>
            </div>

            {/* Cost Breakdown */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-2xl font-bold text-curb-navy mb-4">Total Cost Calculator</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-700">Minimum Bid (if you win)</span>
                  <span className="font-semibold">${vehicle.minimumBid.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Required Repairs</span>
                  <span className="font-semibold">${totalRepairCost}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Buyer Premium (3%)</span>
                  <span className="font-semibold">${buyerPremium}</span>
                </div>
                <div className="flex justify-between pt-3 border-t-2 border-gray-200 text-xl font-bold">
                  <span className="text-curb-navy">Total Cost</span>
                  <span className="text-curb-orange">${totalCost.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* KBB Price Comparison */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl shadow-sm p-6 border-2 border-green-200">
              <h2 className="text-2xl font-bold text-curb-navy mb-4">Your Savings vs. Retail</h2>
              <div className="space-y-4">
                <div className="bg-white rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">KBB Retail Purchase Price</p>
                  <p className="text-3xl font-bold text-gray-700">${vehicle.kbbRetailPrice.toLocaleString()}</p>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">Your Total Cost on Curb</p>
                  <p className="text-3xl font-bold text-curb-orange">${totalCost.toLocaleString()}</p>
                </div>
                <div className="bg-green-600 text-white rounded-lg p-8 text-center">
                  <p className="text-sm font-semibold uppercase tracking-wider mb-3">Your Savings</p>
                  <p className="text-6xl font-bold mb-3">${savingsVsRetail.toLocaleString()}</p>
                  <p className="text-lg">
                    Save <span className="font-bold">{Math.round((savingsVsRetail / vehicle.kbbRetailPrice) * 100)}%</span> vs retail pricing
                  </p>
                </div>
                <p className="text-xs text-gray-600 text-center">
                  * Retail price based on Kelley Blue Book value for comparable vehicle condition and mileage
                </p>
              </div>
            </div>

            {/* Dealer Info */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h2 className="text-2xl font-bold text-curb-navy mb-6">Dealer Information</h2>
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-curb-navy rounded-lg flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
                  {vehicle.dealer.name[0]}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-curb-navy mb-2">{vehicle.dealer.name}</h3>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex items-center gap-1 bg-yellow-50 px-3 py-1 rounded-lg">
                      <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="font-semibold text-sm">{vehicle.dealer.rating}</span>
                    </div>
                    <span className="text-gray-400">•</span>
                    <span className="text-gray-600 text-sm font-medium">{vehicle.dealer.totalSales} completed sales</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <svg className="w-4 h-4 text-gray-400" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                      <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                    {vehicle.location}
                  </div>
                </div>
              </div>
            </div>

            {/* Bid History */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-2xl font-bold text-curb-navy mb-4">Bid History</h2>
              <div className="space-y-3">
                {vehicle.bidHistory.map((bid, index) => (
                  <div key={index} className="flex justify-between items-center pb-3 border-b border-gray-100 last:border-0">
                    <div>
                      <p className="font-medium text-curb-navy">{bid.bidder}</p>
                      <p className="text-sm text-gray-500">{bid.time}</p>
                    </div>
                    <span className="font-semibold text-lg text-curb-orange">${bid.amount.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Auction Widget */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
              <h1 className="text-2xl font-bold text-curb-navy mb-4">
                {vehicle.year} {vehicle.make} {vehicle.model}
              </h1>

              {/* Timer */}
              <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4 mb-4">
                <p className="text-sm text-red-600 font-semibold mb-1">Time Remaining</p>
                <p className="text-2xl font-bold text-red-600">{vehicle.timeRemaining}</p>
              </div>

              {/* Current Bid */}
              <div className="mb-6">
                <p className="text-sm text-gray-500 mb-1">Current Bid</p>
                <p className="text-4xl font-bold text-curb-orange mb-1">${vehicle.currentBid.toLocaleString()}</p>
                <p className="text-sm text-gray-600">{vehicle.bidCount} bids</p>
              </div>

              {/* Minimum Bid */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <p className="text-sm text-gray-600 mb-1">Minimum Next Bid</p>
                <p className="text-2xl font-bold text-curb-navy">${vehicle.minimumBid.toLocaleString()}</p>
              </div>

              {/* Bid Button */}
              <button
                onClick={() => setShowBidModal(true)}
                className="w-full bg-curb-orange text-white py-4 rounded-lg font-bold text-lg hover:bg-orange-600 transition mb-3"
              >
                Place Bid
              </button>

              <button className="w-full border-2 border-curb-orange text-curb-orange py-3 rounded-lg font-semibold hover:bg-orange-50 transition mb-6">
                Save to Watchlist
              </button>

              {/* Quick Stats */}
              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Condition</span>
                  <span className="font-semibold text-green-600">{vehicle.condition}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Location</span>
                  <span className="font-semibold text-curb-navy">{vehicle.location}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bid Modal */}
      {showBidModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-8">
            <h3 className="text-2xl font-bold text-curb-navy mb-4">Place Your Bid</h3>
            <p className="text-gray-600 mb-6">
              Minimum bid: <span className="font-bold text-curb-navy">${vehicle.minimumBid.toLocaleString()}</span>
            </p>
            <input
              type="number"
              placeholder="Enter bid amount"
              value={bidAmount}
              onChange={(e) => setBidAmount(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-curb-orange mb-6 text-lg"
            />
            <div className="flex gap-4">
              <button
                onClick={() => setShowBidModal(false)}
                className="flex-1 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handlePlaceBid}
                className="flex-1 px-6 py-3 bg-curb-orange text-white rounded-lg hover:bg-orange-600 transition font-bold"
              >
                Confirm Bid
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
