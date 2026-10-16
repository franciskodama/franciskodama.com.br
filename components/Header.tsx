import React from 'react';
import Link from 'next/link';
import { AuthButton } from './AuthButton';
import { auth } from '@/auth';

export async function Header() {
  const session = await auth();

  return (
    <header className="fixed z-50 h-20 inset-x-0 top-0 bg-white/80 backdrop-blur-md border-b border-zinc-100 flex items-center">
      <div className="max-w-6xl mx-auto w-full px-4 sm:px-6">
        <div className="flex items-center justify-between gap-4">
          {/* Logo / Brand */}
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

          {/* Nav links and Auth disguised button */}
          <nav className="flex items-center gap-4 sm:gap-6">
            <ul className="hidden md:flex items-center gap-6 font-mono text-xs text-zinc-600 tracking-tight">
              <li>
                <Link
                  href="/#articles"
                  className="hover:text-zinc-950 transition-colors"
                >
                  Articles
                </Link>
              </li>
              <li>
                <Link
                  href="/studio"
                  className="hover:text-zinc-950 transition-colors flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                  Studio
                </Link>
              </li>
              <li>
                <a
                  href="https://www.fkodama.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-zinc-950 transition-colors"
                >
                  Portfolio ↗
                </a>
              </li>
            </ul>

            <div className="pl-2 sm:border-l sm:border-zinc-200">
              <AuthButton user={session?.user} />
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
