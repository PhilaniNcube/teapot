import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Quote } from "lucide-react"

const PressPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4 py-24 lg:px-8 lg:py-32">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">Press & Reviews</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              What critics and readers are saying about Barbara Townsend&apos;s work.
            </p>
          </div>
          
          <div className="grid gap-8">
            <Card className="bg-card/50 backdrop-blur-sm border-muted transition-all hover:shadow-lg">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <CardTitle className="text-xl font-serif leading-relaxed">
                      Review of The Colour of Flying in Good Book Appreciation Society
                    </CardTitle>
                  </div>
                  <Quote className="h-8 w-8 text-primary/20 shrink-0" />
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <blockquote className="text-muted-foreground leading-relaxed italic relative">
                  &quot;Barbara Townsend&apos;s childhood memoir, The Colour of Flying, is one of the most compelling reads I have come across in years: an astonishing feat of recall. It is communicated through the eyes and mind of very young child, facing the challenges of loneliness, and the need to be seen and heard. Her absent Mother, her supportive but overworked Dad, her beloved Nanny (&apos;My Annie&apos;), and her elder siblings, Patrick and Jenny, to name just five. Laugh out loud, achingly sad, Missy-B leaps off the page...clearly destined to be a force of nature. Stand-out moments abound, as we witness the child&apos;s nascent observational powers evolving, from chapter to chapter, sizing up individuals who come into her orbit. Invidious to cherry-pick, but I cannot resist quoting an extract straddling pages 154- 5. &apos;It is not hard to climb if you tuck your dress into your broeks, and we hide the treasure in the hole we saw last time and sit swinging our legs while we watch to see that pirates don&apos;t get it. Oh no is that that Auntie Avril? The one my Annie calls eksie perfeksie because she walks with small steps, head up like a ship, with her hands, out at her sides? She is Pamela&apos;&apos;s mom and the auntie of the next doors I hate with the baboon, and I think she has seen us because she is standing at the gate, pointing up to the sky and shouting to us to come.&apos; Underpinning the child&apos;s headlong torrent of impressions, bouncing and singing along, is Townsend &apos;s cinematic conjuring of the scene, laid out with pin-prick precision. Irresistible.&quot;
                </blockquote>
                <div className="flex items-center justify-end border-t pt-4">
                  <cite className="not-italic font-medium text-foreground">
                    — William Charlton-Perkins
                  </cite>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border-muted transition-all hover:shadow-lg">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <CardTitle className="text-xl font-serif leading-relaxed">
                      Review of The Colour of Flying on the Good Book Appreciation Society
                    </CardTitle>
                  </div>
                  <Quote className="h-8 w-8 text-primary/20 shrink-0" />
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <blockquote className="text-muted-foreground leading-relaxed italic space-y-4">
                  <p>
                    &quot;One of the things that impresses me about The Colour of Flying, the child&apos;s memoir by my friend Barbara Townsend, is that she captures not just the tone of the child&apos;s speech, but also the child&apos;s view of the world and how things impact on her. It&apos;s as though you watch, through the page, as parts of her personality and understanding of things are shaped.
                  </p>
                  <p>
                    I was re-reading a section today about when the little girl (our memoirist as a child) goes back to school after the holidays. She joins with everyone to tell about all the exciting things they did, but one of the other children challenges &apos;our&apos; child about whether she has &apos;a proper mom&apos;.
                  </p>
                  <p>
                    &apos;I tell her I do have one who loves me, but she is far away because she and Dad are divorced and the new girl with curly hair says, Oh, but why does she go away if she loves you?&apos;
                  </p>
                  <p>
                    This is of course the very question that &apos;our child&apos; has been asking herself: if her mother really loves her, why has she left? The laughter of all the other children as our child tries to explain her domestic situation, leaves her in tears, because perhaps these children are right, &apos;and Mom doesn&apos;t love me&apos;.
                  </p>
                  <p>
                    But then a teacher on duty in the playground, who has heard what happened, &apos;tells me I&apos;m a very brave girl and she&apos;d like to talk to me later.&apos;
                  </p>
                  <p>
                    The scene sets up so much for the reader. The child&apos;s pain and uncertainty about the love of a mother; whether she is really loved; whether she is worthy of love. The role of empathetic outsiders in reassuring a child. The pain of divorce for young children who don&apos;t understand the complexities of adult relationships.
                  </p>
                  <p>
                    Best of all (for her and for us, readers of The Colour of Flying) the lovely teacher, who speaks to our child later and hears her painful story, does a wonderful thing: she encourages her to write. The teacher says she loves the stories the child has written and that she&apos;s seen in the school magazine – and gives her a special book to write in.
                  </p>
                  <p>
                    Teachers like that are rare and wonderful and Townsend was fortunate to have found one. She did indeed keep writing; this is her third book, all of them self-published via her own &apos;Teapot publishing&apos; imprint, and to my mind it&apos;s the best so far.&quot;
                  </p>
                </blockquote>
                <div className="flex items-center justify-end border-t pt-4">
                  <cite className="not-italic font-medium text-foreground">
                    — Carmel Rickard
                  </cite>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PressPage