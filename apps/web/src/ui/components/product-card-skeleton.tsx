import { Card } from './card';
import { Skeleton } from './skeleton';

export function ProductCardSkeleton() {
  return (
    <Card className="overflow-hidden">
      {/* Image skeleton */}
      <Skeleton className="aspect-square w-full" />

      <div className="p-4 space-y-3">
        {/* Title skeleton */}
        <div className="space-y-2">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-6 w-1/2" />
        </div>

        {/* Price skeleton */}
        <Skeleton className="h-8 w-24" />

        {/* Button skeleton */}
        <Skeleton className="h-10 w-full" />
      </div>
    </Card>
  );
}
