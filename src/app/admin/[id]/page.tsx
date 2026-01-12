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
      setTimeout(() => setSuccess(null), 3000);
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
      <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
        <Header />
        <div className="flex min-h-[calc(100vh-64px)] items-center justify-center">
          <div className="text-lg text-slate-500">Loading...</div>
        </div>
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
        <Header />
        <div className="flex min-h-[calc(100vh-64px)] items-center justify-center">
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
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
      <Header />

      <div className="mx-auto max-w-6xl px-6 py-10">
        {/* Page Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Listing Admin</h1>
            <p className="mt-1 text-slate-600">Manage your Deal Room settings</p>
          </div>
          <Link
            href={`/lobby/${listingId}`}
            className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-violet-600 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-blue-500/25 transition-all hover:shadow-xl"
            target="_blank"
          >
            View Lobby
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </Link>
        </div>

        {/* Property Card */}
        <div className="mb-8 overflow-hidden rounded-3xl bg-white shadow-lg shadow-slate-200/50 ring-1 ring-slate-100">
          <div className="flex flex-col md:flex-row">
            <div className="relative h-48 w-full bg-gradient-to-br from-slate-100 to-slate-200 md:h-auto md:w-72">
              {listing.primaryPhoto ? (
                <Image
                  src={listing.primaryPhoto}
                  alt={listing.address}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/80 shadow">
                    <svg className="h-8 w-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                  </div>
                </div>
              )}
            </div>
            <div className="flex-1 p-6 md:p-8">
              <h2 className="text-2xl font-bold text-slate-900">{listing.address}</h2>
              <p className="mt-1 text-lg text-slate-600">
                {listing.city}, {listing.state} {listing.zip}
              </p>
              {(listing.beds || listing.baths || listing.sqft) && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {listing.beds && (
                    <span className="rounded-full bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-700">
                      {listing.beds} beds
                    </span>
                  )}
                  {listing.baths && (
                    <span className="rounded-full bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-700">
                      {listing.baths} baths
                    </span>
                  )}
                  {listing.sqft && (
                    <span className="rounded-full bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-700">
                      {listing.sqft.toLocaleString()} sqft
                    </span>
                  )}
                </div>
              )}
              <div className="mt-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Current Status</p>
                <span className="mt-2 inline-flex items-center rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
                  {OFFER_STATUS_LABELS[listing.offerStatus]}
                </span>
                <p className="mt-2 text-sm text-slate-500">
                  Status updates automatically as offers are received
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Alerts */}
        {error && (
          <div className="mb-6 flex items-center gap-3 rounded-2xl bg-red-50 px-5 py-4 ring-1 ring-red-100">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-red-100">
              <svg className="h-5 w-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-base text-red-700">{error}</p>
          </div>
        )}
        {success && (
          <div className="mb-6 flex items-center gap-3 rounded-2xl bg-emerald-50 px-5 py-4 ring-1 ring-emerald-100">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-emerald-100">
              <svg className="h-5 w-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-base text-emerald-700">{success}</p>
          </div>
        )}

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Settings Form */}
          <div className="rounded-3xl bg-white p-8 shadow-lg shadow-slate-200/50 ring-1 ring-slate-100">
            <h2 className="mb-6 text-xl font-semibold text-slate-900">Listing Settings</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-slate-700">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={3}
                  className="mt-1.5 block w-full rounded-xl border-0 bg-slate-50 px-4 py-3 text-base text-slate-900 shadow-sm ring-1 ring-slate-200 focus:ring-2 focus:ring-blue-500"
                  placeholder="Brief description of the property..."
                />
              </div>

              <div>
                <label htmlFor="offerDeadline" className="block text-sm font-medium text-slate-700">
                  Offer Deadline (optional)
                </label>
                <input
                  type="datetime-local"
                  id="offerDeadline"
                  name="offerDeadline"
                  value={formData.offerDeadline}
                  onChange={handleChange}
                  className="mt-1.5 block w-full rounded-xl border-0 bg-slate-50 px-4 py-3 text-base text-slate-900 shadow-sm ring-1 ring-slate-200 focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="reviewWindow" className="block text-sm font-medium text-slate-700">
                  Review Window (optional)
                </label>
                <input
                  type="text"
                  id="reviewWindow"
                  name="reviewWindow"
                  value={formData.reviewWindow}
                  onChange={handleChange}
                  className="mt-1.5 block w-full rounded-xl border-0 bg-slate-50 px-4 py-3 text-base text-slate-900 shadow-sm ring-1 ring-slate-200 focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Friday 2pm-5pm"
                />
              </div>

              <button
                type="submit"
                disabled={saving}
                className="w-full rounded-2xl bg-gradient-to-r from-blue-600 to-violet-600 px-6 py-4 text-lg font-semibold text-white shadow-xl shadow-blue-500/25 transition-all hover:shadow-2xl hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:transform-none"
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
            {/* Share Link Card */}
            <div className="rounded-3xl bg-white p-8 shadow-lg shadow-slate-200/50 ring-1 ring-slate-100">
              <h2 className="mb-4 text-xl font-semibold text-slate-900">Share Link</h2>
              <p className="mb-4 text-sm text-slate-600">
                Share this link with buyers to submit their offers
              </p>
              <div className="flex gap-3">
                <input
                  type="text"
                  readOnly
                  value={lobbyUrl}
                  className="block w-full rounded-xl border-0 bg-slate-50 px-4 py-3 text-base text-slate-700 ring-1 ring-slate-200"
                />
                <button
                  onClick={copyToClipboard}
                  className="flex-shrink-0 rounded-xl bg-slate-100 px-5 py-3 text-base font-medium text-slate-700 transition-colors hover:bg-slate-200"
                >
                  Copy
                </button>
              </div>
            </div>

            {/* QR Code Card */}
            <div className="rounded-3xl bg-white p-8 shadow-lg shadow-slate-200/50 ring-1 ring-slate-100">
              <h2 className="mb-4 text-xl font-semibold text-slate-900">QR Code</h2>
              {qrCode ? (
                <div className="flex flex-col items-center">
                  <div className="rounded-2xl bg-white p-4 shadow-lg ring-1 ring-slate-100">
                    <Image
                      src={qrCode}
                      alt="QR Code for lobby"
                      width={180}
                      height={180}
                    />
                  </div>
                  <p className="mt-4 text-center text-sm text-slate-600">
                    Scan to access the Deal Room lobby
                  </p>
                  <a
                    href={qrCode}
                    download={`qrcode-${listingId}.png`}
                    className="mt-4 inline-flex items-center gap-2 text-base font-medium text-blue-600 hover:text-blue-700"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Download QR Code
                  </a>
                </div>
              ) : (
                <div className="flex h-48 items-center justify-center rounded-2xl bg-slate-50">
                  <p className="text-base text-slate-500">Loading QR code...</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
