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
          <Link className="flex items-center gap-2" href="/">
            <span className="text-lg sm:text-2xl font-semibold tracking-tight text-black">
              Sanity + Next.js
            </span>
          </Link>
          <nav>
            <ul
              role="list"
              className="flex items-center gap-4 md:gap-6 leading-5 text-xs sm:text-base tracking-tight font-mono text-zinc-900"
            >
              <li>
                <Link className="hover:underline" href="/about">
                  About
                </Link>
              </li>
              <li>
                <Link className="hover:underline" href="/studio">
                  Studio
                </Link>
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
