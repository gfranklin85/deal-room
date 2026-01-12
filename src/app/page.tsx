import Link from 'next/link';
import Header from '@/components/Header';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
      <Header />

      <main className="pb-24">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute left-1/2 top-0 -translate-x-1/2 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-blue-100 to-purple-100 opacity-50 blur-3xl" />
          </div>

          <div className="mx-auto max-w-5xl px-6 pt-20 pb-16 sm:pt-28 sm:pb-24">
            <div className="text-center">
              <h1 className="text-5xl font-bold tracking-tight text-slate-900 sm:text-6xl lg:text-7xl">
                Keep everyone
                <span className="block mt-2 bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
                  on the same page
                </span>
              </h1>
              <p className="mx-auto mt-8 max-w-2xl text-xl text-slate-600 leading-relaxed">
                A free Deal Room Lobby for submitting and tracking real estate offers — clearly, fairly, and transparently.
              </p>
              <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <Link
                  href="/admin/new"
                  className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-4 text-lg font-semibold text-white shadow-xl shadow-blue-500/25 transition-all hover:shadow-2xl hover:shadow-blue-500/30 hover:-translate-y-0.5"
                >
                  Create your Deal Room
                  <svg className="h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link
                  href="/lobby/demo-123"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-8 py-4 text-lg font-semibold text-slate-700 shadow-lg shadow-slate-200/50 ring-1 ring-slate-200 transition-all hover:shadow-xl hover:ring-slate-300"
                >
                  View demo
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="mx-auto max-w-5xl px-6 py-16">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* Feature 1 */}
            <div className="group rounded-3xl bg-white p-8 shadow-lg shadow-slate-200/50 ring-1 ring-slate-100 transition-all hover:shadow-xl hover:-translate-y-1">
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg shadow-blue-500/30">
                <svg className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-900">One official place</h3>
              <p className="mt-3 text-slate-600 leading-relaxed">
                A single destination to submit offers. No more confusion about where to send documents.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group rounded-3xl bg-white p-8 shadow-lg shadow-slate-200/50 ring-1 ring-slate-100 transition-all hover:shadow-xl hover:-translate-y-1">
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-lg shadow-emerald-500/30">
                <svg className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-900">Time-stamped</h3>
              <p className="mt-3 text-slate-600 leading-relaxed">
                Every submission is automatically logged with a timestamp for complete transparency.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group rounded-3xl bg-white p-8 shadow-lg shadow-slate-200/50 ring-1 ring-slate-100 transition-all hover:shadow-xl hover:-translate-y-1">
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-violet-600 shadow-lg shadow-violet-500/30">
                <svg className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-900">Fully auditable</h3>
              <p className="mt-3 text-slate-600 leading-relaxed">
                Complete audit trail of all submissions. Protect yourself and your clients.
              </p>
            </div>
          </div>
        </section>

        {/* Problems it solves */}
        <section className="mx-auto max-w-5xl px-6 py-16">
          <div className="rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 p-10 sm:p-14">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-blue-400">No more of this</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-3">
              <div className="rounded-2xl bg-white/5 p-6 backdrop-blur">
                <p className="text-lg text-white/90">&ldquo;Did you get my offer?&rdquo;</p>
                <p className="mt-2 text-sm text-white/50">Uncertainty eliminated</p>
              </div>
              <div className="rounded-2xl bg-white/5 p-6 backdrop-blur">
                <p className="text-lg text-white/90">&ldquo;Why can&apos;t I see what&apos;s happening?&rdquo;</p>
                <p className="mt-2 text-sm text-white/50">Full visibility</p>
              </div>
              <div className="rounded-2xl bg-white/5 p-6 backdrop-blur">
                <p className="text-lg text-white/90">&ldquo;You must be hiding something.&rdquo;</p>
                <p className="mt-2 text-sm text-white/50">Transparent process</p>
              </div>
            </div>
          </div>
        </section>

        {/* Who it's for */}
        <section className="mx-auto max-w-5xl px-6 py-16">
          <div className="grid gap-8 sm:grid-cols-2">
            <div className="rounded-3xl bg-white p-10 shadow-lg shadow-slate-200/50 ring-1 ring-slate-100">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100">
                <svg className="h-6 w-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-900">Designed for</h3>
              <ul className="mt-6 space-y-4">
                <li className="flex items-center gap-3 text-slate-700">
                  <div className="h-2 w-2 rounded-full bg-emerald-500" />
                  Listing agents
                </li>
                <li className="flex items-center gap-3 text-slate-700">
                  <div className="h-2 w-2 rounded-full bg-emerald-500" />
                  Buyer agents
                </li>
                <li className="flex items-center gap-3 text-slate-700">
                  <div className="h-2 w-2 rounded-full bg-emerald-500" />
                  Sellers who want clarity
                </li>
              </ul>
            </div>

            <div className="rounded-3xl bg-white p-10 shadow-lg shadow-slate-200/50 ring-1 ring-slate-100">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-red-100">
                <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-900">Not for</h3>
              <ul className="mt-6 space-y-4">
                <li className="flex items-center gap-3 text-slate-500">
                  <div className="h-2 w-2 rounded-full bg-slate-300" />
                  Price fishing
                </li>
                <li className="flex items-center gap-3 text-slate-500">
                  <div className="h-2 w-2 rounded-full bg-slate-300" />
                  Informal texts and emails
                </li>
                <li className="flex items-center gap-3 text-slate-500">
                  <div className="h-2 w-2 rounded-full bg-slate-300" />
                  Side deals
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Trust banner */}
        <section className="mx-auto max-w-5xl px-6 py-16">
          <div className="rounded-3xl bg-gradient-to-r from-blue-50 to-violet-50 p-10 sm:p-14 ring-1 ring-blue-100">
            <div className="flex flex-col items-center text-center">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-lg">
                <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-slate-900">Free. Neutral. Fair.</h2>
              <p className="mt-4 max-w-lg text-lg text-slate-600">
                No offer prices shown. No comparisons made. No recommendations given. Just a clean, fair process.
              </p>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="mx-auto max-w-5xl px-6 py-16">
          <div className="rounded-3xl bg-gradient-to-br from-blue-600 to-violet-600 p-10 sm:p-16 text-center shadow-2xl shadow-blue-500/25">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Ready to create your Deal Room?
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-lg text-blue-100">
              Set up your lobby in seconds. It&apos;s free and takes less than a minute.
            </p>
            <Link
              href="/admin/new"
              className="mt-10 inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-10 py-5 text-xl font-semibold text-blue-600 shadow-xl transition-all hover:shadow-2xl hover:-translate-y-0.5"
            >
              Get started for free
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-5xl px-6 py-12">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600">
                <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <span className="text-lg font-semibold text-slate-900">Deal Room</span>
            </div>
            <p className="text-sm text-slate-500">
              Supports fair, consistent offer handling.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
