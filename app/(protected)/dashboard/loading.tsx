import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardLoading() {
  return (
    <div>
      <div className="border-b border-line pb-6">
        <Skeleton className="h-3 w-28" />
        <Skeleton className="mt-4 h-10 w-72 max-w-full" />
        <Skeleton className="mt-3 h-4 w-56 max-w-full" />
      </div>

      <div className="mt-8">
        <Skeleton className="h-5 w-36" />
        <div className="mt-3 border-t border-line">
          {[1, 2, 3].map((item) => (
            <div key={item} className="border-b border-line py-5">
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="mt-2 h-3 w-28" />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10">
        <Skeleton className="h-4 w-28" />
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <Skeleton key={item} className="h-36 w-full" />
          ))}
        </div>
      </div>
    </div>
  );
}
