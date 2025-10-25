import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-16">
      <div className="container mx-auto px-4 lg:px-8 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8 order-2 lg:order-1">
            <div className="space-y-4">
              <p className="text-sm uppercase tracking-wider text-muted-foreground font-medium">Latest Release</p>
              <h1 className="text-5xl lg:text-7xl font-bold text-foreground leading-tight text-balance">
                The Colour Of Flying
              </h1>
              <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-xl">
                A captivating journey through imagination and wonder. Discover the vibrant world where stories take
                flight and colors come alive.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 group">
                Order Now
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
             
            </div>

            
          </div>

          {/* Right Image */}
          <div className="order-1 lg:order-2">
            <div className="relative aspect-4/3 lg:aspect-3/2 rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://ikmbrpotgniwicz3.public.blob.vercel-storage.com/banner.jpg"
                alt="The Colour of Flying by Barbara Townsend - book on wooden table with decorative glass vessels"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-linear-to-t from-background/20 to-transparent" />
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-1/4 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10" />
    </section>
  )
}
