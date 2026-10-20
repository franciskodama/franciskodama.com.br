import React, { Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CliSnippet } from '@/components/CliSnippet';
import { CanadaFlagCircle } from '@/components/flags/CanadaFlagCircle';
import { BrazilFlagCircle } from '@/components/flags/BrazilFlagCircle';
import { getPosts } from '@/lib/posts';

export default async function HomePage() {
  const posts = await getPosts();

  return (
    <div className='min-h-screen bg-white text-black flex flex-col font-sans selection:bg-blue selection:text-white'>
      <Suspense fallback={<div className='h-24 bg-white/80' />}>
        <Header />
      </Suspense>

      <main className='pt-24 flex-1'>
        {/* Hero Section with tile-1-black background */}
        <div className='relative'>
          <div className='relative bg-[url(/images/tile-1-black.png)] bg-size-[5px]'>
            <div className='bg-linear-to-b from-white w-full h-full absolute top-0 pointer-events-none'></div>
            <div className='container mx-auto px-4 sm:px-6'>
              <div className='relative min-h-[40vh] mx-auto max-w-2xl pt-10 xl:pt-20 pb-28 space-y-6 lg:max-w-4xl lg:px-12 flex flex-col items-center justify-center'>
                <div className='flex flex-col gap-4 items-center'>
                  <div className='text-md leading-6 uppercase py-1 px-3 bg-white font-mono italic text-zinc-800'>
                    The experimental lab of
                  </div>
                  <h1 className='text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-black text-center'>
                    <a
                      className='underline decoration-brand hover:text-brand underline-offset-8 hover:underline-offset-4 transition-all ease-out'
                      href='https://sanity.io/'
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      Francis
                    </a>
                    +
                    <a
                      className='underline decoration-[#009440] hover:text-[#009440] underline-offset-8 hover:underline-offset-4 transition-all ease-out'
                      href='https://nextjs.org/'
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      Kodama
                    </a>
                  </h1>
                </div>
              </div>
            </div>
          </div>

          {/* Overlapping Circles (Canada + Brazil Flags) */}
          <div className='flex flex-col items-center'>
            <div className='relative flex gap-0 -mt-13 group cursor-pointer'>
              {/* Canadian Flag circle */}
              <div className='z-10 aspect-square w-26 h-26 flex justify-center items-center rounded-full border-white border-4 bg-white shadow-md transform translate-x-2 group-hover:scale-110 group-hover:-translate-x-5 transition-all duration-300 overflow-hidden'>
                <CanadaFlagCircle className='w-full h-full' />
              </div>

              {/* Plus sign revealed on hover */}
              <div className='text-black opacity-0 text-3xl scale-50 font-bold absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 ease-in-out pointer-events-none'>
                +
              </div>

              {/* Brazilian Flag circle */}
              <div className='aspect-square w-26 h-26 border-white border-4 flex justify-center items-center rounded-full bg-white shadow-md transform -translate-x-2 group-hover:scale-110 group-hover:translate-x-5 transition-all duration-300 overflow-hidden'>
                <BrazilFlagCircle className='w-full h-full' />
              </div>
            </div>

            {/* Description & Command Snippet */}
            <div className='container relative mx-auto max-w-2xl pb-20 pt-10 space-y-6 lg:max-w-5xl lg:px-12 flex flex-col items-center'>
              <div className='text-gray-700 font-light text-center text-lg sm:text-xl lg:text-2xl leading-relaxed'>
                <p>
                  Do Brasil para o Canadá. My personal sandbox for product
                  management and engineering. Exploring front-end architecture,{' '}
                  Sanity content models, and experimental web tools, built with{' '}
                  Next.js and deployed to the global edge.
                </p>
              </div>

              <div className='flex items-center flex-col gap-4 w-full'>
                <CliSnippet />

                {/* <a
                  className='inline-flex text-brand text-xs md:text-sm underline hover:text-gray-900 items-center gap-1 mt-2'
                  target='_blank'
                  rel='noopener noreferrer'
                  href='https://www.fkodama.com'
                >
                  My Portfolio
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    className='w-4 h-4 ml-1 inline'
                    fill='currentColor'
                  >
                    <path d='M10 6V8H5V19H16V14H18V20C18 20.5523 17.5523 21 17 21H4C3.44772 21 3 20.5523 3 20V7C3 6.44772 3.44772 6 4 6H10ZM21 3V12L17.206 8.207L11.2071 14.2071L9.79289 12.7929L15.792 6.793L12 3H21Z'></path>
                  </svg>
                </a> */}
              </div>
            </div>
          </div>
        </div>

        {/* Recent Posts Section with gray-50 background */}
        <div
          id='articles'
          className='border-t border-gray-100 bg-gray-50 scroll-mt-24'
        >
          <div className='container mx-auto px-4 sm:px-6'>
            <aside className='py-12 sm:py-20 max-w-4xl mx-auto'>
              <div>
                <h2 className='text-3xl text-gray-900 sm:text-4xl lg:text-5xl font-bold tracking-tight'>
                  Recent Posts
                </h2>
                <p className='mt-2 text-lg leading-8 text-gray-600'>
                  Articles and notes populated live from your Sanity Studio.
                </p>

                <div className='pt-6 space-y-6'>
                  {posts.map((post) => (
                    <article
                      key={post._id}
                      className='border border-gray-200 rounded-sm p-6 bg-gray-50 flex flex-col justify-between transition-colors hover:bg-white relative shadow-xs'
                    >
                      <div>
                        <h3 className='text-2xl mb-4 font-bold text-gray-900 hover:text-brand transition-colors'>
                          <Link href={`/posts/${post.slug}`}>{post.title}</Link>
                        </h3>
                        <p className='line-clamp-3 text-sm leading-6 text-gray-600 max-w-[70ch]'>
                          {post.summary}
                        </p>
                      </div>

                      <div className='flex items-center justify-between mt-6 pt-4 border-t border-gray-100'>
                        <div className='flex items-center'>
                          <div className='h-9 w-9 mr-3 relative rounded-full overflow-hidden ring-1 ring-zinc-200 shrink-0'>
                            <Image
                              src='/images/avatar.jpg'
                              width={36}
                              height={36}
                              alt={post.author?.name || 'Francis Kodama'}
                              className='h-full w-full object-cover'
                            />
                          </div>
                          <div className='flex flex-col'>
                            <span className='text-sm text-gray-900 font-medium leading-tight'>
                              {post.author?.name || 'Francis Kodama'}
                            </span>
                            <span className='text-[11px] text-gray-500 font-mono leading-tight mt-0.5'>
                              {post.author?.role || 'Technical Product Lead'}
                            </span>
                          </div>
                        </div>

                        <div className='flex items-center gap-2 text-gray-500 text-xs font-mono'>
                          <time>{post.publishedAt}</time>
                          {post.readTime && (
                            <>
                              <span>·</span>
                              <span>{post.readTime}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
