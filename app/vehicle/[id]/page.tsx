'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';

type VehicleDetail = {
  id: string;
  year: number;
  make: string;
  model: string;
  trim: string | null;
  vin: string | null;
  mileage: number;
  exterior_color: string | null;
  interior_color: string | null;
  body_type: string | null;
  transmission: string | null;
  drivetrain: string | null;
  engine: string | null;
  fuel_type: string | null;
  photos: string[] | null;
  condition_notes: string | null;
};

type AuctionDetail = {
  id: string;
  status: string;
  current_bid: number | null;
  starting_price: number;
  bid_count: number;
  ends_at: string;
  vehicles: VehicleDetail;
};

// Sample data matching browse page IDs
const SAMPLE_DATA: Record<string, AuctionDetail> = {
  'demo-a1': {
    id: 'demo-a1', status: 'active', current_bid: 1725000, starting_price: 1600000, bid_count: 8,
    ends_at: new Date(Date.now() + 43200000).toISOString(),
    vehicles: {
      id: 'v1', year: 2020, make: 'Honda', model: 'Accord', trim: 'Sport', vin: '1HGCV1F34LA0XXXXX',
      mileage: 42150, exterior_color: 'Crystal Black Pearl', interior_color: 'Black', body_type: 'Sedan',
      transmission: 'CVT', drivetrain: 'FWD', engine: '1.5L Turbo I4', fuel_type: 'Gasoline',
      photos: [
        'https://images.unsplash.com/photo-1634737581963-5a22ba471961?w=800&h=480&fit=crop&auto=format&q=80',
        'https://images.unsplash.com/photo-1578659258511-4a4e7dee7344?w=800&h=480&fit=crop&auto=format&q=80',
      ],
      condition_notes: 'Clean trade-in, minor wear on driver seat. All maintenance records available. No accidents reported.',
    },
  },
  'demo-a2': {
    id: 'demo-a2', status: 'active', current_bid: 2350000, starting_price: 2100000, bid_count: 14,
    ends_at: new Date(Date.now() + 172800000).toISOString(),
    vehicles: {
      id: 'v2', year: 2021, make: 'Tesla', model: 'Model 3', trim: 'Long Range', vin: '5YJ3E1EA1MF0XXXXX',
      mileage: 28300, exterior_color: 'Pearl White', interior_color: 'Black', body_type: 'Sedan',
      transmission: 'Single-Speed', drivetrain: 'AWD', engine: 'Dual Motor Electric', fuel_type: 'Electric',
      photos: [
        'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&h=480&fit=crop&auto=format&q=80',
      ],
      condition_notes: 'Excellent condition, full self-driving capable. Premium interior, autopilot included. Clean title.',
    },
  },
  'demo-a3': {
    id: 'demo-a3', status: 'active', current_bid: 1950000, starting_price: 1800000, bid_count: 6,
    ends_at: new Date(Date.now() + 86400000).toISOString(),
    vehicles: {
      id: 'v3', year: 2020, make: 'Jeep', model: 'Grand Cherokee', trim: 'Limited', vin: '1C4RJFBG5LC0XXXXX',
      mileage: 51200, exterior_color: 'Slate Blue', interior_color: 'Brown Leather', body_type: 'SUV',
      transmission: '8-Speed Automatic', drivetrain: '4WD', engine: '3.6L V6', fuel_type: 'Gasoline',
      photos: [
        'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&h=480&fit=crop&auto=format&q=80',
      ],
      condition_notes: 'Well-maintained, one owner, clean Carfax. Leather seats, panoramic sunroof, navigation.',
    },
  },
  'demo-a4': {
    id: 'demo-a4', status: 'active', current_bid: 3150000, starting_price: 2500000, bid_count: 22,
    ends_at: new Date(Date.now() + 28800000).toISOString(),
    vehicles: {
      id: 'v4', year: 2021, make: 'Ford', model: 'F-150', trim: 'XLT SuperCrew', vin: '1FTFW1E82MF0XXXXX',
      mileage: 38500, exterior_color: 'Rapid Red', interior_color: 'Medium Dark Slate', body_type: 'Truck',
      transmission: '10-Speed Automatic', drivetrain: '4WD', engine: '2.7L EcoBoost V6', fuel_type: 'Gasoline',
      photos: [
        'https://images.unsplash.com/photo-1590362891991-f776e747a588?w=800&h=480&fit=crop&auto=format&q=80',
      ],
      condition_notes: 'Fleet vehicle, well-maintained, bed liner included. Tow package, running boards, backup camera.',
    },
  },
  'demo-a5': {
    id: 'demo-a5', status: 'active', current_bid: 2680000, starting_price: 2200000, bid_count: 11,
    ends_at: new Date(Date.now() + 129600000).toISOString(),
    vehicles: {
      id: 'v5', year: 2022, make: 'Toyota', model: 'RAV4', trim: 'XLE Premium', vin: '2T3A1RFV8NW0XXXXX',
      mileage: 19800, exterior_color: 'Magnetic Gray', interior_color: 'Black SofTex', body_type: 'SUV',
      transmission: '8-Speed Automatic', drivetrain: 'AWD', engine: '2.5L I4', fuel_type: 'Gasoline',
      photos: [
        'https://images.unsplash.com/photo-1581540222194-0def2dda95b8?w=800&h=480&fit=crop&auto=format&q=80',
      ],
      condition_notes: 'Low mileage lease return, excellent condition. Sunroof, heated seats, Toyota Safety Sense.',
    },
  },
  'demo-a6': {
    id: 'demo-a6', status: 'active', current_bid: 1480000, starting_price: 1200000, bid_count: 9,
    ends_at: new Date(Date.now() + 57600000).toISOString(),
    vehicles: {
      id: 'v6', year: 2019, make: 'Mazda', model: 'CX-5', trim: 'Touring', vin: 'JM3KFBCM1K00XXXXX',
      mileage: 55600, exterior_color: 'Soul Red Crystal', interior_color: 'Black Cloth', body_type: 'SUV',
      transmission: '6-Speed Automatic', drivetrain: 'FWD', engine: '2.5L I4', fuel_type: 'Gasoline',
      photos: [
        'https://images.unsplash.com/photo-1612544448445-b8232cff3b6c?w=800&h=480&fit=crop&auto=format&q=80',
      ],
      condition_notes: 'Single owner, all maintenance records available. Apple CarPlay, blind spot monitoring.',
    },
  },
  'demo-a7': {
    id: 'demo-a7', status: 'active', current_bid: 1870000, starting_price: 1500000, bid_count: 7,
    ends_at: new Date(Date.now() + 194400000).toISOString(),
    vehicles: {
      id: 'v7', year: 2020, make: 'Hyundai', model: 'Tucson', trim: 'SEL', vin: 'KM8J3CA46LU0XXXXX',
      mileage: 44200, exterior_color: 'Amazon Gray', interior_color: 'Gray Cloth', body_type: 'SUV',
      transmission: '6-Speed Automatic', drivetrain: 'FWD', engine: '2.4L I4', fuel_type: 'Gasoline',
      photos: [
        'https://images.unsplash.com/photo-1642912832910-7d403ce697e1?w=800&h=480&fit=crop&auto=format&q=80',
      ],
      condition_notes: 'Trade-in, runs great, clean interior. Heated seats, Apple CarPlay, lane keep assist.',
    },
  },
  'demo-a8': {
    id: 'demo-a8', status: 'active', current_bid: 4250000, starting_price: 3800000, bid_count: 16,
    ends_at: new Date(Date.now() + 64800000).toISOString(),
    vehicles: {
      id: 'v8', year: 2022, make: 'BMW', model: 'X3', trim: 'xDrive30i', vin: '5UXTY5C07N9A0XXXXX',
      mileage: 22100, exterior_color: 'Alpine White', interior_color: 'Cognac Vernasca Leather', body_type: 'SUV',
      transmission: '8-Speed Automatic', drivetrain: 'AWD', engine: '2.0L Turbo I4', fuel_type: 'Gasoline',
      photos: [
        'https://images.unsplash.com/photo-1556189250-72ba954cfc2b?w=800&h=480&fit=crop&auto=format&q=80',
      ],
      condition_notes: 'Lease return, M Sport package, premium features. Panoramic sunroof, navigation, Harman Kardon.',
    },
  },
  'demo-a9': {
    id: 'demo-a9', status: 'active', current_bid: null, starting_price: 1400000, bid_count: 0,
    ends_at: new Date(Date.now() + 259200000).toISOString(),
    vehicles: {
      id: 'v9', year: 2019, make: 'Chevrolet', model: 'Equinox', trim: 'LT', vin: '2GNAXUEV7K60XXXXX',
      mileage: 62300, exterior_color: 'Nightfall Gray', interior_color: 'Jet Black', body_type: 'SUV',
      transmission: '6-Speed Automatic', drivetrain: 'FWD', engine: '1.5L Turbo I4', fuel_type: 'Gasoline',
      photos: [
        'https://images.unsplash.com/photo-1614220654876-8a75c41f7a7c?w=800&h=480&fit=crop&auto=format&q=80',
      ],
      condition_notes: 'Higher mileage but mechanically solid, new brakes. Heated seats, remote start, backup camera.',
    },
  },
};

