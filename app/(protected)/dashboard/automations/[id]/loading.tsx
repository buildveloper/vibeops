import { Skeleton } from "@/components/ui/skeleton";

export default function PlanDetailLoading() {
  return (
    <div>
      <Skeleton className="h-3 w-40" />
      <div className="mt-5 border-b border-line pb-6">
        <div className="flex gap-2">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-5 w-24" />
        </div>
        <Skeleton className="mt-4 h-10 w-2/3" />
        <Skeleton className="mt-3 h-4 w-1/2" />
      </div>

      <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_300px]">
        <div>
          <Skeleton className="h-3 w-20" />
          <Skeleton className="mt-3 h-24 w-full" />
          <Skeleton className="mt-10 h-3 w-20" />
          <div className="mt-5 space-y-6">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex gap-4">
                <Skeleton className="h-8 w-8 rounded-full" />
                <div className="flex-1">
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="mt-2 h-3 w-3/4" />
                  <Skeleton className="mt-3 h-3 w-2/3" />
                </div>
              </div>
            ))}
          </div>
        </div>
        <Skeleton className="h-72 w-full" />
      </div>
    </div>
  );
}
