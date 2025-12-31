import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getListing, getOfferCount } from '@/lib/data';
import { OFFER_STATUS_LABELS, OfferStatus } from '@/types/listing';
import { isPast, parseISO } from 'date-fns';
import Header from '@/components/Header';
import CountdownTimer from '@/components/CountdownTimer';

interface PageProps {
  params: Promise<{ id: string }>;
}

function getStatusStyle(status: OfferStatus): string {
  switch (status) {
    case 'no_offers':
      return 'bg-slate-100 text-slate-700';
    case 'offers_received':
      return 'bg-blue-100 text-blue-800';
    case 'multiple_offers':
      return 'bg-amber-100 text-amber-800';
    case 'review_in_progress':
      return 'bg-purple-100 text-purple-800';
    case 'deadline_passed':
      return 'bg-red-100 text-red-800';
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
  const offerCount = listing.showOfferCount ? getOfferCount(id) : null;

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100">
      <Header />

      {/* Main Content */}
      <main className="flex flex-1 flex-col px-4 py-6 sm:px-6 lg:py-8">
        <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-6 lg:flex-row lg:gap-8">

          {/* Left Column - Property Info */}
          <div className="flex flex-1 flex-col gap-5">
            {/* Property Card */}
            <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200/50">
              <div className="flex flex-col sm:flex-row">
                {/* Property Image */}
                <div className="relative h-40 w-full bg-gradient-to-br from-slate-200 to-slate-300 sm:h-auto sm:w-56 sm:flex-shrink-0 lg:w-64">
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
                      <svg className="h-16 w-16 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                    </div>
                  )}
                </div>
                {/* Property Details */}
                <div className="flex-1 p-5 sm:p-6">
                  <h1 className="text-2xl font-bold text-slate-900">{listing.address}</h1>
                  <p className="mt-1 text-lg text-slate-600">{listing.city}, {listing.state} {listing.zip}</p>
                  <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
                    {(listing.beds || listing.baths || listing.sqft) && (
                      <div className="flex gap-4 text-base text-slate-500">
                        {listing.beds && <span><span className="font-semibold">{listing.beds}</span> beds</span>}
                        {listing.baths && <span><span className="font-semibold">{listing.baths}</span> baths</span>}
                        {listing.sqft && <span><span className="font-semibold">{listing.sqft.toLocaleString()}</span> sqft</span>}
                      </div>
                    )}
                  </div>
                  {listing.description && (
                    <p className="mt-3 text-base text-slate-600">{listing.description}</p>
                  )}
                  <div className="mt-4 flex flex-wrap items-center gap-3">
                    <span className={`inline-flex items-center rounded-full px-3 py-1.5 text-sm font-medium ${getStatusStyle(currentStatus)}`}>
                      {OFFER_STATUS_LABELS[currentStatus]}
                    </span>
                    {offerCount !== null && offerCount > 0 && (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-3 py-1.5 text-sm font-medium text-green-800">
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        {offerCount} {offerCount === 1 ? 'offer' : 'offers'} received
                      </span>
                    )}
                    {listing.offerDeadline && (
                      <CountdownTimer deadline={listing.offerDeadline} />
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Process Info */}
            <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200/50 sm:p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-blue-100">
                  <svg className="h-5 w-5 text-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h2 className="text-lg font-semibold text-slate-900">How Offers Are Handled</h2>
                  <p className="mt-2 text-base text-slate-600 leading-relaxed">
                    All offers are submitted through this Deal Room, creating a single, time-stamped record for full transparency.
                  </p>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-3 rounded-xl bg-amber-50 px-4 py-3 text-base text-amber-800">
                <svg className="h-5 w-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <span>Offers sent by email, text, or voicemail are <span className="font-semibold">not</span> considered submitted.</span>
              </div>
            </div>

            {/* Audit Notice - Desktop */}
            <p className="mt-auto hidden text-center text-sm text-slate-400 lg:block">
              All submissions are time-stamped and recorded to ensure a fair and transparent process.
            </p>
          </div>

          {/* Right Column - Submit Panel */}
          <div className="w-full flex-shrink-0 lg:w-96">
            <div className="rounded-2xl bg-gradient-to-b from-blue-900 to-blue-950 p-6 text-white shadow-xl sm:p-7">
              <h2 className="text-xl font-semibold">Submit Your Offer</h2>

              <Link
                href={`/lobby/${id}/submit`}
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-white to-blue-50 px-6 py-4 text-lg font-semibold text-blue-900 shadow-lg transition-all hover:from-blue-50 hover:to-blue-100 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-900"
              >
                Submit an Offer
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>

              {/* Requirements */}
              <div className="mt-6 border-t border-blue-800 pt-5">
                <p className="text-sm font-semibold uppercase tracking-wide text-blue-300">Requirements</p>
                <div className="mt-3 grid gap-2.5 text-base text-blue-100">
                  <div className="flex items-center gap-3">
                    <svg className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Fully executed offer document
                  </div>
                  <div className="flex items-center gap-3">
                    <svg className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Buyer agent license number
                  </div>
                  <div className="flex items-center gap-3">
                    <svg className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    One submission per offer
                  </div>
                </div>
              </div>

              {/* Submission Rules */}
              <div className="mt-5 rounded-xl bg-blue-950/50 p-4 text-sm text-blue-300">
                <p className="font-semibold text-blue-200">Submission Rules</p>
                <ul className="mt-2 space-y-1">
                  <li>• Offers must be complete and signed</li>
                  <li>• Timestamp recorded automatically</li>
                  <li>• Does not guarantee acceptance</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Footer */}
        <p className="mt-6 text-center text-sm text-slate-400 lg:hidden">
          All submissions are time-stamped and recorded to ensure a fair and transparent process.
        </p>
      </main>
    </div>
  );
}
