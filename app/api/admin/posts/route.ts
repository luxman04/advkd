import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';
import { ADMIN_COOKIE_NAME, verifyAdminToken } from '@/lib/admin-auth';
import { sanityWriteClient } from '@/lib/sanity/write-client';
import { sanityClient } from '@/lib/sanity/client';
import { markdownToPortableText, portableTextToMarkdown } from '@/lib/portable-text-converter';

function isAuthorized(req: NextRequest): boolean {
  const token = req.cookies.get(ADMIN_COOKIE_NAME)?.value;
  return verifyAdminToken(token);
}

export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const readClient = sanityClient || sanityWriteClient;
  if (!readClient) {
    return NextResponse.json(
      { error: 'Sanity client is not configured' },
      { status: 500 }
    );
  }

  try {
    const rawPosts = await readClient.fetch(
      `*[_type == "post"] | order(publishedAt desc){
        _id,
        "slug": slug.current,
        title,
        category,
        publishedAt,
        excerpt,
        body,
        coverImage
      }`
    );

    const posts = (rawPosts || []).map((p: any) => ({
      ...p,
      content: portableTextToMarkdown(p.body),
    }));

    return NextResponse.json({ posts });
  } catch (err: any) {
    console.error('Failed to fetch posts for admin:', err);
    return NextResponse.json({ error: err.message || 'Failed to fetch posts' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!sanityWriteClient) {
    return NextResponse.json(
      { error: 'Sanity write client is not configured (check SANITY_API_WRITE_TOKEN in .env.local)' },
      { status: 500 }
    );
  }

  try {
    const body = await req.json();
    const { _id, title, slug, category, publishedAt, excerpt, content, coverImageAssetId } = body;

    if (!title?.trim() || !category?.trim() || !excerpt?.trim() || !content?.trim()) {
      return NextResponse.json(
        { error: 'Please provide Title, Category, Excerpt, and Article Content.' },
        { status: 400 }
      );
    }

    const cleanSlug = (slug || title)
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-');

    const portableBody = markdownToPortableText(content);

    const docId: string = _id || `post-${cleanSlug}`;
    const doc: { _id: string; _type: string; [key: string]: any } = {
      _id: docId,
      _type: 'post',
      title: title.trim(),
      slug: { _type: 'slug', current: cleanSlug },
      category: category.trim(),
      publishedAt: publishedAt ? new Date(publishedAt).toISOString() : new Date().toISOString(),
      excerpt: excerpt.trim(),
      body: portableBody,
    };

    if (coverImageAssetId) {
      doc.coverImage = {
        _type: 'image',
        asset: { _type: 'reference', _ref: coverImageAssetId },
      };
    }

    const savedDoc = await sanityWriteClient.createOrReplace(doc);

    // Instant site & Google sitemap revalidation
    try {
      revalidateTag('posts');
      revalidateTag(`post:${cleanSlug}`);
      revalidatePath('/blog');
      revalidatePath(`/blog/${cleanSlug}`);
      revalidatePath('/sitemap.xml');
    } catch (revalErr) {
      console.warn('Revalidation warning:', revalErr);
    }

    return NextResponse.json({ success: true, post: savedDoc, slug: cleanSlug });
  } catch (err: any) {
    console.error('Failed to save post:', err);
    return NextResponse.json({ error: err.message || 'Failed to save post' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!sanityWriteClient) {
    return NextResponse.json({ error: 'Sanity write client is not configured' }, { status: 500 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    const slug = searchParams.get('slug');

    if (!id) {
      return NextResponse.json({ error: 'Post ID is required' }, { status: 400 });
    }

    await sanityWriteClient.delete(id);

    try {
      revalidateTag('posts');
      if (slug) revalidateTag(`post:${slug}`);
      revalidatePath('/blog');
      if (slug) revalidatePath(`/blog/${slug}`);
      revalidatePath('/sitemap.xml');
    } catch (revalErr) {
      console.warn('Revalidation warning:', revalErr);
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error('Failed to delete post:', err);
    return NextResponse.json({ error: err.message || 'Failed to delete post' }, { status: 500 });
  }
}
