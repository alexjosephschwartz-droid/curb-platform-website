'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';

type AuctionListing = {
  id: string;
  status: string;
  current_bid: number | null;
  starting_price: number;
  bid_count: number;
  ends_at: string;
  vehicles: {
    id: string;
    year: number;
    make: string;
    model: string;
    trim: string | null;
    mileage: number;
    exterior_color: string | null;
    photos: string[] | null;
    condition_notes: string | null;
  };
};

// Sample auction data for demo
const SAMPLE_AUCTIONS: AuctionListing[] = [
  {
    id: 'demo-a1', status: 'active', current_bid: 1725000, starting_price: 1600000, bid_count: 8,
    ends_at: new Date(Date.now() + 43200000).toISOString(), // 12h left
    vehicles: {
      id: 'v1', year: 2020, make: 'Honda', model: 'Accord', trim: 'Sport',
      mileage: 42150, exterior_color: 'Crystal Black Pearl',
      photos: ['https://images.unsplash.com/photo-1634737581963-5a22ba471961?w=800&h=480&fit=crop&auto=format&q=80'],
      condition_notes: 'Clean trade-in, minor wear on driver seat',
    },
  },
  {
    id: 'demo-a2', status: 'active', current_bid: 2350000, starting_price: 2100000, bid_count: 14,
    ends_at: new Date(Date.now() + 172800000).toISOString(), // 2d left
    vehicles: {
      id: 'v2', year: 2021, make: 'Tesla', model: 'Model 3', trim: 'Long Range',
      mileage: 28300, exterior_color: 'Pearl White',
      photos: ['https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&h=480&fit=crop&auto=format&q=80'],
      condition_notes: 'Excellent condition, full self-driving capable',
    },
  },
  {
    id: 'demo-a3', status: 'active', current_bid: 1950000, starting_price: 1800000, bid_count: 6,
    ends_at: new Date(Date.now() + 86400000).toISOString(), // 1d left
    vehicles: {
      id: 'v3', year: 2020, make: 'Jeep', model: 'Grand Cherokee', trim: 'Limited',
      mileage: 51200, exterior_color: 'Slate Blue',
      photos: ['https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&h=480&fit=crop&auto=format&q=80'],
      condition_notes: 'Well-maintained, one owner, clean Carfax',
    },
  },
  {
    id: 'demo-a4', status: 'active', current_bid: 3150000, starting_price: 2500000, bid_count: 22,
    ends_at: new Date(Date.now() + 28800000).toISOString(), // 8h left
    vehicles: {
      id: 'v4', year: 2021, make: 'Ford', model: 'F-150', trim: 'XLT SuperCrew',
      mileage: 38500, exterior_color: 'Rapid Red',
      photos: ['https://images.unsplash.com/photo-1590362891991-f776e747a588?w=800&h=480&fit=crop&auto=format&q=80'],
      condition_notes: 'Fleet vehicle, well-maintained, bed liner included',
    },
  },
  {
    id: 'demo-a5', status: 'active', current_bid: 2680000, starting_price: 2200000, bid_count: 11,
    ends_at: new Date(Date.now() + 129600000).toISOString(), // 1.5d left
    vehicles: {
      id: 'v5', year: 2022, make: 'Toyota', model: 'RAV4', trim: 'XLE Premium',
      mileage: 19800, exterior_color: 'Magnetic Gray',
      photos: ['https://images.unsplash.com/photo-1581540222194-0def2dda95b8?w=800&h=480&fit=crop&auto=format&q=80'],
      condition_notes: 'Low mileage lease return, excellent condition',
    },
  },
  {
    id: 'demo-a6', status: 'active', current_bid: 1480000, starting_price: 1200000, bid_count: 9,
    ends_at: new Date(Date.now() + 57600000).toISOString(), // 16h left
    vehicles: {
      id: 'v6', year: 2019, make: 'Mazda', model: 'CX-5', trim: 'Touring',
      mileage: 55600, exterior_color: 'Soul Red Crystal',
      photos: ['https://images.unsplash.com/photo-1612544448445-b8232cff3b6c?w=800&h=480&fit=crop&auto=format&q=80'],
      condition_notes: 'Single owner, all maintenance records available',
    },
  },
  {
    id: 'demo-a7', status: 'active', current_bid: 1870000, starting_price: 1500000, bid_count: 7,
    ends_at: new Date(Date.now() + 194400000).toISOString(), // 2.25d left
    vehicles: {
      id: 'v7', year: 2020, make: 'Hyundai', model: 'Tucson', trim: 'SEL',
      mileage: 44200, exterior_color: 'Amazon Gray',
      photos: ['https://images.unsplash.com/photo-1642912832910-7d403ce697e1?w=800&h=480&fit=crop&auto=format&q=80'],
      condition_notes: 'Trade-in, runs great, clean interior',
    },
  },
  {
    id: 'demo-a8', status: 'active', current_bid: 4250000, starting_price: 3800000, bid_count: 16,
    ends_at: new Date(Date.now() + 64800000).toISOString(), // 18h left
    vehicles: {
      id: 'v8', year: 2022, make: 'BMW', model: 'X3', trim: 'xDrive30i',
      mileage: 22100, exterior_color: 'Alpine White',
      photos: ['https://images.unsplash.com/photo-1556189250-72ba954cfc2b?w=800&h=480&fit=crop&auto=format&q=80'],
      condition_notes: 'Lease return, M Sport package, premium features',
    },
  },
  {
    id: 'demo-a9', status: 'active', current_bid: null, starting_price: 1400000, bid_count: 0,
    ends_at: new Date(Date.now() + 259200000).toISOString(), // 3d left
    vehicles: {
      id: 'v9', year: 2019, make: 'Chevrolet', model: 'Equinox', trim: 'LT',
      mileage: 62300, exterior_color: 'Nightfall Gray',
      photos: ['https://images.unsplash.com/photo-1614220654876-8a75c41f7a7c?w=800&h=480&fit=crop&auto=format&q=80'],
      condition_notes: 'Higher mileage but mechanically solid, new brakes',
    },
  },
] as AuctionListing[];

