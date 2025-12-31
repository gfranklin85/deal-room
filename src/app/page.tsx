import Link from 'next/link';
import Header from '@/components/Header';
import BackgroundArtifacts from '@/components/BackgroundArtifacts';

// Star rating component
function StarRating({ rating = 5, size = 'sm' }: { rating?: number; size?: 'sm' | 'md' }) {
  const sizeClass = size === 'sm' ? 'h-4 w-4' : 'h-5 w-5';
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`${sizeClass} ${i < rating ? 'text-amber-400' : 'text-slate-200'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

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

            {/* Social proof bar */}
            <div className="mt-12 flex flex-wrap items-center gap-6 text-sm text-slate-500">
              <div className="flex items-center gap-2">
                <StarRating rating={5} />
                <span>4.9/5 rating</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span>500+ agents</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Free forever</span>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="border-y border-slate-100 bg-white py-12">
          <div className="mx-auto max-w-4xl px-6">
            <div className="grid grid-cols-3 gap-8 text-center">
              <div>
                <p className="text-4xl font-bold text-slate-900">500+</p>
                <p className="mt-1 text-sm text-slate-500">Agents</p>
              </div>
              <div>
                <div className="flex items-center justify-center gap-2">
                  <p className="text-4xl font-bold text-slate-900">4.9</p>
                  <StarRating rating={5} size="md" />
                </div>
                <p className="mt-1 text-sm text-slate-500">Average rating</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-slate-900">2 hrs</p>
                <p className="mt-1 text-sm text-slate-500">Saved per listing</p>
              </div>
            </div>
          </div>
        </section>

        {/* Trusted By Section */}
        <section className="py-12">
          <div className="mx-auto max-w-5xl px-6">
            <p className="text-center text-sm font-medium uppercase tracking-widest text-slate-400">
              Trusted by leading brokerages
            </p>
            {/* Replace these placeholders with actual logo images in public/logos/ */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
              <span className="text-lg font-medium text-slate-300">[Your Brokerage]</span>
              <span className="text-lg font-medium text-slate-300">[Your Brokerage]</span>
              <span className="text-lg font-medium text-slate-300">[Your Brokerage]</span>
              <span className="text-lg font-medium text-slate-300">[Your Brokerage]</span>
              <span className="text-lg font-medium text-slate-300">[Your Brokerage]</span>
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

        {/* Testimonials Section */}
        <section className="bg-slate-50 py-24 sm:py-32">
          <div className="mx-auto max-w-5xl px-6">
            <p className="text-center text-sm font-semibold uppercase tracking-widest text-blue-800">
              What agents are saying
            </p>
            <h2 className="mt-4 text-center text-3xl font-bold text-slate-900 sm:text-4xl">
              Trusted by professionals
            </h2>

            <div className="mt-16 grid gap-8 sm:grid-cols-3">
              {/* Testimonial 1 */}
              <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-100">
                <StarRating rating={5} />
                <p className="mt-4 text-slate-700">
                  &ldquo;We stopped explaining ourselves on every call. The transparency speaks for itself.&rdquo;
                </p>
                <div className="mt-6">
                  <p className="font-semibold text-slate-900">Sarah M.</p>
                  <p className="text-sm text-slate-500">Listing Agent</p>
                </div>
              </div>

              {/* Testimonial 2 */}
              <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-100">
                <StarRating rating={5} />
                <p className="mt-4 text-slate-700">
                  &ldquo;Buyers finally trust the process. No more &lsquo;did you get my offer?&rsquo; calls.&rdquo;
                </p>
                <div className="mt-6">
                  <p className="font-semibold text-slate-900">James R.</p>
                  <p className="text-sm text-slate-500">Buyer&apos;s Agent</p>
                </div>
              </div>

              {/* Testimonial 3 */}
              <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-100">
                <StarRating rating={5} />
                <p className="mt-4 text-slate-700">
                  &ldquo;Clean, simple, professional. Exactly what this industry needed.&rdquo;
                </p>
                <div className="mt-6">
                  <p className="font-semibold text-slate-900">Michelle T.</p>
                  <p className="text-sm text-slate-500">Broker</p>
                </div>
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
            <p className="mt-6 text-sm text-slate-500">
              No credit card required • Free forever
            </p>
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
