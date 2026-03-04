import Image from "next/image";

export function About() {
  return (
    <section id="about" className="container pb-24">
      <div className="grid w-full max-w-7xl mx-auto grid-cols-2 min-h-[420px]">
        {/* Left - gold bio panel */}
        <div className="bg-[#c9a227] flex flex-col justify-center px-10 py-12 md:py-16">
          <h2 className="text-2xl md:text-4xl uppercase tracking-widest text-white mb-6">
            Meet Barbara&hellip;
          </h2>
          <div className="space-y-4 text-white/90  text-sm md:text-lg leading-relaxed">
            <p>
              Barbara Townsend is a writer devoted to uncovering and giving
              voice to overlooked stories.
            </p>
            <p>
              Inspired by early mentors and a father who loved storytelling, her
              work explores memory, place, and the lives that history often
              leaves untold. She is the author of two historical fiction novels:
              Ida&apos;s Line and Out of Mind – a Story of Robben Island. Her
              latest book - The Colour of Flying - is a childhood memoir.
            </p>
            <p>
              A former librarian, teacher, and educational writer, Barbara has
              long nurtured stories—her own and those of others.
            </p>
            <p>
              She now travels to share her work and writes from a quiet study
              overlooking fields and mountains in Botrivier, where she is
              working on a collection of short stories.
            </p>
          </div>
        </div>

        {/* Right - Barbara photo */}
        <div className="relative col-span-2 md:col-span-1 min-h-80 md:min-h-0">
          <Image
            src="/images/portrait.jpg"
            alt="Barbara Townsend"
            fill
            className="w-full h-full object-cover object-top"
          />
        </div>
      </div>
    </section>
  );
}
