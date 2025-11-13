import { Skeleton } from '@/components/ui/skeleton';

export function PokemonCardSkeleton() {
  return (
    <div className="backface-hidden">
      <div className="bg-white rounded-2xl sm:rounded-3xl border-2 sm:border-4 border-primary/20 p-4 sm:p-6 shadow-xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden group h-full flex flex-col">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        <div className="relative z-10 flex flex-col h-full">
          {/* Header with name and ID */}
          <div className="flex items-start justify-between mb-3 sm:mb-4">
            <Skeleton className="h-6 sm:h-8 w-24 sm:w-32" />
            <Skeleton className="h-5 sm:h-6 w-12 sm:w-16" />
          </div>

          {/* Image container */}
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl sm:rounded-2xl p-3 sm:p-5 mb-3 sm:mb-4 border-2 border-primary/10 shadow-inner flex-shrink-0">
            <Skeleton className="w-full h-32 sm:h-44 rounded-lg" />
          </div>

          {/* Types and Abilities sections */}
          <div className="space-y-3 sm:space-y-4 flex-1">
            {/* Types section */}
            <div>
              <Skeleton className="h-4 sm:h-5 w-12 sm:w-14 mb-1.5 sm:mb-2" />
              <div className="flex gap-1.5 sm:gap-2 flex-wrap">
                <Skeleton className="h-6 sm:h-7 w-16 sm:w-20 rounded-full" />
                <Skeleton className="h-6 sm:h-7 w-16 sm:w-20 rounded-full" />
              </div>
            </div>

            {/* Abilities section */}
            <div>
              <Skeleton className="h-4 sm:h-5 w-16 sm:w-20 mb-1.5 sm:mb-2" />
              <Skeleton className="h-4 sm:h-5 w-full max-w-[200px]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
