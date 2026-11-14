import { PRIVATE_HEADERS, readPrivateFile, requireAdmin } from '@/lib/pm-skills';

export async function GET() {
  await requireAdmin();
  const html = await readPrivateFile('index.html');
  return new Response(html, {
    headers: { ...PRIVATE_HEADERS, 'Content-Type': 'text/html; charset=utf-8' },
  });
}
