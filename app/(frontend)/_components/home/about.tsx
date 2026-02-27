import Image from 'next/image';

export function About() {
  return (
    <section id='about' className='w-full pb-24'>
      <div className='grid max-w-7xl mx-auto md:grid-cols-2 min-h-[420px]'>
        {/* Left - gold bio panel */}
        <div className='bg-[#c9a227] flex flex-col justify-center px-10 py-12 md:py-16'>
          <h2 className='text-2xl md:text-3xl uppercase tracking-widest text-white mb-6'>
            Meet Barbara&hellip;
          </h2>
          <div className='space-y-4 text-white/90 italic text-sm md:text-base leading-relaxed'>
            <p>
              Barbara Townsend is a writer devoted to uncovering and giving voice
              to overlooked stories.
            </p>
            <p>
              Inspired by early mentors and a father who loved storytelling, her
              work explores memory, place, and the lives that history often leaves
              untold. She is the author of two historical fiction novels:{' '}
              <em>Ida&rsquo;s Line</em> and{' '}
              <em>Out of Mind: A Story of Robben Island</em>. Her latest
              book <em>The Colour of Flying</em> is a childhood memoir.
            </p>
            <p>
              A former librarian, teacher, and educational writer, Barbara has long
              nurtured stories her own and those of others.
            </p>
            <p>
              She now travels to share her work and writes from a quiet study
              overlooking fields and mountains in Botrivier where she is working on
              a collection of short stories.
            </p>
          </div>
        </div>

        {/* Right - Barbara photo */}
        <div className='relative min-h-80 md:min-h-0'>
          <Image
            src='/images/portrait.jpg'
            alt='Barbara Townsend'
            fill
            className='w-full h-full object-cover object-top'
          />
        </div>
      </div>
    </section>
  );
}
