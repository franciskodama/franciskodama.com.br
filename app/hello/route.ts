import { NextResponse } from 'next/server';

export async function GET() {
  const card = `
\x1b[36m┌──────────────────────────────────────────────────────────────┐\x1b[0m
\x1b[36m│\x1b[0m                                                              \x1b[36m│\x1b[0m
\x1b[36m│\x1b[0m   \x1b[1m\x1b[37mFrancis Kodama\x1b[0m                                             \x1b[36m│\x1b[0m
\x1b[36m│\x1b[0m   \x1b[90mTechnical Product Lead\x1b[0m                                     \x1b[36m│\x1b[0m
\x1b[36m│\x1b[0m   \x1b[32m🇧🇷 Brazil\x1b[0m  \x1b[90m→\x1b[0m  \x1b[31m🇨🇦 Canada\x1b[0m                                    \x1b[36m│\x1b[0m
\x1b[36m│\x1b[0m                                                              \x1b[36m│\x1b[0m
\x1b[36m│\x1b[0m   \x1b[1mPortfolio:\x1b[0m  \x1b[34mhttps://www.fkodama.com\x1b[0m                        \x1b[36m│\x1b[0m
\x1b[36m│\x1b[0m   \x1b[1mTech Lab:\x1b[0m   \x1b[34mhttps://franciskodama.com.br\x1b[0m                   \x1b[36m│\x1b[0m
\x1b[36m│\x1b[0m   \x1b[1mGitHub:\x1b[0m     \x1b[34mhttps://github.com/franciskodama\x1b[0m               \x1b[36m│\x1b[0m
\x1b[36m│\x1b[0m   \x1b[1mLinkedIn:\x1b[0m   \x1b[34mhttps://linkedin.com/in/franciskodama\x1b[0m          \x1b[36m│\x1b[0m
\x1b[36m│\x1b[0m                                                              \x1b[36m│\x1b[0m
\x1b[36m│\x1b[0m   \x1b[90m"Do Brasil para o Canadá. Building digital products"\x1b[0m       \x1b[36m│\x1b[0m
\x1b[36m│\x1b[0m                                                              \x1b[36m│\x1b[0m
\x1b[36m└──────────────────────────────────────────────────────────────┘\x1b[0m
`;

  return new NextResponse(card, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
}
