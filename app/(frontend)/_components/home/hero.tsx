import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { getBooks } from '@/lib/queries/books';
import { getCoverImageUrl } from '@/lib/utils';

export async function Hero() {
  const booksData = await getBooks();
  const books = booksData?.docs?.slice(0, 3) ?? [];

  return (
    <section className='flex flex-col w-full'>
      {/* Welcome Heading with teapot */}
      <div className='flex flex-col items-center pt-8 pb-2'>
        
        <h1 className='text-center font-serif text-3xl pt-3 md:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight'>
          Welcome
        </h1>
      </div>

      {/* Quote Banner */}
      <div className='w-full bg-[#c9a227] py-4 px-6 my-4'>
        <p className='text-center text-white italic text-base md:text-3xl  font-medium mx-auto'>
          &quot;It&apos;s the small histories that intrigue me, the untold stories that should not be forgotten.&quot;
        </p>
      </div>

      {/* Books Grid */}
      <div className='container w-full max-w-7xl mx-auto py-10'>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mx-auto'>
          {books.map((book) => {
            const coverUrl = getCoverImageUrl(book.coverImage);
            const coverWidth =
              book.coverImage && typeof book.coverImage === 'object' && book.coverImage.width
                ? book.coverImage.width
                : 400;
            const coverHeight =
              book.coverImage && typeof book.coverImage === 'object' && book.coverImage.height
                ? book.coverImage.height
                : 600;

            return (
              <div key={book.id} className='flex flex-col items-center text-center gap-4'>
                <div className='relative w-full max-w-[370px] rounded-sm'>
                  <Image
                    src={coverUrl || '/placeholder.svg'}
                    alt={book.title}
                    width={coverWidth}
                    height={coverHeight}
                    className='w-full h-auto object-cover'
                    priority
                  />
                </div>
                <h2 className='text-lg md:text-2xl uppercase tracking-wide text-foreground'>
                  {book.title}
                </h2>
                <p className='text-lg text-muted-foreground leading-relaxed max-w-xs line-clamp-2'>
                  {typeof book.description === 'object' &&
                  book.description !== null &&
                  'root' in book.description
                    ? (
                        (book.description as { root: { children: { children?: { text?: string }[] }[] } })
                          .root.children?.[0]?.children?.[0]?.text ?? ''
                      )
                    : ''}
                </p>
                <Link href={`/books/${book.id}`}>
                  <Button
                    variant='outline'
                    size='lg'
                    className='uppercase bg-slate-700 text-white  tracking-widest text-xs rounded-none'
                  >
                    Read More
                  </Button>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
