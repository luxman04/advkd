import { config as loadEnv } from 'dotenv';
loadEnv({ path: '.env.local' });

import { createClient } from '@sanity/client';
import { legacySeedPosts } from './legacy-blog-seed-data';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-02-01';
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !token) {
  console.error(
    'Missing NEXT_PUBLIC_SANITY_PROJECT_ID and/or SANITY_API_WRITE_TOKEN in .env.local.\n' +
      'Create a write token at manage.sanity.io → your project → API → Tokens (role: Editor), then re-run: npm run seed'
  );
  process.exit(1);
}

const client = createClient({ projectId, dataset, apiVersion, token, useCdn: false });

function randomKey() {
  return Math.random().toString(36).slice(2, 10);
}

function toPortableText(paragraphs: string[]) {
  return paragraphs.map((text) => ({
    _type: 'block' as const,
    _key: randomKey(),
    style: 'normal' as const,
    markDefs: [],
    children: [{ _type: 'span' as const, _key: randomKey(), text, marks: [] }],
  }));
}

async function run() {
  console.log(`Seeding ${legacySeedPosts.length} posts into dataset "${dataset}"...\n`);

  for (const post of legacySeedPosts) {
    const doc = {
      _id: `post-${post.slug}`, // deterministic ID → re-running this script updates rather than duplicates
      _type: 'post',
      title: post.title,
      slug: { _type: 'slug' as const, current: post.slug },
      category: post.category,
      publishedAt: new Date(post.date).toISOString(),
      excerpt: post.excerpt,
      body: toPortableText(post.body),
    };
    await client.createOrReplace(doc);
    console.log(`  ✓ ${post.title}`);
  }

  console.log('\nDone. Visit /studio on your site to see and edit the imported posts.');
}

run().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
