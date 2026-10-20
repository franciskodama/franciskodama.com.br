import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
    <div className='min-h-screen bg-white text-zinc-900 flex flex-col justify-between font-sans selection:bg-blue selection:text-white'>
      {/* Minimal Header */}
      <header className='border-b border-gray-100 bg-white/80 backdrop-blur-lg py-5 px-4 sm:px-8 flex items-center justify-between'>
        <Link href='/' className='flex items-center group'>
          <Image
            src='/images/logo-fkodama.png'
            alt='fkodama'
            width={138}
            height={51}
            priority
            className='h-[36.8px] sm:h-[41.4px] w-auto group-hover:opacity-80 transition-opacity'
          />
        </Link>
        <Link
          href='/'
          className='inline-flex items-center gap-1.5 text-xs font-mono text-zinc-500 hover:text-brand transition-colors'
        >
          <ArrowLeft className='w-3.5 h-3.5' />
          <span>Back to Site</span>
        </Link>
      </header>

      {/* Login Card */}
      <main className='flex-1 flex items-center justify-center p-4 relative'>
        <div className='absolute inset-0 bg-[url(/images/tile-grid-black.png)] bg-size-[17px] opacity-10 bg-position-[0_1] pointer-events-none'></div>

        <div className='w-full max-w-sm rounded-sm border border-gray-200 bg-white p-8 shadow-xs relative'>
          <div className='flex flex-col items-center text-center mb-6'>
            <div className='w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center mb-4 text-brand border border-gray-200'>
              <Lock className='w-5 h-5' />
            </div>
            <div className='inline-block text-[11px] uppercase py-0.5 px-2.5 bg-gray-50 font-mono text-zinc-600 border border-gray-200 rounded-sm mb-2'>
              Restricted Area
            </div>
            <h1 className='text-2xl font-bold font-mono tracking-tight text-zinc-950'>
              Private Gateway
            </h1>
            <p className='text-xs text-zinc-500 font-mono mt-1.5 leading-relaxed'>
              Access to franciskodama.com.br Mission Control is restricted to authorized maintainers.
            </p>
          </div>

          <GoogleSignInButton />

          <div className='mt-8 pt-6 border-t border-gray-100 text-center'>
            <Link
              href='/'
              className='text-xs font-mono text-zinc-500 hover:text-black transition-colors inline-flex items-center gap-1.5'
            >
              <ArrowLeft className='w-3.5 h-3.5' />
              <span>Return to public site</span>
            </Link>
          </div>
        </div>
      </main>

      <footer className='border-t border-gray-100 py-4 text-center text-xs font-mono text-zinc-400'>
        © {new Date().getFullYear()} Francis Kodama. All rights reserved.
      </footer>
    </div>
  );
}
