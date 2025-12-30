import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getListing } from '@/lib/data';
import { OFFER_STATUS_LABELS, OfferStatus } from '@/types/listing';
import { format, isPast, parseISO } from 'date-fns';

interface PageProps {
  params: Promise<{ id: string }>;
}

function getStatusStyle(status: OfferStatus): string {
  switch (status) {
    case 'no_offers':
      return 'bg-slate-100 text-slate-600';
    case 'offers_received':
      return 'bg-blue-100 text-blue-700';
    case 'multiple_offers':
      return 'bg-amber-100 text-amber-700';
    case 'review_in_progress':
      return 'bg-purple-100 text-purple-700';
    case 'deadline_passed':
      return 'bg-red-100 text-red-700';
    default:
      return 'bg-slate-100 text-slate-600';
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
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100">
      {/* Compact Header Bar */}
      <header className="flex-shrink-0 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white">
        <div className="mx-auto flex h-12 max-w-6xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-white/10">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
            <span className="text-sm font-medium text-blue-100">Deal Room</span>
          </div>
          <div className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusStyle(currentStatus)}`}>
            {OFFER_STATUS_LABELS[currentStatus]}
          </div>
        </div>
      </header>

      {/* Main Content - Flex grow to fill remaining space */}
      <main className="flex flex-1 flex-col px-4 py-4 sm:px-6 lg:py-5">
        <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-4 lg:flex-row lg:gap-5">

          {/* Left Column - Property Info */}
          <div className="flex flex-1 flex-col gap-3 lg:gap-4">
            {/* Property Card */}
            <div className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-slate-200/50">
              <div className="flex flex-col sm:flex-row">
                {/* Property Image - Smaller */}
                <div className="relative h-32 w-full bg-gradient-to-br from-slate-200 to-slate-300 sm:h-auto sm:w-44 sm:flex-shrink-0 lg:w-52">
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
                      <svg className="h-12 w-12 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                    </div>
                  )}
                </div>
                {/* Property Details - Compact */}
                <div className="flex-1 p-4">
                  <h1 className="text-lg font-bold text-slate-900 lg:text-xl">{listing.address}</h1>
                  <p className="text-sm text-slate-600">{listing.city}, {listing.state} {listing.zip}</p>
                  <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1">
                    {(listing.beds || listing.baths || listing.sqft) && (
                      <div className="flex gap-3 text-xs text-slate-500">
                        {listing.beds && <span><span className="font-medium">{listing.beds}</span> beds</span>}
                        {listing.baths && <span><span className="font-medium">{listing.baths}</span> baths</span>}
                        {listing.sqft && <span><span className="font-medium">{listing.sqft.toLocaleString()}</span> sqft</span>}
                      </div>
                    )}
                    {listing.offerDeadline && (
                      <div className="flex items-center gap-1.5 rounded bg-blue-50 px-2 py-1 text-xs text-blue-800">
                        <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="font-medium">Deadline:</span> {format(parseISO(listing.offerDeadline), 'MMM d \'at\' h:mm a')}
                      </div>
                    )}
                  </div>
                  {listing.description && (
                    <p className="mt-2 text-xs text-slate-500 line-clamp-2">{listing.description}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Process Info - Very Compact */}
            <div className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-200/50">
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-blue-100">
                  <svg className="h-4 w-4 text-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-sm font-semibold text-slate-900">How Offers Are Handled</h2>
                  <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                    All offers are submitted through this Deal Room, creating a single, time-stamped record for full transparency.
                  </p>
                </div>
              </div>
              <div className="mt-3 flex items-center gap-2 rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-800">
                <svg className="h-3.5 w-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <span>Offers sent by email, text, or voicemail are <span className="font-medium">not</span> considered submitted.</span>
              </div>
            </div>

            {/* Audit Notice - Desktop Footer */}
            <p className="mt-auto hidden text-center text-xs text-slate-400 lg:block">
              All submissions are time-stamped and recorded to ensure a fair and transparent process.
            </p>
          </div>

          {/* Right Column - Submit Panel */}
          <div className="w-full flex-shrink-0 lg:w-80">
            <div className="rounded-xl bg-gradient-to-b from-blue-900 to-blue-950 p-5 text-white shadow-xl">
              <h2 className="text-base font-semibold">Submit Your Offer</h2>

              <Link
                href={`/lobby/${id}/submit`}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-white to-blue-50 px-5 py-3 text-sm font-semibold text-blue-900 shadow-lg transition-all hover:from-blue-50 hover:to-blue-100 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-900"
              >
                Submit an Offer
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>

              {/* Requirements - Inline */}
              <div className="mt-4 border-t border-blue-800 pt-4">
                <p className="text-xs font-medium uppercase tracking-wide text-blue-300">Requirements</p>
                <div className="mt-2 grid gap-1.5 text-xs text-blue-100">
                  <div className="flex items-center gap-2">
                    <svg className="h-3.5 w-3.5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Fully executed offer document
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="h-3.5 w-3.5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Buyer agent license number
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="h-3.5 w-3.5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    One submission per offer
                  </div>
                </div>
              </div>

              {/* Submission Rules */}
              <div className="mt-4 rounded-lg bg-blue-950/50 p-3 text-xs text-blue-300">
                <p className="font-medium text-blue-200">Submission Rules</p>
                <ul className="mt-1.5 space-y-0.5 text-blue-300/80">
                  <li>• Offers must be complete and signed</li>
                  <li>• Timestamp recorded automatically</li>
                  <li>• Does not guarantee acceptance</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Footer */}
        <p className="mt-4 text-center text-xs text-slate-400 lg:hidden">
          All submissions are time-stamped and recorded to ensure a fair and transparent process.
        </p>
      </main>
    </div>
  );
}
