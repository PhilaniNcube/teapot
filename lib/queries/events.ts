"use server";
import { cacheTag, cacheLife } from "next/cache";

import { getPayload } from "payload";
import config from "@payload-config";

export async function getUpcomingEvents() {
  "use cache";
  cacheTag("events");
  cacheLife("hours");

  const payload = await getPayload({ config });

  const eventsData = await payload.find({
    collection: "events",
    sort: "date",
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

  return eventsData;
}

export async function getPastEvents() {
  "use cache";
  cacheTag("past-events");
  cacheLife("hours");

  const payload = await getPayload({ config });

  const eventsData = await payload.find({
    collection: "events",
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

  return eventsData;
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
