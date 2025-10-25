import { getBlogs } from '@/lib/queries/blogs'
import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import { formatDate } from '@/lib/utils'

const BlogList = async () => {
  const blogsData = await getBlogs();
  const blogs = blogsData.docs;

  if (!blogs || blogs.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-semibold text-gray-600">No blogs found</h3>
        <p className="text-gray-500 mt-2">Check back later for new content!</p>
      </div>
    )
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {blogs.map((blog) => (
        <Card key={blog.id} className="overflow-hidden transition-shadow hover:shadow-lg p-0">
          {blog.coverImage && typeof blog.coverImage === 'object' && (
            <div className="relative h-48 w-full">
              <Image
                src={blog.coverImage.url || ''}
                alt={blog.coverImage.alt || blog.title}
                fill
                className="object-cover"
              />
            </div>
          )}
          <CardHeader>
            <CardTitle className="line-clamp-2 hover:text-primary transition-colors">
              <Link href={`/blogs/${blog.id}`}>
                {blog.title}
              </Link>
            </CardTitle>
            <CardDescription>
              {blog.createdAt && formatDate(blog.createdAt)}
            </CardDescription>
          </CardHeader>
          <CardContent className='p-3'>
            
            <Button asChild variant="outline" size="sm">
              <Link href={`/blogs/${blog.id}`}>
                Read More
              </Link>
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export default BlogList