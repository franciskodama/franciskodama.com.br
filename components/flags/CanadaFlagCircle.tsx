import React from 'react';

export function CanadaFlagCircle({ className = 'w-full h-full' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 9600 9600"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Canadian Flag"
    >
      <defs>
        <clipPath id="circle_clip_canada">
          <circle cx="4800" cy="4800" r="4800" />
        </clipPath>
      </defs>

      <g clipPath="url(#circle_clip_canada)">
        {/* Left red stripe */}
        <rect x="0" y="0" width="2400" height="9600" fill="#d52b1e" />

        {/* Center white stripe */}
        <rect x="2400" y="0" width="4800" height="9600" fill="#ffffff" />

        {/* Right red stripe */}
        <rect x="7200" y="0" width="2400" height="9600" fill="#d52b1e" />

        {/* Official Canadian Maple Leaf (centered at 4800, 4800) */}
        <g transform="translate(0, 2400)">
          <path
            fill="#d52b1e"
            d="m4890 4430-45-863a95 95 0 0 1 111-98l859 151-116-320a65 65 0 0 1 20-73l941-762-212-99a65 65 0 0 1-34-79l186-572-542 115a65 65 0 0 1-73-38l-105-247-423 454a65 65 0 0 1-111-57l204-1052-327 189a65 65 0 0 1-91-27l-332-652-332 652a65 65 0 0 1-91 27l-327-189 204 1052a65 65 0 0 1-111 57l-423-454-105 247a65 65 0 0 1-73 38l-542-115 186 572a65 65 0 0 1-34 79l-212 99 941 762a65 65 0 0 1 20 73l-116 320 859-151a95 95 0 0 1 111 98l-45 863z"
          />
        </g>
      </g>
    </svg>
  );
}
