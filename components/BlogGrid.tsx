'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { BlogPost, getAllCategories } from '@/lib/blog-types';

export default function BlogGrid({ posts }: { posts: BlogPost[] }) {
  const [category, setCategory] = useState('All');
  const [query, setQuery] = useState('');
  const categories = useMemo(() => getAllCategories(posts), [posts]);

  const filtered = posts.filter((p) => {
    const matchesCategory = category === 'All' || p.category === category;
    const q = query.toLowerCase();
    const matchesQuery =
      !q || p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q) || p.category.toLowerCase().includes(q);
    return matchesCategory && matchesQuery;
  });

  return (
    <>
      <div className="bg-white px-[8%] py-7 border-b border-black/[0.07] flex flex-wrap gap-4 items-center">
        <div className="relative flex-1 min-w-[220px]">
          <svg viewBox="0 0 24 24" className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 stroke-gray-400 fill-none">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            placeholder="Search articles…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-10 pr-3.5 py-2.5 border border-black/15 rounded-sm bg-cream text-[0.88rem] outline-none focus:border-gold"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`px-4 py-1.5 rounded-full text-[0.75rem] font-medium border transition-colors ${
                category === c ? 'bg-gold border-gold text-navy' : 'bg-white border-black/15 text-muted hover:border-gold hover:text-gold'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="px-[8%] py-14">
        <p className="text-[0.82rem] text-muted mb-8">
          Showing {filtered.length} article{filtered.length !== 1 ? 's' : ''}
          {category !== 'All' ? ` in ${category}` : ''}
          {query ? ` matching "${query}"` : ''}
        </p>
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-muted">
            <h3 className="font-serif text-xl text-navy mb-2">No articles found</h3>
            <p className="text-[0.88rem] font-light">Try a different search term or category filter.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-7">
            {filtered.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="bg-white border border-black/[0.07] rounded-md overflow-hidden flex flex-col transition-transform hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="h-[180px] bg-navy relative flex items-center justify-center">
                  <div className="font-serif text-gold/25 text-8xl italic select-none">{post.category.charAt(0)}</div>
                  <div className="absolute top-3 left-3 bg-gold text-navy text-[0.65rem] font-medium tracking-wide uppercase px-2.5 py-1 rounded-sm">
                    {post.category}
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="text-[0.72rem] text-gray-400 mb-1.5">{post.displayDate}</div>
                  <div className="font-serif text-[1.05rem] text-navy leading-snug mb-3 flex-1">{post.title}</div>
                  <div className="text-[0.8rem] text-muted font-light leading-relaxed mb-4 line-clamp-3">{post.excerpt}</div>
                  <span className="text-[0.78rem] text-gold font-medium mt-auto">Read Article →</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
