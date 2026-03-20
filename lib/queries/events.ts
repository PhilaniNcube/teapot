"use server";
import { cacheTag, cacheLife } from "next/cache";

import type { PaginatedDocs } from "payload";
import { getPayload } from "payload";
import config from "@payload-config";
import type { Event } from "@/payload-types";

type EventListItem = Pick<
  Event,
  | "id"
  | "title"
  | "date"
  | "time"
  | "venue"
  | "location"
  | "category"
  | "eventType"
  | "image"
  | "status"
>;

const eventListSelect = {
  title: true,
  date: true,
  time: true,
  venue: true,
  location: true,
  category: true,
  eventType: true,
  image: true,
  status: true,
} as const;

export async function getUpcomingEvents(): Promise<PaginatedDocs<EventListItem>> {
  "use cache";
  cacheTag("events");
  cacheLife("hours");

  const payload = await getPayload({ config });

  const eventsData = await payload.find({
    collection: "events",
    select: eventListSelect,
    depth: 1,
    sort: ["date", "time"],
    where: {
      status: {
        equals: "upcoming",
      },
      date: {
        greater_than_equal: new Date().toISOString(),
      },
    },
    limit: 50,
  });

  return eventsData as PaginatedDocs<EventListItem>;
}

export async function getPastEvents(): Promise<PaginatedDocs<EventListItem>> {
  "use cache";
  cacheTag("past-events");
  cacheLife("hours");

  const payload = await getPayload({ config });

  const eventsData = await payload.find({
    collection: "events",
    select: eventListSelect,
    depth: 1,
    sort: "-date",
    where: {
      or: [
        {
          status: {
            equals: "completed",
          },
        },
        {
          date: {
            less_than: new Date().toISOString(),
          },
        },
      ],
    },
    limit: 50,
  });

  return eventsData as PaginatedDocs<EventListItem>;
}

export async function getAllEvents() {
  "use cache";
  cacheTag("all-events");
  cacheLife("hours");

  const payload = await getPayload({ config });

  const eventsData = await payload.find({
    collection: "events",
    sort: "date",
    limit: 100,
  });

  return eventsData;
}
