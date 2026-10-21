import { Skeleton } from "@/components/ui/skeleton";

export default function SettingsLoading() {
  return (
    <div>
      <div className="border-b border-line pb-6">
        <Skeleton className="h-3 w-20" />
        <Skeleton className="mt-4 h-10 w-40" />
        <Skeleton className="mt-3 h-4 w-56" />
      </div>

      <div className="mt-2 max-w-2xl space-y-7 py-7">
        <div className="border-b border-line pb-7">
          <Skeleton className="h-5 w-24" />
          <Skeleton className="mt-2 h-4 w-72 max-w-full" />
          <Skeleton className="mt-5 h-20 w-full max-w-md" />
        </div>
        <div className="border-b border-line pb-7">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="mt-3 h-4 w-64" />
          <Skeleton className="mt-4 h-2 w-full max-w-md" />
        </div>
      </div>
    </div>
  );
}
