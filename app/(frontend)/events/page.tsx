import React, { Suspense } from "react";
import Image from "next/image";
import { EventList, EventListFallback } from "./_components";

const EventsPage = () => {
  return (
    <main className="py-8">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-12">
          <div className="text-center md:text-left">
            <h1 className="text-4xl font-bold tracking-tight mb-4">
              Upcoming Events | Autumn Garden Route &amp; Klein Karoo Book Tour
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl">
              Join Barbara at her upcoming book signings, readings, and literary
              events
            </p>
          </div>
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl">
            <Image
              src="/images/portrait.jpg"
              alt="Barbara at a book signing event"
              fill
              className="object-cover object-top"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
        <Suspense fallback={<EventListFallback />}>
          <EventList />
        </Suspense>
      </div>
    </main>
  );
};

export default EventsPage;
