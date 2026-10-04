'use client';

import { useEffect, useState, useMemo, useRef } from 'react';
import Link from 'next/link';

type PostItem = {
  _id: string;
  slug: string;
  title: string;
  category: string;
  publishedAt: string;
  excerpt: string;
  content?: string;
  coverImage?: any;
};

const CATEGORIES = [
  'Criminal Law',
  'NRI Legal',
  'Matrimonial Law',
  'Senior Citizens',
  'Civil & Property',
  'Consumer Law',
  'Constitutional Law',
  'Environmental Law',
  'General',
];

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('kdadvocate85');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Dashboard state
  const [view, setView] = useState<'list' | 'editor'>('list');
  const [posts, setPosts] = useState<PostItem[]>([]);
  const [loadingPosts, setLoadingPosts] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Editor state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [publishedAt, setPublishedAt] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [coverAssetId, setCoverAssetId] = useState<string | null>(null);
  const [coverPreviewUrl, setCoverPreviewUrl] = useState<string | null>(null);
  const [isSlugManual, setIsSlugManual] = useState(false);

  const [activeTab, setActiveTab] = useState<'write' | 'preview'>('write');
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [saveStatus, setSaveStatus] = useState<{ success?: boolean; message?: string; slug?: string } | null>(null);

  // Delete modal
  const [deleteTarget, setDeleteTarget] = useState<PostItem | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Check initial session in background
  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch('/api/admin/auth');
        const data = await res.json();
        if (data.authenticated) {
          setIsAuthenticated(true);
          fetchPosts();
        }
      } catch {
        // Not authenticated
      }
    }
    checkAuth();
  }, []);

  async function fetchPosts() {
    setLoadingPosts(true);
    try {
      const res = await fetch('/api/admin/posts');
      const data = await res.json();
      if (data.posts) {
        setPosts(data.posts);
      }
    } catch (err) {
      console.error('Failed to fetch posts:', err);
    } finally {
      setLoadingPosts(false);
    }
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoginError('');
    setIsLoggingIn(true);
    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setIsAuthenticated(true);
        setPassword('');
        fetchPosts();
      } else {
        setLoginError(data.error || 'Invalid credentials. Please verify username and password.');
      }
    } catch {
      setLoginError('Network error while logging in.');
    } finally {
      setIsLoggingIn(false);
    }
  }

  async function handleLogout() {
    try {
      await fetch('/api/admin/auth', { method: 'DELETE' });
    } finally {
      setIsAuthenticated(false);
      setView('list');
    }
  }

  function handleTitleChange(newTitle: string) {
    setTitle(newTitle);
    if (!isSlugManual && !editingId) {
      const autoSlug = newTitle
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-');
      setSlug(autoSlug);
    }
  }

  function startNewArticle() {
    setEditingId(null);
    setTitle('');
    setSlug('');
    setCategory(CATEGORIES[0]);
    setPublishedAt(new Date().toISOString().slice(0, 10));
    setExcerpt('');
    setContent('');
    setCoverAssetId(null);
    setCoverPreviewUrl(null);
    setIsSlugManual(false);
    setSaveStatus(null);
    setActiveTab('write');
    setView('editor');
  }

  function editArticle(post: PostItem) {
    setEditingId(post._id);
    setTitle(post.title);
    setSlug(post.slug);
    setCategory(post.category);
    setPublishedAt(post.publishedAt ? post.publishedAt.slice(0, 10) : new Date().toISOString().slice(0, 10));
    setExcerpt(post.excerpt || '');
    setContent(post.content || '');
    setCoverAssetId(null);
    setCoverPreviewUrl(null);
    setIsSlugManual(true);
    setSaveStatus(null);
    setActiveTab('write');
    setView('editor');
  }

  async function handleSavePost(e: React.FormEvent) {
    e.preventDefault();
    setSaveStatus(null);

    if (!title.trim() || !category || !excerpt.trim() || !content.trim()) {
      setSaveStatus({ success: false, message: 'Please fill in all required fields (Title, Category, Excerpt, Content).' });
      return;
    }

    setIsSaving(true);
    try {
      const res = await fetch('/api/admin/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          _id: editingId,
          title,
          slug: slug.trim() || title.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-'),
          category,
          publishedAt: publishedAt || new Date().toISOString(),
          excerpt,
          content,
          coverImageAssetId: coverAssetId,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSaveStatus({
          success: true,
          message: 'Article successfully published to website and synced with Google sitemap!',
          slug: data.slug,
        });
        fetchPosts();
      } else {
        setSaveStatus({ success: false, message: data.error || 'Failed to save article.' });
      }
    } catch {
      setSaveStatus({ success: false, message: 'Network error while publishing article.' });
    } finally {
      setIsSaving(false);
    }
  }

  async function handleDeletePost() {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/admin/posts?id=${encodeURIComponent(deleteTarget._id)}&slug=${encodeURIComponent(deleteTarget.slug)}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setDeleteTarget(null);
        fetchPosts();
      } else {
        alert('Failed to delete post.');
      }
    } catch {
      alert('Network error while deleting post.');
    } finally {
      setIsDeleting(false);
    }
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (res.ok && data.assetId) {
        setCoverAssetId(data.assetId);
        setCoverPreviewUrl(data.url);
      } else {
        alert(data.error || 'Failed to upload image.');
      }
    } catch {
      alert('Error uploading image.');
    } finally {
      setIsUploading(false);
    }
  }

  // Formatting toolbar inserts
  function insertFormat(prefix: string, suffix: string = '') {
    const ta = textareaRef.current;
    if (!ta) return;
    const start = ta.selectionStart;
    const end = ta.selectionEnd;
    const selected = content.slice(start, end);
    const replacement = `${prefix}${selected || 'text'}${suffix}`;
    const nextContent = content.slice(0, start) + replacement + content.slice(end);
    setContent(nextContent);
    setTimeout(() => {
      ta.focus();
      ta.setSelectionRange(start + prefix.length, start + prefix.length + (selected ? selected.length : 4));
    }, 10);
  }

  const filteredPosts = useMemo(() => {
    return posts.filter((p) => {
      const matchesCat = selectedCategory === 'All' || p.category === selectedCategory;
      const q = searchQuery.toLowerCase();
      const matchesQuery = !q || p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q);
      return matchesCat && matchesQuery;
    });
  }, [posts, selectedCategory, searchQuery]);

  // LOGIN SCREEN
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#08121E] text-white flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-gold/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 w-full max-w-md bg-navy/95 border border-gold/40 rounded-lg p-8 shadow-2xl backdrop-blur-md">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gold/10 border border-gold/30 text-gold mb-3">
              <svg viewBox="0 0 24 24" className="w-7 h-7 stroke-current fill-none stroke-[1.75]" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </div>
            <h1 className="font-serif text-2xl text-white font-medium">Adv. Karandeep (KD)</h1>
            <p className="text-gold text-xs uppercase tracking-widest mt-1">Admin Publishing Portal</p>
            <p className="text-gray-400 text-xs mt-2">Restricted Access • Articles & Google Indexing Management</p>
          </div>

          {loginError && (
            <div className="mb-5 p-3.5 bg-red-950/60 border border-red-500/40 rounded text-red-200 text-xs flex items-center gap-2">
              <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-current fill-none flex-shrink-0">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#C9C2B5] font-medium mb-1.5">
                Admin Username
              </label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#08121E] border border-gold/30 rounded text-white text-sm focus:border-gold outline-none transition-colors"
                placeholder="Enter admin username"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-[#C9C2B5] font-medium mb-1.5">
                Admin Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#08121E] border border-gold/30 rounded text-white text-sm focus:border-gold outline-none transition-colors"
                placeholder="Enter password"
              />
            </div>

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full mt-2 py-3 bg-gold hover:bg-[#D4A83A] text-navy font-semibold text-sm rounded tracking-wide uppercase transition-all shadow-md hover:shadow-lg disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isLoggingIn ? (
                <>
                  <div className="w-4 h-4 border-2 border-navy border-t-transparent rounded-full animate-spin" />
                  <span>Verifying…</span>
                </>
              ) : (
                <span>Sign In to Admin Portal</span>
              )}
            </button>
          </form>

          <div className="mt-8 pt-5 border-t border-white/10 text-center">
            <Link href="/" className="text-xs text-gray-400 hover:text-gold transition-colors inline-flex items-center gap-1.5">
              <span>← Return to Public Website</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // AUTHENTICATED ADMIN DASHBOARD
  return (
    <div className="min-h-screen bg-[#08121E] text-white flex flex-col font-sans">
      {/* Top Admin Bar */}
      <header className="bg-navy border-b border-gold/30 h-[68px] flex items-center justify-between px-[4%] sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <Link href="/admin" className="font-serif text-gold text-lg font-bold tracking-wide flex items-center gap-2">
            <span>Adv. KD</span>
            <span className="text-[0.65rem] uppercase tracking-wider font-sans bg-gold/15 text-gold border border-gold/30 px-2 py-0.5 rounded">
              Admin Portal
            </span>
          </Link>
          <span className="hidden sm:inline text-xs text-gray-400 pl-2 border-l border-white/10">
            Publishing on Website & Google
          </span>
        </div>

        <div className="flex items-center gap-4 text-xs">
          <Link
            href="/blog"
            target="_blank"
            className="hidden md:inline-flex items-center gap-1.5 text-[#C9C2B5] hover:text-gold transition-colors py-1.5 px-3 rounded border border-white/10 hover:border-gold/30"
          >
            <span>Live Blog</span>
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 stroke-current fill-none">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </Link>

          <span className="text-gray-400 hidden sm:inline">
            Logged in as <strong className="text-gold font-normal">kdadvocate85</strong>
          </span>

          <button
            onClick={handleLogout}
            className="text-xs bg-red-950/40 border border-red-500/30 text-red-200 hover:bg-red-900/60 px-3 py-1.5 rounded transition-colors"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-[4%] py-8">
        {view === 'list' ? (
          <div>
            {/* Header & Stats Banner */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
              <div>
                <h1 className="font-serif text-2xl md:text-3xl text-white font-medium">Articles & Publications</h1>
                <p className="text-gray-400 text-xs md:text-sm mt-1">
                  Manage articles published to the website, indexed by Google, and mapped in sitemap.xml.
                </p>
              </div>

              <button
                onClick={startNewArticle}
                className="bg-gold hover:bg-[#D4A83A] text-navy px-5 py-2.5 rounded font-medium text-xs md:text-sm uppercase tracking-wider flex items-center gap-2 shadow-lg transition-all hover:scale-[1.02]"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-current fill-none stroke-[2.5]">
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
                <span>Write New Article</span>
              </button>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <div className="bg-navy/70 border border-gold/20 p-5 rounded-lg">
                <span className="text-xs uppercase text-gray-400 tracking-wider">Total Published</span>
                <div className="text-2xl font-serif text-gold mt-1">{posts.length} Articles</div>
                <div className="text-[0.7rem] text-emerald-400 mt-1 flex items-center gap-1">
                  <span>●</span> Live on Website
                </div>
              </div>

              <div className="bg-navy/70 border border-gold/20 p-5 rounded-lg">
                <span className="text-xs uppercase text-gray-400 tracking-wider">Google SEO Status</span>
                <div className="text-2xl font-serif text-white mt-1">Active</div>
                <div className="text-[0.7rem] text-gray-400 mt-1">
                  Automatic XML Sitemap & Article Schema enabled
                </div>
              </div>

              <div className="bg-navy/70 border border-gold/20 p-5 rounded-lg">
                <span className="text-xs uppercase text-gray-400 tracking-wider">CMS Sync</span>
                <div className="text-2xl font-serif text-white mt-1">Sanity Cloud</div>
                <div className="text-[0.7rem] text-gray-400 mt-1">
                  Connected & instant revalidation active
                </div>
              </div>
            </div>

            {/* Search and Category Filters */}
            <div className="bg-navy/60 border border-white/10 rounded-t-lg p-4 flex flex-wrap gap-4 items-center justify-between">
              <div className="relative flex-1 min-w-[240px]">
                <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-gray-400 fill-none absolute left-3 top-1/2 -translate-y-1/2">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <input
                  type="text"
                  placeholder="Search articles by title or keyword…"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#08121E] border border-white/15 rounded pl-9 pr-3 py-2 text-xs md:text-sm text-white focus:border-gold outline-none"
                />
              </div>

              <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
                <button
                  onClick={() => setSelectedCategory('All')}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                    selectedCategory === 'All' ? 'bg-gold text-navy' : 'bg-[#08121E] text-gray-300 hover:text-white border border-white/10'
                  }`}
                >
                  All
                </button>
                {CATEGORIES.slice(0, 4).map((c) => (
                  <button
                    key={c}
                    onClick={() => setSelectedCategory(c)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors whitespace-nowrap ${
                      selectedCategory === c ? 'bg-gold text-navy' : 'bg-[#08121E] text-gray-300 hover:text-white border border-white/10'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* Articles Table */}
            <div className="bg-navy/40 border border-t-0 border-white/10 rounded-b-lg overflow-hidden">
              {loadingPosts ? (
                <div className="py-20 text-center text-gray-400 flex flex-col items-center gap-3">
                  <div className="w-6 h-6 border-2 border-gold border-t-transparent rounded-full animate-spin" />
                  <span className="text-xs">Fetching articles…</span>
                </div>
              ) : filteredPosts.length === 0 ? (
                <div className="py-20 text-center text-gray-400">
                  <p className="text-sm">No articles found matching your criteria.</p>
                  <button onClick={startNewArticle} className="text-gold text-xs underline mt-2">
                    Write your first article now →
                  </button>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs md:text-sm">
                    <thead>
                      <tr className="border-b border-white/10 text-gray-400 text-[0.7rem] uppercase tracking-wider bg-navy/80">
                        <th className="py-3.5 px-4 font-medium">Article Title</th>
                        <th className="py-3.5 px-4 font-medium">Category</th>
                        <th className="py-3.5 px-4 font-medium">Published Date</th>
                        <th className="py-3.5 px-4 font-medium text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {filteredPosts.map((post) => (
                        <tr key={post._id} className="hover:bg-white/[0.02] transition-colors">
                          <td className="py-4 px-4 font-medium text-white max-w-[340px]">
                            <div className="line-clamp-1">{post.title}</div>
                            <div className="text-[0.72rem] text-gold/80 font-mono mt-0.5">/blog/{post.slug}</div>
                          </td>
                          <td className="py-4 px-4">
                            <span className="inline-block bg-gold/15 text-gold border border-gold/30 text-[0.65rem] uppercase px-2 py-0.5 rounded font-medium">
                              {post.category}
                            </span>
                          </td>
                          <td className="py-4 px-4 text-gray-300 text-xs">
                            {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' }) : '—'}
                          </td>
                          <td className="py-4 px-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <Link
                                href={`/blog/${post.slug}`}
                                target="_blank"
                                className="px-2.5 py-1.5 rounded bg-white/5 hover:bg-white/10 text-[#C9C2B5] hover:text-white text-xs border border-white/10 transition-colors inline-flex items-center gap-1"
                                title="View on live website"
                              >
                                <span>Live</span>
                                <svg viewBox="0 0 24 24" className="w-3 h-3 stroke-current fill-none">
                                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                                  <polyline points="15 3 21 3 21 9" />
                                  <line x1="10" y1="14" x2="21" y2="3" />
                                </svg>
                              </Link>

                              <button
                                onClick={() => editArticle(post)}
                                className="px-2.5 py-1.5 rounded bg-gold/10 hover:bg-gold/20 text-gold text-xs border border-gold/30 transition-colors"
                              >
                                Edit
                              </button>

                              <button
                                onClick={() => setDeleteTarget(post)}
                                className="px-2.5 py-1.5 rounded bg-red-950/40 hover:bg-red-900/60 text-red-300 text-xs border border-red-500/30 transition-colors"
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* ARTICLE EDITOR VIEW */
          <div>
            {/* Top Editor Bar */}
            <div className="flex items-center justify-between gap-4 mb-6">
              <button
                onClick={() => setView('list')}
                className="text-xs text-gray-400 hover:text-gold transition-colors flex items-center gap-1.5"
              >
                <span>← Back to All Articles</span>
              </button>

              <div className="flex items-center gap-3">
                <span className="text-xs text-gray-400">
                  {editingId ? (
                    <span className="text-gold font-medium">● Editing Existing Article</span>
                  ) : (
                    <span className="text-emerald-400 font-medium">● New Article</span>
                  )}
                </span>
              </div>
            </div>

            {saveStatus && (
              <div
                className={`mb-6 p-4 rounded border text-xs flex items-center justify-between gap-4 ${
                  saveStatus.success
                    ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-200'
                    : 'bg-red-950/60 border-red-500/40 text-red-200'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span>{saveStatus.success ? '✓' : '⚠'}</span>
                  <span>{saveStatus.message}</span>
                </div>
                {saveStatus.success && saveStatus.slug && (
                  <Link
                    href={`/blog/${saveStatus.slug}`}
                    target="_blank"
                    className="underline text-gold hover:text-white font-medium"
                  >
                    View Live on Website →
                  </Link>
                )}
              </div>
            )}

            <form onSubmit={handleSavePost} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* LEFT / CENTER: Article Content (2 Cols) */}
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-navy/70 border border-gold/30 rounded-lg p-6 space-y-5">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#C9C2B5] font-medium mb-1.5">
                      Article Title *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Landmark Judgment on Anticipatory Bail in Criminal Proceedings"
                      value={title}
                      onChange={(e) => handleTitleChange(e.target.value)}
                      className="w-full px-4 py-3 bg-[#08121E] border border-gold/30 rounded text-white font-serif text-lg focus:border-gold outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#C9C2B5] font-medium mb-1.5">
                      Short Excerpt / Google Search Meta Description *
                    </label>
                    <textarea
                      required
                      rows={3}
                      maxLength={300}
                      placeholder="Summary of the article. This is what Google shows in search results and what appears on social share previews (~140-160 characters recommended)."
                      value={excerpt}
                      onChange={(e) => setExcerpt(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-[#08121E] border border-white/15 rounded text-white text-xs md:text-sm focus:border-gold outline-none"
                    />
                    <div className="text-right text-[0.68rem] text-gray-400 mt-1">
                      {excerpt.length} / 300 characters {excerpt.length >= 120 && excerpt.length <= 165 ? ' (Optimal for Google)' : ''}
                    </div>
                  </div>

                  {/* Formatting Toolbar */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs uppercase tracking-wider text-[#C9C2B5] font-medium">
                        Article Body Content *
                      </label>

                      {/* Tab Switcher: Write vs Preview */}
                      <div className="flex items-center bg-[#08121E] p-0.5 rounded border border-white/10 text-xs">
                        <button
                          type="button"
                          onClick={() => setActiveTab('write')}
                          className={`px-3 py-1 rounded transition-colors ${
                            activeTab === 'write' ? 'bg-gold text-navy font-medium' : 'text-gray-400 hover:text-white'
                          }`}
                        >
                          Write
                        </button>
                        <button
                          type="button"
                          onClick={() => setActiveTab('preview')}
                          className={`px-3 py-1 rounded transition-colors ${
                            activeTab === 'preview' ? 'bg-gold text-navy font-medium' : 'text-gray-400 hover:text-white'
                          }`}
                        >
                          Live Preview
                        </button>
                      </div>
                    </div>

                    {activeTab === 'write' ? (
                      <div className="space-y-2">
                        {/* Format buttons */}
                        <div className="flex flex-wrap items-center gap-1.5 bg-[#08121E] p-2 rounded border border-white/10 text-xs">
                          <button
                            type="button"
                            onClick={() => insertFormat('\n## ', '\n')}
                            className="px-2 py-1 bg-white/5 hover:bg-gold/20 hover:text-gold rounded border border-white/10 font-bold"
                            title="Insert Heading 2"
                          >
                            H2
                          </button>
                          <button
                            type="button"
                            onClick={() => insertFormat('\n### ', '\n')}
                            className="px-2 py-1 bg-white/5 hover:bg-gold/20 hover:text-gold rounded border border-white/10 font-bold"
                            title="Insert Heading 3"
                          >
                            H3
                          </button>
                          <button
                            type="button"
                            onClick={() => insertFormat('**', '**')}
                            className="px-2 py-1 bg-white/5 hover:bg-gold/20 hover:text-gold rounded border border-white/10 font-bold"
                            title="Bold text"
                          >
                            B
                          </button>
                          <button
                            type="button"
                            onClick={() => insertFormat('\n> ', '\n')}
                            className="px-2 py-1 bg-white/5 hover:bg-gold/20 hover:text-gold rounded border border-white/10 italic"
                            title="Quote"
                          >
                            “ Quote ”
                          </button>
                          <button
                            type="button"
                            onClick={() => insertFormat('\n- ')}
                            className="px-2 py-1 bg-white/5 hover:bg-gold/20 hover:text-gold rounded border border-white/10"
                            title="Bullet list"
                          >
                            • Bullet
                          </button>
                          <button
                            type="button"
                            onClick={() => insertFormat('\n1. ')}
                            className="px-2 py-1 bg-white/5 hover:bg-gold/20 hover:text-gold rounded border border-white/10"
                            title="Numbered list"
                          >
                            1. List
                          </button>
                          <button
                            type="button"
                            onClick={() => insertFormat('§ ')}
                            className="px-2 py-1 bg-white/5 hover:bg-gold/20 hover:text-gold rounded border border-white/10"
                            title="Section symbol"
                          >
                            § Section
                          </button>
                        </div>

                        <textarea
                          ref={textareaRef}
                          required
                          rows={18}
                          placeholder="Write your article paragraphs here. Use ## for major subheadings, ### for minor subheadings, > for legal quotes, and - for bullet points."
                          value={content}
                          onChange={(e) => setContent(e.target.value)}
                          className="w-full p-4 bg-[#08121E] border border-white/15 rounded text-white text-sm leading-relaxed font-sans focus:border-gold outline-none resize-y"
                        />
                      </div>
                    ) : (
                      /* Live Preview container */
                      <div className="bg-white text-navy p-6 rounded-lg border border-gold/30 min-h-[400px] overflow-y-auto">
                        <div className="text-[0.65rem] uppercase font-bold tracking-widest text-gold bg-navy inline-block px-2.5 py-0.5 rounded mb-3">
                          {category}
                        </div>
                        <h2 className="font-serif text-2xl font-bold mb-4">{title || 'Article Title Preview'}</h2>
                        <div className="text-gray-500 text-xs mb-6 border-b pb-3">
                          {publishedAt ? new Date(publishedAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' }) : 'Today'} • By Adv. Karandeep
                        </div>
                        <div className="prose text-sm text-[#333] space-y-4">
                          {content ? (
                            content.split(/\r?\n/).map((line, idx) => {
                              const t = line.trim();
                              if (!t) return null;
                              if (t.startsWith('### ')) return <h4 key={idx} className="font-serif text-lg font-bold text-navy mt-4">{t.slice(4)}</h4>;
                              if (t.startsWith('## ')) return <h3 key={idx} className="font-serif text-xl font-bold text-navy mt-6 border-b pb-1">{t.slice(3)}</h3>;
                              if (t.startsWith('# ')) return <h2 key={idx} className="font-serif text-2xl font-bold text-navy mt-6">{t.slice(2)}</h2>;
                              if (t.startsWith('> ')) return <blockquote key={idx} className="border-l-4 border-gold pl-4 italic text-navy/80 my-3">{t.slice(2)}</blockquote>;
                              if (t.startsWith('- ') || t.startsWith('* ')) return <li key={idx} className="ml-5 list-disc">{t.slice(2)}</li>;
                              if (/^\d+\.\s/.test(t)) return <li key={idx} className="ml-5 list-decimal">{t.replace(/^\d+\.\s/, '')}</li>;
                              return <p key={idx} className="leading-relaxed">{t}</p>;
                            })
                          ) : (
                            <p className="text-gray-400 italic">No content written yet.</p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN: SEO Settings & Google Card (1 Col) */}
              <div className="space-y-6">
                {/* Publishing Controls */}
                <div className="bg-navy/70 border border-gold/30 rounded-lg p-5 space-y-4">
                  <h3 className="font-serif text-base text-gold font-medium">Publishing Settings</h3>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#C9C2B5] font-medium mb-1">
                      Legal Practice Area *
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full px-3 py-2 bg-[#08121E] border border-white/15 rounded text-white text-xs focus:border-gold outline-none"
                    >
                      {CATEGORIES.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#C9C2B5] font-medium mb-1">
                      URL Slug *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        value={slug}
                        onChange={(e) => {
                          setIsSlugManual(true);
                          setSlug(e.target.value);
                        }}
                        placeholder="article-url-slug"
                        className="w-full px-3 py-2 bg-[#08121E] border border-white/15 rounded text-white font-mono text-xs focus:border-gold outline-none"
                      />
                    </div>
                    <p className="text-[0.68rem] text-gray-400 mt-1">
                      Web link: <span className="text-gold font-mono">/blog/{slug || '…'}</span>
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#C9C2B5] font-medium mb-1">
                      Publish Date
                    </label>
                    <input
                      type="date"
                      value={publishedAt}
                      onChange={(e) => setPublishedAt(e.target.value)}
                      className="w-full px-3 py-2 bg-[#08121E] border border-white/15 rounded text-white text-xs focus:border-gold outline-none"
                    />
                  </div>

                  {/* Optional Cover Image */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#C9C2B5] font-medium mb-1">
                      Optional Cover Image
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={isUploading}
                      className="text-xs text-gray-400 file:mr-2 file:py-1 file:px-2.5 file:rounded file:border-0 file:text-xs file:bg-gold file:text-navy hover:file:bg-[#D4A83A]"
                    />
                    {isUploading && <p className="text-[0.68rem] text-gold mt-1 animate-pulse">Uploading to Sanity CDN…</p>}
                    {coverPreviewUrl && (
                      <div className="mt-2 relative rounded overflow-hidden border border-white/10 h-24">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={coverPreviewUrl} alt="Cover preview" className="w-full h-full object-cover" />
                      </div>
                    )}
                  </div>

                  <div className="pt-3 border-t border-white/10">
                    <button
                      type="submit"
                      disabled={isSaving}
                      className="w-full py-3 bg-gold hover:bg-[#D4A83A] text-navy font-semibold text-xs md:text-sm uppercase tracking-wider rounded transition-all shadow-lg hover:shadow-xl disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {isSaving ? (
                        <>
                          <div className="w-4 h-4 border-2 border-navy border-t-transparent rounded-full animate-spin" />
                          <span>Publishing to Website & Google…</span>
                        </>
                      ) : (
                        <span>Publish to Website & Google</span>
                      )}
                    </button>
                  </div>
                </div>

                {/* Google Search Result Preview */}
                <div className="bg-navy/70 border border-gold/30 rounded-lg p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-serif text-sm text-gold font-medium">Google Search Preview</h3>
                    <span className="text-[0.65rem] bg-emerald-950 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded">
                      SEO Ready
                    </span>
                  </div>

                  {/* Google Snippet Box */}
                  <div className="bg-[#1A1A1A] p-4 rounded border border-gray-700 text-left font-sans">
                    <div className="flex items-center gap-2 text-[0.72rem] text-[#bdc1c6] mb-1">
                      <div className="w-4 h-4 rounded-full bg-gold text-navy font-bold text-[0.6rem] flex items-center justify-center">
                        KD
                      </div>
                      <span className="truncate">https://advocatekd.com › blog › {slug || 'article-slug'}</span>
                    </div>
                    <div className="text-[#8ab4f8] text-sm font-medium hover:underline cursor-pointer line-clamp-1">
                      {title ? `${title} | Adv. Karandeep` : 'Article Title | Adv. Karandeep'}
                    </div>
                    <div className="text-[#bdc1c6] text-xs mt-1 line-clamp-2 leading-relaxed">
                      {excerpt || 'Short excerpt describing the legal topic, high court judgment, or client know-your-rights insights for Google search indexing.'}
                    </div>
                  </div>

                  {/* Google Indexing Checklist */}
                  <div className="text-[0.7rem] text-gray-400 space-y-1.5 pt-2 border-t border-white/10">
                    <div className="flex items-center gap-1.5 text-emerald-400">
                      <span>✓</span> Included in dynamic <strong className="font-mono text-white">sitemap.xml</strong>
                    </div>
                    <div className="flex items-center gap-1.5 text-emerald-400">
                      <span>✓</span> JSON-LD <strong className="text-white">Article Structured Data</strong> generated
                    </div>
                    <div className="flex items-center gap-1.5 text-emerald-400">
                      <span>✓</span> Fast edge revalidation on publish
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        )}
      </main>

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-navy border border-red-500/40 rounded-lg max-w-md w-full p-6 text-left">
            <h3 className="font-serif text-lg text-white mb-2">Delete Article?</h3>
            <p className="text-gray-300 text-xs leading-relaxed mb-4">
              Are you sure you want to permanently remove <strong className="text-gold">&ldquo;{deleteTarget.title}&rdquo;</strong> from
              the website and Sanity CMS? This action cannot be undone.
            </p>
            <div className="flex items-center justify-end gap-3 text-xs">
              <button
                onClick={() => setDeleteTarget(null)}
                disabled={isDeleting}
                className="px-4 py-2 rounded bg-white/10 hover:bg-white/20 text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleDeletePost}
                disabled={isDeleting}
                className="px-4 py-2 rounded bg-red-600 hover:bg-red-700 text-white font-medium flex items-center gap-2"
              >
                {isDeleting ? 'Deleting…' : 'Yes, Delete Article'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
