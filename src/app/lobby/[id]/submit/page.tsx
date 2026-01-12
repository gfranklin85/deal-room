'use client';

import { useState, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Header from '@/components/Header';

export default function SubmitOfferPage() {
  const params = useParams();
  const router = useRouter();
  const listingId = params.id as string;
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    buyerAgentName: '',
    buyerAgentLicense: '',
    buyerAgentEmail: '',
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];
      if (!allowedTypes.includes(file.type)) {
        setError('Please upload a PDF or image file (PDF, JPG, PNG)');
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        setError('File size must be less than 10MB');
        return;
      }
      setError(null);
      setSelectedFile(file);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedFile) {
      setError('Please upload your offer document');
      return;
    }

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
          fileName: selectedFile.name,
          fileSize: selectedFile.size,
          fileType: selectedFile.type,
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

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
      <Header showBack backHref={`/lobby/${listingId}`} backLabel="Back" />

      <div className="mx-auto max-w-2xl px-6 py-10">
        {/* Page Header */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-violet-600 shadow-lg shadow-blue-500/25">
            <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-slate-900">Submit Your Offer</h1>
          <p className="mt-2 text-lg text-slate-600">
            Upload your offer document and provide your details
          </p>
        </div>

        {/* Main Form Card */}
        <div className="rounded-3xl bg-white p-8 shadow-lg shadow-slate-200/50 ring-1 ring-slate-100">
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

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* File Upload */}
            <div>
              <label className="block text-base font-semibold text-slate-900">
                Offer Document <span className="text-red-500">*</span>
              </label>
              <p className="mt-1 text-sm text-slate-500">
                Upload your fully executed offer (PDF, JPG, or PNG, max 10MB)
              </p>

              {!selectedFile ? (
                <div className="mt-3">
                  <label
                    htmlFor="offerDocument"
                    className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 px-6 py-12 transition-all hover:border-blue-400 hover:bg-blue-50/50"
                  >
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-lg">
                      <svg className="h-7 w-7 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                    </div>
                    <span className="mt-4 text-base font-medium text-slate-900">
                      Click to upload or drag and drop
                    </span>
                    <span className="mt-1 text-sm text-slate-500">
                      PDF, JPG, or PNG up to 10MB
                    </span>
                    <input
                      ref={fileInputRef}
                      type="file"
                      id="offerDocument"
                      accept=".pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                </div>
              ) : (
                <div className="mt-3 flex items-center justify-between rounded-2xl bg-emerald-50 px-5 py-4 ring-1 ring-emerald-200/50">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100">
                      <svg className="h-6 w-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-base font-medium text-slate-900 truncate max-w-[250px]">
                        {selectedFile.name}
                      </p>
                      <p className="text-sm text-slate-500">
                        {formatFileSize(selectedFile.size)}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleRemoveFile}
                    className="rounded-xl p-2 text-slate-400 transition-colors hover:bg-white hover:text-slate-600"
                  >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              )}
            </div>

            {/* Agent Details */}
            <div className="space-y-5 rounded-2xl bg-slate-50 p-6">
              <h3 className="text-base font-semibold text-slate-900">Agent Information</h3>

              <div>
                <label htmlFor="buyerAgentName" className="block text-sm font-medium text-slate-700">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="buyerAgentName"
                  name="buyerAgentName"
                  value={formData.buyerAgentName}
                  onChange={handleChange}
                  required
                  className="mt-1.5 block w-full rounded-xl border-0 bg-white px-4 py-3 text-base text-slate-900 shadow-sm ring-1 ring-slate-200 focus:ring-2 focus:ring-blue-500"
                  placeholder="Jane Smith"
                />
              </div>

              <div>
                <label htmlFor="buyerAgentLicense" className="block text-sm font-medium text-slate-700">
                  License Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="buyerAgentLicense"
                  name="buyerAgentLicense"
                  value={formData.buyerAgentLicense}
                  onChange={handleChange}
                  required
                  className="mt-1.5 block w-full rounded-xl border-0 bg-white px-4 py-3 text-base text-slate-900 shadow-sm ring-1 ring-slate-200 focus:ring-2 focus:ring-blue-500"
                  placeholder="RE-123456"
                />
              </div>

              <div>
                <label htmlFor="buyerAgentEmail" className="block text-sm font-medium text-slate-700">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="buyerAgentEmail"
                  name="buyerAgentEmail"
                  value={formData.buyerAgentEmail}
                  onChange={handleChange}
                  required
                  className="mt-1.5 block w-full rounded-xl border-0 bg-white px-4 py-3 text-base text-slate-900 shadow-sm ring-1 ring-slate-200 focus:ring-2 focus:ring-blue-500"
                  placeholder="agent@example.com"
                />
              </div>
            </div>

            {/* Confirmation */}
            <div className="rounded-2xl bg-gradient-to-r from-blue-50 to-violet-50 p-6 ring-1 ring-blue-100">
              <p className="text-base font-semibold text-slate-900">By submitting, you confirm that:</p>
              <ul className="mt-4 space-y-3">
                <li className="flex items-center gap-3 text-slate-700">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100">
                    <svg className="h-3.5 w-3.5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  The offer document is fully executed and signed
                </li>
                <li className="flex items-center gap-3 text-slate-700">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100">
                    <svg className="h-3.5 w-3.5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  You are a licensed real estate agent
                </li>
                <li className="flex items-center gap-3 text-slate-700">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100">
                    <svg className="h-3.5 w-3.5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  Submission does not guarantee acceptance
                </li>
              </ul>
            </div>

            <button
              type="submit"
              disabled={isSubmitting || !selectedFile}
              className="w-full rounded-2xl bg-gradient-to-r from-blue-600 to-violet-600 px-6 py-4 text-lg font-semibold text-white shadow-xl shadow-blue-500/25 transition-all hover:shadow-2xl hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:transform-none disabled:hover:shadow-xl"
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

        <p className="mt-8 text-center text-sm text-slate-400">
          Your submission will be time-stamped and recorded automatically.
        </p>
      </div>
    </div>
  );
}
