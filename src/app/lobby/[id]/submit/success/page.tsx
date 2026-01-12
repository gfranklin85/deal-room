import Link from 'next/link';
import Header from '@/components/Header';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function SubmitSuccessPage({ params }: PageProps) {
  const { id } = await params;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
      <Header />

      <div className="mx-auto flex min-h-[calc(100vh-64px)] max-w-xl items-center justify-center px-6 py-12">
        <div className="w-full text-center">
          {/* Success Icon */}
          <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-emerald-500 shadow-2xl shadow-emerald-500/30">
            <svg className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>

          {/* Success Message */}
          <h1 className="text-4xl font-bold text-slate-900">Offer Submitted!</h1>
          <p className="mx-auto mt-4 max-w-sm text-lg text-slate-600">
            Your submission has been received and time-stamped.
          </p>

          {/* What's Next Card */}
          <div className="mt-10 rounded-3xl bg-white p-8 text-left shadow-lg shadow-slate-200/50 ring-1 ring-slate-100">
            <h2 className="text-lg font-semibold text-slate-900">What happens next?</h2>
            <ul className="mt-5 space-y-4">
              <li className="flex items-start gap-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-blue-100">
                  <svg className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-slate-900">Review Period</p>
                  <p className="mt-1 text-slate-600">
                    The listing agent will review all submissions according to the stated process.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-violet-100">
                  <svg className="h-5 w-5 text-violet-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-slate-900">You&apos;ll Be Contacted</p>
                  <p className="mt-1 text-slate-600">
                    You will be contacted if your offer is selected for further consideration.
                  </p>
                </div>
              </li>
            </ul>
          </div>

          {/* Disclaimer */}
          <p className="mt-6 text-sm text-slate-400">
            Submission does not guarantee acceptance.
          </p>

          {/* Return Button */}
          <Link
            href={`/lobby/${id}`}
            className="mt-8 inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-100 px-8 py-4 text-lg font-semibold text-slate-700 transition-all hover:bg-slate-200"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Return to Deal Room
          </Link>
        </div>
      </div>
    </div>
  );
}
