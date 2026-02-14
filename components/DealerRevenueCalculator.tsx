'use client';

import { useState } from "react";

export default function DealerRevenueCalculator() {
  const [avgSale, setAvgSale] = useState(14000);
  const [repairCost, setRepairCost] = useState(2000);
  const [serviceMargin, setServiceMargin] = useState(55);
  const [carsPerMonth, setCarsPerMonth] = useState(10);

  // Wholesale auction scenario
  const wholesaleDiscount = 0.28; // avg 28% below retail
  const wholesalePrice = Math.round(avgSale * (1 - wholesaleDiscount));
  const auctionFees = 350; // avg Manheim/ADESA seller fees
  const wholesaleNet = wholesalePrice - auctionFees;

  // Curb scenario
  const listingFee = 100;
  const curbSaleNet = avgSale - listingFee;
  const serviceProfit = Math.round(repairCost * (serviceMargin / 100));
  const curbTotal = curbSaleNet + serviceProfit;

  // Delta
  const extraPerCar = curbTotal - wholesaleNet;
  const extraPerMonth = extraPerCar * carsPerMonth;
  const extraPerYear = extraPerMonth * 12;

  const fmt = (n: number) =>
    n < 0
      ? `-$${Math.abs(n).toLocaleString()}`
      : `$${n.toLocaleString()}`;

  return (
    <div className="w-full">
      <div className="w-full max-w-4xl mx-auto">
        <h3 className="text-3xl font-bold text-white mb-2 text-center">
          Interactive Revenue Calculator
        </h3>
        <p className="text-gray-300 mb-8 text-center">
          See how much more you make listing on Curb vs. shipping to wholesale
          auction.
        </p>

        {/* Inputs */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-6">
          <h4 className="text-sm font-semibold text-curb-orange uppercase tracking-wider mb-4">
            Adjust Your Numbers
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm text-gray-300 mb-1">
                Avg Vehicle Sale Price
              </label>
              <input
                type="range"
                min={5000}
                max={25000}
                step={500}
                value={avgSale}
                onChange={(e) => setAvgSale(Number(e.target.value))}
                className="w-full accent-curb-orange"
              />
              <span className="text-white font-bold text-lg">{fmt(avgSale)}</span>
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-1">
                Avg Repair/Safety Work Cost
              </label>
              <input
                type="range"
                min={500}
                max={5000}
                step={250}
                value={repairCost}
                onChange={(e) => setRepairCost(Number(e.target.value))}
                className="w-full accent-curb-orange"
              />
              <span className="text-white font-bold text-lg">{fmt(repairCost)}</span>
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-1">
                Service Dept Margin
              </label>
              <input
                type="range"
                min={30}
                max={70}
                step={5}
                value={serviceMargin}
                onChange={(e) => setServiceMargin(Number(e.target.value))}
                className="w-full accent-curb-orange"
              />
              <span className="text-white font-bold text-lg">{serviceMargin}%</span>
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-1">
                Cars Listed / Month
              </label>
              <input
                type="range"
                min={1}
                max={50}
                step={1}
                value={carsPerMonth}
                onChange={(e) => setCarsPerMonth(Number(e.target.value))}
                className="w-full accent-curb-orange"
              />
              <span className="text-white font-bold text-lg">{carsPerMonth}</span>
            </div>
          </div>
        </div>

        {/* Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* Wholesale column */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
            <h4 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">
              Wholesale Auction
            </h4>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-300 text-sm">Sale price (~72% of retail)</span>
                <span className="text-white font-medium">{fmt(wholesalePrice)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300 text-sm">Auction fees</span>
                <span className="text-red-400 font-medium">-{fmt(auctionFees)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300 text-sm">Service revenue</span>
                <span className="text-gray-500 font-medium">$0</span>
              </div>
              <div className="border-t border-white/20 pt-3 flex justify-between">
                <span className="text-white font-semibold">Net per car</span>
                <span className="text-white font-bold text-xl">{fmt(wholesaleNet)}</span>
              </div>
            </div>
          </div>

          {/* Curb column */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 ring-2 ring-curb-orange">
            <h4 className="text-sm font-semibold text-curb-orange uppercase tracking-wider mb-4">
              On Curb
            </h4>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-300 text-sm">Sale price (retail bid)</span>
                <span className="text-white font-medium">{fmt(avgSale)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300 text-sm">Listing fee</span>
                <span className="text-red-400 font-medium">-{fmt(listingFee)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300 text-sm">Service profit ({serviceMargin}% on {fmt(repairCost)})</span>
                <span className="text-green-400 font-medium">+{fmt(serviceProfit)}</span>
              </div>
              <div className="border-t border-white/20 pt-3 flex justify-between">
                <span className="text-white font-semibold">Net per car</span>
                <span className="text-curb-orange font-bold text-xl">{fmt(curbTotal)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom line */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
          <p className="text-gray-300 text-sm mb-1">Extra revenue per car on Curb</p>
          <p className="text-curb-orange font-bold text-4xl mb-4">+{fmt(extraPerCar)}</p>
          <div className="border-t border-white/20 pt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-gray-300 text-sm">Monthly ({carsPerMonth} cars)</p>
              <p className="text-white font-bold text-2xl">+{fmt(extraPerMonth)}</p>
            </div>
            <div>
              <p className="text-gray-300 text-sm">Annual</p>
              <p className="text-white font-bold text-2xl">+{fmt(extraPerYear)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
