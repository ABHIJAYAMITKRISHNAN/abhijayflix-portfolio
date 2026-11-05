export function HomeSkeleton() {
  return (
    <div aria-busy="true" aria-label="Loading">
      <div className="skeleton h-[92svh] w-full md:h-[95vh]" />
      {[0, 1].map((r) => (
        <div key={r} className="px-4 py-6 md:px-12">
          <div className="skeleton mb-4 h-6 w-64 rounded" />
          <div className="flex gap-3 overflow-hidden">
            {Array.from({ length: 6 }, (_, i) => <div key={i} className="skeleton aspect-[2/3] w-40 shrink-0 rounded-md md:w-56" />)}
          </div>
        </div>
      ))}
    </div>
  );
}

export function DetailSkeleton() {
  return (
    <div aria-busy="true" aria-label="Loading">
      <div className="skeleton h-[70vh] w-full" />
      <div className="space-y-3 px-4 py-8 md:px-12">
        <div className="skeleton h-6 w-1/3 rounded" />
        <div className="skeleton h-4 w-2/3 rounded" />
        <div className="skeleton h-4 w-1/2 rounded" />
      </div>
    </div>
  );
}
