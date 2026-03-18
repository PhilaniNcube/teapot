import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const ReviewsListFallback = () => {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 rounded-2xl border border-border/60 bg-card/70 p-4 shadow-sm sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-48" />
        </div>
        <Skeleton className="h-10 w-full sm:max-w-xs" />
      </div>

      <div className="grid gap-8">
        {Array.from({ length: 3 }).map((_, index) => (
          <Card key={index} className="border-muted bg-card/50 backdrop-blur-sm">
            <CardHeader className="space-y-3 pb-4">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-7 w-3/4" />
            </CardHeader>
            <CardContent className="space-y-3">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <div className="border-t pt-4">
                <Skeleton className="ml-auto h-4 w-36" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ReviewsListFallback;