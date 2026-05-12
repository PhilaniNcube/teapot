import { getBlogs } from "@/lib/queries/blogs";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import Image from "next/image";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import { Coffee } from "lucide-react";


const BlogList = async () => {
  const blogsData = await getBlogs();
  const blogs = blogsData.docs;

  if (!blogs || blogs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4 text-center bg-gray-50/50 rounded-2xl border border-dashed border-gray-200 max-w-2xl mx-auto my-8 animate-in fade-in zoom-in duration-500">
        <div className="bg-white p-4 rounded-full shadow-sm mb-6 border border-gray-100">
          <Coffee className="w-8 h-8 text-primary/60" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 tracking-tight">No stories brewing yet</h3>
        <p className="text-gray-500 mt-3 max-w-md mx-auto leading-relaxed text-lg">
          We&apos;re currently crafting some fresh content and steep stories. 
          Please check back soon for new updates and insights.
        </p>
      </div>
    );
  }


  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
      {blogs.map((blog) => (
        <Link href={`/blogs/${blog.id}`} key={blog.id} passHref>
          <Card
      
            className="overflow-hidden transition-shadow hover:shadow-lg px-0 py-0"
          >
            {blog.coverImage && typeof blog.coverImage === "object" && (
              <div className="relative aspect-video w-full">
                <Image
                  src={blog.coverImage.url || ""}
                  alt={blog.coverImage.alt || blog.title}
                  fill
                  className="object-cover object-top aspect-video"
                />
              </div>
            )}
            <CardHeader className="pb-5.5">
              <CardTitle className="line-clamp-2 hover:text-primary transition-colors">
                <p >{blog.title}</p>
              </CardTitle>
              <CardDescription>
                {blog.createdAt && formatDate(blog.createdAt)}
              </CardDescription>
            </CardHeader>
           
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default BlogList;
