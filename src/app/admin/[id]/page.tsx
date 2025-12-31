'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header';
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
    showOfferCount: false,
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
        showOfferCount: data.showOfferCount || false,
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
          showOfferCount: formData.showOfferCount,
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
      <div className="flex min-h-screen flex-col bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100">
        <Header />
        <div className="flex flex-1 items-center justify-center">
          <div className="text-lg text-slate-600">Loading...</div>
        </div>
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="flex min-h-screen flex-col bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100">
        <Header />
        <div className="flex flex-1 items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-slate-900">Listing Not Found</h1>
            <Link href="/" className="mt-4 inline-block text-lg text-blue-600 hover:underline">
              Go Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100">
      <Header />

      <div className="mx-auto w-full max-w-5xl flex-1 px-4 py-8 sm:px-6">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-slate-900">Listing Admin</h1>
          <Link
            href={`/lobby/${listingId}`}
            className="inline-flex items-center gap-2 rounded-xl bg-blue-100 px-4 py-2 text-base font-medium text-blue-800 transition-colors hover:bg-blue-200"
            target="_blank"
          >
            View Lobby
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </Link>
        </div>

        {/* Listing Info */}
        <div className="mb-8 overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200/50">
          <div className="flex flex-col sm:flex-row">
            <div className="relative h-40 w-full bg-gradient-to-br from-slate-200 to-slate-300 sm:h-auto sm:w-56 sm:flex-shrink-0 lg:w-64">
              {listing.primaryPhoto ? (
                <Image
                  src={listing.primaryPhoto}
                  alt={listing.address}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center">
                  <svg className="h-16 w-16 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
              )}
            </div>
            <div className="flex-1 p-5 sm:p-6">
              <h2 className="text-2xl font-bold text-slate-900">{listing.address}</h2>
              <p className="mt-1 text-lg text-slate-600">
                {listing.city}, {listing.state} {listing.zip}
              </p>
              {(listing.beds || listing.baths || listing.sqft) && (
                <p className="mt-3 text-base text-slate-500">
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
                <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">Current Status</p>
                <p className="mt-2 inline-flex items-center rounded-full bg-blue-100 px-4 py-2 text-base font-medium text-blue-800">
                  {OFFER_STATUS_LABELS[listing.offerStatus]}
                </p>
                <p className="mt-2 text-sm text-slate-500">
                  Status updates automatically as offers are received
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Alerts */}
        {error && (
          <div className="mb-6 flex items-center gap-3 rounded-xl bg-red-50 px-4 py-4 text-base text-red-700">
            <svg className="h-5 w-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {error}
          </div>
        )}
        {success && (
          <div className="mb-6 flex items-center gap-3 rounded-xl bg-green-50 px-4 py-4 text-base text-green-700">
            <svg className="h-5 w-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            {success}
          </div>
        )}

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Settings Form */}
          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200/50 sm:p-8">
            <h2 className="mb-6 text-xl font-semibold text-slate-900">Listing Settings</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="description"
                  className="block text-base font-medium text-slate-700"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={3}
                  className="mt-2 block w-full rounded-xl border border-slate-300 px-4 py-3 text-base text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  placeholder="Brief description of the property..."
                />
              </div>

              <div>
                <label
                  htmlFor="offerDeadline"
                  className="block text-base font-medium text-slate-700"
                >
                  Offer Deadline (optional)
                </label>
                <input
                  type="datetime-local"
                  id="offerDeadline"
                  name="offerDeadline"
                  value={formData.offerDeadline}
                  onChange={handleChange}
                  className="mt-2 block w-full rounded-xl border border-slate-300 px-4 py-3 text-base text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div>
                <label
                  htmlFor="reviewWindow"
                  className="block text-base font-medium text-slate-700"
                >
                  Review Window (optional)
                </label>
                <input
                  type="text"
                  id="reviewWindow"
                  name="reviewWindow"
                  value={formData.reviewWindow}
                  onChange={handleChange}
                  className="mt-2 block w-full rounded-xl border border-slate-300 px-4 py-3 text-base text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  placeholder="e.g., Friday 2pm-5pm"
                />
              </div>

              {/* Offer Count Toggle */}
              <div className="rounded-xl bg-slate-50 p-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-6 items-center">
                    <input
                      type="checkbox"
                      id="showOfferCount"
                      name="showOfferCount"
                      checked={formData.showOfferCount}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          showOfferCount: e.target.checked,
                        }))
                      }
                      className="h-5 w-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="showOfferCount"
                      className="block text-base font-medium text-slate-900"
                    >
                      Show offer count publicly
                    </label>
                    <p className="mt-1 text-sm text-slate-500">
                      Display the number of offers received on the lobby page
                    </p>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={saving}
                className="w-full rounded-xl bg-gradient-to-r from-blue-900 to-blue-800 px-6 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:from-blue-800 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {saving ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="h-5 w-5 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Saving...
                  </span>
                ) : (
                  'Save Changes'
                )}
              </button>
            </form>
          </div>

          {/* Share Section */}
          <div className="space-y-6">
            <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200/50 sm:p-8">
              <h2 className="mb-4 text-xl font-semibold text-slate-900">Share Link</h2>
              <div className="flex gap-3">
                <input
                  type="text"
                  readOnly
                  value={lobbyUrl}
                  className="block w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-base text-slate-700"
                />
                <button
                  onClick={copyToClipboard}
                  className="flex-shrink-0 rounded-xl bg-slate-100 px-5 py-3 text-base font-medium text-slate-700 transition-colors hover:bg-slate-200"
                >
                  Copy
                </button>
              </div>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200/50 sm:p-8">
              <h2 className="mb-4 text-xl font-semibold text-slate-900">QR Code</h2>
              {qrCode ? (
                <div className="flex flex-col items-center">
                  <Image
                    src={qrCode}
                    alt="QR Code for lobby"
                    width={200}
                    height={200}
                    className="rounded-xl"
                  />
                  <p className="mt-4 text-center text-base text-slate-600">
                    Scan to access the Deal Room lobby
                  </p>
                  <a
                    href={qrCode}
                    download={`qrcode-${listingId}.png`}
                    className="mt-4 text-base text-blue-600 hover:underline"
                  >
                    Download QR Code
                  </a>
                </div>
              ) : (
                <div className="flex h-48 items-center justify-center rounded-xl bg-slate-100">
                  <p className="text-base text-slate-500">QR code loading...</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
