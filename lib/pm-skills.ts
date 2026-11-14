import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { redirect } from 'next/navigation';
import { auth } from '@/auth';

// Private copy of the Claude PM guide. The files live outside public/ so they are
// only ever served through the login-checked route handlers in app/pm-skills.
const DIR = path.join(process.cwd(), 'private', 'pm-skills');

/** Same rule as the dashboard: signed in, and on the ADMIN_EMAIL list when one is set. */
export async function requireAdmin() {
  const session = await auth();
  const email = session?.user?.email?.toLowerCase();
  if (!email) redirect('/login');

  const allowed = (process.env.ADMIN_EMAIL || '')
    .split(',')
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
  if (allowed.length > 0 && !allowed.includes(email)) redirect('/unauthorized');
}

export function readPrivateFile(name: 'index.html' | 'pack.zip') {
  return readFile(path.join(DIR, name));
}

/** Logged-in-only content must never be stored by shared caches. */
export const PRIVATE_HEADERS = {
  'Cache-Control': 'private, no-store',
  'X-Robots-Tag': 'noindex, nofollow',
};
