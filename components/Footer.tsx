import React from 'react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className='bg-gray-50 relative border-t border-gray-100'>
      <div className='absolute inset-0 bg-[url(/images/tile-grid-black.png)] bg-size-[17px] opacity-20 bg-position-[0_1] pointer-events-none'></div>
      <div className='container relative mx-auto px-4 sm:px-6'>
        <div className='flex flex-col items-center py-28 lg:flex-row'>
          <h3 className='mb-10 text-center text-4xl font-mono leading-tight tracking-tighter lg:mb-0 lg:w-1/2 lg:pr-4 lg:text-left lg:text-2xl text-black'>
            A playground for web architecture & ideas.
          </h3>
          <div className='flex flex-col gap-3 items-center justify-center lg:w-1/2 lg:flex-row lg:pl-4'>
            <a
              href='https://github.com/franciskodama/franciskodama.com.br'
              className='rounded-full flex gap-2 font-mono whitespace-nowrap items-center bg-black hover:bg-blue focus:bg-blue py-3 px-6 text-white transition-colors duration-200'
              target='_blank'
              rel='noopener noreferrer'
            >
              View on GitHub
            </a>
            <a
              href='https://www.fkodama.com/'
              className='mx-3 hover:underline font-mono text-zinc-800'
              target='_blank'
              rel='noopener noreferrer'
            >
              About the author ↗
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
