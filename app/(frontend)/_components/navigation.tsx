'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import { useState } from 'react';

export function Navigation() {
  const [open, setOpen] = useState(false);

  return (
    <nav className='fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border'>
      <div className='container mx-auto px-4 lg:px-8'>
        <div className='flex items-center justify-between h-24'>
          <Link href='/' className='flex items-center gap-4'>
            <div className='relative w-16 h-16 rounded-full overflow-hidden'>
              <Image
                src='/images/teapot.jpg'
                alt='Teapot Publishing Logo'
                fill
                className='object-cover'
              />
            </div>
            <div className='flex flex-col'>
              <span className='text-xl md:text-2xl font-serif font-bold text-[#c9a227] uppercase tracking-wide'>
                Teapot Publishing
              </span>
              <span className='text-xs md:text-sm font-serif text-foreground font-medium'>
                The home of author, Barbara Townsend
              </span>
            </div>
          </Link>

          <div className='hidden md:flex items-center gap-6 lg:gap-8'>
            <Link
              href='/books'
              className='text-sm font-medium text-muted-foreground hover:text-foreground transition-colors'
            >
              Books
            </Link>
            <Link
              href='/events'
              className='text-sm font-medium text-muted-foreground hover:text-foreground transition-colors'
            >
              Events
            </Link>
            <Link
              href='/blogs'
              className='text-sm font-medium text-muted-foreground hover:text-foreground transition-colors'
            >
              Blogs
            </Link>
            <Link
              href='/press'
              className='text-sm font-medium text-muted-foreground hover:text-foreground transition-colors'
            >
              Press
            </Link>
            <Link
              href='/stockists'
              className='text-sm font-medium text-muted-foreground hover:text-foreground transition-colors'
            >
              Stockists
            </Link>
            <Link
              href='/books'
              className='text-sm font-medium text-muted-foreground hover:text-foreground transition-colors'
            >
              Shop
            </Link>
          </div>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className='md:hidden'>
              <Button variant='ghost' size='icon'>
                <Menu className='h-6 w-6' />
                <span className='sr-only'>Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side='right'
              className='w-[300px] sm:w-[400px] px-8 py-6'
            >
              <SheetHeader>
                <SheetTitle className='text-left'>Menu</SheetTitle>
              </SheetHeader>
              <div className='flex flex-col gap-6 mt-8'>
                <Link
                  href='/books'
                  className='text-lg text-muted-foreground hover:text-foreground transition-colors'
                  onClick={() => setOpen(false)}
                >
                  Books
                </Link>
                <Link
                  href='/events'
                  className='text-lg text-muted-foreground hover:text-foreground transition-colors'
                  onClick={() => setOpen(false)}
                >
                  Events
                </Link>
                <Link
                  href='/blogs'
                  className='text-lg text-muted-foreground hover:text-foreground transition-colors'
                  onClick={() => setOpen(false)}
                >
                  Blogs
                </Link>
                <Link
                  href='/press'
                  className='text-lg text-muted-foreground hover:text-foreground transition-colors'
                  onClick={() => setOpen(false)}
                >
                  Press
                </Link>
                <Link
                  href='/stockists'
                  className='text-lg text-muted-foreground hover:text-foreground transition-colors'
                  onClick={() => setOpen(false)}
                >
                  Stockists
                </Link>
                <Link
                  href='/books'
                  className='text-lg text-muted-foreground hover:text-foreground transition-colors'
                  onClick={() => setOpen(false)}
                >
                  Shop
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
