'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function SignupPage() {
  const [step, setStep] = useState(1);
  const [userType, setUserType] = useState<'buyer' | 'dealer' | null>(null);
  const [formData, setFormData] = useState({
    // Personal Info
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',

    // Dealer Info
    dealershipName: '',
    dealerLicense: '',
    ein: '',
    address: '',
    city: '',
    state: '',
    zip: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock signup - in production, this would call API
    console.log('Signup:', { userType, ...formData });

    if (userType === 'dealer') {
      window.location.href = '/dealer/dashboard';
    } else {
      window.location.href = '/browse';
    }
  };

  const updateFormData = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-curb-navy via-slate-900 to-curb-navy py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="text-4xl font-bold text-white">
            CURB
          </Link>
          <p className="text-gray-400 mt-2">Join the car buying revolution</p>
        </div>

        {/* Signup Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          {/* Step 1: Choose User Type */}
          {step === 1 && (
            <div>
              <h2 className="text-2xl font-bold text-curb-navy mb-2">Get Started</h2>
              <p className="text-gray-600 mb-6">How will you be using Curb?</p>

              <div className="space-y-4">
                <button
                  onClick={() => {
                    setUserType('buyer');
                    setStep(2);
                  }}
                  className="w-full p-6 border-2 border-gray-200 rounded-xl hover:border-curb-orange hover:bg-orange-50 transition text-left group"
                >
                  <div className="flex items-start gap-4">
                    <div className="text-4xl">🚗</div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-curb-navy mb-2 group-hover:text-curb-orange">
                        I'm a Car Buyer
                      </h3>
                      <p className="text-gray-600">
                        Browse and bid on quality vehicles at wholesale prices. Save thousands compared to traditional dealerships.
                      </p>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => {
                    setUserType('dealer');
                    setStep(2);
                  }}
                  className="w-full p-6 border-2 border-gray-200 rounded-xl hover:border-curb-navy hover:bg-slate-50 transition text-left group"
                >
                  <div className="flex items-start gap-4">
                    <div className="text-4xl">🏢</div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-curb-navy mb-2">
                        I'm a Dealer
                      </h3>
                      <p className="text-gray-600">
                        List your trade-ins and inventory directly to buyers. Skip the auction fees and maximize your revenue.
                      </p>
                    </div>
                  </div>
                </button>
              </div>

              <p className="mt-6 text-center text-sm text-gray-600">
                Already have an account?{' '}
                <Link href="/login" className="text-curb-orange font-semibold hover:underline">
                  Sign in
                </Link>
              </p>
            </div>
          )}

          {/* Step 2: Account Information */}
          {step === 2 && userType === 'buyer' && (
            <div>
              <button
                onClick={() => setStep(1)}
                className="text-curb-orange hover:underline mb-4 flex items-center gap-2"
              >
                ← Back
              </button>

              <h2 className="text-2xl font-bold text-curb-navy mb-2">Create Your Account</h2>
              <p className="text-gray-600 mb-6">Start saving on your next vehicle</p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => updateFormData('firstName', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-curb-orange focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => updateFormData('lastName', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-curb-orange focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateFormData('email', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-curb-orange focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => updateFormData('phone', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-curb-orange focus:border-transparent"
                    placeholder="(555) 123-4567"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => updateFormData('password', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-curb-orange focus:border-transparent"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    At least 8 characters with uppercase, lowercase, and numbers
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => updateFormData('confirmPassword', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-curb-orange focus:border-transparent"
                    required
                  />
                </div>

                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="terms"
                    className="w-4 h-4 text-curb-orange border-gray-300 rounded focus:ring-curb-orange mt-1"
                    required
                  />
                  <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
                    I agree to the{' '}
                    <Link href="/terms" className="text-curb-orange hover:underline">
                      Terms of Service
                    </Link>{' '}
                    and{' '}
                    <Link href="/privacy" className="text-curb-orange hover:underline">
                      Privacy Policy
                    </Link>
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full bg-curb-orange text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition shadow-lg"
                >
                  Create Account
                </button>
              </form>
            </div>
          )}

          {/* Step 2: Dealer Account Information */}
          {step === 2 && userType === 'dealer' && (
            <div>
              <button
                onClick={() => setStep(1)}
                className="text-curb-orange hover:underline mb-4 flex items-center gap-2"
              >
                ← Back
              </button>

              <h2 className="text-2xl font-bold text-curb-navy mb-2">Dealer Registration</h2>
              <p className="text-gray-600 mb-6">Join our network of dealers</p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="font-semibold text-curb-navy mt-4">Personal Information</h3>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => updateFormData('firstName', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-curb-orange focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => updateFormData('lastName', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-curb-orange focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => updateFormData('email', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-curb-orange focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => updateFormData('phone', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-curb-orange focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                <h3 className="font-semibold text-curb-navy mt-6">Dealership Information</h3>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Dealership Name
                  </label>
                  <input
                    type="text"
                    value={formData.dealershipName}
                    onChange={(e) => updateFormData('dealershipName', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-curb-orange focus:border-transparent"
                    required
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Dealer License Number
                    </label>
                    <input
                      type="text"
                      value={formData.dealerLicense}
                      onChange={(e) => updateFormData('dealerLicense', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-curb-orange focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      EIN / Tax ID
                    </label>
                    <input
                      type="text"
                      value={formData.ein}
                      onChange={(e) => updateFormData('ein', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-curb-orange focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Business Address
                  </label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => updateFormData('address', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-curb-orange focus:border-transparent"
                    placeholder="Street address"
                    required
                  />
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      City
                    </label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => updateFormData('city', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-curb-orange focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      State
                    </label>
                    <input
                      type="text"
                      value={formData.state}
                      onChange={(e) => updateFormData('state', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-curb-orange focus:border-transparent"
                      placeholder="CA"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      ZIP Code
                    </label>
                    <input
                      type="text"
                      value={formData.zip}
                      onChange={(e) => updateFormData('zip', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-curb-orange focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                <h3 className="font-semibold text-curb-navy mt-6">Account Security</h3>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => updateFormData('password', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-curb-orange focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => updateFormData('confirmPassword', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-curb-orange focus:border-transparent"
                    required
                  />
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-800">
                    📋 <strong>Next Steps:</strong> After registration, you'll need to upload your dealer license, insurance certificate, and business documents for verification. This typically takes 1-2 business days.
                  </p>
                </div>

                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="dealer-terms"
                    className="w-4 h-4 text-curb-orange border-gray-300 rounded focus:ring-curb-orange mt-1"
                    required
                  />
                  <label htmlFor="dealer-terms" className="ml-2 text-sm text-gray-600">
                    I agree to the{' '}
                    <Link href="/dealer-terms" className="text-curb-orange hover:underline">
                      Dealer Terms of Service
                    </Link>{' '}
                    and certify that all information provided is accurate
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full bg-curb-navy text-white py-3 rounded-lg font-semibold hover:bg-slate-800 transition shadow-lg"
                >
                  Submit Application
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
