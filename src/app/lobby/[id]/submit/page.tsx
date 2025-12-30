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
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Link
            href={`/lobby/${listingId}`}
            className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900"
          >
            <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Lobby
          </Link>
        </div>

        <div className="rounded-xl bg-white p-6 shadow-sm sm:p-8">
          <h1 className="text-2xl font-bold text-gray-900">Submit an Offer</h1>
          <p className="mt-2 text-gray-600">
            Complete the form below to submit your offer. All fields are required.
          </p>

          {error && (
            <div className="mt-4 rounded-lg bg-red-50 p-4 text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-6 space-y-6">
            <div>
              <label
                htmlFor="buyerAgentName"
                className="block text-sm font-medium text-gray-700"
              >
                Buyer&apos;s Agent Name
              </label>
              <input
                type="text"
                id="buyerAgentName"
                name="buyerAgentName"
                value={formData.buyerAgentName}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Jane Smith"
              />
            </div>

            <div>
              <label
                htmlFor="buyerAgentLicense"
                className="block text-sm font-medium text-gray-700"
              >
                License Number
              </label>
              <input
                type="text"
                id="buyerAgentLicense"
                name="buyerAgentLicense"
                value={formData.buyerAgentLicense}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="RE-123456"
              />
            </div>

            <div>
              <label
                htmlFor="buyerAgentEmail"
                className="block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <input
                type="email"
                id="buyerAgentEmail"
                name="buyerAgentEmail"
                value={formData.buyerAgentEmail}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="agent@example.com"
              />
            </div>

            <div className="rounded-lg bg-gray-50 p-4">
              <p className="text-sm text-gray-600">
                By submitting, you confirm that:
              </p>
              <ul className="mt-2 ml-4 list-disc text-sm text-gray-600">
                <li>The offer document is fully executed and signed</li>
                <li>You are a licensed real estate agent</li>
                <li>You understand that submission does not guarantee acceptance</li>
              </ul>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-lg bg-blue-600 px-6 py-3 text-lg font-semibold text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Offer'}
            </button>
          </form>
        </div>

        <p className="mt-6 text-center text-sm text-gray-400">
          Your submission will be time-stamped and recorded automatically.
        </p>
      </div>
    </div>
  );
}
