'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Vehicle {
  id: string;
  year: number;
  make: string;
  model: string;
  trim: string;
  mileage: number;
  price: number;
  kbbRetailPrice: number;
  currentBid: number;
  bidCount: number;
  timeRemaining: string;
  image: string;
  location: string;
  condition: 'Good' | 'Fair' | 'Rough';
  status: 'Active' | 'Ending Soon';
}

// Mock data - in production this would come from an API
const mockVehicles: Vehicle[] = [
  {
    id: '1',
    year: 2019,
    make: 'Honda',
    model: 'Civic',
    trim: 'EX',
    mileage: 45000,
    price: 14000,
    kbbRetailPrice: 18500,
    currentBid: 12500,
    bidCount: 8,
    timeRemaining: '2d 5h',
    image: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?w=800&auto=format&fit=crop',
    location: 'Los Angeles, CA',
    condition: 'Good',
    status: 'Active',
  },
  {
    id: '2',
    year: 2020,
    make: 'Toyota',
    model: 'Camry',
    trim: 'SE',
    mileage: 32000,
    price: 18500,
    kbbRetailPrice: 24500,
    currentBid: 16200,
    bidCount: 12,
    timeRemaining: '1d 3h',
    image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800&auto=format&fit=crop',
    location: 'San Diego, CA',
    condition: 'Good',
    status: 'Ending Soon',
  },
  {
    id: '3',
    year: 2018,
    make: 'Ford',
    model: 'F-150',
    trim: 'XLT',
    mileage: 58000,
    price: 22000,
    kbbRetailPrice: 29000,
    currentBid: 19800,
    bidCount: 15,
    timeRemaining: '2d 18h',
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&auto=format&fit=crop',
    location: 'Orange County, CA',
    condition: 'Fair',
    status: 'Active',
  },
  {
    id: '4',
    year: 2021,
    make: 'Tesla',
    model: 'Model 3',
    trim: 'Long Range',
    mileage: 28000,
    price: 32000,
    kbbRetailPrice: 42000,
    currentBid: 28500,
    bidCount: 22,
    timeRemaining: '4h 23m',
    image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&auto=format&fit=crop',
    location: 'Los Angeles, CA',
    condition: 'Good',
    status: 'Ending Soon',
  },
  {
    id: '5',
    year: 2019,
    make: 'Chevrolet',
    model: 'Silverado',
    trim: '1500 LT',
    mileage: 42000,
    price: 26000,
    kbbRetailPrice: 34000,
    currentBid: 23400,
    bidCount: 9,
    timeRemaining: '1d 14h',
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&auto=format&fit=crop',
    location: 'Riverside, CA',
    condition: 'Good',
    status: 'Active',
  },
  {
    id: '6',
    year: 2020,
    make: 'Mazda',
    model: 'CX-5',
    trim: 'Touring',
    mileage: 35000,
    price: 19500,
    kbbRetailPrice: 25500,
    currentBid: 17800,
    bidCount: 11,
    timeRemaining: '2d 9h',
    image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800&auto=format&fit=crop',
    location: 'Long Beach, CA',
    condition: 'Good',
    status: 'Active',
  },
];

