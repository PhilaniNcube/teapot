import React, { Suspense } from "react";
import Image from "next/image";
import { EventList, EventListFallback } from "./_components";

const EventsPage = () => {
  return (
    <main className="py-8">
      <div className="container max-w-7xl mx-auto px-4">
        <h1 className="text-5xl font-extrabold tracking-tight mb-12 text-center">
          Upcoming Events
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-12">
          <div className="text-center md:text-left">
            <h2 className="text-4xl font-bold tracking-tight mb-4">
            Autumn Garden Route &amp; Klein Karoo Book Tour
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl">
              Join Barbara at her upcoming book signings, readings, and literary
              events
            </p>
            <span className="text-md text-gray-500 block mt-4">
              Telling our stories | Writing our lives 
            </span>
          </div>
          <div className="relative w-full overflow-hidden flex items-center justify-center rounded-2xl">
            <Image
              src="/images/portrait.jpg"
              alt="Barbara at a book signing event"
              // fill
              width={400}
              height={400}
              className="object-cover object-top w-1/3 aspect-square rounded-full mx-auto"
              priority
              // sizes="(max-width: 768px) 100vw, 50vw"
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
