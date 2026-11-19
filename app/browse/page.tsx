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

export default function BrowseAuctions() {
  const [auctions, setAuctions] = useState<AuctionListing[]>([]);
  const [loading, setLoading] = useState(true);
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

      if (!error && data) {
        setAuctions(data as unknown as AuctionListing[]);
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

        {sortedAuctions.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl shadow-sm">
            <p className="text-5xl mb-4">🔍</p>
            <p className="text-xl font-semibold text-curb-navy mb-2">No active auctions right now</p>
            <p className="text-gray-500">Check back soon — new vehicles are listed daily.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedAuctions.map((auction) => {
              const v = auction.vehicles;
              const price = auction.current_bid || auction.starting_price;
              return (
                <Link href={`/auction/${auction.id}`} key={auction.id}
                  className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md hover:border-curb-orange/30 transition group">
                  <div className="relative">
                    {v.photos && v.photos.length > 0 ? (
                      <img src={v.photos[0]} alt={`${v.year} ${v.make} ${v.model}`}
                        className="w-full h-48 object-cover group-hover:scale-[1.02] transition-transform duration-300" />
                    ) : (
                      <div className="w-full h-48 bg-gray-100 flex items-center justify-center text-gray-400">
                        No photos available
                      </div>
                    )}
                    <div className="absolute top-3 right-3 bg-curb-navy/90 text-white px-3 py-1 rounded-full text-xs font-medium">
                      {timeLeft(auction.ends_at)}
                    </div>
                    {v.photos && v.photos.length > 1 && (
                      <div className="absolute bottom-3 right-3 bg-black/60 text-white px-2 py-1 rounded text-xs">
                        📷 {v.photos.length}
                      </div>
                    )}
                  </div>

                  <div className="p-5">
                    <h3 className="text-lg font-bold text-curb-navy mb-1">
                      {v.year} {v.make} {v.model} {v.trim}
                    </h3>
                    <div className="flex items-center gap-3 text-sm text-gray-500 mb-4">
                      <span>{v.mileage?.toLocaleString()} mi</span>
                      {v.exterior_color && <span>· {v.exterior_color}</span>}
                    </div>

                    <div className="flex items-center justify-between">
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
        )}
      </div>
    </div>
  );
}
