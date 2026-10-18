import React, { Suspense } from 'react';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CliSnippet } from '@/components/CliSnippet';
import { getPosts } from '@/lib/posts';
import { ArrowUpRight, BookOpen, Sparkles, Terminal } from 'lucide-react';

export default async function HomePage() {
  const posts = await getPosts();

  return (
    <div className="min-h-screen bg-white text-zinc-900 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      <Suspense fallback={<div className="h-20 bg-white/80 border-b border-zinc-100" />}>
        <Header />
      </Suspense>

      <main className="flex-1 pt-20">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-12 pb-24 sm:pt-20 sm:pb-32 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] bg-size-[24px_24px]">
          <div className="absolute inset-0 bg-linear-to-b from-white via-transparent to-white pointer-events-none" />

          <div className="max-w-4xl mx-auto px-4 sm:px-6 relative text-center flex flex-col items-center">
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 border border-zinc-200/80 text-[11px] font-mono uppercase tracking-wider text-zinc-600 mb-6">
              <Sparkles className="w-3 h-3 text-red-500" />
              <span>A starter template for</span>
            </div>

            {/* Giant Title */}
            <h1 className="text-5xl sm:text-7xl md:text-8xl font-extrabold tracking-tight text-zinc-950 mb-6">
              <a
                href="https://sanity.io"
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-red-500 hover:text-red-600 underline-offset-8 transition-colors"
              >
                Sanity
              </a>
              <span className="text-zinc-400 font-light mx-2">+</span>
              <a
                href="https://nextjs.org"
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-zinc-950 hover:text-zinc-700 underline-offset-8 transition-colors"
              >
                Next.js
              </a>
            </h1>

            {/* Subheading & Explanation */}
            <p className="max-w-2xl text-base sm:text-xl text-zinc-600 font-light leading-relaxed mb-10">
              A high-performance publication and digital laboratory by{' '}
              <strong className="font-semibold text-zinc-900">
                Francis Kodama
              </strong>
              . Combining Next.js 16 App Router on the frontend with Sanity
              headless CMS for live editorial previews.
            </p>

            {/* CLI Snippet Box */}
            <div className="mb-6 w-full flex justify-center">
              <CliSnippet />
            </div>

            <div className="flex items-center gap-4 text-xs font-mono text-zinc-500">
              <Link
                href="/studio"
                className="hover:text-red-600 underline transition-colors flex items-center gap-1"
              >
                Launch Sanity Studio
                <ArrowUpRight className="w-3 h-3" />
              </Link>
              <span>•</span>
              <a
                href="https://www.sanity.io/docs"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-zinc-900 underline transition-colors"
              >
                Sanity Documentation
              </a>
            </div>
          </div>
        </section>

        {/* Articles / Blog Posts Section */}
        <section id="articles" className="border-t border-zinc-100 bg-zinc-50/50 py-16 sm:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-4 border-b border-zinc-200/60 gap-4">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold font-mono tracking-tight text-zinc-900 flex items-center gap-2">
                  <BookOpen className="w-6 h-6 text-zinc-700" />
                  Recent Posts
                </h2>
                <p className="text-xs sm:text-sm text-zinc-500 font-mono mt-1">
                  Populated dynamically from Sanity Studio or structured local content.
                </p>
              </div>

              <Link
                href="/studio"
                className="inline-flex items-center gap-1.5 text-xs font-mono px-3 py-1.5 rounded-lg bg-zinc-900 text-white hover:bg-black transition-colors self-start sm:self-auto"
              >
                <Terminal className="w-3.5 h-3.5" />
                <span>Open Studio CMS</span>
              </Link>
            </div>

            <div className="space-y-6">
              {posts.map((post) => (
                <article
                  key={post._id}
                  className="group relative rounded-xl border border-zinc-200 bg-white p-6 sm:p-8 shadow-sm hover:shadow-md hover:border-zinc-300 transition-all"
                >
                  <div className="flex items-center justify-between gap-4 mb-3">
                    <span className="text-[11px] font-mono uppercase tracking-wider font-semibold px-2 py-0.5 rounded bg-zinc-100 text-zinc-700">
                      {post.category}
                    </span>
                    <span className="text-xs font-mono text-zinc-400">
                      {post.publishedAt}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-zinc-900 group-hover:text-blue-600 transition-colors mb-3">
                    {post.title}
                  </h3>

                  <p className="text-sm sm:text-base text-zinc-600 leading-relaxed mb-6">
                    {post.summary}
                  </p>

                  <div className="flex items-center justify-between text-xs font-mono text-zinc-500 pt-4 border-t border-zinc-100">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-zinc-950 text-white flex items-center justify-center font-bold text-[10px]">
                        FK
                      </div>
                      <span className="text-zinc-800 font-medium">
                        {post.author.name}
                      </span>
                    </div>

                    <span className="text-zinc-400">{post.readTime}</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
