import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getListing } from '@/lib/data';
import { OFFER_STATUS_LABELS, OfferStatus } from '@/types/listing';
import { format, isPast, parseISO } from 'date-fns';
import Header from '@/components/Header';

interface PageProps {
  params: Promise<{ id: string }>;
}

function getStatusStyle(status: OfferStatus): string {
  switch (status) {
    case 'no_offers':
      return 'bg-slate-100 text-slate-700';
    case 'offers_received':
      return 'bg-blue-100 text-blue-700';
    case 'multiple_offers':
      return 'bg-amber-100 text-amber-700';
    case 'review_in_progress':
      return 'bg-violet-100 text-violet-700';
    case 'deadline_passed':
      return 'bg-red-100 text-red-700';
    default:
      return 'bg-slate-100 text-slate-700';
  }
}

export default async function LobbyPage({ params }: PageProps) {
  const { id } = await params;
  const listing = getListing(id);

  if (!listing) {
    notFound();
  }

  const deadlinePassed = listing.offerDeadline && isPast(parseISO(listing.offerDeadline));
  const currentStatus = deadlinePassed ? 'deadline_passed' : listing.offerStatus;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
      <Header />

      <main className="mx-auto max-w-6xl px-6 py-10">
        <div className="grid gap-8 lg:grid-cols-5">
          {/* Left Column - Property Info (3 cols) */}
          <div className="space-y-6 lg:col-span-3">
            {/* Property Card */}
            <div className="overflow-hidden rounded-3xl bg-white shadow-lg shadow-slate-200/50 ring-1 ring-slate-100">
              {/* Property Image */}
              <div className="relative h-56 w-full bg-gradient-to-br from-slate-100 to-slate-200 sm:h-64">
                {listing.primaryPhoto ? (
                  <Image
                    src={listing.primaryPhoto}
                    alt={listing.address}
                    fill
                    className="object-cover"
                    priority
                  />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-white/80 shadow-lg">
                      <svg className="h-10 w-10 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                    </div>
                  </div>
                )}
                {/* Status Badge Overlay */}
                <div className="absolute bottom-4 left-4">
                  <span className={`inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold shadow-lg ${getStatusStyle(currentStatus)}`}>
                    {OFFER_STATUS_LABELS[currentStatus]}
                  </span>
                </div>
              </div>

              {/* Property Details */}
              <div className="p-6 sm:p-8">
                <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">{listing.address}</h1>
                <p className="mt-2 text-lg text-slate-600">{listing.city}, {listing.state} {listing.zip}</p>

                {(listing.beds || listing.baths || listing.sqft) && (
                  <div className="mt-5 flex flex-wrap gap-3">
                    {listing.beds && (
                      <div className="rounded-2xl bg-slate-100 px-4 py-2.5">
                        <span className="text-lg font-semibold text-slate-900">{listing.beds}</span>
                        <span className="ml-1 text-slate-600">beds</span>
                      </div>
                    )}
                    {listing.baths && (
                      <div className="rounded-2xl bg-slate-100 px-4 py-2.5">
                        <span className="text-lg font-semibold text-slate-900">{listing.baths}</span>
                        <span className="ml-1 text-slate-600">baths</span>
                      </div>
                    )}
                    {listing.sqft && (
                      <div className="rounded-2xl bg-slate-100 px-4 py-2.5">
                        <span className="text-lg font-semibold text-slate-900">{listing.sqft.toLocaleString()}</span>
                        <span className="ml-1 text-slate-600">sqft</span>
                      </div>
                    )}
                  </div>
                )}

                {listing.description && (
                  <p className="mt-5 text-lg text-slate-600 leading-relaxed">{listing.description}</p>
                )}

                {listing.offerDeadline && (
                  <div className="mt-6 flex items-center gap-3 rounded-2xl bg-gradient-to-r from-blue-50 to-violet-50 p-4 ring-1 ring-blue-100">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow">
                      <svg className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-600">Offer Deadline</p>
                      <p className="text-lg font-semibold text-slate-900">{format(parseISO(listing.offerDeadline), 'EEEE, MMMM d \'at\' h:mm a')}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* How It Works */}
            <div className="rounded-3xl bg-white p-6 shadow-lg shadow-slate-200/50 ring-1 ring-slate-100 sm:p-8">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg shadow-blue-500/25">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h2 className="text-xl font-semibold text-slate-900">How It Works</h2>
              </div>
              <p className="mt-5 text-lg text-slate-600 leading-relaxed">
                All offers are submitted through this Deal Room, creating a single, time-stamped record for complete transparency and fairness.
              </p>
              <div className="mt-6 flex items-center gap-3 rounded-2xl bg-amber-50 p-4 ring-1 ring-amber-200/50">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-amber-100">
                  <svg className="h-5 w-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <p className="text-base text-amber-800">
                  Offers sent by email, text, or voicemail are <strong>not</strong> considered submitted.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Submit Panel (2 cols) */}
          <div className="lg:col-span-2">
            <div className="sticky top-24 space-y-6">
              {/* Main CTA Card */}
              <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 to-violet-600 p-8 shadow-2xl shadow-blue-500/25">
                <h2 className="text-2xl font-bold text-white">Ready to submit?</h2>
                <p className="mt-2 text-blue-100">
                  Upload your offer document and complete the submission form.
                </p>

                <Link
                  href={`/lobby/${id}/submit`}
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-6 py-4 text-lg font-semibold text-blue-600 shadow-xl transition-all hover:shadow-2xl hover:-translate-y-0.5"
                >
                  Submit an Offer
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>

              {/* Requirements Card */}
              <div className="rounded-3xl bg-white p-6 shadow-lg shadow-slate-200/50 ring-1 ring-slate-100">
                <h3 className="text-lg font-semibold text-slate-900">Requirements</h3>
                <ul className="mt-4 space-y-3">
                  <li className="flex items-center gap-3 text-slate-700">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100">
                      <svg className="h-4 w-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    Fully executed offer document
                  </li>
                  <li className="flex items-center gap-3 text-slate-700">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100">
                      <svg className="h-4 w-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    Buyer agent license number
                  </li>
                  <li className="flex items-center gap-3 text-slate-700">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100">
                      <svg className="h-4 w-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    One submission per offer
                  </li>
                </ul>
              </div>

              {/* Rules Card */}
              <div className="rounded-3xl bg-slate-50 p-6 ring-1 ring-slate-200/50">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500">Submission Rules</h3>
                <ul className="mt-3 space-y-2 text-sm text-slate-600">
                  <li className="flex items-start gap-2">
                    <span className="text-slate-400">•</span>
                    Offers must be complete and signed
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-slate-400">•</span>
                    Timestamp is recorded automatically
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-slate-400">•</span>
                    Submission does not guarantee acceptance
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Footer note */}
        <p className="mt-12 text-center text-sm text-slate-400">
          All submissions are time-stamped and recorded to ensure a fair and transparent process.
        </p>
      </main>
    </div>
  );
}
