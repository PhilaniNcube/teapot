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
      {/* Welcome Heading */}
      <h1 className='text-center text-3xl md:text-4xl lg:text-5xl font-extrabold pt-24 pb-2 uppercase tracking-tight'>
        Welcome
      </h1>

      {/* Quote Banner */}
      <div className='w-full bg-[#c9a227] py-4 px-6 my-4'>
        <p className='text-center text-white italic text-base md:text-lg font-medium max-w-3xl mx-auto'>
          &quot;It&apos;s the small histories that intrigue me, the untold stories that should not be forgotten.&quot;
        </p>
      </div>

      {/* Books Grid */}
      <div className='container mx-auto px-4 lg:px-8 py-10'>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-5xl mx-auto'>
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
                <div className='relative w-full max-w-[220px] shadow-lg'>
                  <Image
                    src={coverUrl || '/placeholder.svg'}
                    alt={book.title}
                    width={coverWidth}
                    height={coverHeight}
                    className='w-full h-auto object-cover'
                    priority
                  />
                </div>
                <h2 className='text-lg uppercase tracking-wide text-foreground'>
                  {book.title}
                </h2>
                <p className='text-sm text-muted-foreground leading-relaxed max-w-xs line-clamp-4'>
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
                    size='sm'
                    className='uppercase bg-slate-100 hover:bg-slate-200 tracking-widest text-xs rounded-none'
                  >
                    Learn More
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
