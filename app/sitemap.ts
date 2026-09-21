import type { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/site-config';
import { getAllPosts } from '@/lib/blog-data';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages = ['', '/about', '/practice-areas', '/blog', '/contact', '/privacy-policy', '/disclaimer'].map(
    (path) => ({
      url: `${siteConfig.url}${path}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: path === '' ? 1 : 0.8,
    })
  );

  const posts = await getAllPosts();
  const blogPages = posts.map((post) => ({
    url: `${siteConfig.url}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'yearly' as const,
    priority: 0.6,
  }));

  return [...staticPages, ...blogPages];
}
