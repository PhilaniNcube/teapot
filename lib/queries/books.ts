"use server";
import { cacheTag, cacheLife } from "next/cache";

import { getPayload } from "payload";
import config from "@payload-config";

export async function getBooks() {
  "use cache";

  cacheTag("books");
  // This cache will revalidate after an hour even if no explicit
  // revalidate instruction was received
  cacheLife("days");

  const payload = await getPayload({
    config,
  });

  const booksData = await payload.find({
    collection: "books",
  });

  return booksData;
}

export async function getBookById(id: number) {
  "use cache";
  cacheTag(`book-${id}`);
  cacheLife("hours");

  const payload = await getPayload({
    config,
  });

  const bookData = await payload.findByID({
    collection: "books",
    id: id.toString(),
  });

  return bookData;
}
