import React from 'react';
import Link from 'next/link';
import { Lock, ArrowLeft } from 'lucide-react';
import { GoogleSignInButton } from '@/components/GoogleSignInButton';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Sign In | Francis Kodama',
  description: 'Private administrative login',
};

export const instant = false;

export default async function LoginPage() {
  const session = await auth();

  // If already logged in, redirect directly to dashboard
  if (session?.user) {
    redirect('/dashboard');
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col items-center justify-center p-4 selection:bg-blue-600 selection:text-white">
      <div className="w-full max-w-sm rounded-2xl border border-zinc-800 bg-zinc-900/60 p-8 shadow-2xl backdrop-blur-md">
        <div className="flex flex-col items-center text-center mb-6">
          <div className="w-12 h-12 rounded-xl bg-zinc-800 flex items-center justify-center mb-4 text-zinc-300 border border-zinc-700">
            <Lock className="w-5 h-5 text-red-400" />
          </div>
          <h1 className="text-xl font-bold font-mono text-white">Private Gateway</h1>
          <p className="text-xs text-zinc-400 font-mono mt-1">
            Access to franciskodama.com.br Mission Control is restricted.
          </p>
        </div>

        <GoogleSignInButton />

        <div className="mt-8 pt-6 border-t border-zinc-800 text-center">
          <Link
            href="/"
            className="text-xs font-mono text-zinc-500 hover:text-zinc-300 transition-colors inline-flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to public publication</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
