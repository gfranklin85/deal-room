import Link from 'next/link';
import Header from '@/components/Header';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function SubmitSuccessPage({ params }: PageProps) {
  const { id } = await params;

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100">
      <Header showBack backHref={`/lobby/${id}`} backLabel="Back to Lobby" />

      <div className="flex flex-1 items-center justify-center px-4 py-12 sm:px-6">
        <div className="w-full max-w-xl overflow-hidden rounded-2xl bg-white text-center shadow-sm ring-1 ring-slate-200/50">
          <div className="bg-gradient-to-r from-blue-900 to-blue-800 px-6 py-8">
            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-white/20">
              <svg className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-white">Offer Submitted</h1>
            <p className="mt-3 text-lg text-blue-200">
              Your submission has been received and time-stamped.
            </p>
          </div>

          <div className="p-6 sm:p-8">
            <div className="rounded-xl bg-blue-50 p-5 text-left">
              <h2 className="text-base font-semibold text-blue-900">What happens next?</h2>
              <ul className="mt-4 space-y-3 text-base text-blue-800">
                <li className="flex items-start gap-3">
                  <svg className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  The listing agent will review all submissions according to the stated process.
                </li>
                <li className="flex items-start gap-3">
                  <svg className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  You will be contacted if your offer is selected for further consideration.
                </li>
              </ul>
            </div>

            <p className="mt-5 text-sm text-slate-500">
              Submission does not guarantee acceptance.
            </p>

            <Link
              href={`/lobby/${id}`}
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-slate-100 px-6 py-4 text-lg font-medium text-slate-700 transition-colors hover:bg-slate-200"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
