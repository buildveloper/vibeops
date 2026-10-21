import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardLoading() {
  return (
    <div>
      <div className="border-b border-line pb-6">
        <Skeleton className="h-3 w-28" />
        <Skeleton className="mt-4 h-10 w-72 max-w-full" />
        <Skeleton className="mt-3 h-4 w-56 max-w-full" />
      </div>

      <div className="mt-8 grid grid-cols-1 border-y border-line sm:grid-cols-3">
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="border-b border-line py-5 last:border-b-0 sm:border-b-0 sm:border-l sm:border-line sm:px-6 sm:first:border-l-0 sm:first:pl-0"
          >
            <Skeleton className="h-3 w-20" />
            <Skeleton className="mt-3 h-8 w-16" />
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_300px]">
        <div>
          <Skeleton className="h-5 w-28" />
          <div className="mt-3 border-t border-line">
            {[1, 2, 3].map((item) => (
              <div key={item} className="border-b border-line py-5">
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="mt-2 h-3 w-28" />
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-8">
          <Skeleton className="h-36 w-full" />
          <div>
            <Skeleton className="h-4 w-24" />
            <div className="mt-3 space-y-3">
              {[1, 2, 3].map((item) => (
                <Skeleton key={item} className="h-10 w-full" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
