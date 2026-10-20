import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import { PortableText } from 'next-sanity';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { getPost, getPosts } from '@/lib/posts';
import { urlForImage } from '@/sanity/lib/image';

interface PostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return {
      title: 'Article Not Found | Francis Kodama',
      description: 'The requested article could not be found.',
    };
  }

  return {
    title: `${post.title} | Francis Kodama`,
    description: post.summary,
  };
}

const portableTextComponents = {
  block: {
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2 className='text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 mt-10 mb-4 pt-6 border-t border-zinc-100'>
        {children}
      </h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 className='text-xl sm:text-2xl font-semibold tracking-tight text-zinc-900 mt-8 mb-3'>
        {children}
      </h3>
    ),
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p className='text-base sm:text-lg text-zinc-700 leading-relaxed mb-6 font-normal'>
        {children}
      </p>
    ),
    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <blockquote className='border-l-4 border-brand pl-5 py-2 my-6 italic text-zinc-800 bg-zinc-50 rounded-r-md'>
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <ul className='list-disc pl-6 space-y-2 mb-6 text-base sm:text-lg text-zinc-700'>
        {children}
      </ul>
    ),
    number: ({ children }: { children?: React.ReactNode }) => (
      <ol className='list-decimal pl-6 space-y-2 mb-6 text-base sm:text-lg text-zinc-700'>
        {children}
      </ol>
    ),
  },
  marks: {
    link: ({
      children,
      value,
    }: {
      children?: React.ReactNode;
      value?: { href?: string };
    }) => {
      const href = value?.href || '#';
      const isExternal = href.startsWith('http');
      return (
        <a
          href={href}
          target={isExternal ? '_blank' : undefined}
          rel={isExternal ? 'noopener noreferrer' : undefined}
          className='text-blue underline underline-offset-2 hover:text-zinc-900 transition-colors'
        >
          {children}
        </a>
      );
    },
    code: ({ children }: { children?: React.ReactNode }) => (
      <code className='font-mono bg-zinc-100 text-zinc-900 px-1.5 py-0.5 rounded text-sm'>
        {children}
      </code>
    ),
  },
};

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  const mainImageUrl = post.mainImage ? urlForImage(post.mainImage)?.url() : null;

  return (
    <div className='min-h-screen bg-white text-zinc-900 flex flex-col font-sans selection:bg-blue selection:text-white'>
      <Suspense fallback={<div className='h-24 bg-white/80' />}>
        <Header />
      </Suspense>

      <main className='pt-24 flex-1'>
        {/* Post Hero Section */}
        <div className='border-b border-zinc-100 bg-zinc-50/50'>
          <div className='container mx-auto px-4 sm:px-6 py-12 sm:py-16 max-w-4xl'>
            {/* Back link */}
            <Link
              href='/#articles'
              className='inline-flex items-center gap-2 text-xs sm:text-sm font-mono text-zinc-500 hover:text-brand transition-colors group mb-8'
            >
              <ArrowLeft className='w-4 h-4 transition-transform group-hover:-translate-x-1' />
              <span>Back to Articles</span>
            </Link>

            {/* Badges / Metadata */}
            <div className='flex flex-wrap items-center gap-3 sm:gap-4 mb-5 text-xs font-mono text-zinc-500'>
              <span className='px-3 py-1 rounded-full bg-zinc-900 text-white font-medium uppercase tracking-wider text-[11px]'>
                {post.category || 'Architecture'}
              </span>
              {post.publishedAt && (
                <span className='flex items-center gap-1.5'>
                  <Calendar className='w-3.5 h-3.5 text-zinc-400' />
                  <time>{post.publishedAt}</time>
                </span>
              )}
              {post.readTime && (
                <>
                  <span className='text-zinc-300'>·</span>
                  <span className='flex items-center gap-1.5'>
                    <Clock className='w-3.5 h-3.5 text-zinc-400' />
                    <span>{post.readTime}</span>
                  </span>
                </>
              )}
            </div>

            {/* Title */}
            <h1 className='text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-zinc-950 leading-[1.15] mb-6'>
              {post.title}
            </h1>

            {/* Summary */}
            {post.summary && (
              <p className='text-lg sm:text-xl text-zinc-600 leading-relaxed font-light mb-8 max-w-3xl'>
                {post.summary}
              </p>
            )}

            {/* Author */}
            <div className='flex items-center gap-3 pt-6 border-t border-zinc-200/60'>
              <div className='h-10 w-10 relative rounded-full overflow-hidden ring-1 ring-zinc-200 shrink-0'>
                <Image
                  src='/images/avatar.jpg'
                  width={40}
                  height={40}
                  alt={post.author?.name || 'Francis Kodama'}
                  className='h-full w-full object-cover'
                />
              </div>
              <div className='flex flex-col'>
                <span className='text-sm text-zinc-900 font-semibold leading-tight'>
                  {post.author?.name || 'Francis Kodama'}
                </span>
                <span className='text-xs text-zinc-500 font-mono leading-tight mt-0.5'>
                  {post.author?.role || 'Technical Product Lead'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Image (if available) */}
        {mainImageUrl && (
          <div className='container mx-auto px-4 sm:px-6 max-w-4xl pt-8'>
            <div className='relative aspect-video w-full rounded-xl overflow-hidden border border-zinc-200 shadow-sm'>
              <Image
                src={mainImageUrl}
                alt={post.title}
                fill
                priority
                className='object-cover'
              />
            </div>
          </div>
        )}

        {/* Post Content */}
        <article className='container mx-auto px-4 sm:px-6 py-12 sm:py-16 max-w-3xl'>
          {post.body && Array.isArray(post.body) && post.body.length > 0 ? (
            <div className='prose-zinc max-w-none'>
              <PortableText
                value={post.body}
                components={portableTextComponents}
              />
            </div>
          ) : (
            <div className='text-base sm:text-lg text-zinc-700 leading-relaxed'>
              <p>{post.summary}</p>
            </div>
          )}

          {/* Bottom Back / Navigation */}
          <div className='mt-16 pt-8 border-t border-zinc-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4'>
            <Link
              href='/#articles'
              className='inline-flex items-center gap-2 font-mono text-sm text-zinc-900 hover:text-brand transition-colors font-medium group'
            >
              <ArrowLeft className='w-4 h-4 transition-transform group-hover:-translate-x-1' />
              <span>Explore all articles</span>
            </Link>

            <a
              href='https://www.linkedin.com/in/kodama'
              target='_blank'
              rel='noopener noreferrer'
              className='text-xs font-mono text-zinc-500 hover:text-zinc-900 transition-colors'
            >
              Discuss on LinkedIn ↗
            </a>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
