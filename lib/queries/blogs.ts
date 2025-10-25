"use server";
import { cacheTag, cacheLife } from "next/cache";

import { getPayload } from "payload";
import config from "@payload-config";

export async function getBlogs() {
  "use cache";
  cacheTag(`blog`);
  cacheLife("hours");

  const payload = await getPayload({ config });

  const blogsData = await payload.find({
    collection: "blogs",
    sort: "-createdAt",
    limit: 10,
  });

  return blogsData;
}

export async function getBlogById(id: number) {
  "use cache";
  cacheTag(`blog-${id}`);
  cacheLife("hours");
  const payload = await getPayload({
    config,
  });

  const blogData = await payload.findByID({
    collection: "blogs",
    id,
  });

  return blogData;
}
