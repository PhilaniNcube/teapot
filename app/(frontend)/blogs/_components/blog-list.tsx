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

const BlogList = async () => {
  const blogsData = await getBlogs();
  const blogs = blogsData.docs;

  if (!blogs || blogs.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-semibold text-gray-600">No blogs found</h3>
        <p className="text-gray-500 mt-2">Check back later for new content!</p>
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
