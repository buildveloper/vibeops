import { Skeleton } from "@/components/ui/skeleton";

export default function AutomationsLoading() {
  return (
    <div>
      <div className="border-b border-line pb-6">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="mt-4 h-10 w-64 max-w-full" />
        <Skeleton className="mt-3 h-4 w-52 max-w-full" />
      </div>

      <div className="mt-6 flex items-center justify-between border-y border-line py-4">
        <Skeleton className="h-4 w-48" />
        <Skeleton className="h-5 w-20" />
      </div>

      <div className="mt-8">
        {[1, 2, 3].map((item) => (
          <div key={item} className="border-b border-line py-5">
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="mt-2 h-3 w-40" />
          </div>
        ))}
      </div>
    </div>
  );
}
