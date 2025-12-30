import Link from 'next/link';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function SubmitSuccessPage({ params }: PageProps) {
  const { id } = await params;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100">
      {/* Header Bar */}
      <header className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white shadow-lg">
        <div className="mx-auto max-w-6xl px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
            <span className="text-sm font-medium text-blue-100">Deal Room</span>
          </div>
        </div>
      </header>

      <div className="mx-auto flex min-h-[calc(100vh-56px)] max-w-xl items-center justify-center px-4 py-12 sm:px-6">
        <div className="w-full overflow-hidden rounded-2xl bg-white text-center shadow-sm ring-1 ring-slate-200/50">
          <div className="bg-gradient-to-r from-blue-900 to-blue-800 px-6 py-8">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/20">
              <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-white">Offer Submitted</h1>
            <p className="mt-2 text-blue-200">
              Your submission has been received and time-stamped.
            </p>
          </div>

          <div className="p-6">
            <div className="rounded-lg bg-blue-50 p-4 text-left">
              <h2 className="text-sm font-medium text-blue-900">What happens next?</h2>
              <ul className="mt-3 space-y-2 text-sm text-blue-800">
                <li className="flex items-start gap-2">
                  <svg className="mt-0.5 h-4 w-4 flex-shrink-0 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  The listing agent will review all submissions according to the stated process.
                </li>
                <li className="flex items-start gap-2">
                  <svg className="mt-0.5 h-4 w-4 flex-shrink-0 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  You will be contacted if your offer is selected for further consideration.
                </li>
              </ul>
            </div>

            <p className="mt-4 text-xs text-slate-500">
              Submission does not guarantee acceptance.
            </p>

            <Link
              href={`/lobby/${id}`}
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-slate-100 px-6 py-3 font-medium text-slate-700 transition-colors hover:bg-slate-200"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Return to Deal Room
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