export default function BrowsePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    make: '',
    minYear: '',
    maxYear: '',
    minMileage: '',
    maxMileage: '',
    minPrice: '',
    maxPrice: '',
    condition: '',
    status: '',
  });
  const [sortBy, setSortBy] = useState('ending-soon');
  const [showFilters, setShowFilters] = useState(false);

  // Filter vehicles based on search and filters
  const filteredVehicles = mockVehicles.filter((vehicle) => {
    const matchesSearch = searchQuery === '' ||
      `${vehicle.year} ${vehicle.make} ${vehicle.model}`.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesMake = filters.make === '' || vehicle.make === filters.make;
    const matchesYear =
      (filters.minYear === '' || vehicle.year >= parseInt(filters.minYear)) &&
      (filters.maxYear === '' || vehicle.year <= parseInt(filters.maxYear));
    const matchesMileage =
      (filters.minMileage === '' || vehicle.mileage >= parseInt(filters.minMileage)) &&
      (filters.maxMileage === '' || vehicle.mileage <= parseInt(filters.maxMileage));
    const matchesPrice =
      (filters.minPrice === '' || vehicle.currentBid >= parseInt(filters.minPrice)) &&
      (filters.maxPrice === '' || vehicle.currentBid <= parseInt(filters.maxPrice));
    const matchesCondition = filters.condition === '' || vehicle.condition === filters.condition;
    const matchesStatus = filters.status === '' || vehicle.status === filters.status;

    return matchesSearch && matchesMake && matchesYear && matchesMileage && matchesPrice && matchesCondition && matchesStatus;
  });

  // Sort vehicles
  const sortedVehicles = [...filteredVehicles].sort((a, b) => {
    switch (sortBy) {
      case 'ending-soon':
        return a.status === 'Ending Soon' ? -1 : 1;
      case 'lowest-price':
        return a.currentBid - b.currentBid;
      case 'highest-bid':
        return b.bidCount - a.bidCount;
      case 'newest':
        return b.year - a.year;
      default:
        return 0;
    }
  });

  const uniqueMakes = Array.from(new Set(mockVehicles.map(v => v.make))).sort();

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
              <Link href="/" className="text-gray-700 hover:text-curb-orange transition">
                Home
              </Link>
              <button className="bg-curb-orange text-white px-6 py-2 rounded-full hover:bg-orange-600 transition font-medium">
                Sign In
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-curb-navy mb-2">Browse Auctions</h1>
          <p className="text-gray-600">Find your next vehicle from our transparent wholesale auctions</p>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search by make, model, or year..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-curb-orange"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-6 py-3 bg-curb-navy text-white rounded-lg hover:bg-slate-800 transition font-medium"
            >
              {showFilters ? 'Hide Filters' : 'Show Filters'}
            </button>
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <h3 className="text-lg font-semibold text-curb-navy mb-4">Filters</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Make</label>
                <select
                  value={filters.make}
                  onChange={(e) => setFilters({ ...filters, make: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-curb-orange"
                >
                  <option value="">All Makes</option>
                  {uniqueMakes.map((make) => (
                    <option key={make} value={make}>{make}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Min Year</label>
                <input
                  type="number"
                  placeholder="2015"
                  value={filters.minYear}
                  onChange={(e) => setFilters({ ...filters, minYear: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-curb-orange"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Max Year</label>
                <input
                  type="number"
                  placeholder="2024"
                  value={filters.maxYear}
                  onChange={(e) => setFilters({ ...filters, maxYear: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-curb-orange"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Max Mileage</label>
                <input
                  type="number"
                  placeholder="50000"
                  value={filters.maxMileage}
                  onChange={(e) => setFilters({ ...filters, maxMileage: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-curb-orange"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Min Price</label>
                <input
                  type="number"
                  placeholder="5000"
                  value={filters.minPrice}
                  onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-curb-orange"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Max Price</label>
                <input
                  type="number"
                  placeholder="30000"
                  value={filters.maxPrice}
                  onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-curb-orange"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Condition</label>
                <select
                  value={filters.condition}
                  onChange={(e) => setFilters({ ...filters, condition: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-curb-orange"
                >
                  <option value="">All Conditions</option>
                  <option value="Good">Good</option>
                  <option value="Fair">Fair</option>
                  <option value="Rough">Rough</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={filters.status}
                  onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-curb-orange"
                >
                  <option value="">All Auctions</option>
                  <option value="Active">Active</option>
                  <option value="Ending Soon">Ending Soon</option>
                </select>
              </div>
            </div>

            <button
              onClick={() => setFilters({
                make: '',
                minYear: '',
                maxYear: '',
                minMileage: '',
                maxMileage: '',
                minPrice: '',
                maxPrice: '',
                condition: '',
                status: '',
              })}
              className="mt-4 text-curb-orange hover:text-orange-600 font-medium"
            >
              Clear All Filters
            </button>
          </div>
        )}

        {/* Results Header */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-600">
            <span className="font-semibold text-curb-navy">{sortedVehicles.length}</span> vehicles found
          </p>
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-600">Sort by:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-curb-orange"
            >
              <option value="ending-soon">Ending Soon</option>
              <option value="lowest-price">Lowest Price</option>
              <option value="highest-bid">Most Bids</option>
              <option value="newest">Newest First</option>
            </select>
          </div>
        </div>

        {/* Vehicle Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedVehicles.map((vehicle) => (
            <Link
              key={vehicle.id}
              href={`/vehicle/${vehicle.id}`}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition overflow-hidden group"
            >
              {/* Image */}
              <div className="relative h-48 bg-gray-200 overflow-hidden">
                <img
                  src={vehicle.image}
                  alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
                {vehicle.status === 'Ending Soon' && (
                  <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Ending Soon
                  </div>
                )}
                <div className="absolute bottom-3 left-3 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                  {vehicle.timeRemaining}
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="text-lg font-semibold text-curb-navy mb-1">
                  {vehicle.year} {vehicle.make} {vehicle.model} {vehicle.trim}
                </h3>
                <p className="text-sm text-gray-500 mb-3">
                  {vehicle.mileage.toLocaleString()} miles • {vehicle.location}
                </p>

                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="text-xs text-gray-500">Current Bid</p>
                    <p className="text-2xl font-bold text-curb-orange">
                      ${vehicle.currentBid.toLocaleString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">Bids</p>
                    <p className="text-lg font-semibold text-gray-700">{vehicle.bidCount}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <span className={`text-xs font-medium px-2 py-1 rounded ${
                    vehicle.condition === 'Good' ? 'bg-green-100 text-green-800' :
                    vehicle.condition === 'Fair' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-orange-100 text-orange-800'
                  }`}>
                    {vehicle.condition}
                  </span>
                  <span className="text-curb-orange font-medium text-sm group-hover:underline">
                    View Details →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* No Results */}
        {sortedVehicles.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No vehicles match your search criteria</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setFilters({
                  make: '',
                  minYear: '',
                  maxYear: '',
                  minMileage: '',
                  maxMileage: '',
                  minPrice: '',
                  maxPrice: '',
                  condition: '',
                  status: '',
                });
              }}
              className="mt-4 text-curb-orange hover:text-orange-600 font-medium"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
