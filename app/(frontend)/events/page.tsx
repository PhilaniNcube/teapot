import React, { Suspense } from "react";
import { EventList, EventListFallback } from "./_components";

const EventsPage = () => {
  return (
    <main className="py-24 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            Upcoming Events
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join Barbara at her upcoming book signings, readings, and literary
            events
          </p>
        </div>
        <Suspense fallback={<EventListFallback />}>
          <EventList />
        </Suspense>
      </div>
    </main>
  );
};

export default EventsPage;
