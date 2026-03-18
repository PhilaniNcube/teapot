"use server";

import { cacheLife, cacheTag } from "next/cache";
import { getPayload } from "payload";

import config from "@payload-config";

export async function getReviews() {
  "use cache";

  cacheTag("reviews");
  cacheTag("books");
  cacheLife("hours");

  const payload = await getPayload({ config });

  const reviewsData = await payload.find({
    collection: "reviews",
    depth: 1,
    limit: 100,
    sort: "-createdAt",
  });

  return reviewsData;
}