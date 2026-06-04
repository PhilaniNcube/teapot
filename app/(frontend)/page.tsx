
import { About } from "./_components/home/about";
import { Hero } from "./_components/home/hero";
import { Newsletter } from "./_components/home/newsletter";
import { Suspense } from "react";

export default function Home() {
  return (
    <div>
      <Hero />
      <About />
      <Suspense fallback={<div className="container max-w-7xl mx-auto h-64 bg-slate-100/50 animate-pulse rounded-lg my-12" />}>
        <Newsletter />
      </Suspense>
    </div>
  );
}
