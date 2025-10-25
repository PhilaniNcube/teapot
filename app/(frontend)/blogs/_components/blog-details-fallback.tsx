import { Skeleton } from "@/components/ui/skeleton";

export const BlogDetailsFallback = () => {
  return (
    <>
      {/* Header skeleton */}
      <header className="mb-8">
        <Skeleton className="h-12 w-3/4 mb-4" />
        <div className="flex items-center gap-4 mb-6">
          <Skeleton className="h-5 w-32" />
          <span className="text-gray-300">•</span>
          <Skeleton className="h-5 w-40" />
        </div>
      </header>

      {/* Cover image skeleton */}
      <div className="relative w-full mb-8 rounded-lg overflow-hidden">
        <Skeleton className="w-full h-96" />
      </div>

      {/* Content skeleton */}
      <article className="prose prose-lg max-w-none">
        <div className="bg-gray-50 p-6 rounded-lg">
          <div className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-4/5" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </div>
      </article>

      {/* Gallery skeleton */}
      <section className="mt-12">
        <Skeleton className="h-8 w-32 mb-6" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <Skeleton key={index} className="aspect-square rounded-lg" />
          ))}
        </div>
      </section>
    </>
  );
};