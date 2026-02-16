'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function AIAssistantPage() {
  const [activeTab, setActiveTab] = useState<'description' | 'pricing'>('description');

  // Description Generator State
  const [vehicleData, setVehicleData] = useState({
    make: 'Honda',
    model: 'Civic',
    year: '2019',
    trim: 'EX',
    mileage: '45000',
    color: 'Silver',
  });

  const [conditionChecklist, setConditionChecklist] = useState({
    exteriorExcellent: true,
    exteriorGood: false,
    exteriorFair: false,
    interiorExcellent: true,
    interiorGood: false,
    interiorFair: false,
    mechanicalExcellent: false,
    mechanicalGood: true,
    mechanicalFair: false,
    recentMaintenance: 'New tires, oil change',
    knownIssues: 'Minor brake service recommended',
  });

  const [generatedDescription, setGeneratedDescription] = useState('');
  const [generatedTitle, setGeneratedTitle] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  // Pricing Suggestion State
  const [pricingVehicle, setPricingVehicle] = useState({
    make: 'Honda',
    model: 'Civic',
    year: '2019',
    mileage: '45000',
    condition: 'Good',
  });

  const [pricingSuggestion, setPricingSuggestion] = useState<any>(null);

  const generateDescription = () => {
    setIsGenerating(true);

    // Simulate AI generation
    setTimeout(() => {
      const title = `${vehicleData.year} ${vehicleData.make} ${vehicleData.model} ${vehicleData.trim} - Well Maintained`;

      const description = `Presenting a beautiful ${vehicleData.year} ${vehicleData.make} ${vehicleData.model} ${vehicleData.trim} in ${vehicleData.color} with only ${parseInt(vehicleData.mileage).toLocaleString()} miles. This vehicle is in excellent overall condition and has been meticulously maintained.

Exterior: Excellent condition with no major dents or scratches. Paint is in great shape with a clean, glossy finish.

Interior: Excellent condition. Seats show minimal wear, all controls function properly, and the cabin is clean and well-kept.

Mechanical: Good mechanical condition. ${conditionChecklist.recentMaintenance}. ${conditionChecklist.knownIssues}

This ${vehicleData.make} ${vehicleData.model} is ready for its next owner and offers exceptional value. Don't miss this opportunity to own a reliable, well-maintained vehicle at a great price!`;

      setGeneratedTitle(title);
      setGeneratedDescription(description);
      setIsGenerating(false);
    }, 2000);
  };

  const generatePricingSuggestion = () => {
    // Simulate AI pricing analysis
    setTimeout(() => {
      const basePrice = 14500;
      const suggestion = {
        suggestedReserve: 12500,
        suggestedStartingBid: 10000,
        marketRange: { min: 11000, max: 14000 },
        comparables: [
          { vehicle: '2019 Honda Civic EX', mileage: 42000, soldPrice: 13200, daysAgo: 14 },
          { vehicle: '2019 Honda Civic EX', mileage: 48000, soldPrice: 12800, daysAgo: 7 },
          { vehicle: '2019 Honda Civic Sport', mileage: 50000, soldPrice: 13500, daysAgo: 21 },
        ],
        nadaRetail: 15200,
        confidence: 'High',
        reasoning: 'Based on 3 recent comparable sales on Curb and NADA retail pricing',
      };
      setPricingSuggestion(suggestion);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-curb-navy mb-2">AI Assistant</h1>
          <p className="text-gray-600">
            Powered by AI to help you create better listings and price competitively
          </p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm mb-6">
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab('description')}
              className={`flex-1 px-6 py-4 font-semibold transition ${
                activeTab === 'description'
                  ? 'text-curb-orange border-b-2 border-curb-orange'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              🤖 Description Generator
            </button>
            <button
              onClick={() => setActiveTab('pricing')}
              className={`flex-1 px-6 py-4 font-semibold transition ${
                activeTab === 'pricing'
                  ? 'text-curb-orange border-b-2 border-curb-orange'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              💰 Pricing Assistant
            </button>
          </div>
        </div>

        {/* Description Generator Tab */}
        {activeTab === 'description' && (
          <div className="grid md:grid-cols-2 gap-6">
            {/* Input Section */}
            <div className="bg-white rounded-xl shadow-sm p-8">
              <h2 className="text-2xl font-bold text-curb-navy mb-6">Vehicle Details</h2>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
                    <input
                      type="text"
                      value={vehicleData.year}
                      onChange={(e) => setVehicleData({ ...vehicleData, year: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-curb-orange focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Make</label>
                    <input
                      type="text"
                      value={vehicleData.make}
                      onChange={(e) => setVehicleData({ ...vehicleData, make: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-curb-orange focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Model</label>
                    <input
                      type="text"
                      value={vehicleData.model}
                      onChange={(e) => setVehicleData({ ...vehicleData, model: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-curb-orange focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Trim</label>
                    <input
                      type="text"
                      value={vehicleData.trim}
                      onChange={(e) => setVehicleData({ ...vehicleData, trim: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-curb-orange focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Mileage</label>
                  <input
                    type="text"
                    value={vehicleData.mileage}
                    onChange={(e) => setVehicleData({ ...vehicleData, mileage: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-curb-orange focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Color</label>
                  <input
                    type="text"
                    value={vehicleData.color}
                    onChange={(e) => setVehicleData({ ...vehicleData, color: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-curb-orange focus:border-transparent"
                  />
                </div>

                <div className="pt-4 border-t">
                  <h3 className="font-semibold text-curb-navy mb-4">Condition</h3>

                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">Exterior</p>
                    <div className="flex gap-3">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          checked={conditionChecklist.exteriorExcellent}
                          onChange={() => setConditionChecklist({
                            ...conditionChecklist,
                            exteriorExcellent: true,
                            exteriorGood: false,
                            exteriorFair: false,
                          })}
                          className="w-4 h-4 text-curb-orange border-gray-300 focus:ring-curb-orange"
                        />
                        <span className="ml-2 text-sm">Excellent</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          checked={conditionChecklist.exteriorGood}
                          onChange={() => setConditionChecklist({
                            ...conditionChecklist,
                            exteriorExcellent: false,
                            exteriorGood: true,
                            exteriorFair: false,
                          })}
                          className="w-4 h-4 text-curb-orange border-gray-300 focus:ring-curb-orange"
                        />
                        <span className="ml-2 text-sm">Good</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          checked={conditionChecklist.exteriorFair}
                          onChange={() => setConditionChecklist({
                            ...conditionChecklist,
                            exteriorExcellent: false,
                            exteriorGood: false,
                            exteriorFair: true,
                          })}
                          className="w-4 h-4 text-curb-orange border-gray-300 focus:ring-curb-orange"
                        />
                        <span className="ml-2 text-sm">Fair</span>
                      </label>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">Interior</p>
                    <div className="flex gap-3">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          checked={conditionChecklist.interiorExcellent}
                          onChange={() => setConditionChecklist({
                            ...conditionChecklist,
                            interiorExcellent: true,
                            interiorGood: false,
                            interiorFair: false,
                          })}
                          className="w-4 h-4 text-curb-orange border-gray-300 focus:ring-curb-orange"
                        />
                        <span className="ml-2 text-sm">Excellent</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          checked={conditionChecklist.interiorGood}
                          onChange={() => setConditionChecklist({
                            ...conditionChecklist,
                            interiorExcellent: false,
                            interiorGood: true,
                            interiorFair: false,
                          })}
                          className="w-4 h-4 text-curb-orange border-gray-300 focus:ring-curb-orange"
                        />
                        <span className="ml-2 text-sm">Good</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          checked={conditionChecklist.interiorFair}
                          onChange={() => setConditionChecklist({
                            ...conditionChecklist,
                            interiorExcellent: false,
                            interiorGood: false,
                            interiorFair: true,
                          })}
                          className="w-4 h-4 text-curb-orange border-gray-300 focus:ring-curb-orange"
                        />
                        <span className="ml-2 text-sm">Fair</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Recent Maintenance
                    </label>
                    <input
                      type="text"
                      value={conditionChecklist.recentMaintenance}
                      onChange={(e) =>
                        setConditionChecklist({
                          ...conditionChecklist,
                          recentMaintenance: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-curb-orange focus:border-transparent"
                      placeholder="e.g., New tires, oil change"
                    />
                  </div>

                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Known Issues
                    </label>
                    <input
                      type="text"
                      value={conditionChecklist.knownIssues}
                      onChange={(e) =>
                        setConditionChecklist({
                          ...conditionChecklist,
                          knownIssues: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-curb-orange focus:border-transparent"
                      placeholder="e.g., Minor brake service recommended"
                    />
                  </div>
                </div>

                <button
                  onClick={generateDescription}
                  disabled={isGenerating}
                  className="w-full bg-curb-orange text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition disabled:bg-gray-400"
                >
                  {isGenerating ? '🤖 Generating...' : '✨ Generate Description'}
                </button>
              </div>
            </div>

            {/* Output Section */}
            <div className="bg-white rounded-xl shadow-sm p-8">
              <h2 className="text-2xl font-bold text-curb-navy mb-6">AI-Generated Content</h2>

              {generatedTitle || generatedDescription ? (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                    <input
                      type="text"
                      value={generatedTitle}
                      onChange={(e) => setGeneratedTitle(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-curb-orange focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      value={generatedDescription}
                      onChange={(e) => setGeneratedDescription(e.target.value)}
                      rows={16}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-curb-orange focus:border-transparent"
                    />
                  </div>

                  <div className="flex gap-3">
                    <button className="flex-1 bg-curb-orange text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition">
                      Use This Description
                    </button>
                    <button
                      onClick={generateDescription}
                      className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition font-semibold"
                    >
                      Regenerate
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <div className="text-6xl mb-4">🤖</div>
                  <p className="text-lg mb-2">No description generated yet</p>
                  <p className="text-sm">
                    Fill in the vehicle details and click "Generate Description"
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Pricing Assistant Tab */}
        {activeTab === 'pricing' && (
          <div className="grid md:grid-cols-2 gap-6">
            {/* Input Section */}
            <div className="bg-white rounded-xl shadow-sm p-8">
              <h2 className="text-2xl font-bold text-curb-navy mb-6">Vehicle Information</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
                  <input
                    type="text"
                    value={pricingVehicle.year}
                    onChange={(e) =>
                      setPricingVehicle({ ...pricingVehicle, year: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-curb-orange focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Make</label>
                  <input
                    type="text"
                    value={pricingVehicle.make}
                    onChange={(e) =>
                      setPricingVehicle({ ...pricingVehicle, make: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-curb-orange focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Model</label>
                  <input
                    type="text"
                    value={pricingVehicle.model}
                    onChange={(e) =>
                      setPricingVehicle({ ...pricingVehicle, model: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-curb-orange focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Mileage</label>
                  <input
                    type="text"
                    value={pricingVehicle.mileage}
                    onChange={(e) =>
                      setPricingVehicle({ ...pricingVehicle, mileage: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-curb-orange focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Overall Condition
                  </label>
                  <select
                    value={pricingVehicle.condition}
                    onChange={(e) =>
                      setPricingVehicle({ ...pricingVehicle, condition: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-curb-orange focus:border-transparent"
                  >
                    <option value="Excellent">Excellent</option>
                    <option value="Good">Good</option>
                    <option value="Fair">Fair</option>
                    <option value="Poor">Poor</option>
                  </select>
                </div>

                <button
                  onClick={generatePricingSuggestion}
                  className="w-full bg-curb-orange text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition"
                >
                  💡 Get Pricing Suggestion
                </button>
              </div>
            </div>

            {/* Pricing Output */}
            <div className="bg-white rounded-xl shadow-sm p-8">
              <h2 className="text-2xl font-bold text-curb-navy mb-6">Market Analysis</h2>

              {pricingSuggestion ? (
                <div className="space-y-6">
                  {/* Suggested Pricing */}
                  <div className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200 rounded-xl p-6">
                    <h3 className="font-bold text-green-800 mb-4 text-lg">
                      💰 Recommended Pricing
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700">Starting Bid:</span>
                        <span className="text-2xl font-bold text-green-700">
                          ${pricingSuggestion.suggestedStartingBid.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700">Reserve Price:</span>
                        <span className="text-2xl font-bold text-green-700">
                          ${pricingSuggestion.suggestedReserve.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Market Range */}
                  <div>
                    <h3 className="font-semibold text-curb-navy mb-3">Market Range</h3>
                    <div className="bg-gray-100 rounded-lg p-4">
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-gray-600">Low</span>
                        <span className="text-sm text-gray-600">High</span>
                      </div>
                      <div className="relative h-8 bg-gradient-to-r from-red-400 via-yellow-400 to-green-400 rounded-full">
                        <div
                          className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-curb-navy rounded-full border-2 border-white"
                          style={{ left: '60%' }}
                        />
                      </div>
                      <div className="flex justify-between mt-2">
                        <span className="font-semibold">
                          ${pricingSuggestion.marketRange.min.toLocaleString()}
                        </span>
                        <span className="font-semibold">
                          ${pricingSuggestion.marketRange.max.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Comparables */}
                  <div>
                    <h3 className="font-semibold text-curb-navy mb-3">Recent Comparables</h3>
                    <div className="space-y-3">
                      {pricingSuggestion.comparables.map((comp: any, index: number) => (
                        <div
                          key={index}
                          className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50"
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-semibold text-curb-navy">{comp.vehicle}</p>
                              <p className="text-sm text-gray-600">
                                {comp.mileage.toLocaleString()} miles
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-green-600">
                                ${comp.soldPrice.toLocaleString()}
                              </p>
                              <p className="text-xs text-gray-500">{comp.daysAgo} days ago</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Additional Info */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-gray-700">NADA Retail:</span>
                      <span className="font-semibold">
                        ${pricingSuggestion.nadaRetail.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-gray-700">Confidence:</span>
                      <span className="font-semibold text-green-600">
                        {pricingSuggestion.confidence}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 mt-3">{pricingSuggestion.reasoning}</p>
                  </div>

                  <button className="w-full bg-curb-orange text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition">
                    Apply These Prices
                  </button>
                </div>
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <div className="text-6xl mb-4">💰</div>
                  <p className="text-lg mb-2">No pricing analysis yet</p>
                  <p className="text-sm">
                    Enter vehicle details and click "Get Pricing Suggestion"
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
