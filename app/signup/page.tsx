'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';

export default function SignupPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [userType, setUserType] = useState<'buyer' | 'dealer' | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    dealershipName: '',
    dealerLicense: '',
    address: '',
    city: '',
    state: '',
    zip: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    setLoading(true);
    const supabase = createClient();

    // Sign up with Supabase Auth
    const { data, error: authError } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        data: {
          role: userType,
          full_name: `${formData.firstName} ${formData.lastName}`,
        },
      },
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    // Update the profile with additional info
    if (data.user) {
      const profileUpdate: Record<string, string | null> = {
        full_name: `${formData.firstName} ${formData.lastName}`,
        phone: formData.phone || null,
      };

      if (userType === 'dealer') {
        profileUpdate.dealership_name = formData.dealershipName;
        profileUpdate.dealer_license = formData.dealerLicense;
        profileUpdate.dealer_address = formData.address;
        profileUpdate.dealer_city = formData.city;
        profileUpdate.dealer_state = formData.state;
        profileUpdate.dealer_zip = formData.zip;
      }

      await supabase
        .from('profiles')
        .update(profileUpdate as never)
        .eq('id', data.user.id);
    }

    // Check if email confirmation is required
    if (data.user && !data.session) {
      // Email confirmation required
      setStep(3);
      setLoading(false);
      return;
    }

    // Redirect based on user type
    if (userType === 'dealer') {
      router.push('/dealer/dashboard');
    } else {
      router.push('/browse');
    }
    router.refresh();
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
                  onClick={() => { setUserType('buyer'); setStep(2); }}
                  className="w-full p-6 border-2 border-gray-200 rounded-xl hover:border-curb-orange hover:bg-orange-50 transition text-left group"
                >
                  <div className="flex items-start gap-4">
                    <div className="text-4xl">🚗</div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-curb-navy mb-2 group-hover:text-curb-orange">
                        I&apos;m a Car Buyer
                      </h3>
                      <p className="text-gray-600">
                        Browse and bid on quality vehicles at below-retail prices. Save thousands compared to traditional dealerships.
                      </p>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => { setUserType('dealer'); setStep(2); }}
                  className="w-full p-6 border-2 border-gray-200 rounded-xl hover:border-curb-navy hover:bg-slate-50 transition text-left group"
                >
                  <div className="flex items-start gap-4">
                    <div className="text-4xl">🏢</div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-curb-navy mb-2">
                        I&apos;m a Dealer
                      </h3>
                      <p className="text-gray-600">
                        List your trade-ins directly to consumers. Keep the service revenue, skip the auction fees.
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

          {/* Step 2: Buyer Signup */}
          {step === 2 && userType === 'buyer' && (
            <div>
              <button onClick={() => setStep(1)} className="text-curb-orange hover:underline mb-4 flex items-center gap-2">
                ← Back
              </button>
              <h2 className="text-2xl font-bold text-curb-navy mb-2">Create Your Account</h2>
              <p className="text-gray-600 mb-6">Start saving on your next vehicle</p>

              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">{error}</div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                    <input type="text" value={formData.firstName} onChange={(e) => updateFormData('firstName', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-curb-orange focus:border-transparent text-gray-900" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                    <input type="text" value={formData.lastName} onChange={(e) => updateFormData('lastName', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-curb-orange focus:border-transparent text-gray-900" required />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <input type="email" value={formData.email} onChange={(e) => updateFormData('email', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-curb-orange focus:border-transparent text-gray-900" required />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <input type="tel" value={formData.phone} onChange={(e) => updateFormData('phone', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-curb-orange focus:border-transparent text-gray-900" placeholder="(555) 123-4567" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                  <input type="password" value={formData.password} onChange={(e) => updateFormData('password', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-curb-orange focus:border-transparent text-gray-900" required />
                  <p className="text-xs text-gray-500 mt-1">At least 8 characters</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
                  <input type="password" value={formData.confirmPassword} onChange={(e) => updateFormData('confirmPassword', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-curb-orange focus:border-transparent text-gray-900" required />
                </div>

                <button type="submit" disabled={loading}
                  className="w-full bg-curb-orange text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition shadow-lg disabled:opacity-50">
                  {loading ? 'Creating account...' : 'Create Account'}
                </button>
              </form>
            </div>
          )}

          {/* Step 2: Dealer Signup */}
          {step === 2 && userType === 'dealer' && (
            <div>
              <button onClick={() => setStep(1)} className="text-curb-orange hover:underline mb-4 flex items-center gap-2">
                ← Back
              </button>
              <h2 className="text-2xl font-bold text-curb-navy mb-2">Dealer Registration</h2>
              <p className="text-gray-600 mb-6">Join our network of dealers</p>

              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">{error}</div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="font-semibold text-curb-navy">Personal Information</h3>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                    <input type="text" value={formData.firstName} onChange={(e) => updateFormData('firstName', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-curb-orange focus:border-transparent text-gray-900" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                    <input type="text" value={formData.lastName} onChange={(e) => updateFormData('lastName', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-curb-orange focus:border-transparent text-gray-900" required />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                    <input type="email" value={formData.email} onChange={(e) => updateFormData('email', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-curb-orange focus:border-transparent text-gray-900" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                    <input type="tel" value={formData.phone} onChange={(e) => updateFormData('phone', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-curb-orange focus:border-transparent text-gray-900" required />
                  </div>
                </div>

                <h3 className="font-semibold text-curb-navy mt-6">Dealership Information</h3>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Dealership Name</label>
                  <input type="text" value={formData.dealershipName} onChange={(e) => updateFormData('dealershipName', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-curb-orange focus:border-transparent text-gray-900" required />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Dealer License Number</label>
                  <input type="text" value={formData.dealerLicense} onChange={(e) => updateFormData('dealerLicense', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-curb-orange focus:border-transparent text-gray-900" required />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Business Address</label>
                  <input type="text" value={formData.address} onChange={(e) => updateFormData('address', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-curb-orange focus:border-transparent text-gray-900" required />
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                    <input type="text" value={formData.city} onChange={(e) => updateFormData('city', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-curb-orange focus:border-transparent text-gray-900" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                    <input type="text" value={formData.state} onChange={(e) => updateFormData('state', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-curb-orange focus:border-transparent text-gray-900" placeholder="CA" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">ZIP Code</label>
                    <input type="text" value={formData.zip} onChange={(e) => updateFormData('zip', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-curb-orange focus:border-transparent text-gray-900" required />
                  </div>
                </div>

                <h3 className="font-semibold text-curb-navy mt-6">Account Security</h3>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                  <input type="password" value={formData.password} onChange={(e) => updateFormData('password', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-curb-orange focus:border-transparent text-gray-900" required />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
                  <input type="password" value={formData.confirmPassword} onChange={(e) => updateFormData('confirmPassword', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-curb-orange focus:border-transparent text-gray-900" required />
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-800">
                    <strong>What happens next:</strong> After registration, our team will verify your dealer license. You&apos;ll be able to start listing vehicles once approved (typically within 24 hours).
                  </p>
                </div>

                <button type="submit" disabled={loading}
                  className="w-full bg-curb-navy text-white py-3 rounded-lg font-semibold hover:bg-slate-800 transition shadow-lg disabled:opacity-50">
                  {loading ? 'Submitting...' : 'Submit Application'}
                </button>
              </form>
            </div>
          )}

          {/* Step 3: Email Confirmation */}
          {step === 3 && (
            <div className="text-center py-8">
              <div className="text-6xl mb-4">📧</div>
              <h2 className="text-2xl font-bold text-curb-navy mb-2">Check Your Email</h2>
              <p className="text-gray-600 mb-6">
                We&apos;ve sent a confirmation link to <strong>{formData.email}</strong>. Click the link to activate your account.
              </p>
              <Link href="/login" className="text-curb-orange font-semibold hover:underline">
                Back to Sign In
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
