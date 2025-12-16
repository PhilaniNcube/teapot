import React, { Suspense } from "react";
import { BlogList, BlogListFallback } from "./_components";

const BlogsPage = () => {
  return (
    <main className="py-24 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Our Blog</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Discover our latest insights, stories and updates
          </p>
        </div>
        <Suspense fallback={<BlogListFallback />}>
          <BlogList />
        </Suspense>
      </div>
    </main>
  );
};

export default BlogsPage;
