import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section className="flex flex-col w-full">
      {/* Top Banner */}
      <div className="relative w-[70%] mx-auto h-[40vh] min-h-[300px] lg:h-[50vh]">
        <Image
          src="/images/banner-1.jpg"
          alt="Banner"
          fill
          className="object-contain"
          priority
        />
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 lg:px-8 py-8 lg:py-12">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center max-w-6xl w-[70%] mx-auto">
          {/* Left Content */}
          <div className="space-y-6 text-center lg:text-left">
            <div className="space-y-4">
              <p className="text-sm uppercase tracking-wider text-muted-foreground font-medium">
                Latest Release
              </p>
              <h1 className="text-4xl lg:text-6xl font-bold text-foreground leading-tight text-balance">
                The Colour Of Flying
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto lg:mx-0">
                “Late 1953 and Missy B, a three year old child who dreams of
                flying, faces events that turn her world upside down and shape
                the person she will become. Written from Missy B&apos;s point of view
                this memoir is at times hilarious, at times poignant, but always
                so searingly real that one feels one shares her heartbeat.”
                Lucinda Hooley
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 group"
              >
                Order Now
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>

          {/* Right Image - Book Cover */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative w-64 md:w-80 lg:w-96 aspect-2/3 rounded-r-2xl rounded-l-sm shadow-2xl transform hover:scale-105 transition-transform duration-500 rotate-y-12 perspective-1000">
              <Image
                src="/images/colour-of-flying.webp"
                alt="The Colour Of Flying Book Cover"
                fill
                className="object-cover rounded-r-2xl rounded-l-sm shadow-2xl"
                priority
              />
              {/* Book spine effect */}
              <div className="absolute left-0 top-0 bottom-0 w-2 bg-linear-to-r from-white/20 to-transparent z-10 rounded-l-sm" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
