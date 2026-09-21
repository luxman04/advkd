import 'server-only';
import type { PortableTextBlock } from 'sanity';
import { sanityFetch } from './sanity/client';
import { allPostsQuery, postBySlugQuery, postSlugsQuery } from './sanity/queries';
import type { BlogPost } from './blog-types';

export type { BlogPost } from './blog-types';
export { getAllCategories } from './blog-types';

export type BlogPostDetail = BlogPost & {
  body: PortableTextBlock[];
  coverImage?: unknown;
};

type RawPost = {
  slug: string;
  title: string;
  category: string;
  publishedAt: string;
  excerpt: string;
};

function formatDisplayDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' });
  } catch {
    return iso;
  }
}

function toBlogPost(raw: RawPost): BlogPost {
  return {
    slug: raw.slug,
    title: raw.title,
    category: raw.category,
    date: raw.publishedAt,
    displayDate: formatDisplayDate(raw.publishedAt),
    excerpt: raw.excerpt,
  };
}

/** All published posts, newest first. Returns [] if Sanity isn't configured yet or has no posts. */
export async function getAllPosts(): Promise<BlogPost[]> {
  const posts = await sanityFetch<RawPost[]>(allPostsQuery, {}, ['posts']);
  return (posts ?? []).map(toBlogPost);
}

/** A single post by slug, with full Portable Text body, or null if not found. */
export async function getPostBySlug(slug: string): Promise<BlogPostDetail | null> {
  const raw = await sanityFetch<RawPost & { body: PortableTextBlock[]; coverImage?: unknown }>(
    postBySlugQuery,
    { slug },
    ['posts', `post:${slug}`]
  );
  if (!raw) return null;
  return { ...toBlogPost(raw), body: raw.body, coverImage: raw.coverImage };
}

/** Every published slug — used by generateStaticParams for build-time page generation. */
export async function getAllSlugs(): Promise<string[]> {
  const slugs = await sanityFetch<string[]>(postSlugsQuery, {}, ['posts']);
  return slugs ?? [];
}
