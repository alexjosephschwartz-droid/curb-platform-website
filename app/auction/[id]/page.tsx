'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { useUser } from '@/lib/hooks/useUser';

type AuctionDetail = {
  id: string;
  status: string;
  starting_price: number;
  current_bid: number | null;
  bid_count: number;
  starts_at: string;
  ends_at: string;
  buyer_premium_rate: number;
  listing_fee: number;
  vehicles: {
    id: string;
    vin: string;
    year: number;
    make: string;
    model: string;
    trim: string | null;
    body_style: string | null;
    engine: string | null;
    transmission: string | null;
    drivetrain: string | null;
    fuel_type: string | null;
    mileage: number;
    exterior_color: string | null;
    interior_color: string | null;
    photos: string[] | null;
    condition_notes: string | null;
    known_issues: string | null;
    repair_estimate: number | null;
    retail_value: number | null;
    profiles: {
      dealership_name: string | null;
      dealer_city: string | null;
      dealer_state: string | null;
    };
  };
};

export default function AuctionDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { user, profile } = useUser();
  const [auction, setAuction] = useState<AuctionDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [bidAmount, setBidAmount] = useState('');
  const [bidding, setBidding] = useState(false);
  const [bidError, setBidError] = useState('');
  const [bidSuccess, setBidSuccess] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(0);

  const auctionId = params.id as string;

  const fetchAuction = useCallback(async () => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('auctions')
      .select(`
        id, status, starting_price, current_bid, bid_count, starts_at, ends_at,
        buyer_premium_rate, listing_fee,
        vehicles!inner(
          id, vin, year, make, model, trim, body_style, engine, transmission,
          drivetrain, fuel_type, mileage, exterior_color, interior_color,
          photos, condition_notes, known_issues, repair_estimate, retail_value,
          profiles!inner(dealership_name, dealer_city, dealer_state)
        )
      `)
      .eq('id', auctionId)
      .single();

    if (!error && data) {
      setAuction(data as unknown as AuctionDetail);
    }
    setLoading(false);
  }, [auctionId]);

  useEffect(() => {
    fetchAuction();
  }, [fetchAuction]);

  const handleBid = async () => {
    if (!user) {
      router.push(`/login?redirect=/auction/${auctionId}`);
      return;
    }
    if (!auction) return;

    const amountCents = Math.round(parseFloat(bidAmount) * 100);
    const minBid = (auction.current_bid || auction.starting_price) + 10000; // $100 min increment

    if (amountCents < minBid) {
      setBidError(`Minimum bid is $${(minBid / 100).toLocaleString()}`);
      return;
    }

    setBidding(true);
    setBidError('');

    const supabase = createClient();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error } = await (supabase.rpc as any)('place_bid', {
      p_auction_id: auction.id,
      p_bidder_id: user.id,
      p_amount: amountCents,
    });

    if (error) {
      setBidError(error.message);
    } else {
      setBidSuccess(true);
      setBidAmount('');
      await fetchAuction(); // Refresh bid data
      setTimeout(() => setBidSuccess(false), 3000);
    }
    setBidding(false);
  };

  const fmtPrice = (cents: number) => `$${(cents / 100).toLocaleString()}`;

  const timeLeft = (endsAt: string) => {
    const diff = new Date(endsAt).getTime() - Date.now();
    if (diff <= 0) return 'Auction ended';
    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${d > 0 ? `${d}d ` : ''}${h}h ${m}m`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-curb-orange" />
      </div>
    );
  }

  if (!auction) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-5xl mb-4">😕</p>
          <h2 className="text-2xl font-bold text-curb-navy mb-2">Auction not found</h2>
          <Link href="/browse" className="text-curb-orange font-semibold hover:underline">Browse all auctions</Link>
        </div>
      </div>
    );
  }

  const v = auction.vehicles;
  const isActive = auction.status === 'active';
  const currentPrice = auction.current_bid || auction.starting_price;
  const minBid = currentPrice + 10000;
  const premiumAmount = Math.round(currentPrice * (auction.buyer_premium_rate / 100));

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="mb-6 text-sm text-gray-500">
          <Link href="/browse" className="hover:text-curb-orange">Browse</Link>
          <span className="mx-2">›</span>
          <span className="text-curb-navy font-medium">{v.year} {v.make} {v.model}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Photos */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl overflow-hidden shadow-sm">
              {v.photos && v.photos.length > 0 ? (
                <>
                  <img src={v.photos[selectedPhoto]} alt={`${v.year} ${v.make} ${v.model}`}
                    className="w-full h-96 object-cover" />
                  {v.photos.length > 1 && (
                    <div className="flex gap-2 p-4 overflow-x-auto">
                      {v.photos.map((photo, i) => (
                        <button key={i} onClick={() => setSelectedPhoto(i)}
                          className={`flex-shrink-0 w-16 h-12 rounded-lg overflow-hidden border-2 transition ${
                            selectedPhoto === i ? 'border-curb-orange' : 'border-gray-200'
                          }`}>
                          <img src={photo} alt={`Photo ${i + 1}`} className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <div className="w-full h-96 bg-gray-100 flex items-center justify-center text-gray-400">
                  No photos available
                </div>
              )}
            </div>

            {/* Vehicle Details */}
            <div className="bg-white rounded-xl shadow-sm p-6 mt-6">
              <h2 className="text-xl font-bold text-curb-navy mb-4">Vehicle Details</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                <div><p className="text-gray-500">Year</p><p className="font-semibold">{v.year}</p></div>
                <div><p className="text-gray-500">Make</p><p className="font-semibold">{v.make}</p></div>
                <div><p className="text-gray-500">Model</p><p className="font-semibold">{v.model}</p></div>
                {v.trim && <div><p className="text-gray-500">Trim</p><p className="font-semibold">{v.trim}</p></div>}
                <div><p className="text-gray-500">Mileage</p><p className="font-semibold">{v.mileage?.toLocaleString()} mi</p></div>
                {v.exterior_color && <div><p className="text-gray-500">Ext. Color</p><p className="font-semibold">{v.exterior_color}</p></div>}
                {v.interior_color && <div><p className="text-gray-500">Int. Color</p><p className="font-semibold">{v.interior_color}</p></div>}
                {v.engine && <div><p className="text-gray-500">Engine</p><p className="font-semibold">{v.engine}</p></div>}
                {v.transmission && <div><p className="text-gray-500">Transmission</p><p className="font-semibold">{v.transmission}</p></div>}
                {v.drivetrain && <div><p className="text-gray-500">Drivetrain</p><p className="font-semibold">{v.drivetrain}</p></div>}
                {v.fuel_type && <div><p className="text-gray-500">Fuel Type</p><p className="font-semibold">{v.fuel_type}</p></div>}
                {v.body_style && <div><p className="text-gray-500">Body Style</p><p className="font-semibold">{v.body_style}</p></div>}
              </div>

              {v.condition_notes && (
                <div className="mt-6">
                  <h3 className="font-semibold text-curb-navy mb-2">Condition Notes</h3>
                  <p className="text-gray-600 text-sm">{v.condition_notes}</p>
                </div>
              )}

              {v.known_issues && (
                <div className="mt-4">
                  <h3 className="font-semibold text-curb-navy mb-2">Known Issues</h3>
                  <p className="text-gray-600 text-sm">{v.known_issues}</p>
                </div>
              )}

              <div className="mt-6 text-sm text-gray-500">
                <p className="font-medium">VIN: <span className="font-mono">{v.vin}</span></p>
              </div>
            </div>

            {/* Dealer Info */}
            <div className="bg-white rounded-xl shadow-sm p-6 mt-6">
              <h3 className="font-semibold text-curb-navy mb-2">Selling Dealer</h3>
              <p className="text-gray-700">{v.profiles?.dealership_name}</p>
              {v.profiles?.dealer_city && v.profiles?.dealer_state && (
                <p className="text-sm text-gray-500">{v.profiles.dealer_city}, {v.profiles.dealer_state}</p>
              )}
            </div>
          </div>

          {/* Right: Bidding Panel */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-8">
              <h2 className="text-2xl font-bold text-curb-navy mb-1">
                {v.year} {v.make} {v.model}
              </h2>
              {v.trim && <p className="text-gray-500 mb-4">{v.trim}</p>}

              {/* Price */}
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-500">{auction.current_bid ? 'Current Bid' : 'Starting Price'}</span>
                  <span className="text-3xl font-bold text-curb-orange">{fmtPrice(currentPrice)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>{auction.bid_count} bid(s)</span>
                  <span>{isActive ? timeLeft(auction.ends_at) : 'Ended'}</span>
                </div>
              </div>

              {/* Buyer Premium */}
              <div className="text-sm text-gray-500 mb-4 bg-blue-50 rounded-lg p-3">
                <p>Buyer premium (3%): <span className="font-semibold text-blue-700">{fmtPrice(premiumAmount)}</span></p>
                <p className="mt-1">Total if won: <span className="font-semibold text-blue-700">{fmtPrice(currentPrice + premiumAmount)}</span></p>
              </div>

              {isActive ? (
                <>
                  {bidSuccess && (
                    <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded-lg text-sm">
                      Bid placed successfully!
                    </div>
                  )}
                  {bidError && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
                      {bidError}
                    </div>
                  )}

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Bid (minimum {fmtPrice(minBid)})
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-3.5 text-gray-500">$</span>
                      <input
                        type="number"
                        value={bidAmount}
                        onChange={(e) => setBidAmount(e.target.value)}
                        placeholder={(minBid / 100).toLocaleString()}
                        className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-curb-orange text-gray-900"
                      />
                    </div>
                  </div>

                  <button onClick={handleBid} disabled={bidding || !bidAmount}
                    className="w-full py-4 bg-curb-orange text-white rounded-lg font-bold text-lg hover:bg-orange-600 transition disabled:opacity-50">
                    {!user ? 'Sign in to Bid' : bidding ? 'Placing bid...' : 'Place Bid'}
                  </button>

                  <p className="text-xs text-gray-400 text-center mt-3">
                    By bidding you agree to our Terms of Service
                  </p>
                </>
              ) : (
                <div className="p-4 bg-gray-100 rounded-lg text-center">
                  <p className="font-semibold text-gray-700">This auction has ended</p>
                </div>
              )}

              {/* How it Works */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="font-semibold text-curb-navy mb-3">How Curb Works</h4>
                <div className="space-y-3 text-sm text-gray-600">
                  <div className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-curb-orange/10 text-curb-orange rounded-full flex items-center justify-center text-xs font-bold">1</span>
                    <span>Place your bid before the auction ends</span>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-curb-orange/10 text-curb-orange rounded-full flex items-center justify-center text-xs font-bold">2</span>
                    <span>If you win, payment goes into secure escrow</span>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-curb-orange/10 text-curb-orange rounded-full flex items-center justify-center text-xs font-bold">3</span>
                    <span>Dealer performs safety inspection &amp; repairs</span>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-curb-orange/10 text-curb-orange rounded-full flex items-center justify-center text-xs font-bold">4</span>
                    <span>Vehicle delivered — funds released to dealer</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
