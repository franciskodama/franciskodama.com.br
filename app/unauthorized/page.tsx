import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
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

      {/* Main card */}
      <main className='flex-1 flex items-center justify-center p-4 relative'>
        <div className='absolute inset-0 bg-[url(/images/tile-grid-black.png)] bg-size-[17px] opacity-10 bg-position-[0_1] pointer-events-none'></div>

        <div className='w-full max-w-sm rounded-sm border border-red-200 bg-white p-8 shadow-xs text-center relative'>
          <div className='w-12 h-12 rounded-full bg-red-50 border border-red-200 flex items-center justify-center mx-auto mb-4 text-brand'>
            <ShieldAlert className='w-6 h-6' />
          </div>

          <div className='inline-block text-[11px] uppercase py-0.5 px-2.5 bg-red-50 text-brand font-mono border border-red-200 rounded-sm mb-2 font-medium'>
            Authorization Required
          </div>

          <h1 className='text-2xl font-bold font-mono tracking-tight text-zinc-950 mb-2'>
            Access Restricted
          </h1>

          <p className='text-xs font-mono text-zinc-600 leading-relaxed mb-6'>
            The signed-in account{' '}
            {session?.user?.email && (
              <span className='text-brand font-semibold block mt-1 break-all'>
                {session.user.email}
              </span>
            )}{' '}
            is not on the authorized allowlist for Mission Control.
          </p>

          <div className='space-y-3'>
            <form
              action={async () => {
                'use server';
                await signOut({ redirectTo: '/login' });
              }}
            >
              <button
                type='submit'
                className='w-full py-2.5 rounded-full bg-black hover:bg-blue text-white font-mono text-xs font-semibold transition-colors cursor-pointer'
              >
                Sign In with a Different Account
              </button>
            </form>

            <Link
              href='/'
              className='block text-xs font-mono text-zinc-500 hover:text-black transition-colors pt-2'
            >
              Return to public site
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
