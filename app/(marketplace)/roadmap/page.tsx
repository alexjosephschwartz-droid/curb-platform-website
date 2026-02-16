import type { Metadata } from 'next';
import Link from 'next/link';
import PhaseToggle from '@/components/roadmap/PhaseToggle';

export const metadata: Metadata = {
  title: 'Product Roadmap - Curb',
  description: 'Our strategic vision for revolutionizing the used car marketplace. See planned features for buyers and dealers.',
};

export default function RoadmapPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-curb-navy via-slate-800 to-curb-navy text-white py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-8">Product Roadmap</h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Our strategic vision for revolutionizing the used car marketplace. Planned features designed to maximize value for buyers and dealers.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-7xl">
        {/* Current Platform Status */}
        <div className="bg-gradient-to-r from-green-50 to-green-100 border-2 border-green-300 rounded-2xl p-8 mb-12">
          <div className="flex items-start gap-5 mb-6">
            <div className="w-16 h-16 bg-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg className="w-10 h-10 text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-green-800 mb-1">Phase 1: LIVE NOW</h2>
              <p className="text-green-700 text-lg">Core platform features are deployed and operational</p>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg p-5 border border-green-200">
              <div className="flex items-center gap-2 mb-2">
                <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <p className="font-semibold text-green-800">Buyer Marketplace</p>
              </div>
              <p className="text-sm text-gray-600">Browse, bid, and purchase vehicles</p>
            </div>
            <div className="bg-white rounded-lg p-5 border border-green-200">
              <div className="flex items-center gap-2 mb-2">
                <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <p className="font-semibold text-green-800">Dealer Dashboard</p>
              </div>
              <p className="text-sm text-gray-600">List vehicles and manage auctions</p>
            </div>
            <div className="bg-white rounded-lg p-5 border border-green-200">
              <div className="flex items-center gap-2 mb-2">
                <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <p className="font-semibold text-green-800">AI Automation</p>
              </div>
              <p className="text-sm text-gray-600">Smart pricing, fraud detection, chatbot</p>
            </div>
          </div>
        </div>

        <PhaseToggle />

        {/* Timeline Visualization */}
        <div className="mt-16 bg-white rounded-2xl shadow-lg p-10 border border-gray-100">
          <h2 className="text-3xl font-bold text-curb-navy mb-12 text-center">Development Timeline</h2>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-green-500 via-curb-orange to-blue-500 h-full"></div>
            <div className="relative flex items-center mb-12">
              <div className="flex-1 text-right pr-8">
                <div className="bg-green-100 inline-block px-6 py-4 rounded-lg border border-green-200">
                  <h3 className="font-bold text-green-800 text-xl mb-1">Phase 1 - Core Platform</h3>
                  <p className="text-green-700 text-sm font-medium">2025 Q1-Q2 &bull; Complete</p>
                </div>
              </div>
              <div className="w-10 h-10 bg-green-500 rounded-full border-4 border-white shadow-lg z-10 flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="flex-1 pl-8">
                <p className="text-gray-600 font-medium">Marketplace, Auctions, AI Tools</p>
              </div>
            </div>
            <div className="relative flex items-center mb-12">
              <div className="flex-1 text-right pr-8">
                <p className="text-gray-600 font-medium">Mobile Apps, Enterprise Tools, Delivery</p>
              </div>
              <div className="w-10 h-10 bg-curb-orange rounded-full border-4 border-white shadow-lg z-10"></div>
              <div className="flex-1 pl-8">
                <div className="bg-orange-100 inline-block px-6 py-4 rounded-lg border border-orange-200">
                  <h3 className="font-bold text-curb-orange text-xl mb-1">Phase 2 - Growth Features</h3>
                  <p className="text-orange-700 text-sm font-medium">2025 Q3-Q4 &bull; Planned</p>
                </div>
              </div>
            </div>
            <div className="relative flex items-center">
              <div className="flex-1 text-right pr-8">
                <div className="bg-blue-100 inline-block px-6 py-4 rounded-lg border border-blue-200">
                  <h3 className="font-bold text-blue-800 text-xl mb-1">Phase 3 - Advanced Services</h3>
                  <p className="text-blue-700 text-sm font-medium">2026+ &bull; Strategic</p>
                </div>
              </div>
              <div className="w-10 h-10 bg-blue-500 rounded-full border-4 border-white shadow-lg z-10"></div>
              <div className="flex-1 pl-8">
                <p className="text-gray-600 font-medium">Financing, Warranties, Curb Direct</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 bg-gradient-to-r from-curb-orange to-orange-600 rounded-2xl p-14 text-center text-white shadow-xl">
          <h2 className="text-4xl md:text-5xl font-bold mb-5">Want Early Access?</h2>
          <p className="text-xl md:text-2xl mb-10 opacity-90 max-w-2xl mx-auto">
            Join our waitlist to be the first to experience new features as they launch
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/" className="bg-white text-curb-orange px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition">
              Join Waitlist
            </Link>
            <Link href="/browse" className="bg-curb-navy text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-slate-800 transition">
              Explore Platform
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
