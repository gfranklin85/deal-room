import Link from 'next/link';
import Header from '@/components/Header';
import BackgroundArtifacts from '@/components/BackgroundArtifacts';
import ProductMockup from '@/components/ProductMockup';
import FAQAccordion from '@/components/FAQAccordion';

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
        {/* Hero Section - Mercury-inspired minimalist */}
        <section className="relative bg-hero-gradient">
          <div className="absolute inset-0 bg-radial-glow" />
          <div className="relative mx-auto max-w-6xl px-6 py-24 sm:py-32 lg:py-40">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Left: Copy and CTAs */}
              <div>
                <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
                  The fair way to handle offers.
                </h1>
                <p className="mt-6 max-w-xl text-xl text-slate-600">
                  One official channel. Time-stamped. Free.
                </p>

                <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
                  <Link
                    href="/admin/new"
                    className="inline-flex items-center justify-center rounded-xl bg-blue-900 px-8 py-4 text-lg font-semibold text-white cta-glow hover:bg-blue-800"
                  >
                    Open a Deal Room
                  </Link>
                  <Link
                    href="/lobby/demo-123"
                    className="inline-flex items-center gap-2 px-4 py-4 text-lg text-slate-600 transition-colors hover:text-slate-900"
                  >
                    See how it works
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>

                <p className="mt-6 text-sm text-slate-500">
                  Free forever. No account needed.
                </p>
              </div>

              {/* Right: Product Mockup */}
              <div className="hidden lg:block">
                <ProductMockup className="transform rotate-1 hover:rotate-0 transition-transform duration-300" />
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-24 sm:py-32">
          <div className="mx-auto max-w-5xl px-6">
            <p className="text-sm font-semibold uppercase tracking-widest text-blue-800">
              How it works
            </p>
            <h2 className="mt-4 text-3xl font-bold text-slate-900 sm:text-4xl">
              Three simple steps
            </h2>

            <div className="mt-16 grid gap-8 sm:grid-cols-3">
              {/* Step 1 */}
              <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-100">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50">
                  <svg className="h-6 w-6 text-blue-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <h3 className="mt-6 text-lg font-semibold text-slate-900">
                  Create a Deal Room
                </h3>
                <p className="mt-3 text-slate-600">
                  Set up in seconds. Get a shareable link for your listing.
                </p>
              </div>

              {/* Step 2 */}
              <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-100">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50">
                  <svg className="h-6 w-6 text-blue-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                </div>
                <h3 className="mt-6 text-lg font-semibold text-slate-900">
                  Share the link
                </h3>
                <p className="mt-3 text-slate-600">
                  One official channel for all offers. No more chasing emails.
                </p>
              </div>

              {/* Step 3 */}
              <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-100">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50">
                  <svg className="h-6 w-6 text-blue-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="mt-6 text-lg font-semibold text-slate-900">
                  Review with confidence
                </h3>
                <p className="mt-3 text-slate-600">
                  Every submission time-stamped. Fully auditable.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Role-Specific Section */}
        <section className="py-20 sm:py-24 bg-slate-50">
          <div className="mx-auto max-w-5xl px-6">
            <p className="text-center text-sm font-semibold uppercase tracking-widest text-blue-800">
              For everyone in the transaction
            </p>
            <h2 className="mt-4 text-center text-3xl font-bold text-slate-900 sm:text-4xl">
              Built for real estate professionals
            </h2>

            <div className="mt-16 grid gap-6 sm:grid-cols-3">
              {/* Listing Agents */}
              <div className="rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100/50 p-6 ring-1 ring-blue-100">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="mt-5 text-lg font-semibold text-slate-900">Listing Agents</h3>
                <p className="mt-3 text-base text-slate-600">
                  Create a fair submission link in seconds. Share one official channel for all offers.
                </p>
                <Link
                  href="/admin/new"
                  className="mt-5 inline-flex items-center gap-1 text-base font-medium text-blue-700 hover:text-blue-800"
                >
                  Create a lobby
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>

              {/* Buyer Agents */}
              <div className="rounded-2xl bg-gradient-to-br from-green-50 to-green-100/50 p-6 ring-1 ring-green-100">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-600">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="mt-5 text-lg font-semibold text-slate-900">Buyer Agents</h3>
                <p className="mt-3 text-base text-slate-600">
                  Upload offers for your clients through the official channel. Get time-stamped confirmation.
                </p>
                <Link
                  href="/lobby/demo-123"
                  className="mt-5 inline-flex items-center gap-1 text-base font-medium text-green-700 hover:text-green-800"
                >
                  See how it works
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>

              {/* Buyers */}
              <div className="rounded-2xl bg-gradient-to-br from-amber-50 to-amber-100/50 p-6 ring-1 ring-amber-100">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-600">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 className="mt-5 text-lg font-semibold text-slate-900">Buyers</h3>
                <p className="mt-3 text-base text-slate-600">
                  Submit your offer securely. Know it was received with an official time-stamped receipt.
                </p>
                <p className="mt-5 text-sm text-slate-500">
                  Your agent will share the lobby link with you
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-24 sm:py-32">
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

        {/* FAQ Section */}
        <section className="py-24 sm:py-32 bg-slate-50">
          <div className="mx-auto max-w-3xl px-6">
            <h2 className="text-center text-3xl font-bold text-slate-900 sm:text-4xl">
              Frequently asked questions
            </h2>
            <p className="mt-4 text-center text-lg text-slate-600">
              Everything you need to know about Deal Room.
            </p>
            <div className="mt-12">
              <FAQAccordion />
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24 sm:py-32">
          <div className="mx-auto max-w-3xl px-6 text-center">
            <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
              Ready to handle offers fairly?
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Create your Deal Room in seconds.
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
              No credit card. No account. Just paste a link.
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
