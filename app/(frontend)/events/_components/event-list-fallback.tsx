import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const EventListFallback = () => {
  return (
    <div className="flex flex-col gap-6">
      {Array.from({ length: 3 }).map((_, index) => (
        <Card
          key={index}
          className="overflow-hidden animate-pulse"
          style={{
            animationDelay: `${index * 100}ms`,
            animationDuration: "1.5s",
          }}
        >
          <CardHeader>
            <Skeleton className="h-5 w-24 mb-2" />
            <Skeleton className="h-7 w-3/4" />
          </CardHeader>
          <CardContent className="space-y-3">
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-56" />
            <div className="space-y-2 mt-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default EventListFallback;
