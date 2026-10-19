'use client';

import React from 'react';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { LogOut, LayoutDashboard, Lock } from 'lucide-react';

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
    <Link
      href="/login"
      title="Admin Gateway"
      aria-label="Admin Gateway"
      className="p-2.5 rounded-full text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 border border-transparent hover:border-zinc-200 transition-all duration-200 flex items-center justify-center cursor-pointer"
    >
      <Lock className="w-4 h-4" />
    </Link>
  );
}
