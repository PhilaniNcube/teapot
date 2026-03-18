"use client";

import { useState } from "react";
import { Quote } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ALL_BOOKS_VALUE = "__all_books__";

export type ReviewListItem = {
  id: number;
  bookTitle: string;
  reviewerName: string;
  content: string;
};

type ReviewsFilterProps = {
  reviews: ReviewListItem[];
};

const ReviewsFilter = ({ reviews }: ReviewsFilterProps) => {
  const [selectedBookTitle, setSelectedBookTitle] = useState(ALL_BOOKS_VALUE);

  const bookTitles = Array.from(new Set(reviews.map((review) => review.bookTitle))).sort(
    (left, right) => left.localeCompare(right)
  );

  const filteredReviews =
    selectedBookTitle === ALL_BOOKS_VALUE
      ? reviews
      : reviews.filter((review) => review.bookTitle === selectedBookTitle);

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 rounded-2xl border border-border/60 bg-card/70 p-4 shadow-sm sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-1">
          <p className="text-sm font-medium text-foreground">Filter by book title</p>
          <p className="text-sm text-muted-foreground">
            Showing {filteredReviews.length} of {reviews.length} review
            {reviews.length === 1 ? "" : "s"}
          </p>
        </div>

        <div className="w-full sm:max-w-xs">
          <Select value={selectedBookTitle} onValueChange={setSelectedBookTitle}>
            <SelectTrigger className="w-full bg-background">
              <SelectValue placeholder="All books" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={ALL_BOOKS_VALUE}>All books</SelectItem>
              {bookTitles.map((title) => (
                <SelectItem key={title} value={title}>
                  {title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {filteredReviews.length > 0 ? (
        <div className="grid gap-8">
          {filteredReviews.map((review) => (
            <Card
              key={review.id}
              className="bg-card/50 backdrop-blur-sm border-muted transition-all hover:shadow-lg"
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary/80">
                      {review.bookTitle}
                    </p>
                    <CardTitle className="text-xl font-serif leading-relaxed">
                      Review of {review.bookTitle}
                    </CardTitle>
                  </div>
                  <Quote className="h-8 w-8 shrink-0 text-primary/20" />
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <blockquote className="whitespace-pre-line text-muted-foreground leading-relaxed italic">
                  {review.content}
                </blockquote>
                <div className="flex items-center justify-end border-t pt-4">
                  <cite className="not-italic font-medium text-foreground">
                    - {review.reviewerName}
                  </cite>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="border-dashed border-border/60 bg-card/40">
          <CardContent className="py-12 text-center">
            <h3 className="text-lg font-semibold text-foreground">No matching reviews</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Try selecting a different book title to see more reviews.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ReviewsFilter;