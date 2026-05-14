export default function DashboardLoading() {
  return (
    <div className="space-y-8 animate-pulse">
      <div className="h-8 w-40 rounded bg-slate-800" />
      <div className="h-4 w-64 rounded bg-slate-800" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-24 rounded-xl bg-slate-900/50" />
        ))}
      </div>
      <div className="h-16 rounded-xl bg-slate-900/50" />
    </div>
  );
}
