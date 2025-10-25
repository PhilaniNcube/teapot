import { Facebook, Instagram, Twitter, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import CopyRightYear from "./copyright-year";
import { Suspense } from "react";

export function Footer() {
  return (
    <footer className="bg-slate-200 border-t border-border py-12">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2">
            <h3 className=" font-bold text-2xl text-foreground mb-4">
              Barbara Townsend
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Self-published author crafting stories that inspire, challenge,
              and transport readers to new worlds of imagination.
            </p>
            <div className="flex gap-3">
              <Button variant="outline" size="icon">
                <Facebook className="w-5 h-5" />
              </Button>
              <Button variant="outline" size="icon">
                <Instagram className="w-5 h-5" />
              </Button>
              <Button variant="outline" size="icon">
                <Twitter className="w-5 h-5" />
              </Button>
              <Button variant="outline" size="icon">
                <Mail className="w-5 h-5" />
              </Button>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/books"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Books
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Shop</h4>
            <ul className="space-y-2"></ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 text-center text-muted-foreground text-sm">
          <p>
            &copy;
            <Suspense>
              <CopyRightYear />
            </Suspense>
            Barbara Townsend. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
