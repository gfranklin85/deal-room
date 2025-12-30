import Link from 'next/link';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function SubmitSuccessPage({ params }: PageProps) {
  const { id } = await params;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-xl bg-white p-8 text-center shadow-sm">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <svg
              className="h-8 w-8 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Offer Submitted</h1>
          <p className="mt-4 text-gray-600">
            Your offer has been received and time-stamped. The listing agent will review all
            submissions according to the stated process.
          </p>
          <p className="mt-4 text-sm text-gray-500">
            Submission does not guarantee acceptance. You will be contacted if your offer is
            selected for further consideration.
          </p>
          <Link
            href={`/lobby/${id}`}
            className="mt-8 inline-flex items-center rounded-lg bg-gray-100 px-6 py-3 font-medium text-gray-700 transition-colors hover:bg-gray-200"
          >
            Return to Deal Room
          </Link>
        </div>
      </div>
    </div>
  );
}
