import React, { Suspense } from "react";
import { BookDetails, BookDetailsFallback } from "../_components";
import { getBooks } from "@/lib/queries/books";

export async function generateStaticParams() {
  try {
    const booksData = await getBooks();
    
    return booksData.docs.map((book) => ({
      id: book.id.toString(),
    }));
  } catch (error) {
    console.error("Error generating static params for books:", error);
    return [];
  }
}

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  return (
    <div className="py-32 container mx-auto px-6 lg:px-10">
      <Suspense fallback={<BookDetailsFallback />}>
        <BookDetails id={parseInt(id)} />
      </Suspense>
    </div>
  );
};

export default page;
