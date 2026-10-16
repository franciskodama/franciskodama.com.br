'use client';

import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

export function CliSnippet() {
  const [copied, setCopied] = useState(false);
  const command = 'npx sanity@latest init --template sanity-io/sanity-template-nextjs-clean';

  const handleCopy = () => {
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col sm:inline-flex sm:flex-row rounded-2xl sm:rounded-full shadow-lg border border-zinc-200/80 bg-zinc-950 p-3 sm:pr-2 sm:pl-5 sm:py-2 text-white text-xs sm:text-sm font-mono gap-3 items-center">
      <span className="text-zinc-300 overflow-x-auto max-w-full text-center sm:text-left select-all">
        {command}
      </span>
      <button
        onClick={handleCopy}
        aria-label="Copy to clipboard"
        className="relative flex items-center justify-center p-2.5 sm:p-2 rounded-xl sm:rounded-full bg-blue-600 hover:bg-blue-500 text-white transition-all cursor-pointer shadow"
      >
        {copied ? (
          <Check className="w-4 h-4 text-emerald-300" />
        ) : (
          <Copy className="w-4 h-4" />
        )}
        <span
          className={`absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-yellow-400 text-zinc-950 font-mono text-[10px] font-bold py-1 px-2.5 rounded-md pointer-events-none transition-all duration-200 ${
            copied ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
        >
          Copied!
        </span>
      </button>
    </div>
  );
}
