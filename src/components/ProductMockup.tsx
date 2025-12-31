interface ProductMockupProps {
  className?: string;
}

export default function ProductMockup({ className = '' }: ProductMockupProps) {
  return (
    <div className={`rounded-2xl bg-slate-800 shadow-2xl overflow-hidden ${className}`}>
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-3 bg-slate-700">
        <div className="h-3 w-3 rounded-full bg-red-500" />
        <div className="h-3 w-3 rounded-full bg-yellow-500" />
        <div className="h-3 w-3 rounded-full bg-green-500" />
        <span className="ml-4 text-sm text-slate-400">
          dealroom.app/lobby/abc123
        </span>
      </div>

      {/* Content */}
      <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-6">
        {/* Property header */}
        <div className="flex items-start gap-4 mb-6">
          <div className="h-16 w-20 rounded-lg bg-slate-200 flex-shrink-0" />
          <div className="flex-1 space-y-2">
            <div className="h-5 w-3/4 rounded bg-slate-300" />
            <div className="h-4 w-1/2 rounded bg-slate-200" />
          </div>
        </div>

        {/* Deadline badge */}
        <div className="flex items-center gap-2 mb-6">
          <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center">
            <svg className="h-3 w-3 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="h-4 w-32 rounded bg-slate-200" />
        </div>

        {/* Form fields */}
        <div className="space-y-4 mb-6">
          <div className="space-y-1">
            <div className="h-3 w-20 rounded bg-slate-200" />
            <div className="h-10 w-full rounded-lg bg-white border border-slate-200" />
          </div>
          <div className="space-y-1">
            <div className="h-3 w-24 rounded bg-slate-200" />
            <div className="h-10 w-full rounded-lg bg-white border border-slate-200" />
          </div>
        </div>

        {/* Submit button */}
        <div className="h-12 w-full rounded-xl bg-blue-600 flex items-center justify-center">
          <span className="text-white font-medium text-sm">Submit Offer</span>
        </div>
      </div>
    </div>
  );
}
