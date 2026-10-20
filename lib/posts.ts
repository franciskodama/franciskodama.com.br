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
  mainImage?: unknown;
  body?: unknown;
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
    body: [
      {
        _key: 'b1',
        _type: 'block',
        style: 'normal',
        children: [
          {
            _key: 'b1-s1',
            _type: 'span',
            marks: [],
            text: 'When building modern web applications, the boundary between structured content management and developer experience has historically been fraught with friction. Traditional CMS platforms often impose rigid templating patterns or lag behind the rapid evolution of modern JavaScript frameworks.',
          },
        ],
        markDefs: [],
      },
      {
        _key: 'b2',
        _type: 'block',
        style: 'h2',
        children: [
          {
            _key: 'b2-s1',
            _type: 'span',
            marks: [],
            text: 'Structured Content Meets React Server Components',
          },
        ],
        markDefs: [],
      },
      {
        _key: 'b3',
        _type: 'block',
        style: 'normal',
        children: [
          {
            _key: 'b3-s1',
            _type: 'span',
            marks: [],
            text: 'Sanity treats content as raw data rather than marked-up HTML. Coupled with the Next.js App Router and React Server Components (RSC), data fetching happens directly on the server without leaking bundle size to the client. Queries written in GROQ (Graph-Relational Object Queries) allow you to fetch precisely the fields you need—nothing more, nothing less.',
          },
        ],
        markDefs: [],
      },
      {
        _key: 'b4',
        _type: 'block',
        style: 'h2',
        children: [
          {
            _key: 'b4-s1',
            _type: 'span',
            marks: [],
            text: 'Live Visual Editing and Embedded Studios',
          },
        ],
        markDefs: [],
      },
      {
        _key: 'b5',
        _type: 'block',
        style: 'normal',
        children: [
          {
            _key: 'b5-s1',
            _type: 'span',
            marks: [],
            text: 'One of the standout features of Sanity Studio v3 is its ability to embed seamlessly into any Next.js route (such as /studio). Writers and editors can work inside the exact same codebase, with instantaneous previews enabled by Next.js draft mode and Sanity Stega encoding.',
          },
        ],
        markDefs: [],
      },
      {
        _key: 'b6',
        _type: 'block',
        style: 'normal',
        children: [
          {
            _key: 'b6-s1',
            _type: 'span',
            marks: [],
            text: 'The combination establishes an exceptional developer velocity while empowering non-technical team members to shape the narrative without engineering bottlenecks.',
          },
        ],
        markDefs: [],
      },
    ],
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
    body: [
      {
        _key: 'b1',
        _type: 'block',
        style: 'normal',
        children: [
          {
            _key: 'b1-s1',
            _type: 'span',
            marks: [],
            text: 'Transactional email deliverability is often treated as an afterthought until critical emails start landing in spam folders or bouncing completely. For international domains—especially those registered under Registro.br (.com.br)—DNS alignment requires strict attention to protocol standards.',
          },
        ],
        markDefs: [],
      },
      {
        _key: 'b2',
        _type: 'block',
        style: 'h2',
        children: [
          {
            _key: 'b2-s1',
            _type: 'span',
            marks: [],
            text: 'The Deliverability Trifecta: SPF, DKIM, and DMARC',
          },
        ],
        markDefs: [],
      },
      {
        _key: 'b3',
        _type: 'block',
        style: 'normal',
        children: [
          {
            _key: 'b3-s1',
            _type: 'span',
            marks: [],
            text: 'Major inbox providers (Google, Yahoo, Microsoft) enforce strict authentication requirements. Without an explicit DMARC policy and aligned SPF/DKIM records, emails from your application will face aggressive throttling or outright rejection.',
          },
        ],
        markDefs: [],
      },
      {
        _key: 'b4',
        _type: 'block',
        style: 'h2',
        children: [
          {
            _key: 'b4-s1',
            _type: 'span',
            marks: [],
            text: 'Implementing Resend with Server Actions',
          },
        ],
        markDefs: [],
      },
      {
        _key: 'b5',
        _type: 'block',
        style: 'normal',
        children: [
          {
            _key: 'b5-s1',
            _type: 'span',
            marks: [],
            text: 'By coupling Resend with Next.js 16 Server Actions, you can trigger transactional emails with end-to-end type safety. Keep credentials tightly scoped using server-only environment variables and monitor delivery events via webhooks to catch any anomalies before they impact your users.',
          },
        ],
        markDefs: [],
      },
    ],
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
    body: [
      {
        _key: 'b1',
        _type: 'block',
        style: 'normal',
        children: [
          {
            _key: 'b1-s1',
            _type: 'span',
            marks: [],
            text: 'Monolithic utility apps often suffer from feature bloat and cognitive overload. When designing HandyFor.me, the guiding architectural principle was radical decoupling: each tool should do one thing flawlessly while sharing a coherent design language.',
          },
        ],
        markDefs: [],
      },
      {
        _key: 'b2',
        _type: 'block',
        style: 'h2',
        children: [
          {
            _key: 'b2-s1',
            _type: 'span',
            marks: [],
            text: 'Unified UI Shells and Micro-Interactions',
          },
        ],
        markDefs: [],
      },
      {
        _key: 'b3',
        _type: 'block',
        style: 'normal',
        children: [
          {
            _key: 'b3-s1',
            _type: 'span',
            marks: [],
            text: 'Users should feel instantly familiar regardless of whether they are converting currencies, formatting JSON, or calculating timezones. A consistent shell with keyboard shortcuts, dark mode accents, and clear feedback loops dramatically reduces time-to-value.',
          },
        ],
        markDefs: [],
      },
      {
        _key: 'b4',
        _type: 'block',
        style: 'h2',
        children: [
          {
            _key: 'b4-s1',
            _type: 'span',
            marks: [],
            text: 'State Synchronization Without Centralized Bloat',
          },
        ],
        markDefs: [],
      },
      {
        _key: 'b5',
        _type: 'block',
        style: 'normal',
        children: [
          {
            _key: 'b5-s1',
            _type: 'span',
            marks: [],
            text: 'Leveraging lightweight local persistence and schema validation via Zod guarantees that tool configurations remain resilient without requiring heavyweight backend infrastructure.',
          },
        ],
        markDefs: [],
      },
    ],
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
      "category": coalesce(category, "Architecture"),
      "readTime": "5 min read",
      author->{
        name,
        role
      },
      mainImage,
      body
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

export async function getPost(slug: string): Promise<Post | null> {
  if (client) {
    try {
      const query = `*[_type == "post" && slug.current == $slug][0] {
        _id,
        title,
        "slug": slug.current,
        summary,
        publishedAt,
        "category": coalesce(category, "Architecture"),
        "readTime": "5 min read",
        author->{
          name,
          role
        },
        mainImage,
        body
      }`;

      const isDev = process.env.NODE_ENV === 'development';
      const post = await client.fetch(
        query,
        { slug },
        { next: { revalidate: isDev ? 0 : 60 } }
      );

      if (post) {
        return {
          ...post,
          publishedAt: post.publishedAt
            ? new Date(post.publishedAt).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })
            : '',
        };
      }
    } catch (error) {
      console.warn('Failed to fetch post from Sanity, checking fallback content:', error);
    }
  }

  const fallback = fallbackPosts.find((p) => p.slug === slug);
  return fallback || null;
}
