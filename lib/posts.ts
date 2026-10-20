import { client } from '@/sanity/lib/client';

export interface Post {
  _id: string;
  title: string;
  slug: string;
  summary: string;
  publishedAt: string;
  readTime: string;
  category: string;
  author: {
    name: string;
    role: string;
  };
}

export const fallbackPosts: Post[] = [
  {
    _id: 'post-1',
    title: 'Why Next.js Developers Love Sanity CMS',
    slug: 'why-nextjs-developers-love-sanity',
    summary:
      'Exploring the synergy between Next.js App Router and Sanity: Real-time visual editing, structured content modeling, and instant preview environments.',
    publishedAt: 'October 16, 2026',
    readTime: '4 min read',
    category: 'Architecture',
    author: {
      name: 'Francis Kodama',
      role: 'Technical Product Lead',
    },
  },
  {
    _id: 'post-2',
    title: 'Zero-Downtime Email Deliverability with Resend & Next.js 16',
    slug: 'email-deliverability-with-resend-and-nextjs',
    summary:
      'How to properly configure SPF, DKIM, and DMARC on a Brazilian .com.br domain for transactional email pipelines like Monkey Mori.',
    publishedAt: 'October 14, 2026',
    readTime: '6 min read',
    category: 'DevOps & Email',
    author: {
      name: 'Francis Kodama',
      role: 'Technical Product Lead',
    },
  },
  {
    _id: 'post-3',
    title: 'Designing Decoupled Micro-Tools: Lessons from HandyFor.me',
    slug: 'designing-decoupled-micro-tools',
    summary:
      'Bridging high-level strategic ambition with tactical execution through unified UI shells, type-safe Zod schemas, and low-friction state sync.',
    publishedAt: 'October 02, 2026',
    readTime: '5 min read',
    category: 'Product Design',
    author: {
      name: 'Francis Kodama',
      role: 'Technical Product Lead',
    },
  },
];

export async function getPosts(): Promise<Post[]> {
  if (!client) {
    return fallbackPosts;
  }

  try {
    const query = `*[_type == "post"] | order(publishedAt desc) {
      _id,
      title,
      "slug": slug.current,
      summary,
      publishedAt,
      "category": coalesce(category, "Engineering"),
      "readTime": "5 min read",
      author->{
        name,
        role
      }
    }`;

    const isDev = process.env.NODE_ENV === 'development';
    const posts = await client.fetch(
      query,
      {},
      { next: { revalidate: isDev ? 0 : 60 } }
    );
    if (posts && posts.length > 0) {
      return posts.map((post: Post) => ({
        ...post,
        publishedAt: post.publishedAt
          ? new Date(post.publishedAt).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })
          : '',
      }));
    }
  } catch (error) {
    console.warn('Failed to fetch from Sanity, using fallback content:', error);
  }

  return fallbackPosts;
}
