import { Skeleton } from '@/components/ui/skeleton';

export default function ForecastSkeleton() {
  return (
    <div className="w-full max-w-4xl">
      <Skeleton className="h-7 w-48 mb-4" />

      <div
        className="
          grid
          grid-cols-2
          md:grid-cols-4
          gap-4
        "
      >
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="
              rounded-2xl
              border
              p-4
              flex
              flex-col
              items-center
              gap-4
            "
          >
            <Skeleton className="h-4 w-12" />

            <Skeleton className="h-10 w-10 rounded-full" />

            <Skeleton className="h-6 w-16" />
          </div>
        ))}
      </div>
    </div>
  );
}