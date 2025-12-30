import Link from 'next/link';
import Header from '@/components/Header';
import BackgroundArtifacts from '@/components/BackgroundArtifacts';

export default function LandingPage() {
  return (
    <div className="relative min-h-screen grain-overlay">
      <BackgroundArtifacts />
      <Header />

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="relative bg-hero-gradient">
          <div className="absolute inset-0 bg-radial-glow" />
          <div className="relative mx-auto max-w-4xl px-6 py-24 sm:py-32 lg:py-40">
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Transparent offer handling.
            </h1>
            <p className="mt-6 max-w-2xl text-xl text-slate-600">
              One place for all offers. Time-stamped. Auditable. Fair.
            </p>
            <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link
                href="/admin/new"
                className="inline-flex items-center justify-center rounded-xl bg-blue-900 px-8 py-4 text-lg font-semibold text-white cta-glow hover:bg-blue-800"
              >
                Get started free
              </Link>
              <Link
                href="/lobby/demo-123"
                className="inline-flex items-center gap-2 px-6 py-4 text-lg text-slate-600 transition-colors hover:text-slate-900"
              >
                View a sample
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 sm:py-32">
          <div className="mx-auto max-w-5xl px-6">
            <p className="text-sm font-semibold uppercase tracking-widest text-blue-800">
              How it works
            </p>
            <h2 className="mt-4 text-3xl font-bold text-slate-900 sm:text-4xl">
              One official place for offers
            </h2>

            <div className="mt-16 grid gap-8 sm:grid-cols-3">
              {/* Feature 1 */}
              <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-100">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50">
                  <svg className="h-6 w-6 text-blue-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="mt-6 text-lg font-semibold text-slate-900">
                  Submit offers
                </h3>
                <p className="mt-3 text-slate-600">
                  One official channel. No more chasing emails or texts.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-100">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50">
                  <svg className="h-6 w-6 text-blue-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="mt-6 text-lg font-semibold text-slate-900">
                  Time-stamped
                </h3>
                <p className="mt-3 text-slate-600">
                  Every submission recorded with exact timing. Auditable.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-100">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50">
                  <svg className="h-6 w-6 text-blue-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="mt-6 text-lg font-semibold text-slate-900">
                  Fair process
                </h3>
                <p className="mt-3 text-slate-600">
                  Clear deadlines. Review windows. No surprises.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Section */}
        <section className="py-20 sm:py-24">
          <div className="mx-auto max-w-3xl px-6 text-center">
            <h2 className="text-2xl font-semibold text-slate-900 sm:text-3xl">
              Free. Neutral. No preference given.
            </h2>
            <p className="mt-6 text-lg text-slate-500">
              No prices shown. No comparisons. No recommendations.<br />
              Just fair, transparent handling.
            </p>
          </div>
        </section>

        {/* Who It's For */}
        <section className="py-20 sm:py-24">
          <div className="mx-auto max-w-3xl px-6 text-center">
            <h2 className="text-2xl font-semibold text-slate-900 sm:text-3xl">
              Built for agents who value transparency
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Listing agents. Buyer agents. Sellers who want clarity.
            </p>
          </div>
        </section>

        {/* Compliance Note */}
        <section className="py-12">
          <div className="mx-auto max-w-3xl px-6 text-center">
            <p className="text-base text-slate-400">
              Supports fair, consistent offer handling.<br />
              Does not replace contracts or broker systems.
            </p>
          </div>
        </section>

        {/* Final CTA */}
        <section className="bg-hero-gradient py-24 sm:py-32">
          <div className="mx-auto max-w-3xl px-6 text-center">
            <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
              Ready to get started?
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Create your Deal Room Lobby in seconds.
            </p>
            <div className="mt-10">
              <Link
                href="/admin/new"
                className="inline-flex items-center justify-center rounded-xl bg-blue-900 px-10 py-5 text-xl font-semibold text-white cta-glow hover:bg-blue-800"
              >
                Get started free
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-200 py-10">
        <div className="mx-auto max-w-4xl px-6">
          <p className="text-center text-sm text-slate-400">
            Deal Room Lobby
          </p>
        </div>
      </footer>
    </div>
  );
}
