import React from 'react';
import Link from 'next/link';
import { SlidersHorizontal } from 'lucide-react';
import { AuthButton } from './AuthButton';
import { auth } from '@/auth';

export async function Header() {
  const session = await auth();

  return (
    <header className="fixed z-50 h-24 inset-0 bg-white/80 flex items-center backdrop-blur-lg border-b border-gray-100/60">
      <div className="container mx-auto py-6 px-4 sm:px-6">
        <div className="flex items-center justify-between gap-5">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-zinc-950 text-white flex items-center justify-center font-mono font-bold text-sm tracking-tight group-hover:scale-105 transition-transform">
              FK
            </div>
            <div className="flex flex-col">
              <span className="text-base sm:text-lg font-semibold tracking-tight text-zinc-900 leading-none">
                Francis Kodama
              </span>
              <span className="text-[11px] font-mono text-zinc-400 mt-0.5">
                Next.js + Sanity
              </span>
            </div>
          </Link>
          <nav>
            <ul
              role="list"
              className="flex items-center gap-4 md:gap-6 leading-5 text-xs sm:text-base tracking-tight font-mono text-zinc-900"
            >
              <li>
                <Link className="hover:underline" href="/#articles">
                  Articles
                </Link>
              </li>
              <li>
                <a
                  className="hover:underline"
                  href="https://www.fkodama.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Portfolio ↗
                </a>
              </li>
              <li className="sm:before:w-[1px] sm:before:bg-gray-200 before:block flex items-center sm:gap-3 md:gap-4">
                <div className="flex items-center gap-1">
                  <Link
                    href="/studio"
                    title="Sanity Studio"
                    aria-label="Sanity Studio"
                    className="p-2.5 rounded-full text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 border border-transparent hover:border-zinc-200 transition-all duration-200 flex items-center justify-center cursor-pointer"
                  >
                    <SlidersHorizontal className="w-4 h-4" />
                  </Link>
                  <AuthButton user={session?.user} />
                </div>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
