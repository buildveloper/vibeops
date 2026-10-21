import { Skeleton } from "@/components/ui/skeleton";

export default function ExamplesLoading() {
  return (
    <div>
      <div className="border-b border-line pb-6">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="mt-4 h-10 w-48" />
        <Skeleton className="mt-3 h-4 w-96 max-w-full" />
      </div>

      <div className="mt-8 flex gap-2 border-b border-line pb-5">
        {[1, 2, 3, 4, 5].map((item) => (
          <Skeleton key={item} className="h-7 w-16" />
        ))}
      </div>

      <div>
        {[1, 2, 3, 4].map((item) => (
          <div key={item} className="border-b border-line py-7">
            <div className="grid gap-4 md:grid-cols-[48px_1fr_1fr]">
              <Skeleton className="h-4 w-6" />
              <div>
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="mt-2 h-3 w-1/2" />
              </div>
              <Skeleton className="h-4 w-1/2" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
