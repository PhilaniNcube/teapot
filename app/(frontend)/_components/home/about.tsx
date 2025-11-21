import Image from "next/image";
import { Button } from "@/components/ui/button";

export function About() {
  return (
    <section id="about" className="py-8 bg-background">
      <div className="container max-w-6xl w-[70%] mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-foreground mb-6">
              About Barbara Townsend
            </h2>
            <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
              <p>
                Barbara Townsend is a passionate storyteller whose vivid
                imagination brings worlds to life through her unique narrative
                voice. With a background in literature and a love for the arts,
                she weaves tales that resonate with readers of all ages.
              </p>
              <p>
                Her writing explores themes of identity, creativity, and the
                human experience, often drawing inspiration from everyday
                moments transformed into extraordinary journeys. As an
                independent author who publishes her own books, Barbara
                maintains creative control over every aspect of her work, from
                the stories themselves to the beautiful cover designs.
              </p>
              <p>
                When she is not writing, Barbara enjoys reading, swimming and
                gardening, and gathering new ideas for writing through travel
                and conversation.
              </p>
            </div>
            <div className="flex gap-4 mt-8">
              <Button variant="outline" size="lg">
                Read More
              </Button>
            </div>
          </div>
          <div className="relative aspect-3/4 w-full max-w-md mx-auto overflow-hidden rounded-lg shadow-xl">
            <Image
              src="/images/barbara.jpg"
              alt="Barbara Townsend"
              fill
              className="object-cover"
            />
            <p className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-sm p-2 text-center">
              “It is the small histories that intrigue me, the untold stories
              that should not be forgotten.” - Barbara Townsend
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
