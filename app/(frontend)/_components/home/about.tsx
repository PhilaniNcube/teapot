import { Button } from "@/components/ui/button"
import { BookOpen, Feather, Heart } from "lucide-react"

export function About() {
  return (
    <section id="about" className="py-8 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-foreground mb-6">About Barbara Townsend</h2>
            <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
              <p>
                Barbara Townsend is a passionate storyteller whose vivid imagination brings worlds to life through her
                unique narrative voice. With a background in literature and a love for the arts, she weaves tales that
                resonate with readers of all ages.
              </p>
              <p>
                Her writing explores themes of identity, creativity, and the human experience, often drawing inspiration
                from everyday moments transformed into extraordinary journeys. As a self-published author, Barbara
                maintains creative control over every aspect of her work, from the stories themselves to the beautiful
                cover designs.
              </p>
              <p>
                When she&apos;s not writing, Barbara enjoys collecting vintage glassware, exploring nature, and discovering
                new perspectives through travel and conversation.
              </p>
            </div>
            <div className="flex gap-4 mt-8">
              <Button variant="outline" size="lg">
                Read More
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-card border border-border rounded-lg p-6 text-center">
              <BookOpen className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className=" font-bold text-2xl text-foreground mb-2">3</h3>
              <p className="text-muted-foreground">Books Published</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-6 text-center">
              <Heart className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className=" font-bold text-2xl text-foreground mb-2">1000+</h3>
              <p className="text-muted-foreground">Happy Readers</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-6 text-center col-span-2">
              <Feather className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className=" font-bold text-2xl text-foreground mb-2">Independent</h3>
              <p className="text-muted-foreground">Self-Published Author</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
