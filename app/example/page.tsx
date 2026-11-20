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

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* LEFT COLUMN — photos + details */}
            <div className="lg:col-span-2 space-y-6">

              {/* Photo gallery */}
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
                <div className="relative h-64 sm:h-80 md:h-96 bg-gray-200">
                  <Image
                    src={PHOTOS[selectedPhoto]}
                    alt="2019 BMW 330i"
                    fill
                    className="object-cover"
                    priority
                  />
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

              {/* Vehicle specs */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-xl font-bold text-curb-navy mb-4">Vehicle Details</h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {[
                    { label: 'Year', value: '2019' },
                    { label: 'Make', value: 'BMW' },
                    { label: 'Model', value: '330i' },
                    { label: 'Trim', value: 'Base' },
                    { label: 'Mileage', value: '68,000 mi' },
                    { label: 'Exterior', value: 'Alpine White' },
                    { label: 'Interior', value: 'Black Leather' },
                    { label: 'Drivetrain', value: 'RWD' },
                    { label: 'Transmission', value: '8-Speed Auto' },
                    { label: 'Engine', value: '2.0L Turbo I4' },
                    { label: 'Fuel Type', value: 'Gasoline' },
                    { label: 'Title', value: 'Clean' },
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

              {/* Condition report */}
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

              {/* Repairs */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  </div>
                  <h2 className="text-xl font-bold text-curb-navy">Required Repairs</h2>
                </div>
                <p className="text-sm text-gray-500 mb-4">The selling dealer completes these repairs after the auction ends and before you take delivery. You review and approve the work before escrow releases payment.</p>

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

              {/* Estimate your total */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-purple-600" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                  </div>
                  <h2 className="text-xl font-bold text-curb-navy">Estimate Your Total</h2>
                </div>
                <p className="text-sm text-gray-500 mb-5">Enter your ZIP code and choose pickup or shipping to see estimated costs. The selling dealer will confirm and collect applicable taxes and DMV fees at the time of purchase. Shipping is quoted separately.</p>

                {/* Demo scenario tabs */}
                <div className="mb-5">
                  <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2">Try a scenario</label>
                  <div className="flex flex-wrap gap-2">
                    {DEMO_SCENARIOS.map((s) => (
                      <button
                        key={s.key}
                        onClick={() => selectScenario(s.key)}
                        className={`px-3.5 py-2 rounded-lg text-xs font-semibold border-2 transition ${
                          !customMode && activeScenario === s.key
                            ? 'border-purple-500 bg-purple-50 text-purple-700'
                            : 'border-gray-200 text-gray-600 hover:border-gray-300'
                        }`}
                      >
                        {s.short}
                      </button>
                    ))}
                    <button
                      onClick={() => setCustomMode(true)}
                      className={`px-3.5 py-2 rounded-lg text-xs font-semibold border-2 transition ${
                        customMode
                          ? 'border-purple-500 bg-purple-50 text-purple-700'
                          : 'border-gray-200 text-gray-600 hover:border-gray-300'
                      }`}
                    >
                      Custom ZIP
                    </button>
                  </div>
                </div>

                {/* Scenario description */}
                {!customMode && (
                  <div className="mb-5 p-3 bg-purple-50 rounded-lg">
                    <p className="text-sm text-purple-800 font-medium">{DEMO_SCENARIOS.find(s => s.key === activeScenario)!.label}</p>
                    <p className="text-xs text-purple-600 mt-1">{DEMO_SCENARIOS.find(s => s.key === activeScenario)!.desc}</p>
                  </div>
                )}

                {/* Custom ZIP inputs */}
                {customMode && (
                  <div className="space-y-4 mb-5">
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1.5">Your ZIP Code</label>
                      <input
                        type="text"
                        inputMode="numeric"
                        maxLength={5}
                        placeholder="e.g. 90210"
                        value={estZip}
                        onChange={(e) => setEstZip(e.target.value.replace(/\D/g, '').slice(0, 5))}
                        className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-curb-orange text-sm ${estZip.length === 5 && !isValidZip(estZip) ? 'border-red-400' : 'border-gray-300'}`}
                      />
                      {estZip.length === 5 && !isValidZip(estZip) && (
                        <p className="text-xs text-red-500 mt-1">Please enter a valid US ZIP code</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1.5">How do you want your car?</label>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          onClick={() => setEstDelivery('pickup')}
                          className={`py-3 px-4 rounded-xl text-sm font-semibold border-2 transition ${estDelivery === 'pickup' ? 'border-curb-orange bg-orange-50 text-curb-orange' : 'border-gray-200 text-gray-600 hover:border-gray-300'}`}
                        >
                          <span className="block text-lg mb-0.5">🏢</span>
                          Dealer pickup
                        </button>
                        <button
                          onClick={() => { setEstDelivery('ship'); if (!estDestZip && estZip.length === 5) setEstDestZip(estZip); }}
                          className={`py-3 px-4 rounded-xl text-sm font-semibold border-2 transition ${estDelivery === 'ship' ? 'border-curb-orange bg-orange-50 text-curb-orange' : 'border-gray-200 text-gray-600 hover:border-gray-300'}`}
                        >
                          <span className="block text-lg mb-0.5">🚚</span>
                          Ship to me
                        </button>
                      </div>
                    </div>

                    {estDelivery === 'ship' && (
                      <div>
                        <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1.5">Destination ZIP</label>
                        <input
                          type="text"
                          inputMode="numeric"
                          maxLength={5}
                          placeholder="Where should we ship it?"
                          value={estDestZip}
                          onChange={(e) => setEstDestZip(e.target.value.replace(/\D/g, '').slice(0, 5))}
                          className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-curb-orange text-sm ${estDestZip.length === 5 && !isValidZip(estDestZip) ? 'border-red-400' : 'border-gray-300'}`}
                        />
                        {estDestZip.length === 5 && !isValidZip(estDestZip) && (
                          <p className="text-xs text-red-500 mt-1">Please enter a valid US ZIP code</p>
                        )}
                      </div>
                    )}

                    <div>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={estRegZipDifferent}
                          onChange={(e) => setEstRegZipDifferent(e.target.checked)}
                          className="w-4 h-4 rounded border-gray-300 text-curb-orange focus:ring-curb-orange"
                        />
                        <span className="text-sm text-gray-600">I&apos;ll register this vehicle in a different ZIP</span>
                      </label>
                      {estRegZipDifferent && (
                        <input
                          type="text"
                          inputMode="numeric"
                          maxLength={5}
                          placeholder="Registration ZIP"
                          value={estRegZip}
                          onChange={(e) => setEstRegZip(e.target.value.replace(/\D/g, '').slice(0, 5))}
                          className={`w-full mt-2 px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-curb-orange text-sm ${estRegZip.length === 5 && !isValidZip(estRegZip) ? 'border-red-400' : 'border-gray-300'}`}
                        />
                      )}
                    </div>
                  </div>
                )}

                {/* Estimate results — always shown for demo scenarios, gated for custom */}
                {canShowEstimate() && (() => {
                  const { taxLine, outOfStateTaxLine, regLine, shipLine, isPickup, destIsCA, knownTotal, pendingLabels, allKnown } = getEstimate();
                  return (
                    <div className={customMode ? 'border-t border-gray-200 pt-5' : ''}>
                      <div className="flex items-center gap-1.5 mb-3">
                        <span className="text-xs font-bold text-purple-600 uppercase tracking-wider">Sample Estimate</span>
                        <span className="text-xs text-gray-400">· For illustration only</span>
                      </div>

                      <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                        {/* Bid + repairs + premium breakdown */}
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Your bid</span>
                          <span className="font-semibold text-curb-navy">${bidAmount.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Required repairs</span>
                          <span className="font-semibold text-curb-navy">${REPAIRS_TOTAL.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Buyer premium (3%)</span>
                          <span className="font-semibold text-curb-navy">${premium.toLocaleString()}</span>
                        </div>
                        <div className="border-t border-gray-200 pt-2.5 flex justify-between">
                          <span className="font-bold text-curb-navy">Subtotal</span>
                          <span className="font-bold text-curb-navy">${subtotal.toLocaleString()}</span>
                        </div>

                        {/* Separator */}
                        <div className="border-t border-gray-200 pt-2.5" />

                        {/* Tax */}
                        <div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">{taxLine.label}</span>
                            <span className={`font-semibold ${taxLine.value === 'Dealer review required' ? 'text-amber-600' : 'text-curb-navy'}`}>{taxLine.value}</span>
                          </div>
                          {taxLine.note && <p className="text-xs text-gray-400 mt-0.5">{taxLine.note}</p>}
                        </div>

                        {/* Out-of-state tax */}
                        {outOfStateTaxLine && (
                          <div>
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600">{outOfStateTaxLine.label}</span>
                              <span className="font-semibold text-amber-600">{outOfStateTaxLine.value}</span>
                            </div>
                            {outOfStateTaxLine.note && <p className="text-xs text-gray-400 mt-0.5">{outOfStateTaxLine.note}</p>}
                          </div>
                        )}

                        {/* Title & reg */}
                        <div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">{regLine.label}</span>
                            <span className={`font-semibold ${regLine.value === 'Dealer review required' ? 'text-amber-600' : 'text-curb-navy'}`}>{regLine.value}</span>
                          </div>
                          {regLine.note && <p className="text-xs text-gray-400 mt-0.5">{regLine.note}</p>}
                        </div>

                        {/* Shipping */}
                        {shipLine && (
                          <div>
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600">{shipLine.label}</span>
                              <span className="font-semibold text-curb-navy">{shipLine.value}</span>
                            </div>
                            {shipLine.note && <p className="text-xs text-gray-400 mt-0.5">{shipLine.note}</p>}
                          </div>
                        )}

                        {/* Estimated total */}
                        <div className="border-t-2 border-gray-300 pt-3 mt-1">
                          <div className="flex justify-between items-baseline">
                            <div>
                              <span className="font-bold text-curb-navy">{allKnown ? 'Estimated total' : 'Estimated amount so far'}</span>
                              {!allKnown && (
                                <p className="text-xs text-amber-600 mt-0.5">
                                  Still pending: {pendingLabels.join(', ')}
                                </p>
                              )}
                            </div>
                            <span className="text-lg font-bold text-curb-navy">~${knownTotal.toLocaleString()}</span>
                          </div>
                        </div>

                        {/* Note */}
                        <div className="border-t border-gray-200 pt-3">
                          <p className="text-xs text-gray-500 leading-relaxed">
                            {!isPickup && !destIsCA && (
                              <span className="block mb-2 text-blue-600 font-medium">For qualifying deliveries outside California, California sales tax generally doesn&apos;t apply. You may still owe taxes and registration fees in the state where you register the vehicle.</span>
                            )}
                            <span className="font-semibold text-curb-navy">At checkout:</span> The selling dealer will confirm the taxable amount, applicable fees, and delivery terms before presenting the final purchase total.
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>

              {/* Before You Fund Escrow — pre-escrow confirmation */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-amber-600" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                  </div>
                  <h2 className="text-xl font-bold text-curb-navy">Before You Fund Escrow</h2>
                </div>
                <p className="text-sm text-gray-500 mb-5">After you win the auction, the dealer reviews your purchase and confirms the final numbers before you fund escrow. Here&apos;s what that looks like.</p>

                <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 space-y-4">
                  <div className="flex items-center gap-2 mb-1">
                    <svg className="w-4 h-4 text-amber-600" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M5 13l4 4L19 7" /></svg>
                    <span className="text-sm font-bold text-amber-800">Dealer-Confirmed Purchase Summary</span>
                    <span className="text-xs text-amber-500 ml-auto">Sample</span>
                  </div>

                  <div className="bg-white rounded-lg p-4 space-y-2.5">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Winning bid</span>
                      <span className="font-semibold text-curb-navy">${bidAmount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Required repairs</span>
                      <span className="font-semibold text-curb-navy">${REPAIRS_TOTAL.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Buyer premium (3%)</span>
                      <span className="font-semibold text-curb-navy">${premium.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">CA sales tax (confirmed 9.5%)</span>
                      <span className="font-semibold text-curb-navy">${Math.round(subtotal * SAMPLE_CA_TAX_RATE).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">CA title & registration</span>
                      <span className="font-semibold text-curb-navy">${SAMPLE_CA_REG.toLocaleString()}</span>
                    </div>
                    <div className="border-t border-gray-200 pt-2.5 flex justify-between">
                      <span className="font-bold text-curb-navy">Total due at purchase</span>
                      <span className="font-bold text-curb-navy text-lg">${(subtotal + Math.round(subtotal * SAMPLE_CA_TAX_RATE) + SAMPLE_CA_REG).toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg p-4">
                    <p className="text-xs font-semibold text-amber-800 mb-2">What you may owe separately</p>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      If you register the vehicle in a different state, you may owe that state&apos;s sales/use tax and registration fees directly. These are not collected by the dealer through Curb. The dealer confirms what&apos;s included in the total above, and anything outside their scope is noted here so there are no surprises.
                    </p>
                  </div>

                  <p className="text-xs text-amber-700 leading-relaxed">
                    This is a sample of the confirmation you&apos;ll see before funding escrow. The dealer reviews your delivery choice, confirms the taxable amount, and locks in the total. You won&apos;t be asked to fund until every line item is confirmed.
                  </p>
                </div>
              </div>

              {/* What happens after you win */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-curb-orange" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M9 5l7 7-7 7" /></svg>
                  </div>
                  <h2 className="text-xl font-bold text-curb-navy">What Happens After You Win</h2>
                </div>

                <div className="space-y-0">
                  {[
                    {
                      step: 1,
                      title: 'Dealer Confirms Total',
                      time: 'Within 24 hours',
                      desc: 'The dealer reviews your delivery choice and confirms the final purchase total — taxes, registration fees, and shipping (if applicable). You see every line item before funding.',
                      icon: '📋',
                    },
                    {
                      step: 2,
                      title: 'Fund Escrow',
                      time: 'Within 48 hours',
                      desc: 'Your payment goes into a secure escrow account — not to the dealer. The funds are held by Escrow.com and only released when you approve the car.',
                      icon: '🔒',
                    },
                    {
                      step: 3,
                      title: 'Dealer Completes Repairs',
                      time: '5–7 business days',
                      desc: 'The dealer performs all listed repairs at their service center. You\'ll receive photo updates and can message the dealer with questions through Curb.',
                      icon: '🔧',
                    },
                    {
                      step: 4,
                      title: 'Review & Approve',
                      time: 'Before delivery',
                      desc: 'Once repairs are done, you review the completed work with photos and documentation. You approve the repairs before anything ships — if something isn\'t right, the dealer fixes it.',
                      icon: '✅',
                    },
                    {
                      step: 5,
                      title: 'Pickup or Delivery',
                      time: 'Your choice',
                      desc: 'Pick up from the dealer in person, or arrange delivery to your door. Once you have the car and confirm everything looks good, escrow releases payment to the dealer.',
                      icon: '🚗',
                    },
                  ].map((step, i) => (
                    <div key={step.step} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-10 h-10 bg-curb-orange/10 rounded-full flex items-center justify-center text-lg flex-shrink-0">
                          {step.icon}
                        </div>
                        {i < 4 && <div className="w-0.5 h-full bg-curb-orange/20 my-1" />}
                      </div>
                      <div className="pb-6 last:pb-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-bold text-curb-navy">Step {step.step}: {step.title}</h3>
                          <span className="text-xs text-gray-400 font-medium">{step.time}</span>
                        </div>
                        <p className="text-sm text-gray-600 leading-relaxed">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Dealer info */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-xl font-bold text-curb-navy mb-4">Listed By</h2>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-curb-navy rounded-xl flex items-center justify-center text-white text-xl font-bold flex-shrink-0">P</div>
                  <div>
                    <h3 className="font-bold text-curb-navy">Premium Auto Group</h3>
                    <p className="text-sm text-gray-500">Licensed Dealer · Los Angeles, CA</p>
                    <div className="flex items-center gap-1 mt-1">
                      {[1,2,3,4,5].map(s => (
                        <svg key={s} className={`w-4 h-4 ${s <= 4 ? 'text-yellow-400' : 'text-gray-200'}`} fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                      ))}
                      <span className="text-sm text-gray-500 ml-1">4.8 · 142 sales</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN — sticky auction widget */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sticky top-24">
                <h1 className="text-2xl font-bold text-curb-navy mb-1">2019 BMW 330i</h1>
                <p className="text-gray-500 text-sm mb-4">68,000 mi · Clean title · Los Angeles, CA</p>

                {/* Timer */}
                <div className="flex items-center gap-2 mb-5 px-4 py-3 rounded-xl bg-orange-50 text-curb-orange">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  <span className="font-semibold text-sm">2d 14h left (example)</span>
                </div>

                {/* Editable bid */}
                <div className="mb-5">
                  <label className="text-xs text-gray-500 mb-1 block">Your Bid Amount</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-bold text-curb-orange">$</span>
                    <input
                      type="text"
                      inputMode="numeric"
                      value={bidInput}
                      onChange={(e) => handleBidChange(e.target.value)}
                      onBlur={() => setBidInput(bidAmount > 0 ? bidAmount.toLocaleString() : '')}
                      className="w-full pl-10 pr-4 py-3 text-3xl font-bold text-curb-orange border-2 border-gray-200 rounded-xl focus:outline-none focus:border-curb-orange focus:ring-2 focus:ring-curb-orange/20 transition"
                    />
                  </div>
                  <p className="text-xs text-gray-400 mt-1">Change the bid to recalculate estimates</p>
                </div>

                <div className="bg-gray-50 rounded-xl p-4 mb-5 space-y-2.5">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Your bid</span>
                    <span className="font-semibold text-curb-navy">${bidAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Required repairs</span>
                    <span className="font-semibold text-curb-navy">${REPAIRS_TOTAL.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Buyer premium (3%)</span>
                    <span className="font-semibold text-curb-navy">${premium.toLocaleString()}</span>
                  </div>
                  <div className="border-t border-gray-200 pt-2.5 flex justify-between">
                    <span className="font-bold text-curb-navy">Subtotal</span>
                    <span className="font-bold text-curb-navy text-lg">${subtotal.toLocaleString()}</span>
                  </div>
                  <p className="text-xs text-gray-400">Before taxes, registration & shipping</p>
                </div>

                {/* Savings callout */}
                {savings > 0 && (
                  <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-5 text-center">
                    <p className="text-xs text-green-600 font-semibold uppercase tracking-wider mb-1">Your Savings vs. Retail</p>
                    <p className="text-3xl font-bold text-green-600">${savings.toLocaleString()}</p>
                    <p className="text-xs text-green-600 mt-1">Retail value: <span className="line-through">${RETAIL_VALUE.toLocaleString()}</span></p>
                  </div>
                )}

                {/* Primary CTA */}
                <button
                  onClick={() => setShowWaitlist(true)}
                  className="w-full py-4 bg-curb-orange text-white rounded-xl font-bold text-lg hover:bg-orange-600 transition shadow-lg shadow-curb-orange/25 hover:shadow-xl hover:shadow-curb-orange/30 mb-3"
                >
                  Join the SoCal Waitlist
                </button>
                <p className="text-xs text-gray-400 text-center mb-4">Launching soon in Southern California</p>

                {/* Trust badges */}
                <div className="border-t border-gray-100 pt-4 space-y-2.5">
                  {[
                    'Dealer-inspected condition report',
                    'All repairs completed before delivery',
                    'Escrow-protected payment',
                    'You approve before funds release',
                  ].map((badge) => (
                    <div key={badge} className="flex items-center gap-2.5 text-sm text-gray-600">
                      <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" viewBox="0 0 24 24" stroke="currentColor"><path d="M5 13l4 4L19 7" /></svg>
                      <span>{badge}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
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
