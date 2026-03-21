"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronDown, ChevronUp, ExternalLink, Quote } from "lucide-react";

import { RichText } from "@/components/richtext";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Media, Review } from "@/payload-types";

const ALL_BOOKS_VALUE = "__all_books__";

export type ReviewListItem = {
  id: number;
  bookTitle: string;
  selfPublishing: boolean;
  reviewerName: string;
  content: string;
  longContent?: Review["longContent"];
  link?: string | null;
  image?: Media | null;
};

type ReviewsFilterProps = {
  reviews: ReviewListItem[];
};

type ReviewCardProps = {
  review: ReviewListItem;
};

const ReviewCard = ({ review }: ReviewCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const longContent = review.longContent ?? null;
  const hasLongContent = longContent !== null;

  return (
    <Card className="overflow-hidden border-muted bg-card/50 backdrop-blur-sm transition-all hover:shadow-lg">
      {review.image?.url ? (
        <div className="relative aspect-video w-full">
          <Image
            src={review.image.url}
            alt={review.image.alt || `Review of ${review.bookTitle}`}
            fill
            className="object-cover"
          />
        </div>
      ) : null}

      <CardHeader className="pb-4">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary/80">
              {review.bookTitle}
            </p>
            {review.selfPublishing ? (
              <Badge variant="secondary" className="mt-2">
                Self-published
              </Badge>
            ) : null}
            <CardTitle className="text-xl font-serif leading-relaxed">
              Review of {review.bookTitle}
            </CardTitle>
          </div>
          <Quote className="h-8 w-8 shrink-0 text-primary/20" />
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <blockquote className="whitespace-pre-line italic leading-relaxed text-muted-foreground">
          {review.content}
        </blockquote>

        {hasLongContent ? (
          <div className="space-y-4 rounded-2xl border border-border/60 bg-background/70 p-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsExpanded((expanded) => !expanded)}
            >
              {isExpanded ? "Read less" : "Read more"}
              {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>

            {isExpanded && longContent ? (
              <div className="prose prose-sm max-w-none text-foreground">
                <RichText data={longContent} />
              </div>
            ) : null}
          </div>
        ) : null}

        {review.link ? (
          <div>
            <Button asChild variant="link" className="h-auto px-0 text-sm">
              <a href={review.link} target="_blank" rel="noreferrer">
                Visit related link
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          </div>
        ) : null}

        <div className="flex items-center justify-end border-t pt-4">
          <cite className="font-medium not-italic text-foreground">- {review.reviewerName}</cite>
        </div>
      </CardContent>
    </Card>
  );
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
            <ReviewCard key={review.id} review={review} />
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