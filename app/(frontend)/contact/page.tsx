import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ContactForm } from "./_components/contact-form"
import { Mail, Phone } from "lucide-react"
import Link from "next/link"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl  font-bold text-foreground mb-4 text-balance">
              Get in Touch
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
           I&apos;d love to hear your questions and comments about my books
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Contact Form */}
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="">Send a Message</CardTitle>
                  <CardDescription>
                    Fill out the form below and I&apos;ll get back to you as soon as possible.
                  </CardDescription>
                </CardHeader>
                <CardContent>
<ContactForm />
                </CardContent>
              </Card>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="">Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium text-sm text-muted-foreground mb-1">Email</p>
                      <Link
                        href={`mailto:${process.env.NEXT_PUBLIC_EMAIL_ADDRESS}`}
                        className="text-foreground hover:text-primary transition-colors"
                      >
                        {process.env.NEXT_PUBLIC_EMAIL_ADDRESS}
                      </Link>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium text-sm text-muted-foreground mb-1">Phone</p>
                      <Link href={`tel:${process.env.NEXT_PUBLIC_CONTACT_NUMBER}`} className="text-foreground hover:text-primary transition-colors">
                        {process.env.NEXT_PUBLIC_CONTACT_NUMBER}
                      </Link>
                    </div>
                  </div>

            
                </CardContent>
              </Card>

        

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
