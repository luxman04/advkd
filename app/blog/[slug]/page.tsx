import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PortableText, type PortableTextComponents } from '@portabletext/react';
import { getAllSlugs, getPostBySlug } from '@/lib/blog-data';
import { siteConfig } from '@/lib/site-config';

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
    },
  };
}

const portableTextComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className="mb-5 last:mb-0">{children}</p>,
    h2: ({ children }) => <h2 className="font-serif text-navy text-[1.4rem] mt-10 mb-4">{children}</h2>,
    h3: ({ children }) => <h3 className="font-serif text-navy text-[1.15rem] mt-8 mb-3">{children}</h3>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-[3px] border-gold pl-5 italic text-navy/80 my-6">{children}</blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc pl-5 space-y-2 mb-5">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal pl-5 space-y-2 mb-5">{children}</ol>,
  },
  marks: {
    strong: ({ children }) => <strong className="text-navy font-medium">{children}</strong>,
    link: ({ children, value }) => (
      <a href={value?.href} className="text-gold hover:underline" target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    ),
  },
};

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: { '@type': 'Person', name: siteConfig.fullName },
    publisher: { '@type': 'Organization', name: siteConfig.name },
  };

  return (
    <article className="bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="bg-navy hero-diagonal px-[8%] pt-16 pb-14 relative overflow-hidden">
        <div className="relative z-10 max-w-[760px]">
          <div className="text-[0.75rem] text-[#5A6A7A] mb-4">
            <Link href="/" className="text-gold hover:underline">Home</Link> &rsaquo;{' '}
            <Link href="/blog" className="text-gold hover:underline">Blog</Link> &rsaquo; {post.title}
          </div>
          <span className="inline-block bg-gold text-navy text-[0.65rem] font-medium tracking-wide uppercase px-2.5 py-1 rounded-sm mb-4">
            {post.category}
          </span>
          <h1 className="font-serif text-white mb-3 leading-tight" style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)' }}>
            {post.title}
          </h1>
          <p className="text-[#6A7A8A] text-[0.85rem]">{post.displayDate}</p>
        </div>
      </div>

      <div className="max-w-[760px] mx-auto px-[8%] md:px-0 py-14">
        <div className="text-muted font-light text-[0.97rem] leading-[1.9]">
          <PortableText value={post.body} components={portableTextComponents} />
        </div>
        <div className="mt-12 pt-8 border-t border-black/[0.08] flex flex-wrap items-center justify-between gap-4">
          <span className="text-[0.8rem] text-muted">
            Disclaimer: The content presented in this section is intended solely for academic and educational purposes and 
            is not intended to promote, endorse, or advance any political agenda or viewpoint.
          </span>
          <Link href="/contact" className="btn-primary">Get Legal Advice →</Link>
        </div>
        <div className="mt-10">
          <Link href="/blog" className="text-gold text-[0.85rem] font-medium hover:underline">← Back to all articles</Link>
        </div>
      </div>
    </article>
  );
}
