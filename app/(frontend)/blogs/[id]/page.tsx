import React, { Suspense } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { BlogDetails, BlogDetailsFallback } from "../_components";

const BlogPage = async ({ params }: { params: Promise<{ id: string }> }) => {
 
  return (
    <main className="py-24 lg:py-32">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Back button */}
        <div className="mb-8">
          <Button asChild variant="ghost" size="sm">
            <Link href="/blogs" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Blogs
            </Link>
          </Button>
        </div>

        <Suspense fallback={<BlogDetailsFallback />}>
          <BlogDetails params={params} />
        </Suspense>

        {/* Navigation */}
        <div className="mt-12 pt-8 border-t">
          <Button asChild>
            <Link href="/blogs">← Back to All Blogs</Link>
          </Button>
        </div>
      </div>
    </main>
  );
};

export default BlogPage;
