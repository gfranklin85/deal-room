import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getListing } from '@/lib/data';
import { OFFER_STATUS_LABELS, OfferStatus } from '@/types/listing';
import { format, isPast, parseISO } from 'date-fns';

interface PageProps {
  params: Promise<{ id: string }>;
}

function getStatusColor(status: OfferStatus): string {
  switch (status) {
    case 'no_offers':
      return 'bg-gray-100 text-gray-700 border-gray-200';
    case 'offers_received':
      return 'bg-blue-50 text-blue-700 border-blue-200';
    case 'multiple_offers':
      return 'bg-amber-50 text-amber-700 border-amber-200';
    case 'review_in_progress':
      return 'bg-purple-50 text-purple-700 border-purple-200';
    case 'deadline_passed':
      return 'bg-red-50 text-red-700 border-red-200';
    default:
      return 'bg-gray-100 text-gray-700 border-gray-200';
  }
}

export default async function LobbyPage({ params }: PageProps) {
  const { id } = await params;
  const listing = getListing(id);

  if (!listing) {
    notFound();
  }

  const deadlinePassed = listing.offerDeadline && isPast(parseISO(listing.offerDeadline));

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Section 1: Listing Header */}
        <header className="mb-8 overflow-hidden rounded-xl bg-white shadow-sm">
          <div className="relative h-64 w-full bg-gray-200">
            {listing.primaryPhoto ? (
              <Image
                src={listing.primaryPhoto}
                alt={`${listing.address}`}
                fill
                className="object-cover"
                priority
              />
            ) : (
              <div className="flex h-full items-center justify-center">
                <svg
                  className="h-16 w-16 text-gray-400"
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
          <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-900">{listing.address}</h1>
            <p className="mt-1 text-lg text-gray-600">
              {listing.city}, {listing.state} {listing.zip}
            </p>
            {listing.description && (
              <p className="mt-3 text-gray-600">{listing.description}</p>
            )}
            {(listing.beds || listing.baths || listing.sqft) && (
              <div className="mt-4 flex gap-4 text-sm text-gray-500">
                {listing.beds && <span>{listing.beds} beds</span>}
                {listing.baths && <span>{listing.baths} baths</span>}
                {listing.sqft && <span>{listing.sqft.toLocaleString()} sqft</span>}
              </div>
            )}
          </div>
        </header>

        {/* Section 2: Process Explanation */}
        <section className="mb-8 rounded-xl bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900">
            How Offers Are Handled for This Property
          </h2>
          <div className="mt-4 space-y-4 text-gray-600">
            <p>All offers for this property are submitted through this Deal Room.</p>
            <p>
              This creates a single, time-stamped record so that every buyer and seller knows:
            </p>
            <ul className="ml-6 list-disc space-y-1">
              <li>where offers go</li>
              <li>when they were received</li>
              <li>how and when they will be reviewed</li>
            </ul>
            <p className="rounded-lg bg-amber-50 p-4 text-amber-800">
              Offers sent by email, text, or voicemail are not considered submitted.
            </p>
          </div>
        </section>

        {/* Section 3: Current Offer Status */}
        <section className="mb-8 rounded-xl bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900">Current Status</h2>
          <div
            className={`mt-4 inline-flex items-center rounded-full border px-4 py-2 text-sm font-medium ${getStatusColor(
              deadlinePassed ? 'deadline_passed' : listing.offerStatus
            )}`}
          >
            {deadlinePassed
              ? OFFER_STATUS_LABELS.deadline_passed
              : OFFER_STATUS_LABELS[listing.offerStatus]}
          </div>
          {listing.offerDeadline && (
            <div className="mt-4 text-gray-600">
              <p className="font-medium">Offer Deadline:</p>
              <p>{format(parseISO(listing.offerDeadline), 'EEEE, MMMM d, yyyy \'at\' h:mm a')}</p>
            </div>
          )}
          {listing.reviewWindow && (
            <div className="mt-3 text-gray-600">
              <p className="font-medium">Review Window:</p>
              <p>{listing.reviewWindow}</p>
            </div>
          )}
        </section>

        {/* Section 4: Submit an Offer */}
        <section className="mb-8 rounded-xl bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900">Ready to Submit?</h2>
          <div className="mt-4 space-y-4">
            <p className="text-gray-600">Before submitting, please ensure you have:</p>
            <ul className="ml-6 list-disc space-y-1 text-gray-600">
              <li>A fully executed offer document</li>
              <li>Your buyer agent license number</li>
              <li>One submission per offer</li>
            </ul>
            <Link
              href={`/lobby/${id}/submit`}
              className="mt-4 inline-flex w-full items-center justify-center rounded-lg bg-blue-600 px-6 py-3 text-lg font-semibold text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:w-auto"
            >
              Submit an Offer
            </Link>
          </div>
        </section>

        {/* Section 5: Submission Rules */}
        <section className="mb-8 rounded-xl bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900">Submission Rules</h2>
          <ul className="mt-4 ml-6 list-disc space-y-2 text-gray-600">
            <li>Offers must be complete and signed</li>
            <li>Submission timestamp is recorded automatically</li>
            <li>All offers are reviewed according to the process stated above</li>
            <li>Submission does not guarantee acceptance</li>
          </ul>
        </section>

        {/* Section 6: Audit & Fairness Notice */}
        <footer className="text-center text-sm text-gray-400">
          <p>
            All submissions are time-stamped and recorded to ensure a fair and transparent process.
          </p>
        </footer>
      </div>
    </div>
  );
}
