import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function PokemonCardSkeleton() {
  return (
    <Card className="overflow-hidden w-full max-w-[280px]">
      <CardHeader className="p-4 flex items-center space-x-2">
        <Skeleton className="h-5 w-12" />
        <Skeleton className="h-5 w-24" />
      </CardHeader>
      <CardContent className="p-3 space-y-3">
        <Skeleton className="h-[180px] w-full rounded-lg" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-1/4" />
          <div className="flex gap-1">
            <Skeleton className="h-5 w-16" />
            <Skeleton className="h-5 w-16" />
          </div>
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-1/4" />
          <div className="flex gap-1">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-20" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
