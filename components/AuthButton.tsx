'use client';

import React from 'react';
import { signIn, signOut } from 'next-auth/react';
import Link from 'next/link';
import { LogOut, LayoutDashboard } from 'lucide-react';
import { GithubIcon } from './icons/GithubIcon';

interface AuthButtonProps {
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  } | null;
}

export function AuthButton({ user }: AuthButtonProps) {
  if (user) {
    return (
      <div className="flex items-center gap-2">
        <Link
          href="/dashboard"
          className="rounded-full flex gap-3 items-center bg-black hover:bg-blue py-2 px-4 justify-center sm:py-3 sm:px-6 text-white font-mono text-xs sm:text-base transition-colors duration-200"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <LayoutDashboard className="w-4 h-4 text-zinc-300" />
          <span className="whitespace-nowrap">HQ Mission Control</span>
        </Link>

        <button
          onClick={() => signOut({ callbackUrl: '/' })}
          title="Sign out of private hub"
          className="p-2 rounded-full text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 transition-colors cursor-pointer"
          aria-label="Sign out"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
      className="rounded-full flex gap-4 items-center bg-black hover:bg-blue py-2 px-4 justify-center sm:py-3 sm:px-6 text-white transition-colors duration-200 font-mono text-xs sm:text-base cursor-pointer"
      title="View on GitHub (Click to access Private Command Center)"
    >
      <span className="whitespace-nowrap">View on GitHub</span>
      <GithubIcon className="hidden sm:block h-4 sm:h-6 w-4 sm:w-6" />
    </button>
  );
}
