'use client';

import { useState } from 'react';
import Link from 'next/link';

type Step = 'vin' | 'photos' | 'condition' | 'inspection' | 'repairs' | 'auction' | 'review';

export default function ListVehicle() {
  const [currentStep, setCurrentStep] = useState<Step>('vin');
  const [formData, setFormData] = useState({
    vin: '',
    year: '',
    make: '',
    model: '',
    trim: '',
    mileage: '',
    color: '',
    transmission: '',
    photos: [] as string[],
    exteriorCondition: '',
    interiorCondition: '',
    mechanicalCondition: '',
    inspectionSummary: '',
    knownIssues: '',
    titleStatus: 'Clean',
    repairs: [] as { item: string; cost: number }[],
    minimumBid: '',
    listingTitle: '',
    description: '',
  });

  const steps: { id: Step; label: string; number: number }[] = [
    { id: 'vin', label: 'VIN Decode', number: 1 },
    { id: 'photos', label: 'Photos', number: 2 },
    { id: 'condition', label: 'Condition', number: 3 },
    { id: 'inspection', label: 'Inspection', number: 4 },
    { id: 'repairs', label: 'Repairs', number: 5 },
    { id: 'auction', label: 'Auction Settings', number: 6 },
    { id: 'review', label: 'Review', number: 7 },
  ];

  const currentStepIndex = steps.findIndex((s) => s.id === currentStep);

  const handleVinDecode = () => {
    // Mock VIN decode - in production this would call NHTSA API
    setFormData({
      ...formData,
      year: '2019',
      make: 'Honda',
      model: 'Civic',
      trim: 'EX',
      color: 'Silver',
      transmission: 'Automatic',
    });
  };

  const nextStep = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStep(steps[currentStepIndex + 1].id);
    }
  };

  const prevStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStep(steps[currentStepIndex - 1].id);
    }
  };

  const addRepair = () => {
    setFormData({
      ...formData,
      repairs: [...formData.repairs, { item: '', cost: 0 }],
    });
  };

  const updateRepair = (index: number, field: 'item' | 'cost', value: string | number) => {
    const newRepairs = [...formData.repairs];
    newRepairs[index] = { ...newRepairs[index], [field]: value };
    setFormData({ ...formData, repairs: newRepairs });
  };

  const removeRepair = (index: number) => {
    setFormData({
      ...formData,
      repairs: formData.repairs.filter((_, i) => i !== index),
    });
  };

  const totalRepairCost = formData.repairs.reduce((sum, repair) => sum + (repair.cost || 0), 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-curb-navy mb-2">List New Vehicle</h1>
          <p className="text-gray-600">Complete all steps to publish your auction</p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold mb-2 ${
                      index <= currentStepIndex
                        ? 'bg-curb-orange text-white'
                        : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    {step.number}
                  </div>
                  <span
                    className={`text-xs text-center ${
                      index <= currentStepIndex ? 'text-curb-orange font-medium' : 'text-gray-500'
                    }`}
                  >
                    {step.label}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`h-1 flex-1 mx-2 ${
                      index < currentStepIndex ? 'bg-curb-orange' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-white rounded-xl shadow-sm p-8">
          {/* Step 1: VIN Decode */}
          {currentStep === 'vin' && (
            <div>
              <h2 className="text-2xl font-bold text-curb-navy mb-6">Step 1: VIN Decode</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Vehicle Identification Number (VIN)
                  </label>
                  <input
                    type="text"
                    value={formData.vin}
                    onChange={(e) => setFormData({ ...formData, vin: e.target.value.toUpperCase() })}
                    placeholder="Enter 17-character VIN"
                    maxLength={17}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-curb-orange"
                  />
                  <button
                    onClick={handleVinDecode}
                    disabled={formData.vin.length !== 17}
                    className="mt-3 px-6 py-2 bg-curb-navy text-white rounded-lg hover:bg-slate-800 transition disabled:bg-gray-300"
                  >
                    Decode VIN
                  </button>
                </div>

                {formData.year && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h3 className="font-semibold text-green-800 mb-3">✓ VIN Decoded Successfully</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Year</p>
                        <p className="font-semibold">{formData.year}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Make</p>
                        <p className="font-semibold">{formData.make}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Model</p>
                        <p className="font-semibold">{formData.model}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Trim</p>
                        <p className="font-semibold">{formData.trim}</p>
                      </div>
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Mileage</label>
                  <input
                    type="number"
                    value={formData.mileage}
                    onChange={(e) => setFormData({ ...formData, mileage: e.target.value })}
                    placeholder="Current mileage"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-curb-orange"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Photos */}
          {currentStep === 'photos' && (
            <div>
              <h2 className="text-2xl font-bold text-curb-navy mb-6">Step 2: Upload Photos</h2>
              <p className="text-gray-600 mb-6">
                Upload at least 5 photos: exterior (4 angles), interior, engine bay, dashboard, odometer
              </p>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-curb-orange transition">
                <div className="text-5xl mb-4">📸</div>
                <p className="text-lg font-semibold text-curb-navy mb-2">Drag and drop photos here</p>
                <p className="text-gray-600 mb-4">or</p>
                <button className="px-6 py-3 bg-curb-orange text-white rounded-lg hover:bg-orange-600 transition font-medium">
                  Browse Files
                </button>
                <p className="text-sm text-gray-500 mt-4">Maximum 10 photos, 5MB each</p>
              </div>
              <div className="mt-6">
                <p className="text-sm text-gray-600">
                  {formData.photos.length} photo(s) uploaded (minimum 5 required)
                </p>
              </div>
            </div>
          )}

          {/* Step 3: Condition */}
          {currentStep === 'condition' && (
            <div>
              <h2 className="text-2xl font-bold text-curb-navy mb-6">Step 3: Condition Checklist</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Exterior Condition</label>
                  <select
                    value={formData.exteriorCondition}
                    onChange={(e) => setFormData({ ...formData, exteriorCondition: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-curb-orange"
                  >
                    <option value="">Select condition</option>
                    <option value="Excellent">Excellent - No visible damage</option>
                    <option value="Good">Good - Minor scratches or dings</option>
                    <option value="Fair">Fair - Noticeable damage or wear</option>
                    <option value="Poor">Poor - Significant damage</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Interior Condition</label>
                  <select
                    value={formData.interiorCondition}
                    onChange={(e) => setFormData({ ...formData, interiorCondition: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-curb-orange"
                  >
                    <option value="">Select condition</option>
                    <option value="Excellent">Excellent - Like new</option>
                    <option value="Good">Good - Clean, minor wear</option>
                    <option value="Fair">Fair - Stains or tears present</option>
                    <option value="Poor">Poor - Heavy wear or damage</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Mechanical Condition</label>
                  <select
                    value={formData.mechanicalCondition}
                    onChange={(e) => setFormData({ ...formData, mechanicalCondition: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-curb-orange"
                  >
                    <option value="">Select condition</option>
                    <option value="Excellent">Excellent - Runs perfectly</option>
                    <option value="Good">Good - Minor issues</option>
                    <option value="Fair">Fair - Needs work</option>
                    <option value="Poor">Poor - Major repairs needed</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Inspection */}
          {currentStep === 'inspection' && (
            <div>
              <h2 className="text-2xl font-bold text-curb-navy mb-6">Step 4: Inspection Report</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Inspection Summary
                  </label>
                  <textarea
                    value={formData.inspectionSummary}
                    onChange={(e) => setFormData({ ...formData, inspectionSummary: e.target.value })}
                    placeholder="Describe the overall condition, maintenance history, and notable features..."
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-curb-orange"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Known Issues
                  </label>
                  <textarea
                    value={formData.knownIssues}
                    onChange={(e) => setFormData({ ...formData, knownIssues: e.target.value })}
                    placeholder="List any known issues, check engine lights, warning indicators..."
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-curb-orange"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title Status</label>
                  <select
                    value={formData.titleStatus}
                    onChange={(e) => setFormData({ ...formData, titleStatus: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-curb-orange"
                  >
                    <option value="Clean">Clean Title</option>
                    <option value="Salvage">Salvage</option>
                    <option value="Rebuilt">Rebuilt</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Step 5: Repairs */}
          {currentStep === 'repairs' && (
            <div>
              <h2 className="text-2xl font-bold text-curb-navy mb-6">Step 5: Required Repairs</h2>
              <p className="text-gray-600 mb-6">
                List repairs you'll complete before delivery if the vehicle sells
              </p>

              <div className="space-y-4 mb-6">
                {formData.repairs.map((repair, index) => (
                  <div key={index} className="flex gap-4">
                    <input
                      type="text"
                      value={repair.item}
                      onChange={(e) => updateRepair(index, 'item', e.target.value)}
                      placeholder="Repair item (e.g., Brake pads replacement)"
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-curb-orange"
                    />
                    <input
                      type="number"
                      value={repair.cost || ''}
                      onChange={(e) => updateRepair(index, 'cost', parseFloat(e.target.value) || 0)}
                      placeholder="Cost"
                      className="w-32 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-curb-orange"
                    />
                    <button
                      onClick={() => removeRepair(index)}
                      className="px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>

              <button
                onClick={addRepair}
                className="mb-6 px-6 py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-curb-orange hover:text-curb-orange transition w-full"
              >
                + Add Repair Item
              </button>

              {formData.repairs.length > 0 && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-curb-navy">Total Repair Cost</span>
                    <span className="text-2xl font-bold text-curb-orange">
                      ${totalRepairCost.toLocaleString()}
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 6: Auction Settings */}
          {currentStep === 'auction' && (
            <div>
              <h2 className="text-2xl font-bold text-curb-navy mb-6">Step 6: Auction Settings</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Listing Title
                  </label>
                  <input
                    type="text"
                    value={formData.listingTitle}
                    onChange={(e) => setFormData({ ...formData, listingTitle: e.target.value })}
                    placeholder={`${formData.year} ${formData.make} ${formData.model} ${formData.trim}`}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-curb-orange"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description (Optional)
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Add any additional details..."
                    rows={3}
                    maxLength={500}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-curb-orange"
                  />
                  <p className="text-sm text-gray-500 mt-1">{formData.description.length}/500 characters</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Minimum Bid (Reserve Price)
                  </label>
                  <input
                    type="number"
                    value={formData.minimumBid}
                    onChange={(e) => setFormData({ ...formData, minimumBid: e.target.value })}
                    placeholder="Enter minimum acceptable bid"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-curb-orange"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    The auction will only complete if bidding reaches this amount
                  </p>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-2">Auction Duration</h4>
                  <p className="text-sm text-blue-700">
                    All auctions run for 3 days from the time of publishing
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Step 7: Review */}
          {currentStep === 'review' && (
            <div>
              <h2 className="text-2xl font-bold text-curb-navy mb-6">Step 7: Review & Publish</h2>
              <div className="space-y-6">
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="font-semibold text-curb-navy mb-4">Vehicle Information</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Vehicle</p>
                      <p className="font-semibold">{formData.year} {formData.make} {formData.model} {formData.trim}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">VIN</p>
                      <p className="font-semibold">{formData.vin}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Mileage</p>
                      <p className="font-semibold">{formData.mileage} miles</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Title Status</p>
                      <p className="font-semibold">{formData.titleStatus}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="font-semibold text-curb-navy mb-4">Auction Details</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Minimum Bid</span>
                      <span className="font-semibold">${formData.minimumBid}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Repair Cost</span>
                      <span className="font-semibold">${totalRepairCost.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Listing Fee</span>
                      <span className="font-semibold">$100</span>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h4 className="font-semibold text-yellow-800 mb-2">⚠️ Before Publishing</h4>
                  <ul className="text-sm text-yellow-700 space-y-1">
                    <li>• Your listing will be reviewed and published within 24 hours</li>
                    <li>• The $100 listing fee will be charged when published</li>
                    <li>• You'll be notified when your auction goes live</li>
                  </ul>
                </div>

                <button className="w-full py-4 bg-curb-orange text-white rounded-lg font-bold text-lg hover:bg-orange-600 transition">
                  Submit for Review ($100)
                </button>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-8 border-t border-gray-200">
            <button
              onClick={prevStep}
              disabled={currentStepIndex === 0}
              className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              ← Previous
            </button>
            {currentStep !== 'review' && (
              <button
                onClick={nextStep}
                className="px-6 py-3 bg-curb-orange text-white rounded-lg hover:bg-orange-600 transition font-medium"
              >
                Next →
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
