'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Listing, OFFER_STATUS_LABELS } from '@/types/listing';

export default function AdminPage() {
  const params = useParams();
  const listingId = params.id as string;

  const [listing, setListing] = useState<Listing | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [qrCode, setQrCode] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    description: '',
    offerDeadline: '',
    reviewWindow: '',
  });

  const fetchListing = useCallback(async () => {
    try {
      const response = await fetch(`/api/listings/${listingId}`);
      if (!response.ok) {
        throw new Error('Listing not found');
      }
      const data = await response.json();
      setListing(data);
      setFormData({
        description: data.description || '',
        offerDeadline: data.offerDeadline
          ? new Date(data.offerDeadline).toISOString().slice(0, 16)
          : '',
        reviewWindow: data.reviewWindow || '',
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load listing');
    } finally {
      setLoading(false);
    }
  }, [listingId]);

  const fetchQRCode = useCallback(async () => {
    try {
      const response = await fetch(`/api/listings/${listingId}/qrcode`);
      if (response.ok) {
        const data = await response.json();
        setQrCode(data.qrCode);
      }
    } catch {
      // QR code is optional, don't show error
    }
  }, [listingId]);

  useEffect(() => {
    fetchListing();
    fetchQRCode();
  }, [fetchListing, fetchQRCode]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch(`/api/listings/${listingId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          description: formData.description || undefined,
          offerDeadline: formData.offerDeadline
            ? new Date(formData.offerDeadline).toISOString()
            : undefined,
          reviewWindow: formData.reviewWindow || undefined,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update listing');
      }

      const updated = await response.json();
      setListing(updated);
      setSuccess('Listing updated successfully');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const lobbyUrl =
    typeof window !== 'undefined' ? `${window.location.origin}/lobby/${listingId}` : '';

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(lobbyUrl);
      setSuccess('Link copied to clipboard!');
      setTimeout(() => setSuccess(null), 3000);
    } catch {
      setError('Failed to copy link');
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Listing Not Found</h1>
          <Link href="/" className="mt-4 text-blue-600 hover:underline">
            Go Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Listing Admin</h1>
          <Link
            href={`/lobby/${listingId}`}
            className="text-blue-600 hover:underline"
            target="_blank"
          >
            View Lobby
          </Link>
        </div>

        {/* Listing Info */}
        <div className="mb-8 rounded-xl bg-white p-6 shadow-sm">
          <div className="flex gap-6">
            <div className="relative h-32 w-48 flex-shrink-0 overflow-hidden rounded-lg bg-gray-200">
              {listing.primaryPhoto ? (
                <Image
                  src={listing.primaryPhoto}
                  alt={listing.address}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center">
                  <svg
                    className="h-12 w-12 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                </div>
              )}
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-gray-900">{listing.address}</h2>
              <p className="text-gray-600">
                {listing.city}, {listing.state} {listing.zip}
              </p>
              {(listing.beds || listing.baths || listing.sqft) && (
                <p className="mt-2 text-sm text-gray-500">
                  {[
                    listing.beds && `${listing.beds} beds`,
                    listing.baths && `${listing.baths} baths`,
                    listing.sqft && `${listing.sqft.toLocaleString()} sqft`,
                  ]
                    .filter(Boolean)
                    .join(' | ')}
                </p>
              )}
              {/* Current Offer Status - Auto-updated */}
              <div className="mt-4">
                <p className="text-xs font-medium uppercase tracking-wide text-gray-500">Current Status</p>
                <p className="mt-1 inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800">
                  {OFFER_STATUS_LABELS[listing.offerStatus]}
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  Status updates automatically as offers are received
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Alerts */}
        {error && (
          <div className="mb-6 rounded-lg bg-red-50 p-4 text-red-700">{error}</div>
        )}
        {success && (
          <div className="mb-6 rounded-lg bg-green-50 p-4 text-green-700">{success}</div>
        )}

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Settings Form */}
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold text-gray-900">Listing Settings</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={3}
                  className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Brief description of the property..."
                />
              </div>

              <div>
                <label
                  htmlFor="offerDeadline"
                  className="block text-sm font-medium text-gray-700"
                >
                  Offer Deadline (optional)
                </label>
                <input
                  type="datetime-local"
                  id="offerDeadline"
                  name="offerDeadline"
                  value={formData.offerDeadline}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label
                  htmlFor="reviewWindow"
                  className="block text-sm font-medium text-gray-700"
                >
                  Review Window (optional)
                </label>
                <input
                  type="text"
                  id="reviewWindow"
                  name="reviewWindow"
                  value={formData.reviewWindow}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="e.g., Friday 2pm-5pm"
                />
              </div>

              <button
                type="submit"
                disabled={saving}
                className="w-full rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </form>
          </div>

          {/* Share Section */}
          <div className="space-y-6">
            <div className="rounded-xl bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-lg font-semibold text-gray-900">Share Link</h2>
              <div className="flex gap-2">
                <input
                  type="text"
                  readOnly
                  value={lobbyUrl}
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 text-sm text-gray-700"
                />
                <button
                  onClick={copyToClipboard}
                  className="flex-shrink-0 rounded-lg bg-gray-100 px-4 py-2 font-medium text-gray-700 transition-colors hover:bg-gray-200"
                >
                  Copy
                </button>
              </div>
            </div>

            <div className="rounded-xl bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-lg font-semibold text-gray-900">QR Code</h2>
              {qrCode ? (
                <div className="flex flex-col items-center">
                  <Image
                    src={qrCode}
                    alt="QR Code for lobby"
                    width={200}
                    height={200}
                    className="rounded-lg"
                  />
                  <p className="mt-4 text-center text-sm text-gray-600">
                    Scan to access the Deal Room lobby
                  </p>
                  <a
                    href={qrCode}
                    download={`qrcode-${listingId}.png`}
                    className="mt-4 text-blue-600 hover:underline"
                  >
                    Download QR Code
                  </a>
                </div>
              ) : (
                <div className="flex h-48 items-center justify-center rounded-lg bg-gray-100">
                  <p className="text-gray-500">QR code loading...</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
