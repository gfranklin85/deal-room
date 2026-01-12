import Link from 'next/link';

interface HeaderProps {
  showBack?: boolean;
  backHref?: string;
  backLabel?: string;
  transparent?: boolean;
}

export default function Header({ showBack, backHref, backLabel, transparent }: HeaderProps) {
  return (
    <header className={`sticky top-0 z-50 ${transparent ? 'bg-transparent' : 'glass border-b border-slate-200/50'}`}>
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <div className="flex items-center gap-6">
          {showBack && backHref && (
            <Link
              href={backHref}
              className="flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-600 transition-all hover:bg-slate-200 hover:text-slate-900"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              <span>{backLabel || 'Back'}</span>
            </Link>
          )}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg shadow-blue-500/25 transition-transform group-hover:scale-105">
              <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
            <span className="text-xl font-semibold text-slate-900">Deal Room</span>
          </Link>
        </div>
        <nav className="flex items-center gap-2">
          <Link
            href="/"
            className="rounded-full px-4 py-2 text-sm font-medium text-slate-600 transition-all hover:bg-slate-100 hover:text-slate-900"
          >
            Home
          </Link>
          <Link
            href="/lobby/demo-123"
            className="rounded-full px-4 py-2 text-sm font-medium text-slate-600 transition-all hover:bg-slate-100 hover:text-slate-900"
          >
            Demo
          </Link>
          <Link
            href="/admin/new"
            className="ml-2 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 px-5 py-2 text-sm font-medium text-white shadow-lg shadow-blue-500/25 transition-all hover:shadow-xl hover:shadow-blue-500/30"
          >
            New Listing
          </Link>
        </nav>
      </div>
    </header>
  );
}
