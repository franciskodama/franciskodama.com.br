import React from 'react';
import { ExternalLink } from 'lucide-react';
import { GithubIcon } from './icons/GithubIcon';

export function Footer() {
  return (
    <footer className="bg-zinc-50 border-t border-zinc-200/60 py-16 sm:py-24 relative overflow-hidden">
      {/* Subtle grid pattern background */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] bg-size-[16px_16px] opacity-60 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-mono font-bold tracking-tight text-zinc-900">
              Built with Sanity + Next.js
            </h3>
            <p className="text-xs text-zinc-500 font-mono mt-1">
              Personal Engineering Publication & Digital Hub by Francis Kodama
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono">
            <a
              href="https://github.com/franciskodama"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900 hover:bg-black text-white transition-colors"
            >
              <GithubIcon className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>

            <a
              href="https://www.sanity.io/docs"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-600 hover:text-zinc-950 hover:underline px-2 py-1"
            >
              Sanity Docs
            </a>

            <a
              href="https://nextjs.org/docs"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-600 hover:text-zinc-950 hover:underline px-2 py-1"
            >
              Next.js Docs
            </a>

            <a
              href="https://www.fkodama.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-zinc-600 hover:text-zinc-950 hover:underline px-2 py-1"
            >
              <span>Portfolio</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-zinc-200/50 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-zinc-400 gap-4">
          <p>© 2026 Francis Kodama. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              All systems normal
            </span>
            <span>Montreal / Toronto ⇄ São Paulo</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
