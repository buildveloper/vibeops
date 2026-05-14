export default function AutomationsLoading() {
  return (
    <div className="space-y-8 animate-pulse">
      <div className="h-8 w-44 rounded bg-slate-800" />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {[1, 2].map((i) => (
          <div key={i} className="h-40 rounded-xl bg-slate-900/50" />
        ))}
      </div>
    </div>
  );
}
