'use client';

import { useState } from "react";

export default function DealerRevenueCalculator() {
  const [retailValue, setRetailValue] = useState(16000);
  const [acvPercent, setAcvPercent] = useState(62); // ACV as % of retail (what dealer paid on trade)
  const [curbDiscount, setCurbDiscount] = useState(12); // % below retail Curb cars sell at
  const [repairCost, setRepairCost] = useState(1500);
  const [serviceMargin, setServiceMargin] = useState(55);
  const [carsPerMonth, setCarsPerMonth] = useState(10);

  // --- Vehicle acquisition cost ---
  const acv = Math.round(retailValue * (acvPercent / 100));

  // --- Wholesale auction scenario ---
  // Wholesale is typically 25-30% below retail (using 28% avg)
  const wholesaleDiscount = 0.28;
  const wholesalePrice = Math.round(retailValue * (1 - wholesaleDiscount));
  const auctionFees = 350; // avg Manheim/ADESA seller fees
  const transportCost = 200; // avg transport to auction
  const wholesaleGross = wholesalePrice - auctionFees - transportCost;
  const wholesaleNet = wholesaleGross - acv;

  // --- Curb scenario ---
  // Cars sell at a discount to full retail (but well above wholesale)
  const curbSalePrice = Math.round(retailValue * (1 - curbDiscount / 100));
  const listingFee = 100;
  const curbSaleGross = curbSalePrice - listingFee;
  const serviceProfit = Math.round(repairCost * (serviceMargin / 100));
  const curbTotal = curbSaleGross + serviceProfit - acv;

  // --- Delta ---
  const extraPerCar = curbTotal - wholesaleNet;
  const extraPerMonth = extraPerCar * carsPerMonth;
  const extraPerYear = extraPerMonth * 12;

  // --- Buyer savings (for reference) ---
  const buyerPremium = Math.round(curbSalePrice * 0.03);
  const buyerBaseSavings = retailValue - (curbSalePrice + buyerPremium);

  const fmt = (n: number) =>
    n < 0
      ? `-$${Math.abs(n).toLocaleString()}`
      : `$${n.toLocaleString()}`;

  const pctFmt = (n: number) => `${n}%`;

  return (
    <div className="w-full">
      <div className="w-full max-w-4xl mx-auto">
        <h3 className="text-3xl font-bold text-white mb-2 text-center">
          Interactive Revenue Calculator
        </h3>
        <p className="text-gray-300 mb-8 text-center">
          See how much more you net listing on Curb vs. shipping to wholesale auction.
        </p>

        {/* Inputs */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-6">
          <h4 className="text-sm font-semibold text-curb-orange uppercase tracking-wider mb-4">
            Adjust Your Numbers
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm text-gray-300 mb-1">
                Retail Value (KBB / lot price)
              </label>
              <input
                type="range"
                min={6000}
                max={30000}
                step={500}
                value={retailValue}
                onChange={(e) => setRetailValue(Number(e.target.value))}
                className="w-full accent-curb-orange"
              />
              <span className="text-white font-bold text-lg">{fmt(retailValue)}</span>
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-1">
                Trade-In ACV (your cost)
              </label>
              <input
                type="range"
                min={40}
                max={80}
                step={1}
                value={acvPercent}
                onChange={(e) => setAcvPercent(Number(e.target.value))}
                className="w-full accent-curb-orange"
              />
              <span className="text-white font-bold text-lg">{fmt(acv)}</span>
              <span className="text-gray-500 text-xs ml-2">
                {acvPercent}% of retail
              </span>
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-1">
                Curb Auction Discount (vs. retail)
              </label>
              <input
                type="range"
                min={5}
                max={20}
                step={1}
                value={curbDiscount}
                onChange={(e) => setCurbDiscount(Number(e.target.value))}
                className="w-full accent-curb-orange"
              />
              <span className="text-white font-bold text-lg">{pctFmt(curbDiscount)}</span>
              <span className="text-gray-500 text-xs ml-2">
                Curb price: {fmt(curbSalePrice)}
              </span>
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-1">
                Avg Repair / Safety Work
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
              <span className="text-white font-bold text-lg">{pctFmt(serviceMargin)}</span>
            </div>
            <div className="md:col-span-2">
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
                <span className="text-gray-300 text-sm">Your cost (ACV)</span>
                <span className="text-red-400 font-medium">-{fmt(acv)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300 text-sm">Auction fees</span>
                <span className="text-red-400 font-medium">-{fmt(auctionFees)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300 text-sm">Transport to auction</span>
                <span className="text-red-400 font-medium">-{fmt(transportCost)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300 text-sm">Service revenue</span>
                <span className="text-gray-500 font-medium">$0</span>
              </div>
              <div className="border-t border-white/20 pt-3 flex justify-between">
                <span className="text-white font-semibold">Profit per car</span>
                <span className={`font-bold text-xl ${wholesaleNet >= 0 ? 'text-white' : 'text-red-400'}`}>{fmt(wholesaleNet)}</span>
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
                <span className="text-gray-300 text-sm">
                  Sale price ({100 - curbDiscount}% of retail)
                </span>
                <span className="text-white font-medium">{fmt(curbSalePrice)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300 text-sm">Your cost (ACV)</span>
                <span className="text-red-400 font-medium">-{fmt(acv)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300 text-sm">Listing fee</span>
                <span className="text-red-400 font-medium">-{fmt(listingFee)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300 text-sm">Transport</span>
                <span className="text-gray-500 font-medium">$0 (stays on lot)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300 text-sm">
                  Service profit ({pctFmt(serviceMargin)} on {fmt(repairCost)})
                </span>
                <span className="text-green-400 font-medium">+{fmt(serviceProfit)}</span>
              </div>
              <div className="border-t border-white/20 pt-3 flex justify-between">
                <span className="text-white font-semibold">Profit per car</span>
                <span className="text-curb-orange font-bold text-xl">{fmt(curbTotal)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom line — dealer */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center mb-4">
          <p className="text-gray-300 text-sm mb-1">Extra profit per car on Curb</p>
          <p className="text-curb-orange font-bold text-4xl mb-4">
            {extraPerCar >= 0 ? "+" : ""}{fmt(extraPerCar)}
          </p>
          <div className="border-t border-white/20 pt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-gray-300 text-sm">Monthly ({carsPerMonth} cars)</p>
              <p className="text-white font-bold text-2xl">
                {extraPerMonth >= 0 ? "+" : ""}{fmt(extraPerMonth)}
              </p>
            </div>
            <div>
              <p className="text-gray-300 text-sm">Annual</p>
              <p className="text-white font-bold text-2xl">
                {extraPerYear >= 0 ? "+" : ""}{fmt(extraPerYear)}
              </p>
            </div>
          </div>
        </div>

        {/* Buyer savings callout */}
        <div className="border border-white/10 rounded-xl p-4 text-center">
          <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">
            And the buyer saves on the car
          </p>
          <p className="text-green-400 font-bold text-lg">
            {fmt(Math.max(0, buyerBaseSavings))} vs. retail sticker
          </p>
          <p className="text-gray-500 text-xs">
            Curb price + premium: {fmt(curbSalePrice + buyerPremium)}
            {" "}vs. {fmt(retailValue)} retail
          </p>
          <p className="text-gray-600 text-xs mt-1">
            + {fmt(repairCost)} transparent safety repairs (at retail, recon is hidden in the sticker)
          </p>
        </div>
      </div>
    </div>
  );
}
