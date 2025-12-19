import React, { Suspense } from "react";
import { BlogList, BlogListFallback } from "./_components";
import Link from "next/link";
import { Facebook } from "lucide-react";

const BlogsPage = () => {
  return (
    <main className="py-24 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Our Blog</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Discover our latest insights, stories and updates
          </p>
          <div className="flex justify-center mt-6">
            <Link
              href="https://www.facebook.com/barbara.townsend.7334504"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Facebook className="h-5 w-5" />
              <span>Follow us on Facebook</span>
            </Link>
          </div>
        </div>
        <Suspense fallback={<BlogListFallback />}>
          <BlogList />
        </Suspense>
      </div>
    </main>
  );
};

export default BlogsPage;
