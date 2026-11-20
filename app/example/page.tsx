'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import LandingNav from '@/components/landing/LandingNav';

const FORMSPREE_URL = 'https://formspree.io/f/xvzrezkd';

const PHOTOS = [
  'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1556189250-72ba954cfc2b?w=800&h=480&fit=crop&auto=format&q=80',
  'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=800&h=480&fit=crop&auto=format&q=80',
  'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&h=480&fit=crop&auto=format&q=80',
];

const REPAIRS_TOTAL = 1215;
const RETAIL_VALUE = 24000;
const SAMPLE_CA_TAX_RATE = 0.0950; // ~9.5% LA County sample
const SAMPLE_CA_REG = 435; // sample CA title, reg, plates
const SAMPLE_NV_TAX_RATE = 0.0825; // ~8.25% Clark County sample
const SAMPLE_NV_REG = 350; // sample NV title, reg, plates

type DemoScenario = 'ca-pickup' | 'nv-ship' | 'nv-pickup-ca';

const DEMO_SCENARIOS: { key: DemoScenario; label: string; short: string; buyerZip: string; delivery: 'pickup' | 'ship'; destZip: string; regZip: string; desc: string }[] = [
  {
    key: 'ca-pickup',
    label: 'California pickup & registration',
    short: 'CA Pickup',
    buyerZip: '90210',
    delivery: 'pickup',
    destZip: '90210',
    regZip: '90210',
    desc: 'Buyer in Beverly Hills picks up from the LA dealer and registers in California.',
  },
  {
    key: 'nv-ship',
    label: 'Ship to Nevada, register there',
    short: 'Ship to NV',
    buyerZip: '89101',
    delivery: 'ship',
    destZip: '89101',
    regZip: '89101',
    desc: 'Buyer in Las Vegas has the car shipped from the LA dealer and registers in Nevada.',
  },
  {
    key: 'nv-pickup-ca',
    label: 'Nevada buyer, California pickup',
    short: 'NV Buyer, CA Pickup',
    buyerZip: '89101',
    delivery: 'pickup',
    destZip: '90015',
    regZip: '89101',
    desc: 'Buyer from Las Vegas picks up at the LA dealer but registers the car back in Nevada.',
  },
];

