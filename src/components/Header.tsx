import Link from 'next/link';

interface HeaderProps {
  showBack?: boolean;
  backHref?: string;
  backLabel?: string;
}

export default function Header({ showBack, backHref, backLabel }: HeaderProps) {
  return (
    <header className="flex-shrink-0 border-b border-blue-800 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-4">
          {showBack && backHref && (
            <Link
              href={backHref}
              className="flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-sm text-blue-200 transition-colors hover:bg-white/10 hover:text-white"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span className="hidden sm:inline">{backLabel || 'Back'}</span>
            </Link>
          )}
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
            <span className="text-lg font-semibold">Deal Room</span>
          </Link>
        </div>
        <nav className="flex items-center gap-1">
          <Link
            href="/"
            className="rounded-lg px-3 py-2 text-sm font-medium text-blue-100 transition-colors hover:bg-white/10 hover:text-white"
          >
            Home
          </Link>
          <Link
            href="/lobby/demo-123"
            className="rounded-lg px-3 py-2 text-sm font-medium text-blue-100 transition-colors hover:bg-white/10 hover:text-white"
          >
            Demo Lobby
          </Link>
        </nav>
      </div>
    </header>
  );
}
