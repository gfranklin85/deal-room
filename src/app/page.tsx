import Link from 'next/link';
import Header from '@/components/Header';

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="border-b border-slate-200 bg-white">
          <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24">
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              Keep sellers and buyers informed.<br />
              Keep yourself above board.
            </h1>
            <p className="mt-6 text-xl text-slate-600">
              A free Deal Room Lobby for submitting and tracking offers — clearly and fairly.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link
                href="/admin/new"
                className="inline-flex items-center justify-center rounded-lg bg-blue-900 px-8 py-4 text-lg font-semibold text-white shadow-sm transition-colors hover:bg-blue-800"
              >
                Create your free Deal Room Lobby
              </Link>
              <Link
                href="/lobby/demo-123"
                className="inline-flex items-center justify-center px-6 py-4 text-lg text-slate-600 hover:text-slate-900"
              >
                View a sample lobby
              </Link>
            </div>
          </div>
        </section>

        {/* What it does */}
        <section className="border-b border-slate-200">
          <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">What it does</h2>
            <ul className="mt-6 space-y-4">
              <li className="flex items-start gap-4">
                <svg className="mt-1 h-6 w-6 flex-shrink-0 text-blue-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-lg text-slate-700">One official place to submit offers</span>
              </li>
              <li className="flex items-start gap-4">
                <svg className="mt-1 h-6 w-6 flex-shrink-0 text-blue-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-lg text-slate-700">Time-stamped, auditable submissions</span>
              </li>
              <li className="flex items-start gap-4">
                <svg className="mt-1 h-6 w-6 flex-shrink-0 text-blue-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-lg text-slate-700">Clear deadlines and review windows</span>
              </li>
            </ul>
          </div>
        </section>

        {/* What it prevents */}
        <section className="border-b border-slate-200 bg-white">
          <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">What it prevents</h2>
            <ul className="mt-6 space-y-3 text-lg text-slate-600">
              <li className="flex items-start gap-3">
                <span className="text-slate-400">&ldquo;</span>
                <span>Did you get my offer?</span>
                <span className="text-slate-400">&rdquo;</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-slate-400">&ldquo;</span>
                <span>Why can&apos;t I see what&apos;s happening?</span>
                <span className="text-slate-400">&rdquo;</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-slate-400">&ldquo;</span>
                <span>You must be hiding something.</span>
                <span className="text-slate-400">&rdquo;</span>
              </li>
              <li className="flex items-start gap-4 pt-3 text-slate-700">
                <svg className="mt-1 h-6 w-6 flex-shrink-0 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                <span>Accidental off-channel submissions</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Who it's for */}
        <section className="border-b border-slate-200">
          <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
            <div className="grid gap-12 sm:grid-cols-2">
              <div>
                <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Designed for</h2>
                <ul className="mt-6 space-y-3 text-lg text-slate-700">
                  <li className="flex items-center gap-3">
                    <svg className="h-5 w-5 text-blue-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Listing agents
                  </li>
                  <li className="flex items-center gap-3">
                    <svg className="h-5 w-5 text-blue-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Buyer agents
                  </li>
                  <li className="flex items-center gap-3">
                    <svg className="h-5 w-5 text-blue-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Sellers who want clarity
                  </li>
                </ul>
              </div>
              <div>
                <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Not for</h2>
                <ul className="mt-6 space-y-3 text-lg text-slate-500">
                  <li className="flex items-center gap-3">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Price fishing
                  </li>
                  <li className="flex items-center gap-3">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Informal texts and emails
                  </li>
                  <li className="flex items-center gap-3">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Side deals
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Trust section */}
        <section className="border-b border-slate-200 bg-white">
          <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
            <h2 className="text-2xl font-semibold text-slate-900">Free. Neutral. No preference given.</h2>
            <ul className="mt-6 space-y-3 text-lg text-slate-600">
              <li className="flex items-center gap-3">
                <svg className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
                No offer prices shown
              </li>
              <li className="flex items-center gap-3">
                <svg className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
                No comparisons shown
              </li>
              <li className="flex items-center gap-3">
                <svg className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
                No recommendations made
              </li>
            </ul>
          </div>
        </section>

        {/* Compliance note */}
        <section className="border-b border-slate-200">
          <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
            <p className="text-base text-slate-500">
              Supports fair, consistent offer handling.<br />
              Does not replace contracts or broker systems.
            </p>
          </div>
        </section>

        {/* Final CTA */}
        <section className="bg-white">
          <div className="mx-auto max-w-4xl px-4 py-20 sm:px-6 sm:py-24">
            <div className="text-center">
              <Link
                href="/admin/new"
                className="inline-flex items-center justify-center rounded-lg bg-blue-900 px-10 py-5 text-xl font-semibold text-white shadow-sm transition-colors hover:bg-blue-800"
              >
                Create your free Deal Room Lobby
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
          <p className="text-center text-sm text-slate-400">
            Deal Room Lobby
          </p>
        </div>
      </footer>
    </div>
  );
}