export default function VehicleDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const [auction, setAuction] = useState<AuctionDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [isDemo, setIsDemo] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(0);

  useEffect(() => {
    async function fetchVehicle() {
      // Check if this is a demo ID
      if (id.startsWith('demo-')) {
        const demo = SAMPLE_DATA[id];
        if (demo) {
          setAuction(demo);
          setIsDemo(true);
        }
        setLoading(false);
        return;
      }

      // Try to fetch real data
      const supabase = createClient();
      const { data, error } = await supabase
        .from('auctions')
        .select(`
          id, status, current_bid, starting_price, bid_count, ends_at,
          vehicles!inner(id, year, make, model, trim, vin, mileage, exterior_color, interior_color,
            body_type, transmission, drivetrain, engine, fuel_type, photos, condition_notes)
        `)
        .eq('id', id)
        .single();

      if (!error && data) {
        setAuction(data as unknown as AuctionDetail);
      }
      setLoading(false);
    }

    fetchVehicle();
  }, [id]);

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

  if (!auction) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold text-curb-navy">Vehicle Not Found</h1>
        <p className="text-gray-600">This listing may have been removed or doesn&apos;t exist.</p>
        <Link href="/browse" className="text-curb-orange hover:underline font-medium">
          ← Back to Browse
        </Link>
      </div>
    );
  }

  const v = auction.vehicles;
  const price = auction.current_bid || auction.starting_price;
  const photos = v.photos && v.photos.length > 0 ? v.photos : [];
  const isEnding = new Date(auction.ends_at).getTime() - Date.now() < 43200000;

  const specs = [
    { label: 'Mileage', value: `${v.mileage?.toLocaleString()} mi` },
    { label: 'Exterior', value: v.exterior_color },
    { label: 'Interior', value: v.interior_color },
    { label: 'Body Type', value: v.body_type },
    { label: 'Transmission', value: v.transmission },
    { label: 'Drivetrain', value: v.drivetrain },
    { label: 'Engine', value: v.engine },
    { label: 'Fuel Type', value: v.fuel_type },
  ].filter(s => s.value);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back link */}
        <Link href="/browse" className="inline-flex items-center text-gray-600 hover:text-curb-orange mb-6 transition">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Auctions
        </Link>

        {/* Demo banner */}
        {isDemo && (
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg flex items-center gap-3">
            <span className="text-xl">🏷️</span>
            <p className="text-sm text-blue-800">
              <span className="font-semibold">Sample listing.</span> This is demo data showing what a real auction will look like.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Photos */}
          <div className="lg:col-span-2">
            {/* Main photo */}
            <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 mb-4">
              {photos.length > 0 ? (
                <img
                  src={photos[selectedPhoto]}
                  alt={`${v.year} ${v.make} ${v.model}`}
                  className="w-full h-[400px] object-cover"
                />
              ) : (
                <div className="w-full h-[400px] bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                  <span className="text-8xl opacity-60">🚗</span>
                </div>
              )}
            </div>

            {/* Thumbnail strip */}
            {photos.length > 1 && (
              <div className="flex gap-2 mb-6">
                {photos.map((photo, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedPhoto(i)}
                    className={`rounded-lg overflow-hidden border-2 transition ${
                      i === selectedPhoto ? 'border-curb-orange' : 'border-transparent hover:border-gray-300'
                    }`}
                  >
                    <img src={photo} alt={`View ${i + 1}`} className="w-20 h-14 object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Vehicle details */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-xl font-bold text-curb-navy mb-4">Vehicle Details</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {specs.map((spec) => (
                  <div key={spec.label}>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">{spec.label}</p>
                    <p className="text-sm font-semibold text-curb-navy mt-1">{spec.value}</p>
                  </div>
                ))}
              </div>

              {v.vin && (
                <div className="mt-6 pt-4 border-t border-gray-100">
                  <p className="text-xs text-gray-500 uppercase tracking-wide">VIN</p>
                  <p className="text-sm font-mono text-curb-navy mt-1">{v.vin}</p>
                </div>
              )}

              {v.condition_notes && (
                <div className="mt-6 pt-4 border-t border-gray-100">
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">Condition Notes</p>
                  <p className="text-sm text-gray-700 leading-relaxed">{v.condition_notes}</p>
                </div>
              )}
            </div>
          </div>

          {/* Right: Auction info */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-24">
              <h1 className="text-2xl font-bold text-curb-navy mb-1">
                {v.year} {v.make} {v.model}
              </h1>
              {v.trim && <p className="text-gray-500 mb-4">{v.trim}</p>}

              {/* Timer */}
              <div className={`flex items-center gap-2 mb-6 px-4 py-3 rounded-lg ${
                isEnding ? 'bg-red-50 text-red-700' : 'bg-orange-50 text-curb-orange'
              }`}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-semibold">{isEnding && '🔥 '}{timeLeft(auction.ends_at)}</span>
              </div>

              {/* Price */}
              <div className="mb-6">
                <p className="text-sm text-gray-500">
                  {auction.current_bid ? 'Current Bid' : 'Starting Price'}
                </p>
                <p className="text-4xl font-bold text-curb-orange mt-1">{fmtPrice(price)}</p>
                <p className="text-sm text-gray-500 mt-1">{auction.bid_count} bid{auction.bid_count !== 1 ? 's' : ''}</p>
              </div>

              {/* Bid button */}
              <button
                disabled={isDemo}
                className="w-full py-4 bg-curb-orange text-white rounded-xl font-bold text-lg hover:bg-orange-600 transition disabled:opacity-60 disabled:cursor-not-allowed mb-3"
              >
                {isDemo ? 'Bidding Coming Soon' : 'Place Bid'}
              </button>

              {/* Watch button */}
              <button
                disabled={isDemo}
                className="w-full py-3 border-2 border-curb-navy text-curb-navy rounded-xl font-semibold hover:bg-curb-navy hover:text-white transition disabled:opacity-60 disabled:cursor-not-allowed"
              >
                Watch This Auction
              </button>

              {/* Auction details */}
              <div className="mt-6 pt-6 border-t border-gray-100 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Starting Price</span>
                  <span className="font-medium text-curb-navy">{fmtPrice(auction.starting_price)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Buyer Premium</span>
                  <span className="font-medium text-curb-navy">3%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Inspection Fee</span>
                  <span className="font-medium text-curb-navy">$75</span>
                </div>
              </div>

              {/* Trust badges */}
              <div className="mt-6 pt-6 border-t border-gray-100">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <span className="text-green-500">✓</span>
                    <span>Dealer-verified condition</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <span className="text-green-500">✓</span>
                    <span>Safety inspection included</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <span className="text-green-500">✓</span>
                    <span>Secure escrow payment</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <span className="text-green-500">✓</span>
                    <span>Delivery coordination</span>
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