// Placeholder car image component
function CarPlaceholder({ make, color }: { make: string; color: string | null }) {
  const bgColors: Record<string, string> = {
    'Crystal Black Pearl': 'from-gray-800 to-gray-900',
    'Pearl White': 'from-gray-100 to-gray-200',
    'Slate Blue': 'from-blue-400 to-blue-600',
    'Rapid Red': 'from-red-500 to-red-700',
    'Magnetic Gray': 'from-gray-400 to-gray-500',
    'Soul Red Crystal': 'from-red-600 to-red-800',
    'Amazon Gray': 'from-gray-500 to-gray-600',
    'Alpine White': 'from-gray-50 to-gray-200',
    'Nightfall Gray': 'from-gray-600 to-gray-800',
  };
  const gradient = bgColors[color || ''] || 'from-gray-200 to-gray-300';
  return (
    <div className={`w-full h-48 bg-gradient-to-br ${gradient} flex flex-col items-center justify-center text-gray-500 relative overflow-hidden`}>
      <span className="text-5xl opacity-80">🚗</span>
      <span className="text-xs mt-2 font-medium opacity-60">{make}</span>
      <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/10 to-transparent" />
    </div>
  );
}

export default function BrowseAuctions() {
  const [auctions, setAuctions] = useState<AuctionListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDemo, setIsDemo] = useState(false);
  const [sortBy, setSortBy] = useState<'ending_soon' | 'newest' | 'price_low' | 'price_high'>('ending_soon');

  useEffect(() => {
    async function fetchAuctions() {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('auctions')
        .select(`
          id, status, current_bid, starting_price, bid_count, ends_at,
          vehicles!inner(id, year, make, model, trim, mileage, exterior_color, photos, condition_notes)
        `)
        .eq('status', 'active')
        .order('ends_at', { ascending: true });

      if (!error && data && data.length > 0) {
        setAuctions(data as unknown as AuctionListing[]);
        setIsDemo(false);
      } else {
        // Show sample data when no real auctions exist
        setAuctions(SAMPLE_AUCTIONS);
        setIsDemo(true);
      }
      setLoading(false);
    }

    fetchAuctions();
  }, []);

  const sortedAuctions = [...auctions].sort((a, b) => {
    switch (sortBy) {
      case 'ending_soon':
        return new Date(a.ends_at).getTime() - new Date(b.ends_at).getTime();
      case 'newest':
        return new Date(b.ends_at).getTime() - new Date(a.ends_at).getTime();
      case 'price_low':
        return (a.current_bid || a.starting_price) - (b.current_bid || b.starting_price);
      case 'price_high':
        return (b.current_bid || b.starting_price) - (a.current_bid || a.starting_price);
    }
  });

  const fmtPrice = (cents: number) => `$${(cents / 100).toLocaleString()}`;

  const timeLeft = (endsAt: string) => {
    const diff = new Date(endsAt).getTime() - Date.now();
    if (diff <= 0) return 'Ended';
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    if (hours >= 24) return `${Math.floor(hours / 24)}d ${hours % 24}h left`;
    return `${hours}h ${mins}m left`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-curb-orange" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Demo Banner */}
        {isDemo && (
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg flex items-center gap-3">
            <span className="text-xl">🏷️</span>
            <p className="text-sm text-blue-800">
              <span className="font-semibold">Sample listings shown.</span> Real auctions from verified dealers will appear here as they go live.
            </p>
          </div>
        )}

        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-curb-navy">Browse Auctions</h1>
            <p className="text-gray-600 mt-1">{auctions.length} vehicles available</p>
          </div>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
            className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-curb-orange">
            <option value="ending_soon">Ending Soon</option>
            <option value="newest">Newest</option>
            <option value="price_low">Price: Low to High</option>
            <option value="price_high">Price: High to Low</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedAuctions.map((auction) => {
            const v = auction.vehicles;
            const price = auction.current_bid || auction.starting_price;
            const isEnding = new Date(auction.ends_at).getTime() - Date.now() < 43200000; // < 12h
            return (
              <Link href={`/vehicle/${auction.id}`} key={auction.id}
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md hover:border-curb-orange/30 transition group cursor-pointer block">
                <div className="relative">
                  {v.photos && v.photos.length > 0 ? (
                    <img src={v.photos[0]} alt={`${v.year} ${v.make} ${v.model}`}
                      className="w-full h-48 object-cover group-hover:scale-[1.02] transition-transform duration-300" />
                  ) : (
                    <CarPlaceholder make={v.make} color={v.exterior_color} />
                  )}
                  <div className={`absolute top-3 right-3 ${isEnding ? 'bg-red-600' : 'bg-curb-navy/90'} text-white px-3 py-1 rounded-full text-xs font-medium`}>
                    {isEnding && '🔥 '}{timeLeft(auction.ends_at)}
                  </div>
                  {auction.bid_count > 10 && (
                    <div className="absolute top-3 left-3 bg-curb-orange text-white px-2 py-1 rounded-full text-xs font-bold">
                      🔥 Hot
                    </div>
                  )}
                </div>

                <div className="p-5">
                  <h3 className="text-lg font-bold text-curb-navy mb-1">
                    {v.year} {v.make} {v.model} {v.trim}
                  </h3>
                  <div className="flex items-center gap-3 text-sm text-gray-500 mb-1">
                    <span>{v.mileage?.toLocaleString()} mi</span>
                    {v.exterior_color && <span>· {v.exterior_color}</span>}
                  </div>
                  {v.condition_notes && (
                    <p className="text-xs text-gray-400 mb-3 line-clamp-1">{v.condition_notes}</p>
                  )}

                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <div>
                      <p className="text-xs text-gray-500">{auction.current_bid ? 'Current Bid' : 'Starting Price'}</p>
                      <p className="text-2xl font-bold text-curb-orange">{fmtPrice(price)}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500">Bids</p>
                      <p className="text-lg font-semibold text-curb-navy">{auction.bid_count}</p>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
