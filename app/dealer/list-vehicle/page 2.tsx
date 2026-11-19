'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { decodeVIN } from '@/lib/vin-decode';
import { useUser } from '@/lib/hooks/useUser';

type Step = 'vin' | 'photos' | 'condition' | 'pricing' | 'review';

export default function ListVehicle() {
  const router = useRouter();
  const { user, profile } = useUser();
  const [currentStep, setCurrentStep] = useState<Step>('vin');
  const [vinLoading, setVinLoading] = useState(false);
  const [vinDecoded, setVinDecoded] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [uploadingPhotos, setUploadingPhotos] = useState(false);

  const [formData, setFormData] = useState({
    vin: '',
    year: 0,
    make: '',
    model: '',
    trim: '',
    bodyStyle: '',
    engine: '',
    transmission: '',
    drivetrain: '',
    fuelType: '',
    mileage: '',
    exteriorColor: '',
    interiorColor: '',
    // Condition
    conditionNotes: '',
    knownIssues: '',
    // Pricing
    retailValue: '',
    reservePrice: '',
    repairEstimate: '',
    // Photos
    photos: [] as File[],
    photoUrls: [] as string[],
  });

  const steps: { id: Step; label: string; number: number }[] = [
    { id: 'vin', label: 'VIN & Details', number: 1 },
    { id: 'photos', label: 'Photos', number: 2 },
    { id: 'condition', label: 'Condition', number: 3 },
    { id: 'pricing', label: 'Pricing', number: 4 },
    { id: 'review', label: 'Review & Submit', number: 5 },
  ];

  const currentStepIndex = steps.findIndex((s) => s.id === currentStep);

  const handleVinDecode = async () => {
    if (formData.vin.length !== 17) return;
    setVinLoading(true);
    setError('');

    try {
      const result = await decodeVIN(formData.vin);
      if (result.error) {
        setError(result.error);
      } else {
        setFormData({
          ...formData,
          year: result.year || 0,
          make: result.make || '',
          model: result.model || '',
          trim: result.trim || '',
          bodyStyle: result.bodyStyle || '',
          engine: result.engine || '',
          transmission: result.transmission || '',
          drivetrain: result.drivetrain || '',
          fuelType: result.fuelType || '',
        });
        setVinDecoded(true);
      }
    } catch {
      setError('Failed to decode VIN. Please try again.');
    }
    setVinLoading(false);
  };

  const handlePhotoUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length + formData.photos.length > 20) {
      setError('Maximum 20 photos allowed');
      return;
    }

    // Create preview URLs
    const newUrls = files.map((f) => URL.createObjectURL(f));
    setFormData((prev) => ({
      ...prev,
      photos: [...prev.photos, ...files],
      photoUrls: [...prev.photoUrls, ...newUrls],
    }));
  }, [formData.photos.length]);

  const removePhoto = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index),
      photoUrls: prev.photoUrls.filter((_, i) => i !== index),
    }));
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

  const handleSubmit = async () => {
    if (!user || !profile) return;
    setSubmitting(true);
    setError('');

    try {
      const supabase = createClient();

      // Upload photos to Supabase Storage
      setUploadingPhotos(true);
      const uploadedUrls: string[] = [];
      for (const photo of formData.photos) {
        const fileExt = photo.name.split('.').pop();
        const fileName = `${user.id}/${Date.now()}-${Math.random().toString(36).slice(2)}.${fileExt}`;
        const { data, error: uploadError } = await supabase.storage
          .from('vehicle-photos')
          .upload(fileName, photo);

        if (uploadError) throw uploadError;

        const { data: urlData } = supabase.storage
          .from('vehicle-photos')
          .getPublicUrl(data.path);

        uploadedUrls.push(urlData.publicUrl);
      }
      setUploadingPhotos(false);

      // Insert vehicle record
      const { error: insertError } = await supabase.from('vehicles').insert({
        dealer_id: user.id,
        vin: formData.vin,
        year: formData.year,
        make: formData.make,
        model: formData.model,
        trim: formData.trim || null,
        body_style: formData.bodyStyle || null,
        engine: formData.engine || null,
        transmission: formData.transmission || null,
        drivetrain: formData.drivetrain || null,
        fuel_type: formData.fuelType || null,
        exterior_color: formData.exteriorColor || null,
        interior_color: formData.interiorColor || null,
        mileage: parseInt(formData.mileage),
        retail_value: formData.retailValue ? Math.round(parseFloat(formData.retailValue) * 100) : null,
        reserve_price: Math.round(parseFloat(formData.reservePrice) * 100),
        repair_estimate: formData.repairEstimate ? Math.round(parseFloat(formData.repairEstimate) * 100) : null,
        condition_notes: formData.conditionNotes || null,
        known_issues: formData.knownIssues || null,
        photos: uploadedUrls,
        photo_count: uploadedUrls.length,
        status: 'pending_approval',
      });

      if (insertError) throw insertError;

      // Success — redirect to dashboard
      router.push('/dealer/dashboard?listed=true');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit listing');
      setUploadingPhotos(false);
    }
    setSubmitting(false);
  };

  const fmt = (n: string) => {
    const num = parseFloat(n);
    return isNaN(num) ? '$0' : `$${num.toLocaleString()}`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-curb-navy mb-2">List New Vehicle</h1>
          <p className="text-gray-600">Complete all steps to submit your vehicle for review</p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold mb-2 ${
                    index <= currentStepIndex ? 'bg-curb-orange text-white' : 'bg-gray-200 text-gray-500'
                  }`}>
                    {index < currentStepIndex ? '✓' : step.number}
                  </div>
                  <span className={`text-xs text-center ${
                    index <= currentStepIndex ? 'text-curb-orange font-medium' : 'text-gray-500'
                  }`}>
                    {step.label}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className={`h-1 flex-1 mx-2 ${index < currentStepIndex ? 'bg-curb-orange' : 'bg-gray-200'}`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">{error}</div>
        )}

        {/* Form Content */}
        <div className="bg-white rounded-xl shadow-sm p-8">
          {/* Step 1: VIN Decode */}
          {currentStep === 'vin' && (
            <div>
              <h2 className="text-2xl font-bold text-curb-navy mb-6">Vehicle Information</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Vehicle Identification Number (VIN)
                  </label>
                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={formData.vin}
                      onChange={(e) => {
                        setFormData({ ...formData, vin: e.target.value.toUpperCase() });
                        setVinDecoded(false);
                      }}
                      placeholder="Enter 17-character VIN"
                      maxLength={17}
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-curb-orange text-gray-900"
                    />
                    <button
                      onClick={handleVinDecode}
                      disabled={formData.vin.length !== 17 || vinLoading}
                      className="px-6 py-3 bg-curb-navy text-white rounded-lg hover:bg-slate-800 transition disabled:bg-gray-300 disabled:cursor-not-allowed whitespace-nowrap"
                    >
                      {vinLoading ? 'Decoding...' : 'Decode VIN'}
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{formData.vin.length}/17 characters</p>
                </div>

                {vinDecoded && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h3 className="font-semibold text-green-800 mb-3">VIN Decoded Successfully</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                      <div><p className="text-gray-600">Year</p><p className="font-semibold">{formData.year}</p></div>
                      <div><p className="text-gray-600">Make</p><p className="font-semibold">{formData.make}</p></div>
                      <div><p className="text-gray-600">Model</p><p className="font-semibold">{formData.model}</p></div>
                      {formData.trim && <div><p className="text-gray-600">Trim</p><p className="font-semibold">{formData.trim}</p></div>}
                      {formData.bodyStyle && <div><p className="text-gray-600">Body</p><p className="font-semibold">{formData.bodyStyle}</p></div>}
                      {formData.engine && <div><p className="text-gray-600">Engine</p><p className="font-semibold">{formData.engine}</p></div>}
                      {formData.transmission && <div><p className="text-gray-600">Transmission</p><p className="font-semibold">{formData.transmission}</p></div>}
                      {formData.drivetrain && <div><p className="text-gray-600">Drivetrain</p><p className="font-semibold">{formData.drivetrain}</p></div>}
                      {formData.fuelType && <div><p className="text-gray-600">Fuel</p><p className="font-semibold">{formData.fuelType}</p></div>}
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Mileage</label>
                    <input type="number" value={formData.mileage}
                      onChange={(e) => setFormData({ ...formData, mileage: e.target.value })}
                      placeholder="Current odometer reading"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-curb-orange text-gray-900" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Exterior Color</label>
                    <input type="text" value={formData.exteriorColor}
                      onChange={(e) => setFormData({ ...formData, exteriorColor: e.target.value })}
                      placeholder="e.g., Silver Metallic"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-curb-orange text-gray-900" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Interior Color</label>
                  <input type="text" value={formData.interiorColor}
                    onChange={(e) => setFormData({ ...formData, interiorColor: e.target.value })}
                    placeholder="e.g., Black Cloth"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-curb-orange text-gray-900" />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Photos */}
          {currentStep === 'photos' && (
            <div>
              <h2 className="text-2xl font-bold text-curb-navy mb-6">Upload Photos</h2>
              <p className="text-gray-600 mb-6">
                Upload at least 5 photos: exterior (4 angles), interior, engine bay, dashboard, odometer
              </p>

              <label className="block border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-curb-orange transition cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
                <div className="text-5xl mb-4">📸</div>
                <p className="text-lg font-semibold text-curb-navy mb-2">Click to upload or drag photos here</p>
                <p className="text-sm text-gray-500">JPG, PNG up to 10MB each. Maximum 20 photos.</p>
              </label>

              {formData.photoUrls.length > 0 && (
                <div className="mt-6">
                  <p className="text-sm font-medium text-gray-700 mb-3">{formData.photoUrls.length} photo(s) selected</p>
                  <div className="grid grid-cols-4 gap-3">
                    {formData.photoUrls.map((url, i) => (
                      <div key={i} className="relative group">
                        <img src={url} alt={`Vehicle photo ${i + 1}`} className="w-full h-24 object-cover rounded-lg" />
                        <button
                          onClick={() => removePhoto(i)}
                          className="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-full text-xs opacity-0 group-hover:opacity-100 transition"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {formData.photoUrls.length < 5 && (
                <p className="mt-4 text-sm text-amber-600">Minimum 5 photos required ({5 - formData.photoUrls.length} more needed)</p>
              )}
            </div>
          )}

          {/* Step 3: Condition */}
          {currentStep === 'condition' && (
            <div>
              <h2 className="text-2xl font-bold text-curb-navy mb-6">Vehicle Condition</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Condition Notes
                  </label>
                  <textarea value={formData.conditionNotes}
                    onChange={(e) => setFormData({ ...formData, conditionNotes: e.target.value })}
                    placeholder="Describe the overall condition, maintenance history, and any notable features or wear..."
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-curb-orange text-gray-900" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Known Issues (be transparent — builds buyer trust)
                  </label>
                  <textarea value={formData.knownIssues}
                    onChange={(e) => setFormData({ ...formData, knownIssues: e.target.value })}
                    placeholder="List any known mechanical issues, warning lights, cosmetic damage, prior accidents..."
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-curb-orange text-gray-900" />
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Pricing */}
          {currentStep === 'pricing' && (
            <div>
              <h2 className="text-2xl font-bold text-curb-navy mb-6">Pricing</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Estimated Retail Value (KBB / lot price)
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-3.5 text-gray-500">$</span>
                    <input type="number" value={formData.retailValue}
                      onChange={(e) => setFormData({ ...formData, retailValue: e.target.value })}
                      placeholder="16,000"
                      className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-curb-orange text-gray-900" />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">What would this car list for on your lot?</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Reserve Price (minimum acceptable sale price)
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-3.5 text-gray-500">$</span>
                    <input type="number" value={formData.reservePrice}
                      onChange={(e) => setFormData({ ...formData, reservePrice: e.target.value })}
                      placeholder="12,000"
                      className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-curb-orange text-gray-900" />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Hidden from buyers. The auction only completes if bidding reaches this amount.</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Estimated Repair / Safety Work Cost
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-3.5 text-gray-500">$</span>
                    <input type="number" value={formData.repairEstimate}
                      onChange={(e) => setFormData({ ...formData, repairEstimate: e.target.value })}
                      placeholder="1,500"
                      className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-curb-orange text-gray-900" />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">What your service dept will charge for safety / reconditioning work.</p>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-2">Fee Structure</h4>
                  <p className="text-sm text-blue-700">$100 listing fee (charged when auction goes live) + buyer pays 3% premium on top of sale price.</p>
                </div>
              </div>
            </div>
          )}

          {/* Step 5: Review */}
          {currentStep === 'review' && (
            <div>
              <h2 className="text-2xl font-bold text-curb-navy mb-6">Review & Submit</h2>
              <div className="space-y-6">
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="font-semibold text-curb-navy mb-4">Vehicle</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div><p className="text-gray-600">Vehicle</p><p className="font-semibold">{formData.year} {formData.make} {formData.model} {formData.trim}</p></div>
                    <div><p className="text-gray-600">VIN</p><p className="font-semibold font-mono text-xs">{formData.vin}</p></div>
                    <div><p className="text-gray-600">Mileage</p><p className="font-semibold">{parseInt(formData.mileage).toLocaleString()} miles</p></div>
                    <div><p className="text-gray-600">Photos</p><p className="font-semibold">{formData.photos.length} uploaded</p></div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="font-semibold text-curb-navy mb-4">Pricing</h3>
                  <div className="space-y-3 text-sm">
                    {formData.retailValue && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Estimated Retail Value</span>
                        <span className="font-semibold">{fmt(formData.retailValue)}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-gray-600">Reserve Price</span>
                      <span className="font-semibold">{fmt(formData.reservePrice)}</span>
                    </div>
                    {formData.repairEstimate && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Estimated Repairs</span>
                        <span className="font-semibold">{fmt(formData.repairEstimate)}</span>
                      </div>
                    )}
                    <div className="flex justify-between border-t pt-2">
                      <span className="text-gray-600">Listing Fee</span>
                      <span className="font-semibold">$100</span>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h4 className="font-semibold text-yellow-800 mb-2">What happens next</h4>
                  <ul className="text-sm text-yellow-700 space-y-1">
                    <li>1. Our team reviews your listing (typically within 24 hours)</li>
                    <li>2. Once approved, your 3-day auction goes live</li>
                    <li>3. The $100 listing fee is charged when the auction starts</li>
                    <li>4. You&apos;ll be notified of bids and when the auction ends</li>
                  </ul>
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="w-full py-4 bg-curb-orange text-white rounded-lg font-bold text-lg hover:bg-orange-600 transition disabled:opacity-50"
                >
                  {uploadingPhotos ? 'Uploading photos...' : submitting ? 'Submitting...' : 'Submit for Review'}
                </button>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between mt-8 pt-8 border-t border-gray-200">
            <button onClick={prevStep} disabled={currentStepIndex === 0}
              className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed font-medium">
              ← Previous
            </button>
            {currentStep !== 'review' && (
              <button onClick={nextStep}
                className="px-6 py-3 bg-curb-orange text-white rounded-lg hover:bg-orange-600 transition font-medium">
                Next →
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
