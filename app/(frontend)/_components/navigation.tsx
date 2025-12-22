"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu, Facebook } from "lucide-react";
import { useState } from "react";
import { CartIcon } from "@/components/cart/cart-icon";

export function Navigation() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-xl font-semibold text-foreground">
            Teapot Publishing
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/books"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Books
            </Link>
            <Link
              href="/blogs"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Blog
            </Link>
            <Link
              href="/gallery"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Gallery
            </Link>
            <Link
              href="/stockists"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Stockists
            </Link>
            {/* <Link
              href="/about"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              About
            </Link> */}
            <Link
              href="/press"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Press & Reviews
            </Link>
            <Link
              href="/contact"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Contact
            </Link>

            {/* <CartIcon /> */}
            <Link href="/books">
              <Button
                size="sm"
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Get the Book
              </Button>
            </Link>
            <Link
              href="https://www.facebook.com/barbara.townsend.7334504"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Facebook className="h-5 w-5" />
              <span className="sr-only">Facebook</span>
            </Link>
          </div>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[300px] sm:w-[400px] px-8 py-6"
            >
              <SheetHeader>
                <SheetTitle className=" text-left">Menu</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-6 mt-8">
                <Link
                  href="/books"
                  className="text-lg text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => setOpen(false)}
                >
                  Books
                </Link>
                <Link
                  href="/blogs"
                  className="text-lg text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => setOpen(false)}
                >
                  Blogs
                </Link>
                <Link
                  href="/gallery"
                  className="text-lg text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => setOpen(false)}
                >
                  Gallery
                </Link>
                <Link
                  href="/stockists"
                  className="text-lg text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => setOpen(false)}
                >
                  Stockists
                </Link>
                {/* <Link
                  href="/about"
                  className="text-lg text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => setOpen(false)}
                >
                  About
                </Link> */}
                <Link
                  href="/press"
                  className="text-lg text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => setOpen(false)}
                >
                  Press & Reviews
                </Link>
                <Link
                  href="/contact"
                  className="text-lg text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => setOpen(false)}
                >
                  Contact
                </Link>
                <Link href="/books" onClick={() => setOpen(false)}>
                  <Button
                    className="bg-primary text-primary-foreground hover:bg-primary/90 w-full"
                    onClick={() => setOpen(false)}
                  >
                    Get the Book
                  </Button>
                </Link>
                <Link
                  href="https://www.facebook.com/barbara.townsend.7334504"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-lg text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => setOpen(false)}
                >
                  <Facebook className="h-5 w-5" />
                  <span>Facebook</span>
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
