import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ContactForm } from "./_components/contact-form";
import { Mail } from "lucide-react";
import { Suspense } from "react";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl  font-bold text-foreground mb-4 text-balance">
              Contact Us About Your Order
            </h1>
            <p className="text-lg lg:text-2xl text-muted-foreground max-w-2xl mx-auto text-pretty">
             <Mail className="w-5 h-5 inline-block mr-2" />
             cathteapot@gmail.com
            </p>
          </div>

          <div className=" gap-8">
            {/* Contact Form */}
            <div className="">
              <Card>
                <CardHeader>
                  <CardTitle className="">Send a Message</CardTitle>
                  <CardDescription>
                    Fill out the form below and I&apos;ll get back to you as
                    soon as possible.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Suspense>
                    <ContactForm />
                  </Suspense>
                </CardContent>
              </Card>
            </div>

            {/* Contact Information */}
            {/* <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="">Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium text-sm text-muted-foreground mb-1">
                        Email
                      </p>
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
                      <p className="font-medium text-sm text-muted-foreground mb-1">
                        Phone
                      </p>
                      <Link
                        href={`tel:${process.env.NEXT_PUBLIC_CONTACT_NUMBER}`}
                        className="text-foreground hover:text-primary transition-colors"
                      >
                        {process.env.NEXT_PUBLIC_CONTACT_NUMBER}
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
