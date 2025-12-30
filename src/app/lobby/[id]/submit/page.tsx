'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';

export default function SubmitOfferPage() {
  const params = useParams();
  const router = useRouter();
  const listingId = params.id as string;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    buyerAgentName: '',
    buyerAgentLicense: '',
    buyerAgentEmail: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/offers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          listingId,
          ...formData,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to submit offer');
      }

      router.push(`/lobby/${listingId}/submit/success`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100">
      {/* Header Bar */}
      <header className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white shadow-lg">
        <div className="mx-auto max-w-6xl px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
            <span className="text-sm font-medium text-blue-100">Deal Room</span>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-xl px-4 py-8 sm:px-6">
        <div className="mb-6">
          <Link
            href={`/lobby/${listingId}`}
            className="inline-flex items-center text-sm text-slate-600 hover:text-blue-900"
          >
            <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Lobby
          </Link>
        </div>

        <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200/50">
          <div className="bg-gradient-to-r from-blue-900 to-blue-800 px-6 py-5 text-white">
            <h1 className="text-xl font-bold">Submit an Offer</h1>
            <p className="mt-1 text-sm text-blue-200">
              Complete the form below to submit your offer.
            </p>
          </div>

          <div className="p-6">
            {error && (
              <div className="mb-6 flex items-center gap-2 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
                <svg className="h-4 w-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="buyerAgentName" className="block text-sm font-medium text-slate-700">
                  Buyer&apos;s Agent Name
                </label>
                <input
                  type="text"
                  id="buyerAgentName"
                  name="buyerAgentName"
                  value={formData.buyerAgentName}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-lg border border-slate-300 px-4 py-2.5 text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  placeholder="Jane Smith"
                />
              </div>

              <div>
                <label htmlFor="buyerAgentLicense" className="block text-sm font-medium text-slate-700">
                  License Number
                </label>
                <input
                  type="text"
                  id="buyerAgentLicense"
                  name="buyerAgentLicense"
                  value={formData.buyerAgentLicense}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-lg border border-slate-300 px-4 py-2.5 text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  placeholder="RE-123456"
                />
              </div>

              <div>
                <label htmlFor="buyerAgentEmail" className="block text-sm font-medium text-slate-700">
                  Email Address
                </label>
                <input
                  type="email"
                  id="buyerAgentEmail"
                  name="buyerAgentEmail"
                  value={formData.buyerAgentEmail}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-lg border border-slate-300 px-4 py-2.5 text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  placeholder="agent@example.com"
                />
              </div>

              <div className="rounded-lg bg-blue-50 p-4">
                <p className="text-sm font-medium text-blue-900">By submitting, you confirm that:</p>
                <ul className="mt-2 space-y-1 text-sm text-blue-800">
                  <li className="flex items-center gap-2">
                    <svg className="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    The offer document is fully executed and signed
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    You are a licensed real estate agent
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Submission does not guarantee acceptance
                  </li>
                </ul>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-xl bg-gradient-to-r from-blue-900 to-blue-800 px-6 py-3.5 text-base font-semibold text-white shadow-lg transition-all hover:from-blue-800 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="h-5 w-5 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Submitting...
                  </span>
                ) : (
                  'Submit Offer'
                )}
              </button>
            </form>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-slate-400">
          Your submission will be time-stamped and recorded automatically.
        </p>
      </div>
    </div>
  );
}
