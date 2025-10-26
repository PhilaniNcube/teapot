"use server";
import { cacheTag, cacheLife } from "next/cache";

import { getPayload } from "payload";
import config from "@payload-config";

export async function getStockists() {
  "use cache";
    cacheTag("stockists");
    cacheLife("days");

  const payload = await getPayload({
    config,
  });

    const stockistsData = await payload.find({
      collection: "stockists",
      locale: "all",
    });

    return stockistsData;   
}

export async function getStockistById(id: number) {
  "use cache";
  cacheTag(`stockist-${id}`);
  cacheLife("hours");

  const payload = await getPayload({
    config,
  });

  const stockistData = await payload.findByID({
    collection: "stockists",
    id: id.toString(),
  });

  return stockistData;
}