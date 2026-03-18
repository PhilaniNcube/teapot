import React, { Suspense } from "react";

import ReviewsContent from "./_components/reviews-content";
import ReviewsListFallback from "./_components/reviews-list-fallback";

const ReviewsPage = () => {
  return (
    <div className="min-h-screen bg-linear-to-b from-background to-muted/30">
      <div className="container mx-auto px-4 py-24 lg:px-8 lg:py-32">
        <div className="mx-auto max-w-4xl space-y-12">
          <div className="space-y-4 text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">
              Reviews
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              What critics and readers are saying about Barbara Townsend&apos;s work.
            </p>
          </div>

          <Suspense fallback={<ReviewsListFallback />}>
            <ReviewsContent />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default ReviewsPage;