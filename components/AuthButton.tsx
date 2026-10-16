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
          className="rounded-full flex gap-2 items-center bg-zinc-900 hover:bg-black text-white py-2 px-4 sm:py-2.5 sm:px-5 font-mono text-xs sm:text-sm font-medium transition-colors shadow-sm"
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
      className="group relative rounded-full flex gap-3 items-center bg-zinc-900 hover:bg-blue-600 focus:bg-blue-600 py-2 px-4 sm:py-2.5 sm:px-5 font-mono text-xs sm:text-sm text-white transition-all duration-200 cursor-pointer shadow-sm hover:shadow"
      title="View on GitHub (Click to access Private Command Center)"
    >
      <span className="whitespace-nowrap font-medium">View on GitHub</span>
      <GithubIcon className="w-4 h-4 text-zinc-300 group-hover:text-white transition-colors" />
    </button>
  );
}
