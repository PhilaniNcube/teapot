import React from "react";
import { getBlogById } from "@/lib/queries/blogs";
import { notFound } from "next/navigation";
import Image from "next/image";
import { formatDate } from "@/lib/utils";
import { RichText } from "@payloadcms/richtext-lexical/react";

interface BlogDetailsProps {
  id: string;
}

export const BlogDetails = async ({ id }: BlogDetailsProps) => {
  let blog;
  
  try {
    blog = await getBlogById(parseInt(id));
  } catch (error) {
    console.error("Error fetching blog:", error);
    notFound();
  }
  
  if (!blog) {
    notFound();
  }

  return (
    <>
      {/* Blog header */}
      <header className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          {blog.title}
        </h1>
        <div className="flex items-center gap-4 text-gray-600 mb-6">
          <time dateTime={blog.createdAt}>
            {formatDate(blog.createdAt)}
          </time>
          {blog.updatedAt !== blog.createdAt && (
            <>
              <span>•</span>
              <span>Updated {formatDate(blog.updatedAt)}</span>
            </>
          )}
        </div>
      </header>

      {/* Cover image */}
      {blog.coverImage && typeof blog.coverImage === 'object' && (
        <div className="relative w-full mb-8 rounded-lg overflow-hidden">
          <Image
            src={blog.coverImage.url || ''}
            alt={blog.coverImage.alt || blog.title}
            width={blog.coverImage.width || 800}
            height={blog.coverImage.height || 600}
            className="w-full object-cover"
            priority
          />
        </div>
      )}

      {/* Blog content */}
      <article className="prose prose-lg max-w-none">
        {blog.content && (
          <div className="rich-text-content">
            <div className="bg-gray-50 p-6 rounded-lg">
              <RichText data={blog.content} />
            </div>
          </div>
        )}
      </article>

      {/* Gallery */}
      {blog.gallery && blog.gallery.length > 0 && (
        <section className="mt-12">
          <h2 className="text-2xl font-semibold mb-6">Gallery</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {blog.gallery.map((item, index) => (
              <div key={item.id || index} className="relative aspect-square rounded-lg overflow-hidden">
                {typeof item.image === 'object' && (
                  <Image
                    src={item.image.url || ''}
                    alt={item.image.alt || `Gallery image ${index + 1}`}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                  />
                )}
              </div>
            ))}
          </div>
        </section>
      )}
    </>
  );
};