import { Card } from "@/components/ui/card";
import { getBooks } from "@/lib/queries/books";
import { BookOpen, Calendar } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import React from "react";
import { formatPrice, getCoverImageUrl } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { AddToCartButton } from "@/components/cart/add-to-cart-button";
import { Badge } from "@/components/ui/badge";



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
              className="group overflow-hidden border-border/50 bg-card hover:border-primary/20 transition-all duration-300 hover:shadow-lg p-0 "
            >
              <div className="flex justify-between p-4">
                <div className="relative overflow-hidden">
                  {book.inStock === false && (
                    <Badge variant="destructive" className="absolute top-2 right-2 z-10">
                      Out of Stock
                    </Badge>
                  )}
                  <Image
                    src={
                      getCoverImageUrl(book.coverImage) || "/placeholder.svg"
                    }
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
                    className="h-[200px] w-auto object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-4 @container space-y-3 flex-1" >
                  <div>
                    <h3 className="text-lg font-semibold text-foreground line-clamp-2 text-balance">
                      {book.title}
                    </h3>
                    <div className="flex-col @sm:flex-row flex @md:items-center gap-4 mt-2 text-sm text-muted-foreground">
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

                  <div className="flex flex-col @sm:flex-row @sm:items-center gap-3 justify-between pt-2 border-t border-border/50">
                    <span className="text-xl font-semibold text-primary">
                      {formatPrice(book.price)}
                    </span>
                    <div className="flex gap-2">
                      <Link href={`/books/${book.id}`}>
                        <Button variant="outline" size="sm">View Details</Button>
                      </Link>
                      {book.inStock !== false ? (
                        <AddToCartButton 
                          book={book} 
                          size="sm"
                          showQuantityControls={false}
                        />
                      ) : (
                        <Button variant="destructive" size="sm" disabled>
                          Out of Stock
                        </Button>
                      )}
                    </div>
                  </div>
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
