import React from 'react';
import Link from 'next/link';
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
                <Link className="hover:underline" href="/studio">
                  Studio
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
              <li className="sm:before:w-[1px] sm:before:bg-gray-200 before:block flex sm:gap-4 md:gap-6">
                <AuthButton user={session?.user} />
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
