import { PRIVATE_HEADERS, readPrivateFile, requireAdmin } from '@/lib/pm-skills';

export async function GET() {
  await requireAdmin();
  const zip = await readPrivateFile('pack.zip');
  return new Response(zip, {
    headers: {
      ...PRIVATE_HEADERS,
      'Content-Type': 'application/zip',
      'Content-Disposition':
        'attachment; filename="complete-claude-guide-for-product-managers-pack.zip"',
    },
  });
}