export default function ExampleAuctionPage() {
  const [selectedPhoto, setSelectedPhoto] = useState(0);
  const [showWaitlist, setShowWaitlist] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    email: '', firstName: '', lastName: '', location: '', vehicleType: '', priceRange: '',
  });

  // Editable bid amount
  const [bidAmount, setBidAmount] = useState(18500);
  const [bidInput, setBidInput] = useState('18,500');

  // Computed pricing
  const premium = Math.round(bidAmount * 0.03);
  const subtotal = bidAmount + REPAIRS_TOTAL + premium;
  const savings = RETAIL_VALUE - subtotal;

  // Estimate state
  const [activeScenario, setActiveScenario] = useState<DemoScenario>('ca-pickup');
  const [customMode, setCustomMode] = useState(false);
  const [estZip, setEstZip] = useState('90210');
  const [estDelivery, setEstDelivery] = useState<'pickup' | 'ship'>('pickup');
  const [estDestZip, setEstDestZip] = useState('');
  const [estRegZipDifferent, setEstRegZipDifferent] = useState(false);
  const [estRegZip, setEstRegZip] = useState('');

  // Proxy bidding state
  const [proxyMode, setProxyMode] = useState<'max-bid' | 'max-budget'>('max-bid');
  const [proxyMaxBid, setProxyMaxBid] = useState(20000);
  const [proxyMaxBidInput, setProxyMaxBidInput] = useState('20,000');
  const [proxyBudget, setProxyBudget] = useState(25000);
  const [proxyBudgetInput, setProxyBudgetInput] = useState('25,000');
  const [proxyOutcome, setProxyOutcome] = useState<'bidding' | 'won' | 'outbid'>('bidding');

  // Simple CA ZIP detection (900xx–961xx)
  const isCaliforniaZip = (zip: string) => {
    const n = parseInt(zip.slice(0, 3), 10);
    return zip.length === 5 && n >= 900 && n <= 961;
  };

  // Simple NV ZIP detection (889xx–898xx)
  const isNevadaZip = (zip: string) => {
    const n = parseInt(zip.slice(0, 3), 10);
    return zip.length === 5 && n >= 889 && n <= 898;
  };

  // ZIP validation — rejects 00000, non-numeric, wrong length
  const isValidZip = (zip: string) => /^[0-9]{5}$/.test(zip) && zip !== '00000';

  const handleBidChange = (raw: string) => {
    const digits = raw.replace(/[^0-9]/g, '');
    const num = parseInt(digits, 10) || 0;
    setBidAmount(num);
    setBidInput(num > 0 ? num.toLocaleString() : '');
  };

  const selectScenario = (key: DemoScenario) => {
    const s = DEMO_SCENARIOS.find(d => d.key === key)!;
    setActiveScenario(key);
    setCustomMode(false);
    setEstZip(s.buyerZip);
    setEstDelivery(s.delivery);
    setEstDestZip(s.delivery === 'ship' ? s.destZip : '');
    setEstRegZipDifferent(s.regZip !== s.destZip);
    setEstRegZip(s.regZip !== s.destZip ? s.regZip : '');
  };

  type EstLine = { label: string; value: string; note?: string; amount: number | null };

  const getEstimate = () => {
    let buyerZip: string, destZip: string, regZip: string, isPickup: boolean;

    if (customMode) {
      buyerZip = estZip.trim();
      destZip = estDelivery === 'ship' ? estDestZip.trim() : buyerZip;
      regZip = estRegZipDifferent ? estRegZip.trim() : destZip;
      isPickup = estDelivery === 'pickup';
    } else {
      const s = DEMO_SCENARIOS.find(d => d.key === activeScenario)!;
      buyerZip = s.buyerZip;
      destZip = s.destZip;
      regZip = s.regZip;
      isPickup = s.delivery === 'pickup';
    }

    const destIsCA = isCaliforniaZip(destZip);
    const regIsCA = isCaliforniaZip(regZip);
    const regIsNV = isNevadaZip(regZip);

    // Tax
    let taxLine: EstLine;
    if (isPickup && destIsCA) {
      const tax = Math.round(subtotal * SAMPLE_CA_TAX_RATE);
      taxLine = { label: 'Est. CA sales tax (~9.5%)', value: `$${tax.toLocaleString()}`, note: 'Sample estimate · Dealer review required', amount: tax };
    } else if (!isPickup && !destIsCA) {
      taxLine = { label: 'CA sales tax', value: 'Likely $0', note: 'For qualifying out-of-state deliveries, CA sales tax generally doesn\'t apply.', amount: 0 };
    } else if (!isPickup && destIsCA) {
      const tax = Math.round(subtotal * SAMPLE_CA_TAX_RATE);
      taxLine = { label: 'Est. CA sales tax (~9.5%)', value: `$${tax.toLocaleString()}`, note: 'Sample estimate · Dealer review required', amount: tax };
    } else {
      // Pickup but not CA dest — e.g. NV buyer picking up in CA with out-of-state registration
      taxLine = { label: 'CA sales tax', value: 'Dealer review required', note: 'The car is picked up in California, but you\'re registering out of state. The dealer needs to verify whether CA sales tax applies to this transaction or whether your registration state\'s tax takes priority.', amount: null };
    }

    // Out-of-state tax note for registration state
    let outOfStateTaxLine: EstLine | null = null;
    if (!regIsCA && regZip.length === 5) {
      if (regIsNV) {
        const nvTax = Math.round(subtotal * SAMPLE_NV_TAX_RATE);
        outOfStateTaxLine = { label: 'Est. NV use tax (~8.25%)', value: `~$${nvTax.toLocaleString()}`, note: 'Sample estimate · You may owe this to Nevada when you register', amount: nvTax };
      } else {
        outOfStateTaxLine = { label: 'Registration-state tax', value: 'Varies by state', note: 'You may owe sales/use tax in the state where you register', amount: null };
      }
    }

    // Title & registration
    let regLine: EstLine;
    if (regIsCA) {
      regLine = { label: 'Est. CA title & registration', value: `~$${SAMPLE_CA_REG}`, note: 'Sample estimate · Dealer review required', amount: SAMPLE_CA_REG };
    } else if (regIsNV) {
      regLine = { label: 'Est. NV title & registration', value: `~$${SAMPLE_NV_REG}`, note: 'Sample estimate · Paid to Nevada DMV', amount: SAMPLE_NV_REG };
    } else if (regZip.length === 5) {
      regLine = { label: 'Title & registration', value: 'Dealer review required', note: 'Fees vary by state', amount: null };
    } else {
      regLine = { label: 'Title & registration', value: 'Enter ZIP above', amount: null };
    }

    // Shipping
    let shipLine: EstLine | null = null;
    if (!isPickup && destZip.length === 5) {
      const destN = parseInt(destZip.slice(0, 3), 10);
      let shipEst = '';
      if (destIsCA) { shipEst = '$350–$600'; }
      else if (destN >= 850 && destN <= 870) { shipEst = '$500–$800'; }
      else if (destN >= 889 && destN <= 898) { shipEst = '$500–$800'; }
      else if (destN >= 970 && destN <= 979) { shipEst = '$600–$900'; }
      else if (destN >= 750 && destN <= 799) { shipEst = '$800–$1,200'; }
      else if (destN >= 100 && destN <= 149) { shipEst = '$1,200–$1,800'; }
      else { shipEst = '$800–$1,500'; }
      shipLine = { label: 'Est. shipping', value: shipEst, note: 'From Los Angeles, CA · Quoted separately', amount: null };
    } else if (!isPickup) {
      shipLine = { label: 'Shipping', value: 'Enter destination ZIP', amount: null };
    }

    // Compute estimated total
    const allLines = [taxLine, outOfStateTaxLine, regLine, shipLine].filter((l): l is EstLine => l !== null);
    const knownTotal = subtotal + allLines.reduce((sum, l) => sum + (l.amount ?? 0), 0);
    const pendingLabels = allLines.filter(l => l.amount === null && l.value !== 'Enter ZIP above' && l.value !== 'Enter destination ZIP').map(l => l.label);
    const allKnown = pendingLabels.length === 0;

    return { taxLine, outOfStateTaxLine, regLine, shipLine, buyerZip, destZip, regZip, isPickup, destIsCA, regIsCA, knownTotal, pendingLabels, allKnown };
  };

  const canShowEstimate = () => {
    if (!customMode) return true;
    if (!isValidZip(estZip)) return false;
    if (estDelivery === 'ship' && !isValidZip(estDestZip)) return false;
    if (estRegZipDifferent && !isValidZip(estRegZip)) return false;
    return true;
  };

  // --- Proxy bidding helpers ---

  const getBidIncrement = (amount: number) => {
    if (amount < 5000) return 100;
    if (amount < 25000) return 250;
    return 500;
  };

  const roundDownToIncrement = (amount: number) => {
    if (amount <= 0) return 0;
    const inc = getBidIncrement(amount);
    return Math.floor(amount / inc) * inc;
  };

  const handleProxyMaxBidChange = (raw: string) => {
    const digits = raw.replace(/[^0-9]/g, '');
    const num = parseInt(digits, 10) || 0;
    setProxyMaxBid(num);
    setProxyMaxBidInput(num > 0 ? num.toLocaleString() : '');
  };

  const handleProxyBudgetChange = (raw: string) => {
    const digits = raw.replace(/[^0-9]/g, '');
    const num = parseInt(digits, 10) || 0;
    setProxyBudget(num);
    setProxyBudgetInput(num > 0 ? num.toLocaleString() : '');
  };

  // Compute all-in cost for a hypothetical vehicle bid using the current scenario
  const computeAllInCost = (bid: number) => {
    const prem = Math.round(bid * 0.03);
    const sub = bid + REPAIRS_TOTAL + prem;

    let isPickup: boolean, destIsCA: boolean, regIsCA: boolean, regIsNV: boolean;
    let destZipVal: string, regZipVal: string;

    if (customMode) {
      isPickup = estDelivery === 'pickup';
      destZipVal = isPickup ? estZip.trim() : estDestZip.trim();
      regZipVal = estRegZipDifferent ? estRegZip.trim() : destZipVal;
      destIsCA = isCaliforniaZip(destZipVal);
      regIsCA = isCaliforniaZip(regZipVal);
      regIsNV = isNevadaZip(regZipVal);
    } else {
      const s = DEMO_SCENARIOS.find(d => d.key === activeScenario)!;
      isPickup = s.delivery === 'pickup';
      destZipVal = s.destZip;
      regZipVal = s.regZip;
      destIsCA = isCaliforniaZip(s.destZip);
      regIsCA = isCaliforniaZip(s.regZip);
      regIsNV = isNevadaZip(s.regZip);
    }

    let knownCost = sub;
    const pendingLabels: string[] = [];
    const breakdown: { label: string; value: string; amount: number | null; note?: string }[] = [
      { label: 'Vehicle bid', value: `$${bid.toLocaleString()}`, amount: bid },
      { label: 'Required repairs', value: `$${REPAIRS_TOTAL.toLocaleString()}`, amount: REPAIRS_TOTAL },
      { label: 'Buyer premium (3%)', value: `$${prem.toLocaleString()}`, amount: prem },
    ];

    // CA sales tax
    if (isPickup && destIsCA) {
      const tax = Math.round(sub * SAMPLE_CA_TAX_RATE);
      knownCost += tax;
      breakdown.push({ label: 'Est. CA sales tax (~9.5%)', value: `~$${tax.toLocaleString()}`, amount: tax, note: 'Sample estimate' });
    } else if (!isPickup && !destIsCA) {
      breakdown.push({ label: 'CA sales tax', value: 'Likely $0', amount: 0 });
    } else if (!isPickup && destIsCA) {
      const tax = Math.round(sub * SAMPLE_CA_TAX_RATE);
      knownCost += tax;
      breakdown.push({ label: 'Est. CA sales tax (~9.5%)', value: `~$${tax.toLocaleString()}`, amount: tax, note: 'Sample estimate' });
    } else {
      pendingLabels.push('CA sales tax');
      breakdown.push({ label: 'CA sales tax', value: 'Dealer review required', amount: null });
    }

    // Out-of-state use tax (payable separately in buyer's state)
    if (!regIsCA && regZipVal.length === 5) {
      if (regIsNV) {
        const nvTax = Math.round(sub * SAMPLE_NV_TAX_RATE);
        knownCost += nvTax;
        breakdown.push({ label: 'Est. NV use tax (~8.25%)', value: `~$${nvTax.toLocaleString()}`, amount: nvTax, note: 'Payable to NV · Sample estimate' });
      } else {
        pendingLabels.push('Registration-state tax');
        breakdown.push({ label: 'Registration-state tax', value: 'Varies by state', amount: null });
      }
    }

    // Title & registration
    if (regIsCA) {
      knownCost += SAMPLE_CA_REG;
      breakdown.push({ label: 'Est. CA title & reg', value: `~$${SAMPLE_CA_REG}`, amount: SAMPLE_CA_REG, note: 'Sample estimate' });
    } else if (regIsNV) {
      knownCost += SAMPLE_NV_REG;
      breakdown.push({ label: 'Est. NV title & reg', value: `~$${SAMPLE_NV_REG}`, amount: SAMPLE_NV_REG, note: 'Payable to NV DMV' });
    } else if (regZipVal.length === 5) {
      pendingLabels.push('Title & registration');
      breakdown.push({ label: 'Title & registration', value: 'Varies by state', amount: null });
    }

    // Shipping (uses high end of range for budget safety)
    if (!isPickup && destZipVal.length === 5) {
      const destN = parseInt(destZipVal.slice(0, 3), 10);
      let shipHigh = 1500, shipRange = '$800–$1,500';
      if (destIsCA) { shipHigh = 600; shipRange = '$350–$600'; }
      else if (destN >= 889 && destN <= 898) { shipHigh = 800; shipRange = '$500–$800'; }
      else if (destN >= 850 && destN <= 870) { shipHigh = 800; shipRange = '$500–$800'; }
      else if (destN >= 970 && destN <= 979) { shipHigh = 900; shipRange = '$600–$900'; }
      else if (destN >= 750 && destN <= 799) { shipHigh = 1200; shipRange = '$800–$1,200'; }
      else if (destN >= 100 && destN <= 149) { shipHigh = 1800; shipRange = '$1,200–$1,800'; }
      knownCost += shipHigh;
      breakdown.push({ label: 'Est. shipping (high end)', value: `~$${shipHigh.toLocaleString()}`, amount: shipHigh, note: `Range: ${shipRange}` });
    }

    return { knownCost, pendingLabels, breakdown, allKnown: pendingLabels.length === 0 };
  };

  // Binary search: find the highest vehicle bid where all-in cost ≤ budget
  const computeMaxBidFromBudget = (budget: number) => {
    let lo = 0, hi = budget;
    for (let i = 0; i < 50; i++) {
      const mid = Math.floor((lo + hi) / 2);
      if (computeAllInCost(mid).knownCost <= budget) lo = mid; else hi = mid;
    }
    return lo;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      const res = await fetch(FORMSPREE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...form, source: 'curb-example-auction-waitlist', submittedAt: new Date().toISOString() }),
      });
      if (res.ok) { setSubmitted(true); setForm({ email: '', firstName: '', lastName: '', location: '', vehicleType: '', priceRange: '' }); }
      else setError('Something went wrong. Please try again.');
    } catch { setError('Network error. Please check your connection.'); }
    finally { setSubmitting(false); }
  };


  // --- Redesigned card state ---
  const [expandEstimate, setExpandEstimate] = useState(false);
  const [expandWhatHappens, setExpandWhatHappens] = useState(false);
  const [bidFlowOpen, setBidFlowOpen] = useState(false);
  const [bidFlowStep, setBidFlowStep] = useState<'choose' | 'bid-once' | 'proxy-choose' | 'proxy-input' | 'confirm' | 'result'>('choose');
  const [onceBidAmount, setOnceBidAmount] = useState(18750);
  const [onceBidInput, setOnceBidInput] = useState('18,750');
  const [demoResult, setDemoResult] = useState<'won' | 'outbid' | null>(null);
  const [demoWinBid, setDemoWinBid] = useState(0);
  const [showResultBreakdown, setShowResultBreakdown] = useState(false);

  const handleOnceBidChange = (raw: string) => {
    const digits = raw.replace(/[^0-9]/g, '');
    const num = parseInt(digits, 10) || 0;
    setOnceBidAmount(num);
    setOnceBidInput(num > 0 ? num.toLocaleString() : '');
  };

  const startBidFlow = () => {
    setBidFlowOpen(true);
    setBidFlowStep('choose');
    setDemoResult(null);
    setShowResultBreakdown(false);
    const neb = bidAmount + getBidIncrement(bidAmount);
    setOnceBidAmount(neb);
    setOnceBidInput(neb.toLocaleString());
  };

  const nextEligibleBid = bidAmount + getBidIncrement(bidAmount);

  const handlePlaceDemoBid = (type: 'once' | 'proxy') => {
    if (type === 'once') {
      setDemoWinBid(onceBidAmount);
      setDemoResult('won');
    } else {
      const effectiveMaxRaw = proxyMode === 'max-bid' ? proxyMaxBid : computeMaxBidFromBudget(proxyBudget);
      const effectiveMax = roundDownToIncrement(effectiveMaxRaw);
      if (effectiveMax < nextEligibleBid) {
        setDemoResult('outbid');
        setDemoWinBid(0);
      } else {
        const inc = getBidIncrement(effectiveMax);
        setDemoWinBid(effectiveMax - inc);
        setDemoResult('won');
      }
    }
    setBidFlowStep('result');
  };

  const resetBidFlow = () => {
    setBidFlowOpen(false);
    setBidFlowStep('choose');
    setDemoResult(null);
  };

  // Chevron SVG reused in expandable rows
  const ChevronDown = ({ open }: { open: boolean }) => (
    <svg className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <LandingNav />

      <div className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">

          {/* Back + badge */}
          <div className="flex items-center justify-between mb-6">
            <Link href="/" className="inline-flex items-center text-gray-600 hover:text-curb-orange transition text-sm font-medium">
              <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              Back to Home
            </Link>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              Example Auction
            </span>
          </div>

          {/* Example banner */}
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-xl flex items-start gap-3">
            <span className="text-xl mt-0.5">🏷️</span>
            <div>
              <p className="text-sm font-semibold text-blue-900">This is an example listing.</p>
              <p className="text-sm text-blue-700 mt-0.5">It shows exactly what a real Curb auction looks like — from the inspection report to what you pay. Curb is launching in Southern California soon.</p>
            </div>
          </div>

          {/* ===== MAIN GRID ===== */}
          <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6 lg:gap-8">

            {/* --- PHOTOS --- */}
            <div className="lg:col-start-1">
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
                <div className="relative h-64 sm:h-80 md:h-96 bg-gray-200">
                  <Image src={PHOTOS[selectedPhoto]} alt="2019 BMW 330i" fill className="object-cover" priority />
                  <div className="absolute top-4 right-4 px-3 py-1 bg-black/60 backdrop-blur-sm text-white text-xs font-semibold rounded-full">
                    2d 14h left
                  </div>
                </div>
                {PHOTOS.length > 1 && (
                  <div className="flex gap-2 p-3">
                    {PHOTOS.map((photo, i) => (
                      <button key={i} onClick={() => setSelectedPhoto(i)}
                        className={`relative h-16 w-24 rounded-lg overflow-hidden border-2 transition flex-shrink-0 ${i === selectedPhoto ? 'border-curb-orange' : 'border-transparent opacity-60 hover:opacity-100'}`}>
                        <Image src={photo} alt={`View ${i + 1}`} fill className="object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* --- RIGHT-HAND CARD (sticky on desktop, below photos on mobile) --- */}
            <div className="lg:col-start-2 lg:row-start-1 lg:row-span-6">
              <div className="lg:sticky lg:top-24 space-y-0">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                  {!bidFlowOpen ? (
                    <div className="p-6">
                      {/* Vehicle title + status */}
                      <h1 className="text-xl font-bold text-curb-navy leading-tight">2019 BMW 330i</h1>
                      <p className="text-sm text-gray-500 mt-1">68,000 mi · Clean title · Los Angeles, CA</p>
                      <div className="flex items-center gap-2 mt-3 mb-5">
                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-bold">Example Auction</span>
                        <span className="text-xs text-gray-400">·</span>
                        <span className="text-xs text-curb-orange font-semibold flex items-center gap-1">
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" strokeWidth="2"/><path strokeLinecap="round" strokeWidth="2" d="M12 6v6l4 2"/></svg>
                          2d 14h left
                        </span>
                      </div>

                      {/* Price breakdown */}
                      <div className="space-y-2.5 pb-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Current bid</span>
                          <span className="font-semibold text-curb-navy">${bidAmount.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <button onClick={() => { const el = document.getElementById('repairs'); if (el) el.scrollIntoView({ behavior: 'smooth' }); }}
                            className="text-gray-600 underline decoration-dotted underline-offset-2 hover:text-curb-orange transition text-left">
                            + Required repairs
                          </button>
                          <span className="font-semibold text-curb-navy">${REPAIRS_TOTAL.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">+ Buyer fee (3%)</span>
                          <span className="font-semibold text-curb-navy">${premium.toLocaleString()}</span>
                        </div>
                      </div>

                      {/* Subtotal */}
                      <div className="border-t border-gray-200 pt-3 pb-1">
                        <div className="flex justify-between items-baseline">
                          <span className="font-bold text-curb-navy text-sm">Subtotal at current bid</span>
                          <span className="text-2xl font-bold text-curb-navy">${subtotal.toLocaleString()}</span>
                        </div>
                        <p className="text-xs text-gray-400 mt-1.5">Before tax, registration, and shipping</p>
                      </div>

                      {/* Primary CTA */}
                      <button onClick={startBidFlow} className="w-full mt-4 py-3.5 bg-curb-orange text-white rounded-xl font-bold text-lg hover:bg-orange-600 transition shadow-lg shadow-orange-500/25">
                        Try a Bid
                      </button>

                      {/* --- Expandable: Estimate --- */}
                      <div className="mt-4 border-t border-gray-100">
                        <button onClick={() => setExpandEstimate(!expandEstimate)} className="w-full flex items-center justify-between py-3.5 text-left group">
                          <div className="min-w-0">
                            <span className="text-sm font-semibold text-curb-navy group-hover:text-curb-orange transition">Estimate tax, registration &amp; shipping</span>
                            {!expandEstimate && canShowEstimate() && (() => {
                              const est = getEstimate();
                              return (
                                <span className="block text-xs text-gray-400 mt-0.5 truncate">
                                  {est.allKnown
                                    ? `~$${est.knownTotal.toLocaleString()} estimated total`
                                    : `~$${est.knownTotal.toLocaleString()} + ${est.pendingLabels.length} pending`}
                                </span>
                              );
                            })()}
                          </div>
                          <ChevronDown open={expandEstimate} />
                        </button>
                        {expandEstimate && (
                          <div className="pb-4 space-y-4">
                            {/* Scenario tabs */}
                            <div>
                              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Try a scenario</label>
                              <div className="flex flex-wrap gap-1.5">
                                {DEMO_SCENARIOS.map((s) => (
                                  <button key={s.key} onClick={() => selectScenario(s.key)}
                                    className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition ${!customMode && activeScenario === s.key ? 'border-purple-500 bg-purple-50 text-purple-700' : 'border-gray-200 text-gray-500 hover:border-gray-300'}`}>
                                    {s.short}
                                  </button>
                                ))}
                                <button onClick={() => setCustomMode(true)}
                                  className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition ${customMode ? 'border-purple-500 bg-purple-50 text-purple-700' : 'border-gray-200 text-gray-500 hover:border-gray-300'}`}>
                                  Custom ZIP
                                </button>
                              </div>
                            </div>

                            {/* Scenario description */}
                            {!customMode && (
                              <div className="p-2.5 bg-purple-50 rounded-lg">
                                <p className="text-xs text-purple-700 font-medium">{DEMO_SCENARIOS.find(s => s.key === activeScenario)!.desc}</p>
                              </div>
                            )}

                            {/* Custom ZIP inputs */}
                            {customMode && (
                              <div className="space-y-3">
                                <div>
                                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Your ZIP</label>
                                  <input type="text" inputMode="numeric" maxLength={5} placeholder="e.g. 90210" value={estZip}
                                    onChange={(e) => setEstZip(e.target.value.replace(/\D/g, '').slice(0, 5))}
                                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-curb-orange text-sm ${estZip.length === 5 && !isValidZip(estZip) ? 'border-red-400' : 'border-gray-300'}`} />
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                  <button onClick={() => setEstDelivery('pickup')}
                                    className={`py-2 rounded-lg text-xs font-semibold border-2 transition ${estDelivery === 'pickup' ? 'border-curb-orange bg-orange-50 text-curb-orange' : 'border-gray-200 text-gray-500'}`}>
                                    🏢 Pickup
                                  </button>
                                  <button onClick={() => { setEstDelivery('ship'); if (!estDestZip && estZip.length === 5) setEstDestZip(estZip); }}
                                    className={`py-2 rounded-lg text-xs font-semibold border-2 transition ${estDelivery === 'ship' ? 'border-curb-orange bg-orange-50 text-curb-orange' : 'border-gray-200 text-gray-500'}`}>
                                    🚚 Ship
                                  </button>
                                </div>
                                {estDelivery === 'ship' && (
                                  <div>
                                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Destination ZIP</label>
                                    <input type="text" inputMode="numeric" maxLength={5} placeholder="Ship to..." value={estDestZip}
                                      onChange={(e) => setEstDestZip(e.target.value.replace(/\D/g, '').slice(0, 5))}
                                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-curb-orange text-sm" />
                                  </div>
                                )}
                                <label className="flex items-center gap-2 cursor-pointer">
                                  <input type="checkbox" checked={estRegZipDifferent} onChange={(e) => setEstRegZipDifferent(e.target.checked)}
                                    className="w-4 h-4 rounded border-gray-300 text-curb-orange focus:ring-curb-orange" />
                                  <span className="text-xs text-gray-600">Different registration ZIP</span>
                                </label>
                                {estRegZipDifferent && (
                                  <input type="text" inputMode="numeric" maxLength={5} placeholder="Registration ZIP" value={estRegZip}
                                    onChange={(e) => setEstRegZip(e.target.value.replace(/\D/g, '').slice(0, 5))}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-curb-orange text-sm" />
                                )}
                              </div>
                            )}

                            {/* Estimate results */}
                            {canShowEstimate() && (() => {
                              const { taxLine, outOfStateTaxLine, regLine, shipLine, knownTotal, pendingLabels, allKnown } = getEstimate();
                              const lines = [taxLine, outOfStateTaxLine, regLine, shipLine].filter((l): l is EstLine => l !== null);
                              return (
                                <div className="bg-gray-50 rounded-xl p-3.5 space-y-2">
                                  <p className="text-xs font-bold text-purple-600 uppercase tracking-wider mb-1">Sample Estimate</p>
                                  <div className="flex justify-between text-xs text-gray-500">
                                    <span>Subtotal</span><span className="font-semibold text-curb-navy">${subtotal.toLocaleString()}</span>
                                  </div>
                                  {lines.map((line, i) => (
                                    <div key={i}>
                                      <div className="flex justify-between text-xs">
                                        <span className="text-gray-500">{line.label}</span>
                                        <span className={`font-semibold ${line.amount === null ? 'text-amber-600' : 'text-curb-navy'}`}>{line.value}</span>
                                      </div>
                                      {line.note && <p className="text-xs text-gray-400 mt-0.5">{line.note}</p>}
                                    </div>
                                  ))}
                                  <div className="border-t border-gray-200 pt-2 mt-1">
                                    <div className="flex justify-between">
                                      <span className="text-xs font-bold text-curb-navy">{allKnown ? 'Estimated total' : 'Estimated so far'}</span>
                                      <span className="text-sm font-bold text-curb-navy">~${knownTotal.toLocaleString()}</span>
                                    </div>
                                    {!allKnown && <p className="text-xs text-amber-600 mt-0.5">Pending: {pendingLabels.join(', ')}</p>}
                                  </div>
                                </div>
                              );
                            })()}
                          </div>
                        )}
                      </div>

                      {/* --- Expandable: What happens if I win? --- */}
                      <div className="border-t border-gray-100">
                        <button onClick={() => setExpandWhatHappens(!expandWhatHappens)} className="w-full flex items-center justify-between py-3.5 text-left group">
                          <div className="min-w-0">
                            <span className="text-sm font-semibold text-curb-navy group-hover:text-curb-orange transition">What happens if I win?</span>
                            {!expandWhatHappens && demoResult === 'won' && (
                              <span className="block text-xs text-green-600 mt-0.5">Won at ${demoWinBid.toLocaleString()} — view breakdown</span>
                            )}
                          </div>
                          <ChevronDown open={expandWhatHappens} />
                        </button>
                        {expandWhatHappens && (
                          <div className="pb-4">
                            {demoResult === 'won' ? (() => {
                              const cost = computeAllInCost(demoWinBid);
                              const duePurchase = cost.breakdown.filter(l => l.amount !== null && !l.note?.includes('Payable to NV') && !l.note?.includes('Paid to NV') && !l.label.includes('shipping'));
                              const paidSeparately = cost.breakdown.filter(l => (l.note?.includes('Payable to NV') || l.note?.includes('Paid to NV') || l.label.includes('shipping')) && l.amount !== null);
                              const pending = cost.breakdown.filter(l => l.amount === null);
                              return (
                                <div className="space-y-3">
                                  <div className="bg-green-50 border border-green-200 rounded-xl p-3 text-center">
                                    <span className="text-2xl">🏆</span>
                                    <p className="text-sm font-bold text-green-800 mt-1">You won at ${demoWinBid.toLocaleString()}!</p>
                                    <p className="text-xs text-green-600">Demo only — not a real bid</p>
                                  </div>

                                  {/* Due at purchase */}
                                  {duePurchase.length > 0 && (
                                    <div>
                                      <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Due at purchase</p>
                                      <div className="bg-gray-50 rounded-lg p-3 space-y-1.5">
                                        {duePurchase.map((l, i) => (
                                          <div key={i} className="flex justify-between text-xs">
                                            <span className="text-gray-600">{l.label}{l.note && <span className="text-gray-400"> · {l.note}</span>}</span>
                                            <span className="font-semibold text-curb-navy">{l.value}</span>
                                          </div>
                                        ))}
                                        <div className="border-t border-gray-200 pt-1.5 flex justify-between text-xs">
                                          <span className="font-bold text-curb-navy">Total due</span>
                                          <span className="font-bold text-curb-navy">${duePurchase.reduce((s, l) => s + (l.amount ?? 0), 0).toLocaleString()}</span>
                                        </div>
                                      </div>
                                    </div>
                                  )}

                                  {/* Deposit & balance — dealer-direct */}
                                  {duePurchase.length > 0 && (
                                    <div>
                                      <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Deposit &amp; balance</p>
                                      <div className="bg-blue-50 rounded-lg p-3 space-y-1.5">
                                        <div className="flex justify-between text-xs">
                                          <span className="text-gray-600">Sample deposit paid to dealer</span>
                                          <span className="font-semibold text-green-700">−$500</span>
                                        </div>
                                        <div className="border-t border-blue-200 pt-1.5 flex justify-between text-xs">
                                          <span className="font-bold text-curb-navy">{estDelivery === 'pickup' ? 'Remaining balance due at pickup' : 'Remaining balance — payment and delivery terms confirmed by the selling dealer'}</span>
                                          <span className="font-bold text-curb-navy">${(duePurchase.reduce((s, l) => s + (l.amount ?? 0), 0) - 500).toLocaleString()}</span>
                                        </div>
                                        <p className="text-xs text-gray-400 mt-1">The selling dealer will confirm the deposit amount, due date, and refund terms before you bid.</p>
                                      </div>
                                    </div>
                                  )}

                                  {/* Paid separately */}
                                  {paidSeparately.length > 0 && (
                                    <div>
                                      <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Paid separately</p>
                                      <div className="bg-amber-50 rounded-lg p-3 space-y-1.5">
                                        {paidSeparately.map((l, i) => (
                                          <div key={i} className="flex justify-between text-xs">
                                            <span className="text-gray-600">{l.label}{l.note && <span className="text-gray-400"> · {l.note}</span>}</span>
                                            <span className="font-semibold text-amber-700">{l.value}</span>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  )}

                                  {/* Pending confirmation */}
                                  {pending.length > 0 && (
                                    <div>
                                      <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Pending confirmation</p>
                                      <div className="bg-gray-50 rounded-lg p-3 space-y-1.5">
                                        {pending.map((l, i) => (
                                          <div key={i} className="flex justify-between text-xs">
                                            <span className="text-gray-600">{l.label}</span>
                                            <span className="font-semibold text-amber-600">{l.value}</span>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  )}

                                  <button onClick={() => setShowWaitlist(true)}
                                    className="w-full py-3 bg-curb-orange text-white rounded-xl font-bold text-sm hover:bg-orange-600 transition shadow-lg shadow-orange-500/25">
                                    Join the SoCal Waitlist
                                  </button>
                                  <button onClick={startBidFlow}
                                    className="w-full py-2.5 border-2 border-gray-200 text-gray-600 rounded-xl font-semibold text-sm hover:border-gray-300 transition">
                                    Try another bid
                                  </button>
                                </div>
                              );
                            })() : (
                              <div className="space-y-3">
                                {[
                                  { step: '1', title: 'You win the auction', desc: 'Your bid (or proxy bid) is the highest when the timer ends.' },
                                  { step: '2', title: 'Dealer confirms the sale', desc: 'The selling dealer reviews the winning bid and confirms.' },
                                  { step: '3', title: 'Pay a deposit to the dealer', desc: 'The deposit is credited toward the purchase price. The dealer confirms the amount, due date, and refund terms before you bid.' },
                                  { step: '4', title: 'Review the completed repairs', desc: 'The dealer shares the completed repair order. You review photos and approve the work.' },
                                  { step: '5', title: 'Inspect and pay the balance', desc: 'Inspect the car at pickup and pay the remaining balance directly to the dealer.' },
                                ].map((s) => (
                                  <div key={s.step} className="flex gap-3">
                                    <div className="w-6 h-6 bg-curb-orange/10 text-curb-orange rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">{s.step}</div>
                                    <div>
                                      <p className="text-sm font-semibold text-curb-navy">{s.title}</p>
                                      <p className="text-xs text-gray-500 mt-0.5">{s.desc}</p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Trust badges */}
                      <div className="border-t border-gray-100 pt-4 space-y-2">
                        {[
                          { icon: '🔍', text: 'Dealer-inspected condition report' },
                          { icon: '🔧', text: 'All repairs completed before delivery' },
                          { icon: '💳', text: 'Pay the selling dealer directly' },
                          { icon: '✅', text: 'Review completed repairs before paying the balance' },
                        ].map((b) => (
                          <div key={b.text} className="flex items-center gap-2 text-xs text-gray-500">
                            <span>{b.icon}</span><span>{b.text}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    /* ===== TRY A BID FLOW ===== */
                    <div className="p-6">
                      {/* Back button */}
                      {bidFlowStep !== 'result' && (
                        <button onClick={() => {
                          if (bidFlowStep === 'choose') resetBidFlow();
                          else if (bidFlowStep === 'bid-once') setBidFlowStep('choose');
                          else if (bidFlowStep === 'proxy-choose') setBidFlowStep('choose');
                          else if (bidFlowStep === 'proxy-input') setBidFlowStep('proxy-choose');
                          else if (bidFlowStep === 'confirm') setBidFlowStep(proxyMode ? 'proxy-input' : 'bid-once');
                        }} className="flex items-center gap-1 text-sm text-gray-500 hover:text-curb-orange transition mb-4">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                          Back
                        </button>
                      )}

                      {/* Step: choose */}
                      {bidFlowStep === 'choose' && (
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h2 className="text-lg font-bold text-curb-navy">Try a Bid</h2>
                            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-bold">Demo</span>
                          </div>
                          <p className="text-sm text-gray-500 mb-5">How would you like to bid?</p>
                          <div className="space-y-3">
                            <button onClick={() => setBidFlowStep('bid-once')}
                              className="w-full text-left p-4 border-2 border-gray-200 rounded-xl hover:border-curb-orange hover:bg-orange-50 transition group">
                              <p className="font-bold text-curb-navy group-hover:text-curb-orange transition">Bid once</p>
                              <p className="text-xs text-gray-500 mt-0.5">Place a single bid at a specific amount.</p>
                            </button>
                            <button onClick={() => setBidFlowStep('proxy-choose')}
                              className="w-full text-left p-4 border-2 border-gray-200 rounded-xl hover:border-curb-orange hover:bg-orange-50 transition group">
                              <p className="font-bold text-curb-navy group-hover:text-curb-orange transition">Bid for me</p>
                              <p className="text-xs text-gray-500 mt-0.5">We&apos;ll bid only as much as needed, up to your private limit.</p>
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Step: bid-once */}
                      {bidFlowStep === 'bid-once' && (() => {
                        const inc = getBidIncrement(bidAmount);
                        const minBid = bidAmount + inc;
                        const meetsMinimum = onceBidAmount >= minBid;
                        const alignedToIncrement = meetsMinimum && ((onceBidAmount - bidAmount) % inc === 0);
                        const validBid = meetsMinimum && alignedToIncrement;
                        const cost = validBid ? computeAllInCost(onceBidAmount) : null;
                        // Nearest valid bid at or below what they typed
                        const nearestBelow = bidAmount + Math.floor((onceBidAmount - bidAmount) / inc) * inc;
                        const nearestAbove = nearestBelow + inc;
                        return (
                          <div>
                            <h2 className="text-lg font-bold text-curb-navy mb-1">Place a Bid</h2>
                            <p className="text-xs text-gray-400 mb-4">Next eligible bid: ${minBid.toLocaleString()} (${inc.toLocaleString()} increment)</p>
                            <label className="text-xs text-gray-500 mb-1 block font-semibold">Your bid</label>
                            <div className="relative mb-2">
                              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-lg font-bold text-curb-orange">$</span>
                              <input type="text" inputMode="numeric" value={onceBidInput}
                                onChange={(e) => handleOnceBidChange(e.target.value)}
                                onBlur={() => setOnceBidInput(onceBidAmount > 0 ? onceBidAmount.toLocaleString() : '')}
                                className={`w-full pl-8 pr-4 py-3 text-lg font-bold text-curb-navy border-2 rounded-xl focus:outline-none focus:ring-2 transition ${meetsMinimum && !alignedToIncrement ? 'border-red-400 focus:border-red-400 focus:ring-red-500/20' : 'border-gray-200 focus:border-curb-orange focus:ring-orange-500/20'}`} />
                            </div>
                            {meetsMinimum && !alignedToIncrement && (
                              <p className="text-xs text-red-600 mb-3">
                                Enter ${nearestBelow.toLocaleString()} or ${nearestAbove.toLocaleString()} — bids increase in ${inc.toLocaleString()} steps from ${bidAmount.toLocaleString()}.
                              </p>
                            )}
                            {!meetsMinimum && onceBidAmount > 0 && (
                              <p className="text-xs text-red-600 mb-3">
                                Minimum bid is ${minBid.toLocaleString()}.
                              </p>
                            )}
                            {!meetsMinimum && onceBidAmount === 0 && <div className="mb-2" />}
                            {validBid && cost && (
                              <div className="bg-gray-50 rounded-xl p-3.5 space-y-1.5 mb-4">
                                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">At ${onceBidAmount.toLocaleString()}</p>
                                {cost.breakdown.map((l, i) => (
                                  <div key={i} className="flex justify-between text-xs">
                                    <span className="text-gray-500">{l.label}</span>
                                    <span className={`font-semibold ${l.amount === null ? 'text-amber-600' : 'text-curb-navy'}`}>{l.value}</span>
                                  </div>
                                ))}
                                <div className="border-t border-gray-200 pt-1.5 flex justify-between text-xs">
                                  <span className="font-bold text-curb-navy">{cost.allKnown ? 'Est. total' : 'Est. known costs'}</span>
                                  <span className="font-bold text-curb-navy">~${cost.knownCost.toLocaleString()}</span>
                                </div>
                                {!cost.allKnown && <p className="text-xs text-amber-600">Pending: {cost.pendingLabels.join(', ')}</p>}
                              </div>
                            )}
                            <button onClick={() => handlePlaceDemoBid('once')}
                              disabled={!validBid}
                              className="w-full py-3 bg-curb-orange text-white rounded-xl font-bold text-sm hover:bg-orange-600 transition shadow-lg shadow-orange-500/25 disabled:opacity-40 disabled:shadow-none">
                              Place demo bid
                            </button>
                          </div>
                        );
                      })()}

                      {/* Step: proxy-choose */}
                      {bidFlowStep === 'proxy-choose' && (
                        <div>
                          <h2 className="text-lg font-bold text-curb-navy mb-1">Bid for Me</h2>
                          <p className="text-sm text-gray-500 mb-5">We&apos;ll bid only as much as needed, up to your private limit. No one sees your max.</p>
                          <div className="space-y-3">
                            <button onClick={() => { setProxyMode('max-budget'); setBidFlowStep('proxy-input'); }}
                              className="w-full text-left p-4 border-2 border-gray-200 rounded-xl hover:border-curb-orange hover:bg-orange-50 transition group">
                              <p className="font-bold text-curb-navy group-hover:text-curb-orange transition">Set a total budget</p>
                              <p className="text-xs text-gray-500 mt-0.5">We&apos;ll work backward to find the highest bid that fits.</p>
                            </button>
                            <button onClick={() => { setProxyMode('max-bid'); setBidFlowStep('proxy-input'); }}
                              className="w-full text-left p-4 border-2 border-gray-200 rounded-xl hover:border-curb-orange hover:bg-orange-50 transition group">
                              <p className="font-bold text-curb-navy group-hover:text-curb-orange transition">Set a vehicle bid limit</p>
                              <p className="text-xs text-gray-500 mt-0.5">Set the maximum you&apos;ll bid on the vehicle itself.</p>
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Step: proxy-input */}
                      {bidFlowStep === 'proxy-input' && (() => {
                        const effectiveMaxRaw = proxyMode === 'max-bid' ? proxyMaxBid : computeMaxBidFromBudget(proxyBudget);
                        const effectiveMax = roundDownToIncrement(effectiveMaxRaw);
                        const belowMinimum = effectiveMax < nextEligibleBid;
                        const allIn = computeAllInCost(effectiveMax);
                        const nextBidCost = belowMinimum ? computeAllInCost(nextEligibleBid) : null;
                        return (
                          <div>
                            {proxyMode === 'max-budget' ? (
                              <>
                                <h2 className="text-lg font-bold text-curb-navy mb-1">Total Budget</h2>
                                <p className="text-xs text-gray-400 mb-3">Maximum you want to spend all-in (private)</p>
                                <div className="relative mb-4">
                                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-lg font-bold text-curb-orange">$</span>
                                  <input type="text" inputMode="numeric" value={proxyBudgetInput}
                                    onChange={(e) => handleProxyBudgetChange(e.target.value)}
                                    onBlur={() => setProxyBudgetInput(proxyBudget > 0 ? proxyBudget.toLocaleString() : '')}
                                    className="w-full pl-8 pr-4 py-3 text-lg font-bold text-curb-navy border-2 border-gray-200 rounded-xl focus:outline-none focus:border-curb-orange focus:ring-2 focus:ring-orange-500/20 transition" />
                                </div>
                                {effectiveMax > 0 && (
                                  <div className="bg-gray-50 rounded-xl p-3.5 space-y-1.5 mb-4">
                                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Budget breakdown</p>
                                    {allIn.breakdown.map((l, i) => (
                                      <div key={i} className="flex justify-between text-xs">
                                        <span className="text-gray-500">{l.label}{l.note && <span className="text-gray-400"> · {l.note}</span>}</span>
                                        <span className={`font-semibold ${l.amount === null ? 'text-amber-600' : 'text-curb-navy'}`}>{l.value}</span>
                                      </div>
                                    ))}
                                    <div className="border-t border-gray-200 pt-1.5 flex justify-between text-xs">
                                      <span className="font-bold text-curb-navy">{allIn.allKnown ? 'Est. all-in at max bid' : 'Est. known costs'}</span>
                                      <span className="font-bold text-curb-navy">~${allIn.knownCost.toLocaleString()}</span>
                                    </div>
                                    {!allIn.allKnown && <p className="text-xs text-amber-600">Pending: {allIn.pendingLabels.join(', ')}</p>}
                                    <div className="bg-white rounded-lg p-2.5 mt-2">
                                      <div className="flex justify-between text-xs">
                                        <span className="font-bold text-indigo-700">{allIn.allKnown ? 'Max vehicle bid' : 'Estimated max vehicle bid'}</span>
                                        <span className="font-bold text-indigo-700">${effectiveMax.toLocaleString()}</span>
                                      </div>
                                      {!allIn.allKnown && <p className="text-xs text-amber-500 mt-0.5">Some costs are estimates</p>}
                                    </div>
                                  </div>
                                )}
                              </>
                            ) : (
                              <>
                                <h2 className="text-lg font-bold text-curb-navy mb-1">Vehicle Bid Limit</h2>
                                <p className="text-xs text-gray-400 mb-3">Maximum vehicle bid (private)</p>
                                <div className="relative mb-4">
                                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-lg font-bold text-curb-orange">$</span>
                                  <input type="text" inputMode="numeric" value={proxyMaxBidInput}
                                    onChange={(e) => handleProxyMaxBidChange(e.target.value)}
                                    onBlur={() => setProxyMaxBidInput(proxyMaxBid > 0 ? proxyMaxBid.toLocaleString() : '')}
                                    className="w-full pl-8 pr-4 py-3 text-lg font-bold text-curb-navy border-2 border-gray-200 rounded-xl focus:outline-none focus:border-curb-orange focus:ring-2 focus:ring-orange-500/20 transition" />
                                </div>
                                <p className="text-xs text-gray-400 mb-4">Bid increment: ${getBidIncrement(proxyMaxBid).toLocaleString()}</p>
                                {effectiveMax > 0 && (
                                  <div className="bg-gray-50 rounded-xl p-3.5 space-y-1.5 mb-4">
                                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">At max bid of ${effectiveMax.toLocaleString()}</p>
                                    {allIn.breakdown.map((l, i) => (
                                      <div key={i} className="flex justify-between text-xs">
                                        <span className="text-gray-500">{l.label}</span>
                                        <span className={`font-semibold ${l.amount === null ? 'text-amber-600' : 'text-curb-navy'}`}>{l.value}</span>
                                      </div>
                                    ))}
                                    <div className="border-t border-gray-200 pt-1.5 flex justify-between text-xs">
                                      <span className="font-bold text-curb-navy">{allIn.allKnown ? 'Est. all-in total' : 'Est. known costs'}</span>
                                      <span className="font-bold text-curb-navy">~${allIn.knownCost.toLocaleString()}</span>
                                    </div>
                                    {!allIn.allKnown && <p className="text-xs text-amber-600">Pending: {allIn.pendingLabels.join(', ')}</p>}
                                  </div>
                                )}
                              </>
                            )}

                            {/* Below-minimum warning */}
                            {belowMinimum && (
                              <div className="bg-red-50 border border-red-200 rounded-xl p-3 mb-4">
                                <p className="text-xs font-bold text-red-800">Budget too low</p>
                                <p className="text-xs text-red-600 mt-0.5">
                                  Max vehicle bid of ${effectiveMax.toLocaleString()} is below the next eligible bid of ${nextEligibleBid.toLocaleString()}.
                                </p>
                                {nextBidCost && (
                                  <p className="text-xs text-red-600 mt-1">
                                    The next eligible bid would cost ~${nextBidCost.knownCost.toLocaleString()} all-in.
                                  </p>
                                )}
                              </div>
                            )}

                            <button onClick={() => handlePlaceDemoBid('proxy')}
                              disabled={belowMinimum || effectiveMax <= 0}
                              className="w-full py-3 bg-curb-orange text-white rounded-xl font-bold text-sm hover:bg-orange-600 transition shadow-lg shadow-orange-500/25 disabled:opacity-40 disabled:shadow-none">
                              Set proxy bid
                            </button>
                          </div>
                        );
                      })()}

                      {/* Step: result */}
                      {bidFlowStep === 'result' && (
                        <div>
                          {demoResult === 'won' ? (
                            <div className="text-center mb-4">
                              <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                                <span className="text-3xl">🏆</span>
                                <h3 className="text-lg font-bold text-green-800 mt-2">You won at ${demoWinBid.toLocaleString()}!</h3>
                                <p className="text-xs text-green-600 mt-1">Demo only — this is not a real bid</p>
                              </div>
                            </div>
                          ) : (
                            <div className="text-center mb-4">
                              <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                                <span className="text-3xl">😔</span>
                                <h3 className="text-lg font-bold text-red-800 mt-2">Outbid</h3>
                                <p className="text-xs text-red-600 mt-1">Your max was below the next eligible bid of ${nextEligibleBid.toLocaleString()}</p>
                              </div>
                            </div>
                          )}

                          {demoResult === 'won' && !showResultBreakdown && (
                            <button onClick={() => setShowResultBreakdown(true)}
                              className="w-full py-2.5 border-2 border-gray-200 text-gray-600 rounded-xl font-semibold text-sm hover:border-curb-orange hover:text-curb-orange transition mb-4 flex items-center justify-center gap-1.5">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                              View purchase breakdown
                            </button>
                          )}

                          {demoResult === 'won' && showResultBreakdown && (() => {
                            const cost = computeAllInCost(demoWinBid);
                            const duePurchase = cost.breakdown.filter(l => l.amount !== null && !l.note?.includes('Payable to NV') && !l.note?.includes('Paid to NV') && !l.label.toLowerCase().includes('shipping'));
                            const paidSeparately = cost.breakdown.filter(l => (l.note?.includes('Payable to NV') || l.note?.includes('Paid to NV') || l.label.toLowerCase().includes('shipping')) && l.amount !== null);
                            const pending = cost.breakdown.filter(l => l.amount === null);
                            return (
                              <div className="mb-4 space-y-3">
                                <div className="flex items-center justify-between">
                                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Purchase Breakdown</p>
                                  <button onClick={() => setShowResultBreakdown(false)} className="text-xs text-gray-400 hover:text-gray-600 transition">Hide</button>
                                </div>

                                {duePurchase.length > 0 && (
                                  <div>
                                    <p className="text-xs font-semibold text-green-700 mb-1.5">Due at purchase</p>
                                    <div className="bg-green-50 rounded-lg p-3 space-y-1.5">
                                      {duePurchase.map((l, i) => (
                                        <div key={i} className="flex justify-between text-xs">
                                          <span className="text-gray-600">{l.label}{l.note && <span className="text-gray-400"> · {l.note}</span>}</span>
                                          <span className="font-semibold text-curb-navy">{l.value}</span>
                                        </div>
                                      ))}
                                      <div className="border-t border-green-200 pt-1.5 flex justify-between text-xs">
                                        <span className="font-bold text-curb-navy">Subtotal</span>
                                        <span className="font-bold text-curb-navy">${duePurchase.reduce((s, l) => s + (l.amount ?? 0), 0).toLocaleString()}</span>
                                      </div>
                                    </div>
                                  </div>
                                )}

                                {/* Deposit & balance — dealer-direct */}
                                {duePurchase.length > 0 && (
                                  <div>
                                    <p className="text-xs font-semibold text-blue-700 mb-1.5">Deposit &amp; balance</p>
                                    <div className="bg-blue-50 rounded-lg p-3 space-y-1.5">
                                      <div className="flex justify-between text-xs">
                                        <span className="text-gray-600">Sample deposit paid to dealer</span>
                                        <span className="font-semibold text-green-700">−$500</span>
                                      </div>
                                      <div className="border-t border-blue-200 pt-1.5 flex justify-between text-xs">
                                        <span className="font-bold text-curb-navy">{estDelivery === 'pickup' ? 'Remaining balance due at pickup' : 'Remaining balance — payment and delivery terms confirmed by the selling dealer'}</span>
                                        <span className="font-bold text-curb-navy">${(duePurchase.reduce((s, l) => s + (l.amount ?? 0), 0) - 500).toLocaleString()}</span>
                                      </div>
                                      <p className="text-xs text-gray-400 mt-1">The selling dealer will confirm the deposit amount, due date, and refund terms before you bid.</p>
                                    </div>
                                  </div>
                                )}

                                {paidSeparately.length > 0 && (
                                  <div>
                                    <p className="text-xs font-semibold text-amber-700 mb-1.5">Paid separately</p>
                                    <div className="bg-amber-50 rounded-lg p-3 space-y-1.5">
                                      {paidSeparately.map((l, i) => (
                                        <div key={i} className="flex justify-between text-xs">
                                          <span className="text-gray-600">{l.label}{l.note && <span className="text-gray-400"> · {l.note}</span>}</span>
                                          <span className="font-semibold text-amber-700">{l.value}</span>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}

                                {pending.length > 0 && (
                                  <div>
                                    <p className="text-xs font-semibold text-gray-500 mb-1.5">Pending confirmation</p>
                                    <div className="bg-gray-50 rounded-lg p-3 space-y-1.5">
                                      {pending.map((l, i) => (
                                        <div key={i} className="flex justify-between text-xs">
                                          <span className="text-gray-600">{l.label}</span>
                                          <span className="font-semibold text-amber-600">{l.value}</span>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}

                                <p className="text-xs text-gray-400 text-center">Demo only — not a real purchase</p>
                              </div>
                            );
                          })()}

                          <button onClick={() => { setShowWaitlist(true); }}
                            className="w-full py-3 bg-curb-orange text-white rounded-xl font-bold text-sm hover:bg-orange-600 transition shadow-lg shadow-orange-500/25 mb-3">
                            Join the SoCal Waitlist
                          </button>
                          <button onClick={startBidFlow}
                            className="w-full py-2.5 border-2 border-gray-200 text-gray-600 rounded-xl font-semibold text-sm hover:border-gray-300 transition">
                            Try another bid
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* --- VEHICLE SPECS --- */}
            <div className="lg:col-start-1">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-xl font-bold text-curb-navy mb-4">Vehicle Details</h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {[
                    { label: 'Year', value: '2019' }, { label: 'Make', value: 'BMW' },
                    { label: 'Model', value: '330i' }, { label: 'Trim', value: 'Base' },
                    { label: 'Mileage', value: '68,000 mi' }, { label: 'Exterior', value: 'Alpine White' },
                    { label: 'Interior', value: 'Black Leather' }, { label: 'Drivetrain', value: 'RWD' },
                    { label: 'Transmission', value: '8-Speed Auto' }, { label: 'Engine', value: '2.0L Turbo I4' },
                    { label: 'Fuel Type', value: 'Gasoline' }, { label: 'Title', value: 'Clean' },
                  ].map((spec) => (
                    <div key={spec.label}>
                      <p className="text-xs text-gray-500 uppercase tracking-wide">{spec.label}</p>
                      <p className="text-sm font-semibold text-curb-navy mt-0.5">{spec.value}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-5 pt-4 border-t border-gray-100">
                  <p className="text-xs text-gray-500 uppercase tracking-wide">VIN</p>
                  <p className="text-sm font-mono text-curb-navy mt-0.5">WBA5R1C5XKA2XXXXX</p>
                </div>
              </div>
            </div>

            {/* --- CONDITION REPORT --- */}
            <div className="lg:col-start-1">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-blue-600" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>
                  </div>
                  <h2 className="text-xl font-bold text-curb-navy">Condition Report</h2>
                </div>
                <p className="text-sm text-gray-500 mb-4">Completed by the listing dealer before auction start</p>
                <div className="space-y-4">
                  {[
                    { area: 'Exterior', rating: 'Good', notes: 'Minor curb rash on two front wheels (included in required repairs — both wheels will be refinished before delivery). Small door ding on passenger side, barely visible. Paint in good condition overall — no major scratches or dents.' },
                    { area: 'Interior', rating: 'Very Good', notes: 'Black leather seats in great shape, no tears or heavy wear. All electronics functional — iDrive, Bluetooth, CarPlay all work. Headliner clean.' },
                    { area: 'Mechanical', rating: 'Good', notes: 'Engine runs smoothly, no warning lights. Transmission shifts cleanly through all gears. AC blows cold. Front brake pads are worn and need replacement (~30% remaining).' },
                    { area: 'Tires', rating: 'Fair', notes: 'Rear tires have adequate tread (5/32"). Front tires at 3/32" — approaching replacement. Alignment appears straight.' },
                  ].map((item) => (
                    <div key={item.area} className="bg-gray-50 rounded-xl p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-curb-navy">{item.area}</h3>
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                          item.rating === 'Very Good' ? 'bg-green-100 text-green-700' :
                          item.rating === 'Good' ? 'bg-blue-100 text-blue-700' :
                          'bg-yellow-100 text-yellow-700'
                        }`}>{item.rating}</span>
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed">{item.notes}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* --- REQUIRED REPAIRS --- */}
            <div className="lg:col-start-1" id="repairs">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  </div>
                  <h2 className="text-xl font-bold text-curb-navy">Required Repairs</h2>
                </div>
                <p className="text-sm text-gray-500 mb-4">The selling dealer completes these repairs after the auction ends and before you take delivery. You review and approve the work before paying the remaining balance.</p>
                <div className="space-y-3">
                  {[
                    { item: 'Front brake pads + rotors', detail: 'OEM-equivalent parts, full replacement', cost: '$480' },
                    { item: 'Front tire replacement (2)', detail: 'Matching brand/size to rears', cost: '$340' },
                    { item: 'Wheel curb rash repair (2)', detail: 'Refinish both front wheels — cosmetic damage noted in condition report; dealer requires repair for retail-ready delivery', cost: '$200' },
                    { item: 'Oil + filter service', detail: 'Full synthetic, BMW-spec', cost: '$120' },
                    { item: 'Multi-point safety inspection', detail: 'Lights, fluids, belts, battery', cost: '$75' },
                  ].map((repair) => (
                    <div key={repair.item} className="flex items-start justify-between py-3 border-b border-gray-100 last:border-0">
                      <div className="flex items-start gap-3">
                        <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                          <svg className="w-3 h-3 text-green-600" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" viewBox="0 0 24 24" stroke="currentColor"><path d="M5 13l4 4L19 7" /></svg>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-curb-navy">{repair.item}</p>
                          <p className="text-xs text-gray-500 mt-0.5">{repair.detail}</p>
                        </div>
                      </div>
                      <span className="text-sm font-semibold text-curb-navy ml-4 flex-shrink-0">{repair.cost}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t-2 border-gray-200 flex items-center justify-between">
                  <span className="font-bold text-curb-navy">Total required repairs</span>
                  <span className="text-lg font-bold text-curb-navy">$1,215</span>
                </div>
                <p className="text-xs text-gray-400 mt-2">Included in your subtotal. The dealer completes all work before delivery.</p>
              </div>
            </div>

            {/* --- LISTED BY --- */}
            <div className="lg:col-start-1">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-lg font-bold text-curb-navy mb-3">Listed By</h2>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-curb-navy rounded-xl flex items-center justify-center">
                    <span className="text-white font-bold text-lg">PC</span>
                  </div>
                  <div>
                    <p className="font-semibold text-curb-navy">Pacific Coast Motors</p>
                    <p className="text-xs text-gray-500">Verified Curb dealer · Los Angeles, CA</p>
                  </div>
                </div>
              </div>
            </div>

          </div>{/* end grid */}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-curb-navy text-white py-12 px-4 sm:px-6 lg:px-8 border-t border-white/10">
        <div className="max-w-7xl mx-auto text-center">
          <h3 className="text-2xl font-extrabold mb-2">CURB</h3>
          <p className="text-gray-400 mb-4">Wholesale-to-consumer vehicle auction marketplace.</p>
          <div className="flex justify-center gap-6 text-sm text-gray-400">
            <Link href="/" className="hover:text-curb-orange transition">Home</Link>
            <Link href="/about" className="hover:text-curb-orange transition">About</Link>
            <Link href="/browse" className="hover:text-curb-orange transition">Browse</Link>
          </div>
          <p className="text-gray-500 text-sm mt-6">&copy; 2026 Curb. All rights reserved.</p>
        </div>
      </footer>

      {/* Waitlist modal */}
      {showWaitlist && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => { setShowWaitlist(false); setSubmitted(false); setError(''); }}>
          <div className="bg-white rounded-xl max-w-md w-full p-8" onClick={(e) => e.stopPropagation()}>
            {submitted ? (
              <div className="text-center py-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M5 13l4 4L19 7" /></svg>
                </div>
                <h3 className="text-2xl font-bold text-curb-navy mb-2">You&apos;re on the list!</h3>
                <p className="text-gray-600 mb-6">We&apos;ll be in touch soon with early access details for Southern California.</p>
                <button onClick={() => { setShowWaitlist(false); setSubmitted(false); }} className="px-6 py-3 bg-curb-orange text-white rounded-lg hover:bg-orange-600 transition font-medium">Done</button>
              </div>
            ) : (
              <>
                <h3 className="text-2xl font-bold text-curb-navy mb-2">Join the SoCal Waitlist</h3>
                <p className="text-sm text-gray-500 mb-6">Get early access when Curb launches in Southern California.</p>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <input type="text" placeholder="First Name" required value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} className="px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-curb-orange text-sm" disabled={submitting} />
                    <input type="text" placeholder="Last Name" required value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} className="px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-curb-orange text-sm" disabled={submitting} />
                  </div>
                  <input type="email" placeholder="Email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-curb-orange text-sm" disabled={submitting} />
                  <input type="text" placeholder="City, State" required value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-curb-orange text-sm" disabled={submitting} />
                  <select required value={form.vehicleType} onChange={(e) => setForm({ ...form, vehicleType: e.target.value })} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-curb-orange text-sm" disabled={submitting}>
                    <option value="">Preferred Vehicle Type</option>
                    <option value="sedan">Sedan</option>
                    <option value="suv">SUV</option>
                    <option value="truck">Truck</option>
                    <option value="coupe">Coupe</option>
                    <option value="van">Van</option>
                  </select>
                  <select required value={form.priceRange} onChange={(e) => setForm({ ...form, priceRange: e.target.value })} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-curb-orange text-sm" disabled={submitting}>
                    <option value="">Price Range</option>
                    <option value="5-10k">$5,000 – $10,000</option>
                    <option value="10-15k">$10,000 – $15,000</option>
                    <option value="15-25k">$15,000 – $25,000</option>
                    <option value="25k+">$25,000+</option>
                  </select>
                  {error && <p className="text-red-600 text-sm">{error}</p>}
                  <div className="flex gap-4 mt-6">
                    <button type="button" onClick={() => setShowWaitlist(false)} className="flex-1 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition font-medium text-sm" disabled={submitting}>Cancel</button>
                    <button type="submit" disabled={submitting} className="flex-1 px-6 py-3 bg-curb-orange text-white rounded-lg hover:bg-orange-600 transition font-medium disabled:opacity-60 text-sm">
                      {submitting ? 'Submitting...' : 'Join Waitlist'}
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
