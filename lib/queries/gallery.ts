"use server";
import { cacheTag, cacheLife } from "next/cache";

import { getPayload } from "payload";
import config from "@payload-config";

export async function getGalleryById(id: number) {
  "use cache";
  cacheTag(`gallery-${id}`);
  cacheLife("hours");

  const payload = await getPayload({
    config,
  });

  const galleryData = await payload.findByID({
    collection: "gallery",
    id: id.toString(),
  });

  return galleryData;
}
