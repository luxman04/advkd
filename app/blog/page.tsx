import type { Metadata } from 'next';
import BlogGrid from '@/components/BlogGrid';
import { getAllPosts } from '@/lib/blog-data';

export const metadata: Metadata = {
  title: 'Legal Blog & Insights | Law Articles – Chandigarh & Delhi Courts',
  description:
    'Legal insights, know-your-rights guides, and analysis on Punjab & Haryana High Court and Delhi High Court judgments in criminal, bail, NRI property, and civil law.',
  keywords: [
    'Legal Blog Chandigarh',
    'Law Articles Delhi',
    'Punjab and Haryana High Court Judgments',
    'Delhi High Court Legal Analysis',
    'Bail Law Articles India',
    'FIR Quashing Legal Guide',
  ],
  alternates: { canonical: '/blog' },
};

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <>
      <div className="bg-navy hero-diagonal px-[8%] pt-16 pb-16 relative overflow-hidden">
        <div className="relative z-10">
          <div className="text-[0.75rem] text-[#5A6A7A] mb-4">
            <a href="/" className="text-gold hover:underline">Home</a> &rsaquo; Legal Blog
          </div>
          <h1 className="font-serif text-white mb-3" style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}>
            Reflections of Society <span className="font-devanagari">(सामाजिक चेतना)</span>
          </h1>
          <p className="text-[#8A9AAA] font-light max-w-[580px]">
            Legal insights, know-your-rights articles, and updates on important judgments — written in plain
            language for everyone.
          </p>
        </div>
      </div>
      {posts.length === 0 ? (
        <div className="text-center py-24 px-[8%] text-muted">
          <h3 className="font-serif text-xl text-navy mb-2">No articles published yet</h3>
          <p className="text-[0.9rem] font-light">Check back soon — new articles will appear here as they&apos;re published.</p>
        </div>
      ) : (
        <BlogGrid posts={posts} />
      )}
    </>
  );
}