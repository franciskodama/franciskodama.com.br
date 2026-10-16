import React from 'react';
import Link from 'next/link';
import { ShieldAlert, ArrowLeft } from 'lucide-react';
import { auth, signOut } from '@/auth';

export const metadata = {
  title: 'Access Restricted | Francis Kodama',
  description: 'Unauthorized access',
};

export const instant = false;

export default async function UnauthorizedPage() {
  const session = await auth();

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-sm rounded-2xl border border-red-500/20 bg-zinc-900/60 p-8 shadow-2xl text-center">
        <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-4 text-red-400">
          <ShieldAlert className="w-6 h-6" />
        </div>

        <h1 className="text-xl font-bold font-mono text-white mb-2">Access Restricted</h1>

        <p className="text-xs font-mono text-zinc-400 leading-relaxed mb-6">
          The signed-in account{' '}
          {session?.user?.email && (
            <span className="text-red-400 font-semibold block mt-1">
              {session.user.email}
            </span>
          )}{' '}
          is not authorized to access this private command center.
        </p>

        <div className="space-y-3">
          <form
            action={async () => {
              'use server';
              await signOut({ redirectTo: '/login' });
            }}
          >
            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-mono text-xs font-semibold transition-colors cursor-pointer"
            >
              Sign In with a Different Account
            </button>
          </form>

          <Link
            href="/"
            className="block text-xs font-mono text-zinc-500 hover:text-zinc-300 transition-colors pt-2"
          >
            Return to public site
          </Link>
        </div>
      </div>
    </div>
  );
}
