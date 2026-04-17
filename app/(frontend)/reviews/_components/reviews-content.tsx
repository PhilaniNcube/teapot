import type { Review } from "@/payload-types";

import { Card, CardContent } from "@/components/ui/card";
import { getReviews } from "@/lib/queries/reviews";

import ReviewsFilter, { type ReviewListItem } from "./reviews-filter";

const getBookTitle = (book: Review["book"]) => {
  if (book && typeof book === "object" && "title" in book && typeof book.title === "string") {
    return book.title;
  }

  return "General review";
};

const hasLinkedBook = (book: Review["book"]) => {
  return Boolean(book && typeof book === "object" && "title" in book && typeof book.title === "string");
};

const ReviewsContent = async () => {
  const reviewsData = await getReviews();
  const reviews: ReviewListItem[] = reviewsData.docs.map((review) => ({
    id: review.id,
    bookTitle: getBookTitle(review.book),
    hasBook: hasLinkedBook(review.book),
    selfPublishing: Boolean(review.selfPublishing),
    reviewerName: review.reviewerName,
    content: review.content,
    longContent: review.longContent,
    link: review.link,
    image: typeof review.image === "object" ? review.image : null,
  }));

  if (reviews.length === 0) {
    return (
      <Card className="border-dashed border-border/60 bg-card/40">
        <CardContent className="py-12 text-center">
          <h3 className="text-lg font-semibold text-foreground">No reviews available yet</h3>
          
        </CardContent>
      </Card>
    );
  }

  return <ReviewsFilter reviews={reviews} />;
};

export default ReviewsContent;