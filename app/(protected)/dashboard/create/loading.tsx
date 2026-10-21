import { Skeleton } from "@/components/ui/skeleton";

export default function CreateLoading() {
  return (
    <div>
      <div className="border-b border-line pb-6">
        <Skeleton className="h-3 w-28" />
        <Skeleton className="mt-4 h-10 w-64 max-w-full" />
        <Skeleton className="mt-3 h-4 w-80 max-w-full" />
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        <div className="space-y-6">
          {[1, 2, 3].map((item) => (
            <div key={item} className="border-t border-line pt-5">
              <Skeleton className="h-3 w-24" />
              <Skeleton className="mt-4 h-4 w-40" />
              <Skeleton className="mt-3 h-28 w-full" />
            </div>
          ))}
        </div>
        <Skeleton className="h-[560px] w-full" />
      </div>
    </div>
  );
}
