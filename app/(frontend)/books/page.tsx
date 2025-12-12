import React, { Suspense } from 'react'
import BooksGrid from './_components/books-grid'
import BooksLoading from './_components/books-loading'

const BooksPage = () => {
  return (
    <div className="container mx-auto pt-20 lg:pt-24 pb-12">
       <div className="px-6 lg:px-10 pb-6">
        <h2 className="text-3xl font-bold text-foreground mb-2">
          Browse Books
        </h2>
        <p className="text-muted-foreground">
          Explore the collection using container queries for responsive layout
        </p>
        <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-md">
          <p className="text-sm font-medium text-blue-900 dark:text-blue-100">
            📦 Books are only available for sale and shipping within South Africa
          </p>
        </div>
      </div>
      <Suspense fallback={<BooksLoading />}>
        <BooksGrid />
      </Suspense>
    </div>
  )
}

export default BooksPage