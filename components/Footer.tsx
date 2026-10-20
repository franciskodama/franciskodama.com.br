import React from 'react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className='bg-gray-50 relative border-t border-gray-100'>
      <div className='absolute inset-0 bg-[url(/images/tile-grid-black.png)] bg-size-[17px] opacity-20 bg-position-[0_1] pointer-events-none'></div>
      <div className='container relative mx-auto px-4 sm:px-6'>
        <div className='w-full flex flex-col md:flex-row items-center justify-between gap-8 py-20 lg:py-28'>
          <h3 className='text-center text-3xl sm:text-4xl md:text-2xl font-mono leading-tight tracking-tighter md:text-left text-black max-w-md'>
            A playground for<br />
            web architecture & ideas.
          </h3>
          <div className='flex flex-col sm:flex-row gap-4 sm:gap-6 items-center justify-center md:justify-end shrink-0'>
            <a
              href='https://github.com/franciskodama/franciskodama.com.br'
              className='hover:underline font-mono text-zinc-800'
              target='_blank'
              rel='noopener noreferrer'
            >
              View on GitHub
            </a>
            <a
              href='https://www.linkedin.com/in/kodama'
              className='rounded-full flex gap-2 font-mono whitespace-nowrap items-center bg-black hover:bg-blue py-3 px-6 text-white transition-colors duration-200'
              target='_blank'
              rel='noopener noreferrer'
            >
              Connect on LinkedIn ↗
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
