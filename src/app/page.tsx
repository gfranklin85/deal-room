import Link from 'next/link';
import { getAllListings } from '@/lib/data';

export default function HomePage() {
  const listings = getAllListings();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Deal Room</h1>
          <p className="mt-2 text-gray-600">
            A transparent, auditable offer submission system for real estate transactions.
          </p>
        </header>

        <div className="mb-8 rounded-xl bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold text-gray-900">Active Listings</h2>
          {listings.length === 0 ? (
            <p className="text-gray-600">No active listings.</p>
          ) : (
            <div className="space-y-4">
              {listings.map((listing) => (
                <div
                  key={listing.id}
                  className="flex items-center justify-between rounded-lg border border-gray-200 p-4"
                >
                  <div>
                    <h3 className="font-medium text-gray-900">{listing.address}</h3>
                    <p className="text-sm text-gray-600">
                      {listing.city}, {listing.state} {listing.zip}
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <Link
                      href={`/lobby/${listing.id}`}
                      className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                    >
                      View Lobby
                    </Link>
                    <Link
                      href={`/admin/${listing.id}`}
                      className="rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200"
                    >
                      Admin
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="rounded-xl bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold text-gray-900">Create New Listing</h2>
          <Link
            href="/admin/new"
            className="inline-flex items-center rounded-lg bg-green-600 px-6 py-3 font-medium text-white hover:bg-green-700"
          >
            + Create Listing
          </Link>
        </div>

        <footer className="mt-12 text-center text-sm text-gray-400">
          <p>Deal Room MVP - Transparent offer submission for real estate</p>
        </footer>
      </div>
    </div>
  );
}
