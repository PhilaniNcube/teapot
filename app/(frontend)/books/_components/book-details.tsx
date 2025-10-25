import { getBookById } from '@/lib/queries/books';
import React from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Calendar, BookOpen, DollarSign, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { convertLexicalNodesToJSX, defaultJSXConverters } from '@payloadcms/richtext-lexical/react';
import { Book, Media } from '@/payload-types';
import { formatPrice, getCoverImageUrl } from '@/lib/utils';
import { format } from 'date-fns';

interface BookDetailsProps {
  id: number;
}

const BookDetails = async ({ id }: BookDetailsProps) => {
  const book: Book = await getBookById(id);
  


  const coverImage = book.coverImage as Media;



  return (
    <div className="space-y-8 py-20 lg:py-24" >
      {/* Back button */}
     

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Book Cover */}
          <div className="space-y-4">
            <Card className="overflow-hidden p-0">
              <CardContent className="p-0">
                <AspectRatio ratio={3/4}>
                  {coverImage?.url ? (
                    <Image
                      src={coverImage.url}
                      alt={coverImage.alt || book.title}
                      fill
                      className="object-cover w-full"
                      priority
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full bg-muted">
                      <BookOpen className="h-16 w-16 text-muted-foreground" />
                    </div>
                  )}
                </AspectRatio>
              </CardContent>
            </Card>
          </div>

          {/* Book Information */}
          <div className="space-y-6">
            {/* Title and Basic Info */}
            <div className="space-y-4">
              <h1 className="text-3xl lg:text-4xl font-bold leading-tight">
                {book.title}
              </h1>
              
              {/* Book details badges */}
              <div className="flex flex-wrap gap-3">
                <Badge variant="secondary" className="gap-1">
                  <Calendar className="h-3 w-3" />
                  {format(book.publishedDate, 'MMMM dd, yyyy')}
                </Badge>
                <Badge variant="secondary" className="gap-1">
                  <BookOpen className="h-3 w-3" />
                  {book.pages} pages
                </Badge>
                <Badge variant="default" className="gap-1">
               
                  {formatPrice(book.price)}
                </Badge>
              </div>
            </div>

            {/* Description */}
            <Card>
              <CardHeader>
                <h2 className="text-xl font-semibold">About this book</h2>
              </CardHeader>
              <CardContent>
                <div className="prose prose-sm max-w-none dark:prose-invert">
                  {convertLexicalNodesToJSX({ 
                    converters: defaultJSXConverters,
                    nodes: book.description.root.children,
                    parent: book.description.root
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Purchase/Action Section */}
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold">
                        {formatPrice(book.price)}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Digital & Physical copies available
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button size="lg" className="flex-1">
                      Buy Now
                    </Button>
                    <Button variant="outline" size="lg" className="flex-1">
                      Add to Cart
                    </Button>
                  </div>
                  
                 
                </div>
              </CardContent>
            </Card>

            {/* Additional Info */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Published</p>
                <p className="font-medium">{format(book.publishedDate, 'MMMM dd, yyyy')}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Pages</p>
                <p className="font-medium">{book.pages}</p>
              </div>
            </div>
          </div>
        </div>

      {/* Additional content sections could go here */}
      <div className="space-y-8">
        {/* Related books, reviews, etc. could be added here */}
      </div>
    </div>
  );
};

export default BookDetails;