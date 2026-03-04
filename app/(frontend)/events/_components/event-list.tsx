import React from "react";
import { getUpcomingEvents, getPastEvents } from "@/lib/queries/events";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Clock, MapPin } from "lucide-react";
import Image from "next/image";
import { RichText } from "@/components/richtext";

const eventTypeLabels: Record<string, string> = {
  "book-signing": "Book Signing",
  "book-launch": "Book Launch",
  reading: "Reading",
  talk: "Talk / Lecture",
  festival: "Festival",
  workshop: "Workshop",
  other: "Other",
};

function formatEventDate(dateString: string) {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-ZA", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

const EventList = async () => {
  const [upcomingData, pastData] = await Promise.all([
    getUpcomingEvents(),
    getPastEvents(),
  ]);

  const upcoming = upcomingData.docs;
  const past = pastData.docs;

  if (upcoming.length === 0 && past.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-semibold text-gray-600">
          No events found
        </h3>
        <p className="text-gray-500 mt-2">
          Check back soon for upcoming events!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-16">
      {/* Upcoming Events */}
      {upcoming.length > 0 && (
        <section>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcoming.map((event) => (
              <Card
                key={event.id}
                className="overflow-hidden transition-shadow hover:shadow-lg flex flex-col p-0"
              >
                {/* Optional image */}
                {event.image && typeof event.image === "object" && (
                  <div className="relative w-full aspect-video shrink-0">
                    <Image
                      src={event.image.url || ""}
                      alt={event.image.alt || event.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}

                <CardHeader className="bg-[#c9a227] text-white py-3">
                  <div className="flex flex-wrap justify-between items-center gap-2">
                    <CardTitle className="text-xl md:text-2xl text-white">{event.title}</CardTitle>
                    <Badge variant="default" className="bg-white/20 hover:bg-white/30 text-white border-white/40">
                      {eventTypeLabels[event.eventType] || event.eventType}
                    </Badge>
                    {event.status === "cancelled" && (
                      <Badge variant="destructive">Cancelled</Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-3 py-4 flex-1">
                  {/* Date */}
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <CalendarDays className="h-4 w-4 shrink-0" />
                    <span>{formatEventDate(event.date)}</span>
                  </div>

                  {/* Time */}
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="h-4 w-4 shrink-0" />
                    <span>{event.time}</span>
                  </div>

                  {/* Venue & Location */}
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-4 w-4 shrink-0" />
                    <span>
                      {event.venue}, {event.location}
                    </span>
                  </div>

                  {/* Description */}
                  {event.description && (
                    <div className="prose prose-sm max-w-none mt-4 text-gray-700">
                      <RichText data={event.description} />
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* Past Events */}
      {past.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold tracking-tight mb-6 text-muted-foreground">
            Past Events
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {past.map((event) => (
              <Card
                key={event.id}
                className="overflow-hidden opacity-75 hover:opacity-100 transition-opacity flex flex-col py-0"
              >
                <CardHeader className="pb-2 bg-[#c9a227] text-white">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <Badge variant="secondary" className="bg-white/20 hover:bg-white/30 text-white border-white/40">
                      {eventTypeLabels[event.eventType] || event.eventType}
                    </Badge>
                  <CardTitle className="text-lg text-white">{event.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <CalendarDays className="h-3.5 w-3.5" />
                      <span>{formatEventDate(event.date)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5" />
                      <span>
                        {event.venue}, {event.location}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default EventList;
