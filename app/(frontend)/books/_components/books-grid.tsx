import { Card } from "@/components/ui/card";
import { getBooks } from "@/lib/queries/books";
import { BookOpen, Calendar } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import React from "react";
import { formatPrice, getCoverImageUrl } from "@/lib/utils";
import Image from "next/image";

const BooksGrid = async () => {
  const booksData = await getBooks();

  const books = booksData?.docs || [];

  return (
    <div className="">
     
      <div className="container px-4 mx-auto lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {books.map((book) => (
            <Card
              key={book.id}
              className="group overflow-hidden border-border/50 bg-card hover:border-primary/20 transition-all duration-300 hover:shadow-lg p-0"
            >
              <div className="relative aspect-3/4 overflow-hidden bg-muted">
                <Image
                  src={getCoverImageUrl(book.coverImage) || "/placeholder.svg"}
                  alt={
                    typeof book.coverImage === "object"
                      ? book.coverImage.alt
                      : book.title
                  }
                  width={
                    book.coverImage &&
                    typeof book.coverImage === "object" &&
                    book.coverImage.width
                      ? book.coverImage.width
                      : 400
                  }
                  height={
                    book.coverImage &&
                    typeof book.coverImage === "object" &&
                    book.coverImage.height
                      ? book.coverImage.height
                      : 600
                  }
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              <div className="p-4 space-y-3">
                <div>
                  <h3 className="font-serif text-lg font-semibold text-foreground line-clamp-2 text-balance">
                    {book.title}
                  </h3>
                  <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <BookOpen className="w-4 h-4" />
                      {book.pages} pages
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {format(book.publishedDate, "MMMM dd, yyyy")}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-border/50">
                  <span className="text-xl font-semibold text-primary">
                    {formatPrice(book.price)}
                  </span>
                  <Button
                    size="sm"
                    // onClick={() => onBookClick?.(book)}
                    className="bg-primary hover:bg-primary/90"
                  >
                    View Details
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BooksGrid;
